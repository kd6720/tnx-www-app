# TrustedNetworx Site Audit & Gap Analysis

> **Date:** June 17, 2026  
> **Site:** trustednetworx.com (React 18 + TypeScript + Vite + Tailwind CSS v3, Netlify)  
> **Reference:** kyra.conversionsystem.com (AI-powered agency platform)  
> **Goal:** Expand — not replace. Add AI workforce, vertical funnels, CRM, conversion systems.

---

## 1. Current Site Audit

### 1.1 Pages & Routes (10 total)

| Route | Page | Quality | SEO | CTAs |
|-------|------|---------|-----|------|
| `/` | Home | ★★★★ | ★★★★ | "Get Started" → /contact, "Explore Solutions" → #services |
| `/about` | About | ★★★ | ★★★ | Contact only at bottom |
| `/contact` | Contact | ★★★★ | ★★★ | Embedded CRM form |
| `/pots-replacement` | POTS Replacement | ★★★★ | ★★★★ | "Get a Quote" → /contact, use-case grid (16 items) |
| `/ai-consulting` | AI Consulting | ★★★★ | ★★★★ | "Get Started", multi-card layout (5 service cards, 7 verticals, 2 case studies) |
| `/internet-connectivity` | Internet Connectivity | ★★★ | ★★★ | Single CTA |
| `/ip-pbx` | IP PBX | ★★★ | ★★★ | Single CTA |
| `/mobility-solutions` | Mobility | ★★★ | ★★★ | Single CTA |
| `/voice-solutions` | Voice | ★★★ | ★★★ | Single CTA |
| `/fleet-management` | (alias → AI Consulting) | — | — | — |

### 1.2 Strengths

- **Professional design language** — navy/gradient glass-morphism, polished hero imagery, consistent typography
- **Good service detail** — POTS Replacement page is particularly strong (16 use cases, regulation section, compliance timeline)
- **AI Consulting page** — already has vertical-specific content (Senior Living, Hospitality, etc.), service cards, case studies
- **Trust signals** — testimonials, partner logos (DataRemote, MetTel, Mix Networks, Velocity), stats bar (25+ years, 12M+ lines)
- **SEO foundation** — react-helmet-async, per-page titles and meta descriptions
- **CRM integration** — embedded lead form feeds directly into enhancedlines.com CRM
- **Developer experience** — clean TypeScript, modular components, Tailwind utility classes
- **Performance** — Vite build is fast (4.25s), output is small (82KB gzipped JS, 6.6KB gzipped CSS)

### 1.3 Weaknesses & Gaps

| Gap | Severity | Impact |
|-----|----------|--------|
| **No blog/content engine** | CRITICAL | Zero organic growth. No SEO content marketing. No industry authority building. |
| **No vertical landing pages** | CRITICAL | Senior living, hospitality, healthcare, etc. all go to generic service pages. No industry-specific conversion paths. |
| **No interactive AI tools** | HIGH | Kyra has calculators, assessments, audits. TrustedNetworx has none. Lost lead magnets. |
| **No multi-step funnels** | HIGH | Single CTA per page. No progressive qualification, no nurture sequences, no segmentation. |
| **No AI chat widget** | HIGH | Every Kyra page has 24/7 AI worker. TrustedNetworx has zero real-time engagement. |
| **Generic service pages** | MEDIUM | Internet Connectivity, IP PBX, Mobility, Voice are template pages with thin content. Low conversion potential. |
| **No partner/reseller portal** | MEDIUM | Channel partners get no self-service experience, no co-branded tools, no onboarding funnel. |
| **No CRM dashboard (public)** | MEDIUM | CRM exists but is internal-only. No client-facing portal for ticket status, project tracking. |
| **No city/geo pages** | MEDIUM | "POTS replacement Miami", "business continuity Chicago" — zero local SEO pages. |
| **No compliance hub** | LOW | NFPA 72, UL 864 mentioned on POTS page but not a dedicated compliance resource. |
| **No case study library** | LOW | Two embedded case studies on AI page only. No searchable library, no filtering by industry. |
| **Mobile CTA weak** | LOW | Single "Get a Quote" button. No click-to-call, no SMS, no chatbot on mobile. |
| **No A/B testing** | LOW | No variation on CTAs, headlines, or form placement. All traffic gets the same experience. |

---

## 2. Kyra Reference — What to Adapt

### 2.1 Kyra Features Worthy of Adaptation

| Kyra Feature | TrustedNetworx Adaptation | Priority |
|-------------|--------------------------|----------|
| **AI Worker (chat widget)** | Chat widget trained on TrustedNetworx services, vertical knowledge, compliance | P0 |
| **Industry Templates (50+)** | Vertical landing pages: Senior Living, Hospitality, Property Mgmt, etc. | P0 |
| **Growth Engine** | Blog auto-generator — AI drafts industry articles, SEO pages, city pages | P1 |
| **Built-in CRM** | Already have it (enhancedlines.com). Embed deeper — pipeline views, client portal | P1 |
| **Lead Scoring + Deal Autopilot** | Qualify leads from forms, auto-prioritize pipeline, draft follow-up suggestions | P2 |
| **Multi-Channel (SMS, WhatsApp)** | Text-to-engage CTAs, SMS follow-up sequences, WhatsApp business integration | P2 |
| **AI Calculators / Tools** | POTS ROI calculator, Copper sunset risk assessment, Failover readiness check | P2 |
| **White-Label Partner Portal** | Partner Growth Center — onboarding, commission tracking, co-branded tools | P2 |
| **A/B Testing** | Test CTA variants, headline copy, form placements | P3 |
| **One Dashboard** | Client-facing project tracker, ticket status, invoice history | P3 |

### 2.2 Kyra Features to NOT Adapt (or defer)

- **Full site generation from scratch** — TrustedNetworx already has a strong site. We're expanding, not replacing.
- **GHL deep integration** — TrustedNetworx doesn't use GoHighLevel
- **Payment collection via Stripe links** — Not needed yet. Quote → proposal flow is consultative.
- **Cannabis/Dispensary templates** — Not a target vertical

---

## 3. Gap Analysis — What to Build

### Phase 1: AI Workforce Layer (New Section)

**New page:** `/ai-workforce`
**Child pages:** `/ai-workforce/sales-agents`, `/ai-workforce/service-agents`, `/ai-workforce/lead-qualification`, etc.

**Content:**
- AI Sales Agents — outbound qualification, pipeline nurturing, proposal drafting
- AI Customer Service Agents — 24/7 chat, ticket triage, knowledge base
- AI Lead Qualification Agents — form parsing, scoring, routing
- AI Scheduling Agents — calendar integration, appointment booking, reminders
- AI Follow-Up Agents — email/SMS sequences, re-engagement campaigns
- AI Email Triage Agents — inbox management, priority routing, auto-responses
- AI Infrastructure Advisors — network health monitoring, failover detection, capacity planning

**Positioning:** "AI + Telecom Infrastructure Modernization" — not a separate SaaS product, a service layer that amplifies the existing telecom business.

### Phase 2: Vertical Landing Page Engine

**New pages** (each with unique URL, SEO-targeted, industry-specific):

1. `/industries/senior-living` — monitoring lines, emergency phones, nurse call, AI scheduling for care staff
2. `/industries/hospitality` — guest WiFi, PBX, conference connectivity, AI concierge
3. `/industries/property-management` — multi-site POTS replacement, access control, gate systems, AI leasing agents
4. `/industries/healthcare` — HIPAA-compliant voice, failover for critical systems, AI patient intake
5. `/industries/auto-dealerships` — lot connectivity, VoIP for sales floors, AI lead follow-up
6. `/industries/retail` — POS connectivity, backup internet, AI inventory alerts
7. `/industries/financial-services` — secure voice, compliance recording, AI document processing
8. `/industries/construction` — temp site connectivity, mobile VoIP, AI project management agents
9. `/industries/industrial` — M2M/IoT connectivity, SCADA modernization, AI predictive maintenance
10. `/industries/midstream-oil-gas` — remote site connectivity, pipeline monitoring, AI anomaly detection
11. `/industries/multi-location` — centralized telecom management, bulk provisioning, AI analytics
12. `/industries/msp` — white-label telecom, partner enablement, AI NOC agents
13. `/industries/telecom-agents` — commission programs, co-selling tools, AI opportunity matching
14. `/industries/white-label` — reseller programs, branded portals, AI-powered quoting

**Each vertical page includes:**
- Industry pain points (specific, data-backed where possible)
- Relevant telecom solutions mapped to pain points
- Relevant AI automation solutions
- Compliance/regulatory needs
- Embedded lead form
- AI chat widget
- CTA hierarchy (primary: "Get Consultation" / secondary: "Download Guide")
- SEO keyword targeting (industry + telecom + city combos)

### Phase 3: Conversion System Layer

**Add to existing pages:**

- **Multi-step lead form** — progressive disclosure: industry → company size → pain point → contact info. Higher conversion than single form.
- **AI chatbot widget** — floating chat bubble, site-wide. Trained on all service pages, FAQ, industry knowledge.
- **Exit-intent popup** — "Before you go — get our POTS Replacement Checklist" with email capture.
- **Sticky CTA bar** — mobile-optimized. "Get a Quote" / "Call Now" visible at all times.
- **Content upgrades** — gated PDFs on industry pages: "Senior Living Telecom Compliance Checklist," "Hospitality Connectivity Guide."

**New standalone pages:**

- `/assessment/pots-replacement-roi` — interactive calculator
- `/assessment/copper-sunset-risk` — risk assessment tool
- `/assessment/failover-readiness` — business continuity scoring
- `/assessment/ucaaS-savings` — cost comparison calculator
- `/assessment/ai-readiness` — AI maturity assessment
- `/assessment/compliance-audit` — NFPA/UL self-audit tool

### Phase 4: CRM Enhancement

Already have enhancedlines.com CRM. Enhancements:

- **Embed pipeline view** — iframe or API-driven pipeline widget on the site for logged-in users
- **Client portal** — `/portal` — ticket status, project milestones, invoice history
- **Lead notification** — real-time Slack/email when a lead comes through the website
- **Form field mapping** — ensure CRM forms capture industry, company size, pain point for segmentation

### Phase 5: SEO Expansion Engine

**New pages to build:**

- **Industry pages** — already covered in Phase 2
- **City pages** — `/locations/miami`, `/locations/chicago`, `/locations/atlanta`, etc.
- **Compliance pages** — `/compliance/nfpa-72`, `/compliance/ul-864`, `/compliance/fcc-pots`
- **Comparison pages** — `/compare/pots-replacement-vs-traditional`, `/compare/hosted-voice-vs-on-premise`
- **FAQ pages** — `/faq/pots-replacement`, `/faq/business-continuity`
- **Glossary/education** — `/learn/what-is-pots-replacement`, `/learn/copper-sunset-timeline`

**Blog categories:**
- Telecom Modernization
- AI for Business
- Industry Spotlights (per vertical)
- Compliance & Regulation
- Channel Partner Growth
- Case Studies

### Phase 6: Partner / Reseller Portal

**New section:** `/partners`

**Pages:**
- `/partners` — overview, program benefits, commission structures
- `/partners/onboarding` — application, training resources, certification
- `/partners/tools` — co-branded quote generator, AI proposal builder, collateral library
- `/partners/leads` — deal registration, pipeline tracking, commission dashboard
- `/partners/ai-tools` — AI-powered opportunity matching, competitive battle cards, territory analysis

### Phase 7: Site-Wide Enhancements

- **Better CTA placement** — above-fold CTA on every service page, sticky mobile CTA
- **Trust indicators** — case study count, customer count, uptime stats, compliance badges
- **Testimonial carousel** — rotate testimonials, add photo/logo where available
- **Animation** — scroll-triggered reveals, number counters, subtle parallax
- **Mobile optimization** — click-to-call buttons, simplified navigation, faster load

---

## 4. Execution Priority

### Immediate (This Week)
1. **AI Workforce page** — single new page establishing the AI + Telecom category
2. **AI Chat widget** — quick win, immediate conversion lift

### Short-Term (2 Weeks)
3. **Top 3 vertical pages** — Senior Living, Healthcare, Property Management (highest revenue verticals)
4. **Multi-step lead form** — replace single form on Contact + Home pages
5. **Blog foundation** — CMS setup, first 3 articles targeting high-intent keywords

### Medium-Term (1 Month)
6. Remaining vertical pages
7. Interactive AI tools (ROI calculator, risk assessment)
8. Partner portal MVP
9. Client portal embed

### Long-Term (3 Months)
10. City pages, comparison pages, FAQ hub
11. Full SEO engine with AI-assisted content generation
12. A/B testing infrastructure

---

## 5. Technical Plan

### Branch Strategy
```
main              ← production (trustednetworx.com, auto-deploy)
dev-enhancements  ← integration branch for all new work
ai-workforce      ← AI Workforce page + chat widget
vertical-pages    ← industry landing pages
conversion-system ← multi-step forms, tools, calculators
crm-enhancements  ← portal embed, pipeline views
partner-portal    ← /partners section
seo-engine        ← blog, city pages, FAQ, glossary
```

### Build Approach
- All new pages are React components in `src/pages/` — same stack, same patterns
- AI chat widget: embeddable script or React component (likely iframe from CRM, like the lead form)
- Multi-step form: React state machine, self-contained component
- Blog: could be separate (WordPress headless, Contentful) or built into the React site with MDX. **Recommended: MDX in-repo for speed, migrate to headless CMS later.**
- SEO: sitemap.xml generation (already has react-helmet-async, add sitemap plugin or Netlify build plugin)
- AI tools: client-side React components with calculation logic. No backend needed for MVP.

### File Count Estimate
- 14 vertical pages: ~28 files (page + optional sub-components)
- AI Workforce: ~12 files (main page + 8 sub-pages + shared components)
- Conversion system: ~10 files (multi-step form, chat widget, popups, CTAs)
- CRM enhancements: ~5 files (embed components)
- Partner portal: ~12 files
- SEO engine: ~30 files (blog posts, city pages, FAQ)
- **Total estimate: ~100 new/modified files, 15,000+ lines of code**

---

*Generated by Blaze (Hermes Agent) for Carter Dewey, June 17, 2026*
