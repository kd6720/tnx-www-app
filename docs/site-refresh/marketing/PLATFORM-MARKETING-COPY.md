# Platform Marketing Copy — TNX Partner Hub and TNX CRM

Ready-to-place copy for trustednetworx.com. Assumptions are marked; Carter to confirm pricing posture and any feature claims before publish.

---

## A. Homepage section (directly under the hero)

**Eyebrow:** OUR PLATFORMS
**Heading:** Two platforms. One operator behind them.
**Sub:** We don't just consult on AI and telecom — we run our own business on these tools and license them to partners who want the same leverage.

### Card 1 — TNX Partner Hub
**Tag:** AI Agent Management
**Headline:** Run a fleet of AI agents without losing control of them.
**Body:** Partner Hub is the command center for AI agents that sell, support, and monitor. Spin up agents from proven blueprints, give each one a budget and an approval boundary, see every action they take, and shut one down in a click. Built for MSPs and channel partners who want to offer AI to their customers without building the plumbing.
**Bullets:**
- Agent blueprints for sales outreach, inbound quoting, support, and monitoring
- Per-agent budgets with hard stops — no runaway token bills
- Multi-tenant: one hub, separate workspaces per client
- Human-in-the-loop approvals for anything that goes outside
**CTA:** Explore Partner Hub → · Log in

### Card 2 — TNX CRM
**Tag:** CRM / Opportunity Management
**Headline:** A pipeline built for how telecom and MSP deals actually close.
**Body:** TNX CRM tracks leads, opportunities, quotes, and renewals across direct, agent, and reseller channels — with the site counts, line counts, and install dates a telecom deal needs and a generic CRM makes you bolt on. Your AI agents write to it directly.
**Bullets:**
- Direct, agent, and reseller pipelines in one view
- Telecom-native fields: sites, lines, term, install date, MRC/NRC
- AI agents log calls, qualify leads, and update stages automatically
- Simple, flat pricing — no per-feature upsells
**CTA:** Explore TNX CRM → · Log in

---

## B. Page: /platforms/partner-hub

**Title tag:** TNX Partner Hub — AI Agent Management Platform for MSPs & Channel Partners
**Meta description:** Deploy, budget, monitor, and govern AI agents for sales, support, and operations from one multi-tenant hub. Built by an operator, for MSPs and resellers.

**H1:** AI agents you can actually manage.
**Sub:** Most AI tools give you a chatbot. Partner Hub gives you a workforce — with a manager.

**Section: What it does**
- **Deploy from blueprints.** Start from tested agent designs (outreach, inbound quoting, support triage, monitoring) and customize per client. Every agent inherits improvements to its core blueprint.
- **Control spend.** Set a monthly budget per agent and per client. Hard stop, not a warning.
- **See everything.** Every action, message, and decision is logged with who approved it. Audit-ready.
- **Keep humans in the loop.** Define what an agent may do alone and what needs a click from a person.
- **Multi-tenant by design.** One hub, isolated client workspaces, role-based access.

**Section: Who it's for**
- MSPs adding an AI practice without hiring ML engineers
- Telecom agents and resellers who want a white-label AI offer
- Multi-site operators running their own agents for scheduling, quoting, and support

**Section: How it fits with TNX CRM**
Agents in Partner Hub read and write to TNX CRM natively — leads qualified, calls logged, stages moved. One login, one data model.

**Section: Pricing posture** *(assumption — Carter to confirm; ship as "Talk to us" until confirmed)*
Flat monthly per client workspace. Small deployments from ~$200/mo including hosting and model usage; multi-tenant and white-label plans quoted.

**FAQ (FAQPage schema)**
- *Which AI models does it use?* Model-agnostic; default is a cost-optimized provider with the option to bring your own keys.
- *Do I need developers?* No for blueprint agents. Yes for custom integrations, which we can build.
- *Where does it run?* Dedicated VPS per client or shared multi-tenant, your choice.
- *Is my client data isolated?* Yes — tenant isolation is enforced at the database layer, not just the UI.

**CTA block:** Request a demo (form preset `partner-hub`) · Log in at tnxpartnerhub.com

---

## C. Page: /platforms/crm

**Title tag:** TNX CRM — Opportunity Management for Telecom, MSP & Channel Sales
**Meta description:** Track direct, agent, and reseller deals with telecom-native fields and AI agents that keep the pipeline current. Simple, flat pricing.

**H1:** The CRM that speaks telecom.
**Sub:** Sites, lines, terms, install dates, MRC — first-class fields, not custom hacks.

**Section: What it does**
- **Three channels, one pipeline view.** Direct customers, agents, and resellers each get the right stages and commission fields.
- **Telecom-native records.** Site counts, line inventories, contract terms, install and cutover dates, MRC/NRC on every opportunity.
- **Quotes and renewals.** Build a quote from an opportunity; get renewal alerts before the term ends.
- **AI-maintained.** Agents from Partner Hub log calls, enrich contacts, qualify leads, and move stages so reps don't.
- **Reporting that matters.** Pipeline by channel, by vertical, by product; forecast by close date.

**Section: Who it's for**
- Telecom agents and MSPs tired of bending HubSpot or Pipedrive into shape
- Reseller programs that need partner-level visibility without exposing other partners' deals
- Small sales teams that want automation without an admin

**Section: Pricing posture** *(assumption — Carter to confirm; ship as "Talk to us" until confirmed)*
Flat monthly per workspace, unlimited users up to a cap. No per-seat surprises.

**FAQ**
- *Can I import from Pipedrive / HubSpot?* Yes — CSV import with field mapping.
- *Does it replace Partner Hub?* No. Partner Hub manages agents; TNX CRM manages deals. They share data.
- *Can partners see each other's deals?* No. Partner visibility is scoped to their own book.

**CTA block:** Start a trial (form preset `crm`) · Log in at tnxcrm.com

---

## D. Landing screens for the product domains (replace bare /login redirect)

**tnxpartnerhub.com**
- Title: TNX Partner Hub — AI Agent Management
- One line: Deploy, budget, and govern AI agents from one hub.
- Buttons: Log in · Learn more (→ trustednetworx.com/platforms/partner-hub)
- Schema: `SoftwareApplication` (applicationCategory: BusinessApplication, offers: see pricing posture)

**tnxcrm.com**
- Title: TNX CRM — Opportunity Management for Telecom & Channel Sales
- One line: The CRM that speaks telecom.
- Buttons: Log in · Learn more (→ trustednetworx.com/platforms/crm)
- Schema: `SoftwareApplication`

---

## E. Nav and footer labels

- Nav: **Platforms** → TNX Partner Hub · TNX CRM
- Footer column "Platforms": TNX Partner Hub · TNX CRM · Log in
- Header text link: "Log in" (dropdown: Partner Hub / CRM)
