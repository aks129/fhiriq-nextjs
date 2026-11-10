# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this site actually is

**fhiriq.com is a personal authority site for Eugene Vestel** — healthcare interoperability consultant, host of the *Out of the FHIR* podcast, and builder of open-source FHIR tooling. The homepage h1 is "Free implementation reference for AI agents on FHIR and digital quality measures"; the primary CTAs are the agent guide and the reference, with newsletter and podcast below.

Do not "correct" this toward product-startup positioning. Earlier revisions of this file described a product-centric site built around an "Open Quality AI Layer" and a Design Partner program. That is not what ships. Consulting, the podcast, the newsletter, and the open-source projects are the content.

Related consequence: **`/cql-to-sql` is not a page.** It is a four-line component returning `null` behind a permanent redirect to `/` (`next.config.ts`). Do not treat it as a landing page or a priority route.

**Tech stack:** Next.js 15.5.4 (App Router, Turbopack), React 19.1.0, TypeScript 5 (strict), Tailwind CSS 4, MongoDB + Mongoose, Anthropic Claude API.

## Commands

```bash
npm run dev              # dev server on :3000 (Turbopack)
npm run build            # production build (Turbopack)
npm start                # serve the production build
npm run lint             # ESLint
npm run typecheck        # tsc --noEmit
npm run check:claims     # banned-claims scan; also runs as prebuild, so a hit fails the Vercel build
```

**There is no test runner.** `seed.spec.ts` at the repo root imports `@playwright/test`, which is not installed, so `npx tsc --noEmit` always reports two errors from that file. Those two are the expected baseline — anything else is yours. `npm run lint` likewise has ~45 pre-existing warnings across untouched routes; the bar is **zero errors and zero new warnings in files you touched**, not a clean global run.

For UI work, verify against real pixels with the Playwright MCP tools (`mcp__plugin_playwright_playwright__*`). They are wired up and are this repo's de-facto QA loop. Note that running `npm run build` while `npm run dev` is live clobbers `.next` and 500s the dev server; restart dev afterwards.

## Design system — MONO

Adapted from [agencidev.com](https://www.agencidev.com). A monochrome dark system: near-black ground, **no accent colour at all**, hierarchy built only from tone and weight, one hairline, 6px/8px/pill radii, and a raised "chip" as the only container shape.

**Dark is a deliberate commitment, not a default.** There is no light theme. Do not add one — a monochrome system that flips ground is two systems.

**Type — one sans, one mono, and a serif with a single job** (`next/font` in `src/app/layout.tsx`):

| Var | Face | Job |
| --- | ---- | --- |
| `--ff-body` | Schibsted Grotesk | Everything, headings included. Free stand-in for the reference's licensed Sana Sans Variable |
| `--ff-mono` | Geist Mono | Clock, micro-labels, code, tabular data |
| `--ff-serif` | Instrument Serif | **The credential wall only.** The reference sets each client name in a different face; that row is the only place the serif appears |

**Colour — monochrome.** There is no accent token, so emphasis is carried by tone, weight and italic. All values verified against WCAG AA:

| Token | Value | Use | Contrast on `--bg` |
| ----- | ----- | --- | ------------------ |
| `--bg` / `--bg-2` / `--bg-3` | `#0A0A0A` / `#131313` / `#1B1B1B` | ground, raised, inset | — |
| `--fg` | `#EDEDED` | body text | 16.91:1 |
| `--fg-2` | `#A8A8A8` | secondary | 8.33:1 |
| `--fg-3` | `#8A8A8A` | captions, labels | 5.73:1 |
| `--line` / `--line-2` / `--line-3` | `#242424` / `#333333` / `#5E5E5E` | decorative, emphasised, **interactive** | `--line-3` is 3.05:1 |

Three values are deliberately adapted from the reference and should not be "corrected" back: ground is `#0A0A0A` not pure `#000`, text is `#EDEDED` not pure `#fff` (16.9:1 rather than 21:1 — pure white on pure black halates over long-form copy), and body is 16px not 14px. The reference gets away with its values because its first screen carries six links and one sentence.

**Compatibility layer.** Legacy Blade Runner names (`--electric-blue`, `.btn-primary`, `.card`, `.badge-blue`, `text-primary-blue`, …) stay declared in `globals.css`, remapped onto MONO, so anything still referencing them resolves.

Two invariants in that layer are load-bearing, and reversing either one reintroduces invisible text:

- **Legacy accent names resolve to a DARK surface** (`--bg-3`), not to `--fg`. They feed fills and gradient stops (`bg-accent-orange`, `from-accent-purple via-primary-blue`), and those fills almost always carry light text. Accent *text* stays bright via the separate explicit `.text-primary-blue` / `.text-accent-purple` rules.
- **`[class~='bg-fg']` forces dark content.** A light fill inheriting light text is 1:1 and completely invisible, and it happens whenever the fill and the text sit on different elements — which no build-time class analysis can catch.

**All routes are converted.** There is no light page left. When touching an old route, use MONO tokens directly rather than the legacy aliases.

**Verifying a colour change:** contrast bugs here are invisible in a diff and easy to miss by eye across 41 routes. Drive the site with the Playwright MCP tools and compute contrast in the page: resolve colours by painting them to a 1×1 canvas rather than parsing the string, because Chrome returns `oklab(...)`/`lab(...)` for these tokens and a naive `rgb()` parser silently reports garbage. Compositing the text colour over its resolved background also handles alpha correctly.

**Building blocks** in `globals.css`: `.label` / `.label-bright` (mono micro-label), `.chip` (raised panel, the system's only container), `.panel` (deeper surface for the code figure), `.rule-t/-b` (hairlines), `.serif`, `.caption`, `.measure` / `.measure-tight`, `.reveal` (see Motion).

## Page composition

`src/components/Nav.tsx` and `src/components/Footer.tsx` are the site's shared chrome. **Most routes now use them. Still inline: `/workshop` and `/builders` (deliberately, see Cohort funnel) and `/architectures`.** Adopting the shared components on a route is the mechanical first step of converting it. The Nav's mobile menu is a native `<details>`, so it works with JavaScript disabled.

`src/app/page.tsx` is the reference implementation and is a **server component**. Interactivity lives in small client islands, not in a page-wide `'use client'`:

- `TranspileFigure.tsx` — the signature Fig. 1 (CQL → SQL compiler pass)
- `Clock.tsx` — live UTC clock in the nav; renders `--:-- UTC` on the server and fills in after mount, which is how it avoids a hydration mismatch
- `SubscribeForm.tsx` — newsletter capture, posts to `/api/subscribe`
- `TrackedLink.tsx` — a link that fires one analytics event
- `PageAnalytics.tsx` — page view + scroll-depth milestones
- `Reveal.tsx` — arms the scroll reveal

Match this shape on new pages. `src/lib/analytics.ts` holds `trackEvent` (fans out to gtag and PostHog) and `isValidEmail`.

## Motion must never hide content

This is a hard constraint, learned the expensive way: a first implementation of the scroll reveal blanked six sections in a full-page screenshot.

`.reveal` elements are **visible by default**. The hidden state lives behind `.is-armed`, which only `Reveal.tsx` adds, and only to elements already below the viewport, and only after the reader's first scroll — then it disarms everything after 2.5s regardless. So JS-off, `prefers-reduced-motion`, print, crawlers, and non-scrolling screenshot renders all paint the full page.

An `IntersectionObserver` health check is **not** a sufficient failsafe: IO always fires once on `observe()` with the initial state, so "did the observer ever fire" is always true and never trips.

Same rule applies to `TranspileFigure`: both code panes render complete on the server and stay complete; the animation only moves a highlight.

Watch for `min-width: auto` on grid and flex children — it lets a wide `<pre>` push its track past the viewport instead of scrolling inside it. Add `min-w-0` down the whole chain.

## Only link to things that are live

The site previously advertised a large amount of work that no longer exists: the podcast section shipped hardcoded placeholder episodes, three of four podcast platform URLs were guesses that 404'd, The Lab listed five tools that were all archived, and the chatbot recommended FHIRspective, FHIR Quiz and FPAS by name. Twenty-four outbound product links were dead.

Before adding or keeping a project reference, verify it:

```bash
vercel projects ls                      # what has a production URL
gh repo list aks129 --no-archived       # what is still maintained
gh repo list FHIR-IQ --json name,isArchived
curl -sL -o /dev/null -w '%{http_code}' <url>
```

**Currently live:** HealthClaw (healthclaw.io), CareAgents (careagents.cloud), Open Quality (openquality.us), AINPI (ainpi.dev), FHIR Builders (fhirbuilders.com), eugenevestel.com.

**Archived — never link to these:** SmartHealthConnect, FHIRspective, AgentInterOp, fhirquiz, InteropGame, healthio, FHIRSquire, FPAS, s77, Plumly, Symphony.

Podcast and newsletter content comes from the real feed via `src/lib/podcast.ts` (`evestel.substack.com/feed`, hourly revalidate, audio items only). **If the feed fails it returns an empty array and the UI must render an honest empty state that links out.** Do not reintroduce placeholder episodes — that is exactly what made a section with no data look populated.

Retired routes are listed in `next.config.ts` and permanently redirect rather than 404.

### No invented social proof

The same rule that killed the placeholder episodes applies to people and numbers, and it was violated more seriously: `/partners` and `/consulting` carried **fabricated client testimonials** — invented names, companies, quotes and metrics — with "Sarah Chen" and "Michael Rodriguez" appearing on *both* pages under different employers. `/consulting` also headlined "60% faster", "$500K+ average cost savings" and "100% first-time validation success", none of which had a source. `/training` sold three courses and two certifications that do not exist, with February 2024 cohort dates and invented "seats remaining" counts.

So: **never write a testimonial, a customer name, a case-study metric, a headline statistic, or a scarcity counter that you cannot trace to a real source.** Client work here is confidential, which means the honest substitute for social proof is the public work — the open-source repos, the podcast, the writing. That is what `/consulting` points at now.

Claims about third parties are the same problem one step removed. `/partners` described HL7 International, HIMSS and NCQA as partners ("official collaboration on FHIR specification development"). Retiring it was right on the framing even though a real NCQA relationship existed — a consulting engagement is not a partnership, and the gap between those two words is the whole problem. **Ask before asserting any affiliation, and state the actual shape of it.**

The same drift showed up in tense. "NCQA advisor" appeared in the present tense in four places, as "Former NCQA Advisor" in a fifth and "NCQA collaborator" in a sixth, for what was a four-month engagement. When a role ends, fix every instance — grep the org name, do not fix the one you happened to be looking at.

## Single sources of truth — edit these, not pages

The October 2026 QA pass (five reviewer personas: FHIR expert, CMIO buyer, vendor alliances, AI company, digital-health CTO) found the same facts stated differently across pages: three careers, three intro-call lengths, two price lists. Facts now live in one place each:

| File | Holds |
| ---- | ----- |
| `src/lib/profile.ts` | `PERSON` (email, booking URL, LinkedIn, GitHub, Substack), `BIO`, `YEARS_IN_HEALTHCARE_DATA`, `EXPERIENCE`, `EDUCATION`, `CREDENTIALS` |
| `src/lib/engagements.ts` | Offers, scope, deliverables, starting prices, `INTRO_CALL` |
| `src/lib/chat-prompt.ts` | The chatbot system prompt, built from the two files above |
| `src/components/ContactCTA.tsx` | Booking and email together, everywhere a page asks for contact |
| `scripts/check-claims.mjs` | Patterns the site has had to retract; runs before every build |

**Career facts** come from Eugene's own employment record and resume, not from memory. Do not name a current employer. Outcomes (Senior Product Manager) ended in 2026 and appears only as a dated past role.

**The Google booking page showed "No available times in the next year"** in October 2026, which is why `ContactCTA` always pairs it with email. Check it before making booking the only route anywhere.

## Positioning — what this site competes on

The named competitors are **Dogwood Health Consulting** and **Point-of-Care Partners**, and they win on different things. Dogwood's authority is personal: Lloyd McKenzie is on the FHIR core team, and their site publishes **no free reference material** because it does not need to. POCP's moat is regulatory intelligence — the Regulatory Resource Center, HIT Perspectives, a podcast — which is policy rather than implementation.

That leaves an unoccupied position, and it is the one this site takes: **free, implementation-level technical reference**, concentrated on the intersection neither competitor covers — **AI agents on FHIR data** and **digital quality measurement**. Both are backed by shipped code (HealthClaw, Open Quality), which is why they can be written from practice instead of opinion.

Consequences for anything you add here:

- `/reference` is the desk and `/agentguide` is the flagship. New technical writing belongs in that structure, not as another orphaned top-level route — which is exactly how `/cqlguide`, `/profilingguide`, `/architectures` and `/mappingguide` ended up invisible.
- Do not put the reference material behind a signup. Free and ungated is the competitive move; POCP gates some of theirs.
- Standards details on these pages are **checked against the spec, not recalled**. The SMART v2 scope syntax in `/agentguide` is verified against the SMART App Launch IG; `.rs` and `.read` are not interchangeable and the cruds letters are order-sensitive.

**Verified credentials** (now in `src/lib/profile.ts`): SQL on FHIR v2 — participant in the HL7 implementation guide (FHIR Infrastructure WG); NCQA — FHIR advisor (contract), 2025 (a defined engagement, not a standing advisory role): strategy for digital content services optimization and AI adoption, plus data quality strategy; b.well Connected Health — Director of Data & Analytics, hired and led their first FHIR team, stood up Analytics on FHIR and mapped the data for the interoperability platform now behind Samsung Health and Fitbit (both partnerships are public and press-released); UPMC Health Plan — 5 years Quality Analytics (Manager, Strategic Data Management & Operations); HL7 FHIR DevDays speaker on HealthClaw; Analytics on FHIR 2025; FHIR Camp 2025; Agents on FHIR weekly working group; early CQL and CQL-to-SQL practitioner.

**Still unconfirmed:** a specific implementation-guide authorship or work-group co-chair title. Participation in SQL on FHIR is stated; authorship of a named IG is not. Do not upgrade one into the other.

## Key routes

| Route | Purpose |
| ----- | ------- |
| `/` | Homepage — personal brand, podcast, newsletter, open-source work, advisory |
| `/podcast` | *Out of the FHIR*, episodes from the feed (no metrics; the old "live metrics" were hardcoded) |
| `/lab` | The Lab — the live projects, verified against Vercel and GitHub |
| `/media-kit` | Podcast sponsor dashboard. Numbers are self-reported platform exports with an as-of date; prices live on `/consulting` |
| `/consulting` | Work with me: three fixed-scope reviews plus code review, training, ongoing advisory |
| `/privacy` | Written from what the code collects; also carries the security statement |
| `/builders` | Healthcare AI Builders, waitlist |
| `/workshop` | Free workshop, waitlist |
| `/workshop-agenda`, `/workshop-agenda/present` | Cohort 00 reference + deck, a record of a past cohort; `noindex`, unlinked |

Retired in the truth pass and redirected: `/games` (+3), `/library`, `/tools` (+1), `/fhirsquire`, `/solutions` (+1), `/builder`, `/portfolio`, `/products`, `/partners`, `/training`, `/resources` (→ `/reference`). Retired in the October 2026 QA pass: `/investor`, `/differentiation`, `/early-access`, `/innovation-pilot-terms` (→ `/`), `/services` (→ `/consulting`), `/store` (→ `/lab`), `/security` (→ `/privacy`).

Guides under `/cqlguide`, `/mappingguide`, `/profilingguide` are served from `public/`; `/mappingguide` is rewritten to its `index.html` in `next.config.ts`.

### Cohort funnel

`/workshop` and `/builders` are a two-stage funnel with mutual cross-links — do not treat them as independent pages:

- **`/workshop`** = free entry funnel. 5 live sessions, capped at 20 per cohort, first session free.
- **`/builders`** = paid ongoing program. $29 first month, $99/mo after.
- Both are **waitlists** with no dates or seat counts. Cohort 00 ran in mid-2026 and its dates went stale on the live pages; put dates back only when a cohort is actually scheduled, and take them down when it ends.
- `/builders` hero CTA and signup meta both link to `/workshop`; `/workshop` has an upgrade block and footer link to `/builders`.

When editing copy, pricing, seat caps, or the session list on one, **mirror the substantive change on the other**.

Both use a **scoped CSS file** (`builders.css`, `workshop.css`) with every rule prefixed by a wrapper class (`.builders-page`, `.workshop-page`) so their bespoke paper/serif theme cannot leak. CSS variables go on the wrapper, not `:root`; the wrapper doubles as the body-equivalent element (`body::before` → `.builders-page::before`). Match this for future one-off landing pages.

## API routes

All in `src/app/api/`. `/api/chat`, `/api/subscribe`, `/api/cohort-signup`, `/api/workshop-signup`, `/api/podcast-feed`, `/api/fhir/capabilities`, `/api/health`. The unused product-era routes (contact, builder, podcast-metrics, portfolio-metrics, webhooks/commerce) and MongoDB were removed.

`/api/chat` uses the official Anthropic SDK with `claude-opus-5-5`, effort `low`, an 8192-token cap, a 2,000-character input cap, and server-side refusal fallback (`fallbacks: "default"`). **The system prompt is server-only** (`src/lib/chat-prompt.ts`). The route used to accept a `systemPrompt` from the browser, which made it an open Claude proxy on the site's key; never reintroduce that.

**The newsletter form does not subscribe anyone by itself.** Substack owns the list. `SubscribeForm` notifies Gene via `/api/subscribe`, then sends the reader to `evestel.substack.com/subscribe?email=…` to confirm. It previously said "Subscribed. Check your inbox." when nothing had happened.

Sign-up routes do not log PII; the sign-up reaches Gene by email only, which is what `/privacy` says.

## Email (Resend) — hard-won

**Verified sending domains:** `fhirbuilders.com`, `healthclaw.io`, `ainpi.dev`.

**`fhiriq.com` is hosted on Wix**, so DNS sits behind Wix's nameservers and the SPF/DKIM records Resend needs cannot be added. Treat `@fhiriq.com` as **receive-only**: `gene@fhiriq.com` is fine as a `to:`, never as a `from:`. Any new sending route must use a verified domain via `RESEND_FROM` or a hardcoded verified sender. As of 2026-05-22 all three sending routes (`/api/cohort-signup`, `/api/workshop-signup`, `/api/subscribe`) send from `notifications@fhirbuilders.com`.

**Debugging:** every sending route's `try/catch` swallows Resend errors so the user-facing form still returns success. Failures are therefore invisible from the UI and slow to surface in Vercel logs. Use the REST API for ground truth:

```bash
curl -H "Authorization: Bearer $KEY" https://api.resend.com/domains
curl -H "Authorization: Bearer $KEY" "https://api.resend.com/emails?limit=10"   # check last_event
```

If a `[PROD TEST]` returns 200 from the route but never appears in `/emails`, the call never reached Resend — almost always auth or domain.

**Rotating `RESEND_API_KEY` requires a redeploy.** Vercel updates the value immediately, but warm serverless instances keep the old `process.env` value until they cycle. After `vercel env add RESEND_API_KEY production --force`, run `vercel redeploy <latest-prod-url> --target production`. Without it, signups keep silently 403'ing while `vercel env ls` looks correct.

## Environment variables

```bash
# /api/chat has no API key. It authenticates by workload identity federation
# (src/lib/anthropic-client.ts, rule fhiriq-site-chat-prod in org "vestel ai llc").
# Set by scripts/setup-anthropic-wif.sh, production only:
ANTHROPIC_FEDERATION_RULE_ID=fdrl_...
ANTHROPIC_ORGANIZATION_ID=...
ANTHROPIC_SERVICE_ACCOUNT_ID=svac_...
RESEND_API_KEY=re_...
RESEND_FROM=FHIR Builders <notifications@fhirbuilders.com>   # must be a verified domain
SUBSTACK_PUBLICATION_ID=evestel
NEXT_PUBLIC_SITE_URL=https://fhiriq.com
NEXT_PUBLIC_LINKEDIN_PARTNER_ID=...   # unset in production; /privacy mentions LinkedIn only when it is set
```

See `CLAUDE_API_SETUP.md` and `EMAIL_SETUP.md`. After changing env vars in Vercel, redeploy.

### The open-source work is the contribution, not a portfolio

`/lab` is framed as tools other people can use without engaging anyone — "work you can use without hiring me" — not as proof the consultant can build. That is both truer and the stronger competitive position, since Dogwood publishes nothing free and POCP gates some material. Consulting funds the time; it is not what the projects are for. Keep that direction: describe what each project **gives someone**, not what it demonstrates about Eugene.

Describe them from what the sites actually do, checked against the live site, not from memory. Two that were previously understated:

- **Open Quality** ships 52 CMS eCQM packages for the 2026 reporting year, CI-verified provenance, an `oq` CLI (`validate`, `validate-all`, `pack`), and three conformance levels (Shared, Described, Verified). Open licences only against an SPDX allowlist; value sets referenced rather than embedded so licensing stays machine-enforceable.
- **AINPI** is a provider-directory accuracy audit, not vague "ecosystem analysis": six scoring dimensions across every state and specialty, mapped to the REAL Health Providers Act, with per-NPI verification against NPPES, the OIG exclusion list and SAM.gov.

**AINPI carries a caveat that must not be dropped.** Its aggregate treemap currently runs on a deterministic synthetic seed while the measurement pipeline is built, and the site says so itself. `/lab` repeats that disclosure. Removing it to make the list look stronger would be the same failure as the fabricated statistics.

**`careagents.dev` does not resolve.** The live host is `careagents.cloud`.

## Personal Health AI (community projects)

Featured on the homepage in this card order. **Frame these as community/personal work, not FHIR IQ products — there is no commercial angle.**

| Project | Status | Links |
| ------- | ------ | ----- |
| HealthClaw Guardrails | Live | [healthclaw.io](https://healthclaw.io) · [aks129/HealthClawGuardrails](https://github.com/aks129/HealthClawGuardrails) |
| CareAgents | Beta, synthetic records only | [careagents.cloud](https://careagents.cloud) |
| Open Quality | Live | [openquality.us](https://openquality.us) · [FHIR-IQ/openquality](https://github.com/FHIR-IQ/openquality) |
| AINPI | Live, synthetic-seed caveat | [ainpi.dev](https://ainpi.dev) · [FHIR-IQ/AINPI](https://github.com/FHIR-IQ/AINPI) |

HealthClaw facts, from its README: 29 MCP tools, 4,000+ Python and 200+ Node tests, FHIR R4 US Core v9 (stable) and R6 v6.0.0-ballot3 (experimental). Its own security page says it is not a HIPAA compliance determination; never say "HIPAA-compliant". Open Quality: measure packages are CC0, tooling is MIT.

Covered in two Substack posts: "Building a New Empowered Health System" and "How I Build My Personal OpenClaw" (evestel.substack.com).

## GitHub orgs

Two accounts, both intentional — do not conflate:

- **`github.com/aks129`** — Eugene's personal account. Hosts the community projects (HealthClawGuardrails, SmartHealthConnect, fhirquiz, fhirspective, agent-inter-op). The homepage footer GitHub icon points here.
- **`github.com/FHIR-IQ`** — the org. Hosts org-owned repos (e.g. AINPI).

Use whichever org actually owns the repo. There is no default. If a new project's home is unclear, ask.

## Deployment

Vercel, auto-deploy on push. `vercel.json` contains **only** API CORS headers; all redirects and rewrites live in `next.config.ts`.

## Contact

- See `PERSON` in `src/lib/profile.ts`.
