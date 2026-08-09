# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this site actually is

**fhiriq.com is a personal authority site for Eugene Vestel** — healthcare interoperability consultant, host of the *Out of the FHIR* podcast, and builder of open-source FHIR tooling. The homepage h1 is "I help healthcare orgs make sense of FHIR, AI, and quality measurement"; the primary CTAs are the Substack newsletter and the podcast.

Do not "correct" this toward product-startup positioning. Earlier revisions of this file described a product-centric site built around an "Open Quality AI Layer" and a Design Partner program. That is not what ships. Consulting, the podcast, the newsletter, and the open-source projects are the content.

Related consequence: **`/cql-to-sql` is not a page.** It is a four-line component returning `null` behind a permanent redirect to `/` (`next.config.ts`). Do not treat it as a landing page or a priority route.

**Tech stack:** Next.js 15.5.4 (App Router, Turbopack), React 19.1.0, TypeScript 5 (strict), Tailwind CSS 4, MongoDB + Mongoose, Anthropic Claude API.

## Commands

```bash
npm run dev              # dev server on :3000 (Turbopack)
npm run build            # production build (Turbopack)
npm start                # serve the production build
npm run lint             # ESLint
npx tsc --noEmit         # typecheck — NOT in package.json, run it directly
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

**All 41 routes are converted.** There is no light page left. When touching an old route, use MONO tokens directly rather than the legacy aliases.

**Verifying a colour change:** contrast bugs here are invisible in a diff and easy to miss by eye across 41 routes. Drive the site with the Playwright MCP tools and compute contrast in the page: resolve colours by painting them to a 1×1 canvas rather than parsing the string, because Chrome returns `oklab(...)`/`lab(...)` for these tokens and a naive `rgb()` parser silently reports garbage. Compositing the text colour over its resolved background also handles alpha correctly.

**Building blocks** in `globals.css`: `.label` / `.label-bright` (mono micro-label), `.chip` (raised panel, the system's only container), `.panel` (deeper surface for the code figure), `.rule-t/-b` (hairlines), `.serif`, `.caption`, `.measure` / `.measure-tight`, `.reveal` (see Motion).

## Page composition

`src/components/Nav.tsx` and `src/components/Footer.tsx` are the site's shared chrome. **Only the homepage uses them so far — 35 other routes still inline their own `<nav>`.** Adopting the shared components on a route is the mechanical first step of converting it. The Nav's mobile menu is a native `<details>`, so it works with JavaScript disabled.

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

## Key routes

| Route | Purpose |
| ----- | ------- |
| `/` | Homepage — personal brand, podcast, newsletter, open-source work, advisory |
| `/podcast` | *Out of the FHIR* with live metrics |
| `/lab` | "The Lab" — open-source FHIR tools showcase |
| `/library` | ViewDefinition library (SQL on FHIR) |
| `/media-kit` | Podcast sponsor/advisory/coaching dashboard, outbound-shareable |
| `/builders` | Healthcare AI Builders — Cohort 01 signup |
| `/workshop` | Free workshop — Cohort 00 entry funnel |
| `/workshop-agenda`, `/workshop-agenda/present` | Cohort 00 reference + slide deck |
| `/investor`, `/early-access`, `/innovation-pilot-terms` | Legacy product-era pages, still live |

41 routes total. Guides under `/cqlguide`, `/mappingguide`, `/profilingguide` are served from `public/`; `/mappingguide` is rewritten to its `index.html` in `next.config.ts`.

### Cohort funnel

`/workshop` and `/builders` are a two-stage funnel with mutual cross-links — do not treat them as independent pages:

- **`/workshop`** = **Cohort 00** = free entry funnel. 5 sessions, capped at 20, first session free.
- **`/builders`** = **Cohort 01** = paid ongoing program. $29 first month, $99/mo after.
- `/builders` hero CTA and signup meta both link to `/workshop`; `/workshop` has an upgrade block and footer link to `/builders`.

When editing copy, pricing, seat caps, or the session list on one, **mirror the substantive change on the other**.

Both use a **scoped CSS file** (`builders.css`, `workshop.css`) with every rule prefixed by a wrapper class (`.builders-page`, `.workshop-page`) so their bespoke paper/serif theme cannot leak. CSS variables go on the wrapper, not `:root`; the wrapper doubles as the body-equivalent element (`body::before` → `.builders-page::before`). Match this for future one-off landing pages.

## API routes

All in `src/app/api/`. `/api/chat` (Claude, with a keyword-based fallback when `ANTHROPIC_API_KEY` is unset), `/api/contact`, `/api/subscribe`, `/api/cohort-signup`, `/api/workshop-signup`, `/api/builder`, `/api/fhir/capabilities`, `/api/health`, `/api/podcast-metrics`, `/api/portfolio-metrics`, `/api/webhooks/commerce`.

The chatbot system prompt exists in **both** `src/components/ChatBot.tsx` and `src/app/api/chat/route.ts` — keep them synchronized.

MongoDB uses a cached singleton in `src/lib/mongodb.ts` to survive serverless invocations. Always go through it; never open a direct connection. `src/lib/licenseManager.ts` is a scaffold — its DB functions are stubs, not wired to MongoDB.

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
ANTHROPIC_API_KEY=sk-...       # optional — /api/chat falls back without it
MONGODB_URI=mongodb+srv://...
RESEND_API_KEY=re_...
RESEND_FROM=FHIR Builders <notifications@fhirbuilders.com>   # must be a verified domain
SUBSTACK_PUBLICATION_ID=evestel
NEXT_PUBLIC_SITE_URL=https://fhiriq.com
NEXT_PUBLIC_LINKEDIN_PARTNER_ID=...
```

See `CLAUDE_API_SETUP.md` and `EMAIL_SETUP.md`. After changing env vars in Vercel, redeploy.

## Personal Health AI (community projects)

Featured on the homepage in this card order. **Frame these as community/personal work, not FHIR IQ products — there is no commercial angle.**

| Project | Status | Links |
| ------- | ------ | ----- |
| HealthClaw Guardrails | Live | [healthclaw.io](https://healthclaw.io) · [aks129/HealthClawGuardrails](https://github.com/aks129/HealthClawGuardrails) |
| Smart Health Connect | Open Source | [aks129/SmartHealthConnect](https://github.com/aks129/SmartHealthConnect) |
| AINPI | Ecosystem Analysis | [ainpi.dev](https://ainpi.dev) · [FHIR-IQ/AINPI](https://github.com/FHIR-IQ/AINPI) |

Covered in two Substack posts: "Building a New Empowered Health System" and "How I Build My Personal OpenClaw" (evestel.substack.com).

## GitHub orgs

Two accounts, both intentional — do not conflate:

- **`github.com/aks129`** — Eugene's personal account. Hosts the community projects (HealthClawGuardrails, SmartHealthConnect, fhirquiz, fhirspective, agent-inter-op). The homepage footer GitHub icon points here.
- **`github.com/FHIR-IQ`** — the org. Hosts org-owned repos (e.g. AINPI).

Use whichever org actually owns the repo. There is no default. If a new project's home is unclear, ask.

## Deployment

Vercel, auto-deploy on push. `vercel.json` contains **only** API CORS headers; all redirects and rewrites live in `next.config.ts`.

## Product URLs (for reference in code)

- FHIRspective: <https://fhirspective.vercel.app>
- FHIR Data Mapper: <https://agent-inter-op.vercel.app>
- FHIR Quiz: <https://fhirquiz.vercel.app>
- ViewDefinition Builder: <https://fhir-viewdefinition-builder.vercel.app>
- CQL Builder POC: <https://s77.vercel.app>

## Contact

- <gene@fhiriq.com> · booking: <https://calendar.app.google/TMvRGiiYfbBKNd889> · <https://fhiriq.com>
