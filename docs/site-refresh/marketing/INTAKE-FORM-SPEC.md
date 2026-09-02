# Intake Form Specification — TrustedNetworx.com

**Status:** Draft for build · 2026-09-02
**Owner:** Carter Dewey · **Build:** Hermes
**Replaces:** the current single 4-step "Ready to Get Started?" MultiStepForm used on every page

## Principles

1. One form component, many configurations. Every landing page gets a preset, not a fork.
2. Relationship first. Who you are decides which TNX CRM pipeline you land in and who calls you back.
3. Never more than four visible steps. Progress indicator stays.
4. Every submission carries `source_page`, `preset`, `relationship`, `vertical`, `needs[]`, and UTM fields as hidden values.
5. Routing is data-driven (a lookup table), not hard-coded in JSX.
6. Submissions go to **TNX CRM** (tnxcrm.com). The live form today already POSTs to the CRM's public form endpoint (`https://enhancedlines.com/api/public/forms/<form-id>/submit`); keep that path, but create one CRM form-id per preset so pipeline/label assignment happens on the CRM side and the site only sends fields.

## Step 1 — Relationship (all presets)

Prompt: **"How do you work with us?"**

| Tile | Value | Routes to |
|---|---|---|
| I'm an MSP | `msp` | Channel pipeline · label `MSP` |
| I'm a reseller or agent | `reseller` | Channel pipeline · label `Reseller/Agent` |
| I'm buying for my own organization | `direct` | Direct pipeline |
| I'm interested in TNX Partner Hub or TNX CRM | `platform` | Platforms pipeline (shown on homepage and platform pages only) |

## Step 2 — Depends on relationship

**Direct → Vertical.** Prompt: "What kind of organization?"
Senior Living · Hospitality · Healthcare · Property Management / Multi-family · Retail & Multi-site · Education · Government / Municipal · Auto Dealership · Construction / Jobsites · Fire, Alarm & Security Integrator · Other (free text)

Verticals are a config array — adding one is a one-line change plus a TNX CRM label.

**MSP / Reseller → Profile.** Two questions on one screen:
- "What do you sell today?" (multi-select): Managed IT · Voice / UCaaS · Connectivity · Security / Alarm · Not selling telecom yet
- "Roughly how many customers or sites?" (select): <25 · 25–100 · 100–500 · 500+

**Platform → Product.** "Which platform?" Partner Hub (AI Agent Management) · TNX CRM · Both. Then "Team size" (select).

## Step 3 — Need (multi-select, hidden when the preset pre-sets it)

AI agents / automation · POTS replacement · Voice / IP PBX · Internet connectivity · Mobility · Business continuity / failover · "Not sure — audit me"

## Step 4 — Contact and qualification

Name · Company · Work email · Phone · Number of sites (select) · Number of lines (POTS preset only) · Timeframe (Now / 1–3 months / 3–6 months / Researching) · Anything else? (textarea)
Promise line under the button: "You'll hear from Carter's team within one business day."
Button text is per preset (see below).

## Presets

| Preset | Page(s) | Step 1 | Step 2 | Step 3 | Extras | Button |
|---|---|---|---|---|---|---|
| `home` | / | all four tiles | per relationship | shown | — | Get my recommendation |
| `pots` | /pots-replacement, /tools/pots-* | msp / reseller / direct | per relationship | hidden (preset POTS) | lines count; checkboxes: fire alarm · elevator · emergency phone · fax/modem · gate/entry | Get a line audit |
| `ai` | /ai-workforce, /ai-consulting, /tools/ai-* | msp / reseller / direct | per relationship | hidden (preset AI) | "Which workflows?" multi: inbound quoting · scheduling · lead qualification · customer support · email triage · monitoring/alerts | Book an AI readiness review |
| `voice` | /voice-solutions | msp / reseller / direct | per relationship | hidden (preset Voice) | seats count; current system | Get a voice quote |
| `connectivity` | /internet-connectivity, /mobility-solutions | msp / reseller / direct | per relationship | hidden | sites count; primary/backup | Check availability |
| `partner-hub` | /platforms/partner-hub | hidden (preset platform) | team size; "How many agents do you run or plan to run?" | hidden | — | Request a demo |
| `crm` | /platforms/crm | hidden (preset platform) | team size; current CRM | hidden | — | Start a trial |
| `partners` | /partners (new page) | msp / reseller only | profile | shown | "White-label interest?" yes/no | Book a partner call |
| `contact` | /contact | all four | per relationship | shown | — | Send |

## TNX CRM routing table (one CRM form-id per preset)

```
relationship  preset        pipeline    stage        labels
msp           *             Channel     New Partner  MSP, <preset>
reseller      *             Channel     New Partner  Reseller/Agent, <preset>
direct        pots|voice|…  Direct      New Lead     <vertical>, <preset>
direct        ai            Direct-AI   New Lead     <vertical>, AI
platform      partner-hub   Platforms   Demo Req     Partner Hub
platform      crm           Platforms   Trial Req    TNX CRM
```

## UX requirements

- Tiles are buttons with visible focus states; keyboard navigable; step change announces via `aria-live`.
- Back button on every step; state persists if the user navigates away and returns (sessionStorage).
- Email validation on blur; phone optional for `platform`, required for `direct` and channel.
- Thank-you state is per preset: direct → "We'll call within one business day" + link to the relevant tool; channel → link to book a partner call; platform → link to log in or a demo scheduler.
- Fire a `form_submit` analytics event with `preset` and `relationship`.

## Acceptance

- [ ] All nine presets render from config with no duplicated JSX
- [ ] Submissions land in the correct TNX CRM pipeline with labels per the table (verified in tnxcrm.com, not just a 200 from the endpoint)
- [ ] Adding a vertical requires editing one array only
- [ ] Lighthouse accessibility ≥ 95 on a page containing the form
- [ ] Homepage no longer shows the duplicate blue "Ready to get started?" banner
