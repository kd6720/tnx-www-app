#!/usr/bin/env python3
"""Backfill the LinkedIn posts that silently failed (unsupportedMimeType) for ~a month.
Re-posts each slug via the FIXED Linked API path and VERIFIES the async workflow
actually completed (success + postUrl) before moving on. Logs to
~/.hermes/cron/linkedin-backfill-log.jsonl."""
import importlib.util
import json
from datetime import datetime, timezone
from pathlib import Path

SCRIPT = "/root/trustednetworx/scripts/send-blog-to-make.py"
LOG = Path.home() / ".hermes" / "cron" / "linkedin-backfill-log.jsonl"

# 22 slugs from the Linked-API era (2026-07-21 -> 2026-08-18) that all failed
# with unsupportedMimeType. sip-trunking-vs-hosted-voip is excluded (already
# re-posted successfully as the fix test).
SLUGS = [
    "government-telecom-modernization-navigating-procurement-compliance",
    "auto-dealership-connectivity-showroom-to-service-bay",
    "multi-family-property-telecom-amenities-attract-tenants",
    "elevator-phone-requirements-what-codes-actually-say",
    "education-connectivity-networks-that-survive-school-day",
    "fcc-pots-forbearance-what-changed-and-what-it-means",
    "ul-864-fire-alarm-monitoring-compliance-migration",
    "security-system-communications-pots-to-ip-cellular",
    "when-compliance-drives-innovation-instead-of-blocking-it",
    "compliance-audit-checklist-facility-manager",
    "emergency-communication-requirements-senior-living-facilities",
    "managed-connectivity-outsourcing-network",
    "5-signs-business-outgrown-telecom-setup",
    "bandwidth-planning-2026-business-needs",
    "pots-replacement-roi-real-cost-of-waiting",
    "t1-migration-strategies-2026",
    "ai-email-triage-2026",
    "migrating-to-voip-what-business-leaders-get-wrong",
    "hotel-guest-connectivity-expectations-2026",
    "nfpa-72-fire-alarm-testing-supervision-2026",
    "multi-site-telecom-consolidation-2026",
    "carrier-disconnection-notice-2026",
]

spec = importlib.util.spec_from_file_location("sbm", SCRIPT)
sbm = importlib.util.module_from_spec(spec)
spec.loader.exec_module(sbm)

LOG.parent.mkdir(parents=True, exist_ok=True)
ok_count = 0
fail_count = 0

for i, slug in enumerate(SLUGS, 1):
    entry = {"ts": datetime.now(timezone.utc).isoformat(), "slug": slug}
    try:
        res = sbm.post_to_linkedin(slug)
        wid = None
        try:
            wid = json.loads(res.get("response", "{}")).get("result", {}).get("workflowId")
        except Exception:
            wid = None
        if res.get("ok") and wid:
            ver = sbm.verify_linkedin_workflow(wid, timeout_seconds=330)
            entry.update({"workflowId": wid, "ok": ver.get("ok"), "postUrl": ver.get("postUrl"), "error": ver.get("error")})
        else:
            entry.update({"ok": False, "error": res.get("error") or "no workflowId returned"})
    except Exception as exc:
        entry.update({"ok": False, "error": str(exc)})

    if entry.get("ok"):
        ok_count += 1
    else:
        fail_count += 1
    with LOG.open("a") as f:
        f.write(json.dumps(entry) + "\n")
    print(f"[{i}/{len(SLUGS)}] {slug}: ok={entry.get('ok')} {entry.get('postUrl') or entry.get('error')}", flush=True)

print(f"\nDONE: {ok_count} posted, {fail_count} failed", flush=True)
