# Brief: trustednetworx.com AI-first refresh — v1

fingerprint: tnx-site-refresh-v1
from: Claude (Cowork control room, session 2026-09-02)
to: Hermes
authorized by: Carter Dewey, 2026-09-02 (Telegram)
status: READY TO CLAIM
location: kd6720/trustednetworx (site source repo), branch docs/site-refresh-v1, folder docs/site-refresh/ — mirrored from kd6720/trustednetworx-site-refresh (private; Hermes's token cannot see it yet)

## Objective

Reposition trustednetworx.com to lead with AI Solutions, add marketing for TNX Partner Hub and TNX CRM, fix the technical/UX defects found in the audit, and replace the intake form with a multi-preset form that segments MSP / reseller / direct and routes into TNX CRM.

## Inputs (read these first)

- `docs/site-refresh/audit/TRUSTEDNETWORX-SITE-AUDIT-2026-09-02.md` — the ten recommendations and verification checklist
- `docs/site-refresh/marketing/PLATFORM-MARKETING-COPY.md` — copy for the platform section, two product pages, product-domain landing screens
- `docs/site-refresh/marketing/INTAKE-FORM-SPEC.md` — form presets, steps, TNX CRM routing table

## Scope by sprint

**Sprint 1 — fixes (no copy decisions, one PR):**
audit items 4 (mega-menu close + header reflow), 5 (real 404), 8 (OG image, hero video, self-hosted Inter), 9-partial (remove duplicate blue CTA banner on homepage).

**Sprint 2 — AI-first repositioning + platforms + form:**
audit items 1 (hero), 2 (platforms section + `/platforms/partner-hub` + `/platforms/crm`), 3 (nav restructure), 9 (new intake form per spec, all presets, `/partners` page).

**Sprint 3 — SEO depth + proof:**
audit items 6 (blog duplicate consolidation with 301 map), 7 (partner logos as HTML, testimonial slots, two case-study page templates), 10 (schema: Service, SoftwareApplication, FAQPage, BreadcrumbList, LocalBusiness; `/ai` hub page).

## Constraints

- Site source is `kd6720/trustednetworx` (Vite/React, Netlify deploys `main`). Work in feature branches `feat/site-refresh-s1`, `-s2`, `-s3`; open PRs against `main` but DO NOT merge — merge to main is a production deploy and is Carter's gate. Claude reviews.
- Hero imagery/video: do not source or generate new hero assets — Carter is supplying new hero images later this week (Higgsfield credits arrive Sept 4). Build the hero with the current poster/video as a placeholder slot and a clearly named asset path so a swap is a one-file change.
- Do not change TNX CRM pipelines, form-ids, or labels yourself — produce the exact list of form-ids/pipelines/labels needed and return it in the outbox; Carter or Claude will create them in tnxcrm.com and hand the ids back.
- Do not publish pricing figures on the platform pages until Carter confirms the pricing posture marked *(assumption)* in the copy file. Ship those blocks behind a feature flag or with "Talk to us" copy.
- No Netlify/DNS/production changes without explicit approval.
- Follow the standing operating model: implementer does not close its own work; a separate reviewer context verifies each sprint against the audit checklist and returns raw evidence (curl output, Lighthouse JSON, screenshots).

## Evidence to return per sprint

1. PR link(s), branch, and commit SHAs
2. Checklist items from the audit with pass/fail and the raw command output that proves it
3. Lighthouse mobile scores (Performance, SEO, Accessibility) before and after
4. Screenshots at 1280 / 1568 / 1920 and one mobile width of: hero, nav open, platforms section, form step 1 on `home`, `pots`, `ai`, `partner-hub` presets
5. List of anything NOT done and why

## Questions Hermes may decide alone

Component naming, file layout, CSS approach within the existing Tailwind setup, test framework, redirect file format, image formats, animation library choice. Present the choice in the outbox; don't wait.

## Questions that need Carter

Pricing posture for both platforms; permission to name testimonial customers; final vertical list additions beyond the spec; whether `/partners` should replace or sit alongside the existing About/Team pages.
