#!/usr/bin/env python3
"""Paced LinkedIn backfill — posts up to the REMAINING daily stPosts budget
(missing blog posts that never landed due to the unsupportedMimeType bug),
staying strictly within the configured Linked API limits (recommended 3/day).

Reads pending slugs from ~/.hermes/cron/linkedin-backfill-pending.json,
checks current daily usage vs the stPosts limit, posts (limit - usage) slugs
with per-post verification, and removes posted slugs from the pending list.

Idempotent + safe: if the daily budget is already consumed (e.g. by the blog
cron), it posts nothing and exits cleanly. Run it a few times/day; it only
ever uses the leftover budget."""
import importlib.util
import json
import time
from datetime import datetime, timezone
from pathlib import Path

SCRIPT = "/root/trustednetworx/scripts/send-blog-to-make.py"
PENDING = Path.home() / ".hermes" / "cron" / "linkedin-backfill-pending.json"
LOG = Path.home() / ".hermes" / "cron" / "linkedin-backfill-log.jsonl"
AID = "b26d0124-38c7-43a4-a997-b6c61eabe19f"


def env(key: str) -> str:
    envpath = Path.home() / ".hermes" / ".env"
    for line in envpath.read_text().splitlines():
        if line.startswith(f"{key}="):
            return line.split("=", 1)[1].strip().strip('"').strip("'")
    return ""


def admin_post(url: str, body: dict) -> dict:
    import urllib.request
    tok = env("LINKED_API_TOKEN")
    ident = env("LINKEDIN_IDENT_TOKEN")
    req = urllib.request.Request(
        url,
        data=json.dumps(body).encode(),
        headers={"Content-Type": "application/json", "linked-api-token": tok, "identification-token": ident},
        method="POST",
    )
    return json.loads(urllib.request.urlopen(req, timeout=25).read().decode())


def st_posts_budget() -> int:
    """Return remaining daily stPosts budget (limit - usage), min 0."""
    import urllib.request
    usage = admin_post("https://api.linkedapi.io/admin/limits.getUsage", {"accountId": AID})
    limit = admin_post("https://api.linkedapi.io/admin/limits.get", {"accountId": AID})
    used = 0
    cap = 3
    for u in usage.get("result", {}).get("usage", []):
        if u.get("category") == "stPosts" and u.get("period") == "daily" and u.get("isEnabled"):
            used = u.get("currentUsage", 0)
    for l in limit.get("result", {}).get("limits", []):
        if l.get("category") == "stPosts" and l.get("period") == "daily" and l.get("isEnabled"):
            cap = l.get("maxValue", cap)
    return max(0, cap - used)


def load_pending() -> list:
    try:
        return json.loads(PENDING.read_text())
    except Exception:
        return []


def save_pending(slugs: list) -> None:
    PENDING.write_text(json.dumps(slugs, indent=2))


def main() -> int:
    spec = importlib.util.spec_from_file_location("sbm", SCRIPT)
    sbm = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(sbm)

    pending = load_pending()
    if not pending:
        print("[SILENT]")
        return 0

    budget = st_posts_budget()
    if budget <= 0:
        print(f"[SILENT] daily budget consumed ({budget} left)")
        return 0

    to_post = pending[:budget]
    posted = []
    for slug in to_post:
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
                entry.update({"ok": False, "error": res.get("error") or "no workflowId"})
        except Exception as exc:
            entry.update({"ok": False, "error": str(exc)})

        with LOG.open("a") as f:
            f.write(json.dumps(entry) + "\n")
        if entry.get("ok"):
            posted.append(slug)
            print(f"posted: {slug} -> {entry.get('postUrl')}", flush=True)
        else:
            print(f"FAILED: {slug} -> {entry.get('error')}", flush=True)
        time.sleep(30)  # human-ish gap between posts

    remaining = [s for s in pending if s not in posted]
    save_pending(remaining)
    print(f"\n{len(posted)} posted, {len(remaining)} still pending", flush=True)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
