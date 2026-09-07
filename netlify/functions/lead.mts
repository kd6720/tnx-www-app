/**
 * Lead capture bridge: trustednetworx.com → TNX CRM.
 *
 * The site's MultiStepForm and the standalone tool calculators post their
 * payloads here (same origin, so no CORS). Two payload shapes are accepted:
 * the MultiStepForm shape and the calculator shape (name/email/phone/company
 * plus `source` and a double-encoded `calculator_results` JSON string).
 * This function holds the CRM Agent Key server-side, translates the marketing
 * payload into a crm_leads row, and forwards it to POST /api/v1/leads on the
 * CRM. The browser never sees the key and never talks to the CRM directly.
 *
 * After the CRM accepts the lead it also sends two emails through Resend:
 * an acknowledgement to the visitor (with the booking link) and an alert to
 * the rep. Both are sent here rather than from the CRM's 15-minute
 * notification cron because speed-to-lead is the whole point — a "thanks,
 * let's book time" that lands a quarter of an hour later reads as automated
 * in the worst way. Neither send can fail the submission: the lead is
 * already saved by then, so a Resend outage is logged and swallowed.
 *
 * Environment (set in Netlify → Site configuration → Environment variables):
 *   TNX_CRM_API_KEY         required — an Agent Key from tnxcrm.com →
 *                           Settings → Agent Keys, scoped to write Leads.
 *   TNX_CRM_BASE_URL        optional — defaults to https://tnxcrm.com
 *   TNX_CRM_LEAD_SOURCE_ID  optional — uuid of the "Website" lead source so
 *                           form leads report alongside every other channel.
 *   TNX_CRM_LEAD_OWNER_ID   optional — uuid of the profile that should own
 *                           website leads. Unset, leads are owned by the
 *                           agent identity, which also means the CRM derives
 *                           no notification for them (it only notifies when a
 *                           record's owner differs from its creator).
 *   RESEND_API_KEY          optional — unset, both emails are skipped and the
 *                           lead is still saved.
 *   LEAD_FROM_EMAIL         optional — defaults to the constant below.
 *   LEAD_NOTIFY_EMAIL       optional — where the internal alert goes.
 *   LEAD_BOOKING_URL        optional — overrides the booking link.
 *
 * Netlify Functions v2: web-standard Request in, Response out. No imports.
 */

const MAX_BODY_BYTES = 16_384;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Public-facing defaults. Safe to keep in a public repo — every one of these
// is already published on the website. Only RESEND_API_KEY is a secret, and
// it has no default.
const DEFAULT_FROM = "Carter Dewey <carter@trustednetworx.com>";
const DEFAULT_REPLY_TO = "carter@trustednetworx.com";
const DEFAULT_NOTIFY_TO = "carter@trustednetworx.com";
const DEFAULT_BOOKING_URL =
  "https://outlook.office.com/bookwithme/user/45a13f9d8af14188a4631414211de1a2@trustednetworx.com/meetingtype/JwBcdBYbs0uryAE8OXUqwg2?anonymous&ismsaljsauthenabled&ep=mcard";

type Payload = Record<string, unknown>;

function str(v: unknown): string {
  return typeof v === "string" ? v.trim() : "";
}

/** "(305) 498-7530" → "+13054987530". Anything that isn't a clean NA number is passed through untouched. */
function normalizePhone(raw: string): string {
  const digits = raw.replace(/\D/g, "");
  if (digits.length === 10) return `+1${digits}`;
  if (digits.length === 11 && digits.startsWith("1")) return `+${digits}`;
  return raw;
}

const RELATIONSHIP_LABELS: Record<string, string> = {
  msp: "MSP (sells to own clients)",
  reseller: "Reseller / agent (commission)",
  direct: "Direct — buying for own organization",
  platform: "Platform buyer (Partner Hub / CRM)",
};

function splitName(full: string): { first: string; last: string } {
  const parts = full.split(/\s+/).filter(Boolean);
  if (parts.length === 0) return { first: "", last: "" };
  if (parts.length === 1) return { first: parts[0], last: "" };
  return { first: parts[0], last: parts.slice(1).join(" ") };
}

/** "Copper Sunset Risk Assessment" -> "copper-sunset-risk-assessment", for use as a tag. */
function slug(v: string): string {
  return v.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 40);
}

/**
 * The tool calculators send their computed output as `calculator_results`: a
 * JSON string nested inside the JSON body (double-encoded). Parse it back into
 * an object so the values land in custom_fields as real fields rather than one
 * opaque blob. Returns null for anything that is not a parseable object.
 */
function parseCalculatorResults(raw: unknown): Record<string, unknown> | null {
  if (typeof raw === "object" && raw !== null && !Array.isArray(raw)) {
    return raw as Record<string, unknown>;
  }
  if (typeof raw !== "string" || raw.trim() === "") return null;
  try {
    const parsed: unknown = JSON.parse(raw);
    if (typeof parsed !== "object" || parsed === null || Array.isArray(parsed)) return null;
    return parsed as Record<string, unknown>;
  } catch {
    return null;
  }
}

/** Renders one calculator answer for the notes block. Objects/arrays are compacted, not dumped. */
function renderResultValue(v: unknown): string {
  if (v === null || v === undefined || v === "") return "";
  if (Array.isArray(v)) {
    return v
      .map((item) =>
        item !== null && typeof item === "object"
          ? String((item as Record<string, unknown>).label ?? (item as Record<string, unknown>).question ?? "")
          : String(item),
      )
      .filter(Boolean)
      .join(", ");
  }
  if (typeof v === "object") return "";
  return String(v);
}

/** camelCase / snake_case -> "Camel case" for a notes label. */
function humanize(key: string): string {
  const spaced = key.replace(/[_-]+/g, " ").replace(/([a-z0-9])([A-Z])/g, "$1 $2");
  return spaced.charAt(0).toUpperCase() + spaced.slice(1).toLowerCase();
}

/** A rep-readable summary of every qualifying answer the visitor gave. Only lines with a value are emitted. */
function buildNotes(p: Payload): string {
  const lines: string[] = [];
  const page = str(p.source_page);
  const preset = str(p.preset);
  const source = str(p.source);
  // A calculator names itself in `source` ("Copper Sunset Risk Assessment");
  // MultiStepForm identifies itself by page + preset. Prefer the specific one.
  const heading = source || `Website inquiry${page ? ` — ${page}` : ""}${preset ? ` (${preset})` : ""}`;
  lines.push(heading);
  lines.push("");

  const row = (label: string, value: unknown) => {
    const v = str(value);
    if (v) lines.push(`${label}: ${v}`);
  };

  const rel = str(p.relationship);
  row("Relationship", RELATIONSHIP_LABELS[rel] ?? rel);
  row("Platform", p.platform);
  row("Vertical", p.vertical || p.industry);
  row("Sells today", p.sell_today);
  row("Customer count", p.customer_count);
  row("Needs", p.needs || p.pain_point);
  row("POTS devices", p.pots_devices);
  row("Team size", p.team_size);

  const sites = str(p.sites);
  const lns = str(p.lines);
  if (sites || lns) {
    lines.push(["Sites", sites].filter(Boolean).join(": ") + (sites && lns ? " · " : "") + (lns ? `Lines: ${lns}` : ""));
  }

  const results = parseCalculatorResults(p.calculator_results);
  if (results) {
    const resultLines: string[] = [];
    for (const [k, v] of Object.entries(results)) {
      const rendered = renderResultValue(v);
      if (rendered) resultLines.push(`${humanize(k)}: ${rendered}`);
    }
    if (resultLines.length > 0) {
      if (lines.length > 2) lines.push("");
      lines.push("Calculator results:");
      lines.push(...resultLines);
    }
  }

  const message = str(p.notes) || str(p.message);
  if (message) {
    lines.push("");
    lines.push("Message:");
    lines.push(message);
  }

  return lines.join("\n").trim();
}

// ─────────────────────────────────────────────────────────────
// Email
// ─────────────────────────────────────────────────────────────

function escapeHtml(s: string): string {
  return s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c] ?? c);
}

/** Anyone who sells our service on to someone else gets the partner story; everyone else gets the end-customer one. */
function isPartner(relationship: string): boolean {
  return relationship === "msp" || relationship === "reseller" || relationship === "platform";
}

/**
 * Deliberately plain: no logo, no image header, no social row. A text-forward
 * email from a named person reads as personal and clears spam filters that
 * treat image-heavy single-link mail as a campaign. The one styled element is
 * the booking button, because that is the only thing we want clicked.
 */
function emailShell(bodyHtml: string): string {
  return `<!doctype html><html><body style="margin:0;padding:0;background:#f6f7f9">
  <div style="max-width:560px;margin:0 auto;padding:28px 24px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;font-size:15px;line-height:1.6;color:#1f2937">
${bodyHtml}
  </div></body></html>`;
}

function bookingButton(url: string): string {
  // Anchor text only — the raw URL never appears in the rendered email.
  return `<p style="margin:24px 0"><a href="${escapeHtml(url)}" style="display:inline-block;background:#0f172a;color:#ffffff;text-decoration:none;padding:12px 22px;border-radius:6px;font-weight:600;font-size:15px">Book 15 minutes</a></p>`;
}

interface ProspectCtx {
  firstName: string;
  relationship: string;
  bookingUrl: string;
}

function buildProspectEmail(ctx: ProspectCtx): { subject: string; html: string; text: string } {
  const partner = isPartner(ctx.relationship);
  const hi = ctx.firstName ? `Hi ${ctx.firstName},` : "Hi,";

  const callLine = partner
    ? "Fastest way forward is a short call. Fifteen minutes is usually enough to cover how your clients are structured, what you're quoting today, and where we'd fit behind you."
    : "Fastest way forward is a short call. Fifteen minutes is usually enough to cover your sites, your line count, and what's driving the timeline — and to tell you honestly whether we're the right fit.";

  const capabilities = partner
    ? "TrustedNetworx is the back end for a lot of agents, MSPs, and VARs. You keep the customer relationship and the margin; we handle provisioning, install coordination, billing, and support — under your brand or ours, your call. Our strongest lane is compliance-sensitive POTS replacement: fire alarm, elevator, and emergency lines under NFPA 72 and UL 864, the ones most carriers won't touch. If you have clients sitting on copper with a retirement notice, that's usually the fastest opening."
    : "TrustedNetworx replaces aging copper POTS lines with managed cellular and hosted alternatives for multi-site operators — senior living, hospitality, healthcare, and property management. That includes the lines most providers won't quote: fire alarm, elevator, and emergency phones that have to keep working and keep passing inspection under NFPA 72 and UL 864. We handle the site survey, the install coordination, and the support after cutover, so it doesn't land back on your team.";

  const html = emailShell(
    `    <p style="margin:0 0 16px">${escapeHtml(hi)}</p>
    <p style="margin:0 0 16px">Thanks for reaching out. Your request came through and I have it in front of me.</p>
    <p style="margin:0 0 16px">${escapeHtml(callLine)}</p>
${bookingButton(ctx.bookingUrl)}
    <p style="margin:0 0 16px">If nothing on the calendar works, just reply to this email. It comes straight to me.</p>
    <p style="margin:0 0 20px">${escapeHtml(capabilities)}</p>
    <p style="margin:0 0 4px">Looking forward to it.</p>
    <p style="margin:16px 0 0;color:#111827"><strong>Carter Dewey</strong><br>
      <span style="color:#6b7280">EVP, Business Development · TrustedNetworx</span><br>
      <a href="mailto:${escapeHtml(DEFAULT_REPLY_TO)}" style="color:#6b7280">${escapeHtml(DEFAULT_REPLY_TO)}</a></p>`,
  );

  // text/plain cannot carry a hyperlink, so the URL is spelled out here and
  // only here. Every graphical client renders the HTML part above.
  const text = [
    hi,
    "",
    "Thanks for reaching out. Your request came through and I have it in front of me.",
    "",
    callLine,
    "",
    `Book 15 minutes: ${ctx.bookingUrl}`,
    "",
    "If nothing on the calendar works, just reply to this email. It comes straight to me.",
    "",
    capabilities,
    "",
    "Looking forward to it.",
    "",
    "Carter Dewey",
    "EVP, Business Development · TrustedNetworx",
    DEFAULT_REPLY_TO,
  ].join("\n");

  return { subject: ctx.firstName ? `Thanks, ${ctx.firstName} — here's what happens next` : "Thanks — here's what happens next", html, text };
}

interface InternalCtx {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company: string;
  relationship: string;
  preset: string;
  source: string;
  notes: string;
  leadUrl: string;
}

function buildInternalEmail(ctx: InternalCtx): { subject: string; html: string; text: string } {
  const who = [ctx.firstName, ctx.lastName].filter(Boolean).join(" ") || ctx.email;
  const org = ctx.company || "no company given";
  const subject = ctx.source
    ? `New lead — ${org} · ${ctx.source}`
    : `New lead — ${who}, ${org}`;

  const rows: [string, string][] = [
    ["Email", ctx.email],
    ["Phone", ctx.phone],
    ["Company", ctx.company],
    ["Type", RELATIONSHIP_LABELS[ctx.relationship] ?? ctx.relationship],
    ["Came from", ctx.source || (ctx.preset ? `${ctx.preset} page` : "")],
  ].filter(([, v]) => !!v) as [string, string][];

  const rowsHtml = rows
    .map(
      ([k, v]) =>
        `<tr><td style="padding:4px 12px 4px 0;color:#6b7280;white-space:nowrap;vertical-align:top">${escapeHtml(k)}</td><td style="padding:4px 0;color:#111827">${escapeHtml(v)}</td></tr>`,
    )
    .join("");

  const html = emailShell(
    `    <p style="margin:0 0 12px;font-size:17px"><strong>${escapeHtml(who)}</strong></p>
    <table style="border-collapse:collapse;margin:0 0 18px">${rowsHtml}</table>
    <pre style="margin:0 0 18px;padding:14px;background:#f3f4f6;border-radius:6px;font-family:ui-monospace,SFMono-Regular,Menlo,monospace;font-size:13px;line-height:1.5;white-space:pre-wrap;color:#111827">${escapeHtml(ctx.notes)}</pre>
    <p style="margin:0"><a href="${escapeHtml(ctx.leadUrl)}" style="display:inline-block;background:#0f172a;color:#ffffff;text-decoration:none;padding:10px 18px;border-radius:6px;font-weight:600;font-size:14px">Open in CRM</a></p>`,
  );

  const text = [
    who,
    ...rows.map(([k, v]) => `${k}: ${v}`),
    "",
    ctx.notes,
    "",
    `Open in CRM: ${ctx.leadUrl}`,
  ].join("\n");

  return { subject, html, text };
}

/** Fire-and-log. Never throws: the lead is already saved by the time this runs. */
async function sendMail(
  apiKey: string,
  from: string,
  to: string,
  replyTo: string,
  mail: { subject: string; html: string; text: string },
  label: string,
): Promise<void> {
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({ from, to: [to], reply_to: replyTo, subject: mail.subject, html: mail.html, text: mail.text }),
    });
    if (!res.ok) {
      console.error(`[lead] ${label} email rejected (${res.status}): ${(await res.text().catch(() => "")).slice(0, 300)}`);
    }
  } catch (err) {
    console.error(`[lead] ${label} email failed:`, err instanceof Error ? err.message : err);
  }
}

function json(status: number, body: unknown): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json", "Cache-Control": "no-store" },
  });
}

export default async (req: Request): Promise<Response> => {
  if (req.method !== "POST") {
    return json(405, { error: "Method not allowed" });
  }

  const apiKey = process.env["TNX_CRM_API_KEY"];
  if (!apiKey) {
    console.error("[lead] TNX_CRM_API_KEY is not set — refusing to accept submissions");
    return json(500, { error: "Lead capture is not configured." });
  }
  const baseUrl = (process.env["TNX_CRM_BASE_URL"] || "https://tnxcrm.com").replace(/\/$/, "");
  const sourceId = process.env["TNX_CRM_LEAD_SOURCE_ID"] || "";
  const ownerId = process.env["TNX_CRM_LEAD_OWNER_ID"] || "";

  const raw = await req.text();
  if (raw.length > MAX_BODY_BYTES) {
    return json(413, { error: "Payload too large" });
  }

  let payload: Payload;
  try {
    const parsed: unknown = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) throw new Error("not an object");
    payload = parsed as Payload;
  } catch {
    return json(400, { error: "Invalid JSON body" });
  }

  const fullName = str(payload.name) || str(payload.contact_name);
  const email = str(payload.email).toLowerCase();
  if (!fullName) return json(400, { error: "Name is required" });
  if (!email || !EMAIL_RE.test(email)) return json(400, { error: "A valid email is required" });

  const { first, last } = splitName(fullName);
  const phone = str(payload.phone);
  const company = str(payload.company) || str(payload.company_name);
  const preset = str(payload.preset);
  const relationship = str(payload.relationship);
  const source = str(payload.source);
  const calculatorResults = parseCalculatorResults(payload.calculator_results);
  const notes = buildNotes(payload);

  const lead: Record<string, unknown> = {
    first_name: first,
    last_name: last,
    email,
    company_name: company || null,
    phone: phone ? normalizePhone(phone) : null,
    notes,
    tags: ["website", preset, relationship, source ? slug(source) : ""].filter(Boolean),
    custom_fields: {
      ...(calculatorResults ?? {}),
      source_tool: source || null,
      source_page: str(payload.source_page) || null,
      preset: preset || null,
      relationship: relationship || null,
      vertical: str(payload.vertical) || null,
      sell_today: str(payload.sell_today) || null,
      customer_count: str(payload.customer_count) || null,
      platform: str(payload.platform) || null,
      needs: str(payload.needs) || null,
      pots_devices: str(payload.pots_devices) || null,
      team_size: str(payload.team_size) || null,
      sites: str(payload.sites) || null,
      lines: str(payload.lines) || null,
      submitted_at: new Date().toISOString(),
    },
  };
  if (sourceId) lead.source_id = sourceId;
  // Without an owner the CRM derives no notification for this lead: it only
  // notifies when a record's owner differs from the identity that created it,
  // and the agent key is both. Naming a human owner is what turns the bell,
  // the digest email, and the assignment on.
  if (ownerId) lead.owner_id = ownerId;

  let upstream: Response;
  try {
    upstream = await fetch(`${baseUrl}/api/v1/leads`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(lead),
    });
  } catch (err) {
    console.error("[lead] CRM unreachable:", err instanceof Error ? err.message : err);
    return json(502, { error: "Could not reach the CRM. Please try again." });
  }

  if (!upstream.ok) {
    // Log the CRM's reason for the operator; never echo it to the browser.
    const detail = await upstream.text().catch(() => "");
    console.error(`[lead] CRM rejected lead (${upstream.status}): ${detail.slice(0, 500)}`);
    return json(502, { error: "The CRM did not accept this submission. Please try again." });
  }

  // The lead is saved. Everything from here is best-effort — a mail failure
  // must never turn a captured lead into an error the visitor sees.
  const resendKey = process.env["RESEND_API_KEY"];
  if (resendKey) {
    const createdId = await upstream
      .json()
      .then((b: unknown) => str((b as { data?: { id?: unknown } })?.data?.id))
      .catch(() => "");
    const leadUrl = createdId ? `${baseUrl}/leads/${createdId}` : `${baseUrl}/leads`;
    const from = process.env["LEAD_FROM_EMAIL"] || DEFAULT_FROM;
    const notifyTo = process.env["LEAD_NOTIFY_EMAIL"] || DEFAULT_NOTIFY_TO;
    const bookingUrl = process.env["LEAD_BOOKING_URL"] || DEFAULT_BOOKING_URL;

    await Promise.all([
      sendMail(resendKey, from, email, DEFAULT_REPLY_TO, buildProspectEmail({ firstName: first, relationship, bookingUrl }), "acknowledgement"),
      sendMail(
        resendKey,
        from,
        notifyTo,
        email || DEFAULT_REPLY_TO,
        buildInternalEmail({ firstName: first, lastName: last, email, phone, company, relationship, preset, source, notes, leadUrl }),
        "internal alert",
      ),
    ]);
  }

  return json(200, { ok: true });
};
