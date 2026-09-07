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
 * Environment (set in Netlify → Site configuration → Environment variables):
 *   TNX_CRM_API_KEY         required — an Agent Key from tnxcrm.com →
 *                           Administration → Agent Keys, scoped to write Leads.
 *   TNX_CRM_BASE_URL        optional — defaults to https://tnxcrm.com
 *   TNX_CRM_LEAD_SOURCE_ID  optional — uuid of the "Website" lead source so
 *                           form leads report alongside every other channel.
 *   TNX_CRM_LEAD_OWNER_ID   optional — uuid of the profile that should own
 *                           website leads. Leave it unset and leads are owned
 *                           by the agent identity itself, which means the CRM
 *                           derives no notification for them: it only notifies
 *                           when a record's owner differs from its creator.
 *
 * Netlify Functions v2: web-standard Request in, Response out. No imports.
 */

const MAX_BODY_BYTES = 16_384;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

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

  const lead: Record<string, unknown> = {
    first_name: first,
    last_name: last,
    email,
    company_name: company || null,
    phone: phone ? normalizePhone(phone) : null,
    notes: buildNotes(payload),
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
  // Naming a human owner is what turns on the CRM's notification for this
  // lead. deriveNotifications() only emits when a record's owner differs from
  // the identity that created it, and the agent key was both — so every
  // website lead landed silently. The acknowledgement email to the visitor is
  // sent by the CRM, not from here.
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

  return json(200, { ok: true });
};
