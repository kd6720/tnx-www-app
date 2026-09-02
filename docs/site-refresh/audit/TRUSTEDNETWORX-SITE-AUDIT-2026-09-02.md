# TrustedNetworx.com — Site Audit and Ten Recommendations

**Date:** 2026-09-02
**Scope:** SEO, visual effects, navigation, UI/UX, and product marketing for TNX Partner Hub and TNX CRM
**Direction from Carter:** reposition the site to lead with AI Solutions
**Method:** live crawl of trustednetworx.com (HTML, sitemap, headers, asset weights, 90 sitemap URLs), desktop walkthrough in Chrome, review of subpage titles/meta/schema/canonicals

---

## Executive summary

The site is technically better than most operator-run telecom sites: clean React/Vite build on Netlify + Cloudflare, HSTS and CSP headers, one H1 per page, unique titles and descriptions on every page checked, zero images missing alt text, a working sitemap with 90 URLs, and a real content library (~70 blog posts). The bones are good.

The problems are strategic and a handful of concrete defects:

1. **The site still tells a copper story, not an AI story.** The hero, the stats bar, the trust badges, and the quote form are all POTS-first. AI Workforce and AI Consulting are two of six equal cards. If the business is going AI-first, the homepage has to say so in the first screen.
2. **Two of the company's own products are invisible.** TNX Partner Hub and TNX CRM appear nowhere on the site — no nav entry, no page, no footer link, no mention. Both domains resolve straight to a login screen with no marketing surface at all.
3. **Real defects that hurt SEO and UX:** soft-404s (every unknown URL returns 200 with the homepage), ~44 near-duplicate blog URL pairs competing with each other, a Solutions mega-menu that sticks open through scrolling and causes header layout shift, anonymous testimonials, a partner logo strip shipped as a single PNG, and a 715 KB social share image.

Priority order below is by impact against effort. Items 1–4 are the AI repositioning and product marketing; 5–10 are technical and UX fixes that can ship independently and mostly in one sprint.

---

## Ten recommendations

### 1. Rebuild the hero and first screen around AI Solutions (Positioning · High impact)

**What's there now:** H1 "Replace failing copper. Cut line costs in half. Stay compliant." Sub-copy and both CTAs are POTS-only. Trust badges are NFPA 72 / UL 864 / E911 / 24/7 lines. Stats bar: 25+ years, 12M+ lines, 50% cost reduction, 24/7.

**Why it matters:** Visitors decide what you are in under five seconds. Today the answer is "POTS replacement vendor." The AI business gets no share of that first impression, and the AI pages get no authority flow from the homepage.

**Recommendation:**
- New H1 direction: **"AI agents and modern telecom for multi-site operators."** Sub-copy: "TrustedNetworx builds and runs AI agents that sell, support, and monitor — on top of the voice, connectivity, and POTS replacement infrastructure we already manage for senior living, hospitality, healthcare, and property management."
- Primary CTA: **"Book an AI Readiness Review"** (routes to the existing /tools/ai-readiness, then to the quote form). Secondary CTA: "See the platforms" (anchor to the new product section, item 2).
- Swap the stats bar to a mixed set: one AI outcome metric (e.g., "24/7 AI-handled inbound"), one deployment metric (agents live / sites managed), keep "25+ years" and "50% line-cost reduction" as the telecom credibility anchors.
- Keep the compliance badges but move them down to the POTS section where they belong. The hero should carry AI trust signals instead (e.g., "Human-in-the-loop approvals", "Built on your data, tenant-isolated", "No token surprises — flat monthly").
- Keep the hero video, but it should show a dashboard/agent workflow, not a skyline. (Carter is supplying new hero assets later this week — build the slot, don't source imagery.)

### 2. Add a "Platforms" section and two product pages for TNX Partner Hub and TNX CRM (Product marketing · High impact)

**What's there now:** Nothing. Neither product is mentioned. tnxpartnerhub.com and tnxcrm.com redirect to /login with no marketing content, no meta description, no way for a search engine or a prospect to learn what they are.

**Recommendation:**
- Homepage: new section directly under the hero titled **"Two platforms. One operator."** with two large cards (copy in `marketing/PLATFORM-MARKETING-COPY.md`).
- Two new pages on the main domain: `/platforms/partner-hub` and `/platforms/crm`. Each gets: hero, three-to-four capability blocks, "who it's for", a screenshot carousel, pricing posture (from $X/mo, or "talk to us"), FAQ with FAQPage schema, and a login link to the product domain. Put the marketing on trustednetworx.com — it has the domain authority; the product domains have none.
- On tnxpartnerhub.com and tnxcrm.com: replace the bare /login redirect with a one-screen landing (headline, three bullets, "Log in" and "Learn more → trustednetworx.com/platforms/…"). Add title, meta description, OG tags, and `SoftwareApplication` schema. Right now those domains are dead weight in search.
- Footer: add a "Platforms" column (Partner Hub, TNX CRM, Log in).
- Nav: see item 3.

### 3. Restructure primary navigation for the AI-first story (Navigation · High impact)

**What's there now:** Home · Solutions (6-item mega-menu) · Blog · Tools · About · Contact · Get a Quote. AI items are buried inside Solutions alongside Mobility.

**Recommendation — new top-level structure:**

| Nav item | Contents |
|---|---|
| **AI Solutions** | AI Workforce (agents), AI Consulting, AI Readiness tool, AI ROI calculator |
| **Platforms** | TNX Partner Hub, TNX CRM |
| **Telecom** | POTS Replacement, Voice & IP PBX, Internet Connectivity, Mobility |
| **Resources** | Blog, Tools, case studies |
| **Company** | About, Team, Contact |
| **CTA** | Book a Review (primary), Log in (text link to platforms) |

Also: the footer "Solutions" column lists "IP PBX" and "Voice Solutions" as separate links pointing to the same page. Collapse to one.

### 4. Fix the Solutions mega-menu behavior and header layout shift (UI/UX defect · Medium effort)

**Observed:** Hovering "Solutions" opens the mega-menu; it does **not close on mouse-leave or on scroll**. It stayed open across the entire page during the walkthrough, covering section headings ("Managed Services", "Why Choose Us?", "Ready to Get Started?"). When the menu opens, the header reflows: nav text shifts left so "Home" collides with the logo wordmark ("TrustedNetworxHome") and the "Get a Quote" button wraps to two lines.

**Fix:** Close on `mouseleave` with a short delay, close on scroll and on `Escape`, and give the dropdown container a fixed width so it doesn't change the flex layout of the header. Give the CTA `whitespace-nowrap`. Test at 1280, 1440, 1568, and 1920 widths — the reflow reproduced at 1568.

### 5. Return real 404s instead of soft-404s (Technical SEO · Low effort)

**Observed:** `/nonexistent-page-xyz` returns HTTP 200 with the full homepage (same title, H1, and description). Google treats this as soft-404 and it dilutes crawl budget and can cause the homepage to be flagged as duplicate.

**Fix:** Netlify `_redirects` / `netlify.toml` rule so unknown routes serve a real 404 page with status 404 (SPA fallback with `200` should only apply to known routes, or use a pre-rendered 404.html plus a route-level NotFound component that sets `<meta name="robots" content="noindex">`). Design the 404 page with search and the three most-visited links.

### 6. Consolidate the duplicate blog URL pairs (Technical SEO · Medium effort, high value)

**Observed:** The sitemap contains roughly 44 pairs of posts covering the same topic under two slugs, e.g.:
- `/blog/nfpa-72-compliance-fire-alarm-communications-practical-guide` and `/blog/nfpa-72-fire-alarm-testing-supervision-2026`
- `/blog/why-pots-replacement-matters-now` and `/blog/pots-replacement-roi-real-cost-of-waiting`
- `/blog/copper-sunset-timeline` and `/blog/elevator-phone-copper-sunset-2026`
- `/blog/sd-wan-explained-for-business-leaders` and `/blog/sd-wan-roi-business-case-2026`

Each self-canonicalizes, so they compete against each other for the same query. That halves the ranking power of the best content on the site.

**Fix:** For each pair, pick the winner (usually the 2026 version), 301 the loser to it, merge any unique content, and remove the loser from the sitemap. Add `BlogPosting` schema (author, datePublished, dateModified) and `BreadcrumbList` to every post — none was detected in the pages checked.

### 7. Ship real social proof: named testimonials, logos as HTML, and case studies (Credibility · Medium effort)

**Observed:** Three testimonials are attributed to "Operations Director, Multi-Site Property Group" etc. — no names, no companies, no photos. The partner strip (AT&T, MetTel, Verizon, T-Mobile, Velocity, DataRemote, MIX Networks) is a single PNG named `Partners-Banner-Mobile.png` served at every breakpoint — invisible to search engines and screen readers, and it scales poorly on wide screens.

**Fix:**
- Get two or three named, permissioned quotes. If customers won't be named, use company-type + city + a measurable result ("moved 212 lines across 14 properties, zero downtime, $61K/yr savings") — specificity substitutes for names.
- Rebuild the partner strip as individual SVG/PNG logos in a flex row with alt text; add a "Partners & carriers we work with" heading.
- Add two case-study pages (one AI, one POTS) and link them from the hero and the AI Solutions page. AI needs proof more than telecom does.

### 8. Cut page weight and tighten Core Web Vitals (Performance · Low-medium effort)

**Measured:**
- `og:image` (TrustedNetworx-Hero-Image.jpg): **715 KB JPEG**. Social scrapers and LinkedIn previews load this every share.
- Hero video `hero-home.mp4`: **1.4 MB**, autoplays on every homepage visit.
- Main bundle `index-*.js`: 219 KB; CSS 58 KB; Google Fonts loaded from third-party origin (Inter, 6 weights).
- `cache-control: max-age=0, must-revalidate` on HTML is fine; confirm hashed assets get `immutable` long-cache (Netlify does by default — verify).

**Fix:** Re-export the OG image at 1200×630, ≤150 KB WebP/JPEG. Serve the hero video as WebM + MP4 at ≤600 KB, `preload="none"` with the poster, and skip autoplay on `prefers-reduced-motion` and on mobile data. Self-host Inter (two or three weights, `font-display: swap`) to remove two third-party DNS lookups and the CSP exception. Target LCP < 2.0 s on mobile.

### 9. Replace the intake form: segment by relationship, then by vertical, with a form per landing page (UX / Conversion · Medium effort, high value)

**Observed:** One generic 4-step quote form is used everywhere. Step 1 asks industry (Senior Living, Hospitality, Property Management, Healthcare, Retail & Multi-Site, Other). It never asks *who* the submitter is — an MSP, a reseller/agent, or a direct end customer — so a channel partner and a facility manager land in the same TNX CRM bucket and get the same follow-up. The homepage also stacks the form ("Ready to Get Started?") directly on top of a second full-width "Ready to get started?" banner — two identical asks in a row.

**Carter's direction:** the current form is not liked; it must offer MSP / Reseller / Direct paths, forms should differ per landing page, and the vertical list is open to expansion.

**Fix — one form engine, multiple configurations:**
- **Step 1 — Relationship:** "How do you work with us?" → **I'm an MSP** · **I'm a reseller / agent** · **I'm buying for my own organization** · (on platform pages) **I want Partner Hub / TNX CRM**. This is the routing key: MSP and reseller submissions go to the Channel pipeline in TNX CRM (the form already posts to the CRM's public form endpoint) with a partner-recruitment sequence; direct goes to the Direct pipeline; platform interest goes to a Platforms pipeline.
- **Step 2 — Vertical (direct only):** expand the tile set to Senior Living · Hospitality · Healthcare · Property Management / Multi-family · Retail & Multi-site · Education · Government / Municipal · Auto dealerships · Construction / Jobsites · Fire, alarm & security integrators · Other. (Every one of these already has blog content on the site — the form should match the content.) For MSP/reseller, Step 2 becomes "What do you sell today?" (managed IT, voice/UCaaS, connectivity, security/alarm, none yet) and "How many customers/sites?"
- **Step 3 — Need:** AI agents · POTS replacement · Voice / IP PBX · Connectivity · Mobility · Platforms · "Not sure — audit me". Multi-select.
- **Step 4 — Contact + qualification:** name, company, email, phone, sites/lines count, timeframe, and a free-text box. Show a one-line promise ("You'll hear from Carter's team within one business day").
- **Per-landing-page presets** (same component, different config): homepage = full four steps; `/pots-replacement` = skips Need (pre-set POTS), keeps relationship + vertical, adds "number of lines" and "fire alarm / elevator / emergency phone?" checkboxes; `/ai-workforce` = pre-set AI, adds "which workflows?" (inbound quoting, scheduling, lead qualification, support, email triage); `/platforms/partner-hub` and `/platforms/crm` = relationship + team size + "request demo / start trial"; a new `/partners` page = MSP/reseller-only form with "book a partner call". Each preset writes a `source_page` and `relationship` hidden field so attribution is clean.
- Delete the duplicate blue banner on the homepage (keep it on interior pages). Add a mid-page CTA after the platforms section so users don't scroll six screens to convert.
- Full field-level spec: `marketing/INTAKE-FORM-SPEC.md`.

### 10. Extend structured data and on-page SEO for the AI and platform pages (SEO · Low effort)

**Observed:** Site-wide schema is `Organization` + `WebSite` only. No `Service`, `Product`/`SoftwareApplication`, `FAQPage`, `BreadcrumbList`, or `LocalBusiness` (there is a physical Miami address in the footer). Titles are decent but generic on AI pages ("AI Workforce — AI Agents for Telecom").

**Fix:**
- Add `Service` schema to each solution page, `SoftwareApplication` to the two platform pages, `FAQPage` where FAQs exist, `BreadcrumbList` site-wide, and `LocalBusiness` (address, phone, hours, areaServed) on Contact.
- Retitle AI pages against real queries: "AI Agents for Telecom & Multi-Site Operators | TrustedNetworx", "AI Consulting for Senior Living, Hospitality & Property Management".
- Add an "AI" topic hub at `/ai` that links every AI post, both AI tools, and the Partner Hub page — internal linking is how the AI pages inherit the authority the POTS content already earned.

---

## What is already good (don't break it)

- Unique `<title>` and meta description on every page checked; one H1 per page; canonical tags present.
- robots.txt allows all and points at a valid 90-URL sitemap.
- Security headers: HSTS with preload, CSP, X-Frame-Options, referrer policy.
- All images have alt text; skip-to-content link present.
- Interactive tools (POTS ROI, copper sunset risk, failover readiness, AI ROI, AI readiness) are a real differentiator — keep them and promote them harder.
- The multi-step quote form posts straight into TNX CRM via its public form endpoint — that plumbing works and should be kept; only the steps and routing change.
- "Run by an operator, not a call center" section with Carter's bio is the strongest trust block on the site — keep it near the top.

---

## Suggested sequencing

| Sprint | Items | Notes |
|---|---|---|
| 1 (this week) | 4, 5, 8, 9 | Pure fixes, no copy decisions, can ship in one PR |
| 2 | 1, 2, 3 | AI-first hero, platforms section + two pages, nav restructure. Needs the copy in `marketing/` approved |
| 3 | 6, 7, 10 | Blog consolidation (44 redirects), social proof, schema. Needs customer permissions for quotes |

## Verification checklist for Hermes

- [ ] `curl -sI https://trustednetworx.com/does-not-exist` returns `404`
- [ ] Solutions menu closes on mouseleave/scroll/Escape; no header reflow at 1280–1920
- [ ] OG image ≤150 KB; hero video ≤600 KB with WebM source
- [ ] Nav shows AI Solutions · Platforms · Telecom · Resources · Company
- [ ] `/platforms/partner-hub` and `/platforms/crm` return 200 with unique title/description and `SoftwareApplication` JSON-LD
- [ ] Sitemap no longer contains the loser slug of each duplicate pair; each loser 301s to the winner
- [ ] Lighthouse mobile: Performance ≥ 85, SEO ≥ 95, Accessibility ≥ 95
