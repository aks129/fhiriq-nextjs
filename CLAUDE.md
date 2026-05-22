# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

FHIR IQ is a **pre-revenue healthcare AI startup** building "The Open Quality AI Layer" - an AI-powered semantic intelligence layer for healthcare data. The company is pivoting from a consulting/training portfolio site to a **product-centric startup site**.

**Strategic Context (Q1 2026):**

- Presented "CQL to SQL Conversion" at Analytics on FHIR conference (December 5, 2025) — `/cql-to-sql` was the QR code destination
- Actively recruiting Design Partners for Q1 2026 pilot program (3 slots)
- Core product: CQL-to-SQL compilation engine for operationalizing HEDIS/quality measures in data warehouses
- Consulting and training remain as secondary revenue streams, not primary focus

**Tech Stack:**

- Next.js 15.5.4 with App Router and Turbopack
- React 19.1.0
- TypeScript 5
- Tailwind CSS 4
- MongoDB with Mongoose
- Anthropic Claude API for AI chatbot

## Development Commands

```bash
# Development
npm run dev              # Start dev server with Turbopack on http://localhost:3000

# Build & Deploy
npm run build            # Production build with Turbopack
npm start                # Start production server

# Code Quality
npm run lint             # Run ESLint
```

There is no test runner configured. The codebase has no unit or integration tests. For UI changes, verify by running the dev server and either hitting the page in a browser or using the Playwright MCP tools (`mcp__plugin_playwright_playwright__*`) — Playwright MCP is wired up in this repo and is the project's de-facto QA loop.

## Architecture

### Directory Structure

```text
src/
├── app/                 # Next.js App Router pages and layouts
│   ├── api/            # API routes (Next.js route handlers)
│   ├── page.tsx        # Homepage - "The Open Quality AI Layer"
│   ├── layout.tsx      # Root layout with fonts and metadata
│   ├── globals.css     # Global styles and CSS variables
│   │
│   ├── cql-to-sql/     # Conference landing page (Analytics on FHIR 2025) — primary priority
│   ├── early-access/   # Design Partner application form
│   ├── investor/       # "Idea Vision" investor one-pager
│   ├── lab/            # "The Lab" — public-facing showcase of open-source FHIR tools (ViewDefinition Library, FHIRSquire, etc.)
│   ├── library/        # ViewDefinition library (SQL on FHIR resources)
│   ├── media-kit/      # Out of the FHIR sponsor/advisory/coaching media kit (3-tab dashboard, outbound-shareable)
│   ├── innovation-pilot-terms/  # Legal terms for pilot program
│   │
│   ├── about/          # Company about page
│   ├── architectures/  # Technical architecture pages
│   ├── blog/           # Blog
│   ├── builder/        # FHIR builder tool page
│   ├── builders/       # "Healthcare AI Builders" cohort signup (Cohort 01) — scoped CSS, custom paper/serif aesthetic, posts to /api/cohort-signup
│   ├── consulting/     # Consulting services
│   ├── contact/        # Contact form
│   ├── cqlguide/       # CQL guide (serves public/cqlguide/)
│   ├── differentiation/# Competitive differentiation
│   ├── fhirsquire/     # FHIRSquire product page
│   ├── games/          # Interactive demos (healthio, ai-agent, hti6-builder)
│   ├── mappingguide/   # Mapping guide (rewrites to public/mappingguide/index.html)
│   ├── partners/       # Partners page
│   ├── podcast/        # Podcast page with live metrics
│   ├── portfolio/      # Portfolio showcase
│   ├── privacy/        # Privacy policy
│   ├── products/       # Products overview
│   ├── profilingguide/ # Profiling guide
│   ├── resources/      # Resources
│   ├── security/       # Security page
│   ├── services/       # Services overview
│   ├── solutions/      # Solutions (fpas/ sub-route)
│   ├── store/          # Store page
│   ├── tools/          # Tools (fhir-builder/ sub-route)
│   ├── training/       # Training offerings
│   └── workshop/       # Free "Building Healthcare AI with Claude Code" workshop landing (Cohort 00) — entry funnel to /builders; same scoped-CSS pattern; posts to /api/workshop-signup
├── components/          # React components
│   ├── ChatBot.tsx              # AI chatbot widget (+ /api/chat must stay in sync)
│   ├── ArchitectureDiagram.tsx  # Technical diagrams
│   ├── CQLBuilderBanner.tsx     # Product banners
│   ├── FHIRSquireBanner.tsx
│   ├── HealthIOBanner.tsx       # HealthIO product banner
│   ├── LinkedInInsight.tsx      # LinkedIn B2B tracking (injected in root layout)
│   └── LivePodcastMetrics.tsx
├── lib/                 # Utilities and configurations
│   ├── mongodb.ts       # MongoDB connection with caching
│   └── licenseManager.ts  # License key generation scaffold (DB functions are stubs — not yet wired to MongoDB)
└── models/              # Mongoose schemas
    ├── PodcastMetrics.ts
    └── PortfolioMetrics.ts
```

### Key Landing Pages

| Route | Purpose | Primary CTA |
| ----- | ------- | ----------- |
| `/` | Homepage - "The Semantic Intelligence Layer for Healthcare" | Try Tools / Design Partner |
| `/cql-to-sql` | Conference landing (QR code destination, highest priority) | Download Guide / Apply for Pilot |
| `/library` | ViewDefinition library (developer hook) | Copy JSON/SQL |
| `/early-access` | Design Partner application form | Join Early Access |
| `/investor` | Investor one-pager ("Idea Vision") | Contact |
| `/media-kit` | Out of the FHIR podcast media kit — sponsor/advisory/coaching tabs, outbound-shareable | <gene@fhiriq.com> / book intro |
| `/lab` | "The Lab" — open-source FHIR tools showcase (linked from homepage nav as "Lab", and the footer "The Lab") | Try / View on GitHub |
| `/builders` | "Healthcare AI Builders" cohort landing — Cohort 01 signup funnel | Book free intro call (form → `/api/cohort-signup`) |
| `/workshop` | Free "Building Healthcare AI with Claude Code" workshop — Cohort 00 entry funnel, capped at 20 | Save my seat (form → `/api/workshop-signup`) |

### Cohort funnel

The cohort signup pages are a two-stage funnel with mutual cross-links — don't treat them as independent pages:

- **`/workshop`** = **Cohort 00** = the free entry funnel. 5-session workshop, capped at 20, first session free. Promoted via LinkedIn/Substack carousels.
- **`/builders`** = **Cohort 01** = the paid ongoing program. $29 first month, $99/mo after.
- Cross-links: `/builders` hero CTA row + signup-section meta both link to `/workshop` ("try the free workshop first"). `/workshop` has an upgrade block + footer link to `/builders`.
- When editing copy, pricing, seat caps, or the session list on one, **mirror the substantive change on the other** so the two-stage story stays coherent.

There are ~30 additional routes in the app (see directory structure above) covering products, services, consulting, training, guides, games, and legal pages.

### Personal Health AI (OpenClaw Community Projects)

Three non-commercial, open-source projects featured on the homepage under "Building HealthClaw" / Personal Health AI, in this card order:

| Project | Status | Description |
| ------- | ------ | ----------- |
| **HealthClaw Guardrails** | Live | Security layer between AI agents and clinical data. 12 MCP tools, PHI redaction, FHIR R4/R6 — [healthclaw.io](https://healthclaw.io) · [GitHub](https://github.com/aks129/HealthClawGuardrails) |
| **Smart Health Connect** | Open Source | SMART on FHIR patient records platform (Liara AI Health). Aggregates Epic/Cerner data with AI health insights — [GitHub](https://github.com/aks129/SmartHealthConnect) |
| **AINPI** | Ecosystem Analysis | Analysis of the CMS health tech ecosystem and the national provider directory modernization effort. Mapping players, standards, and FHIR-based architecture — [ainpi.dev](https://ainpi.dev) · [GitHub](https://github.com/FHIR-IQ/AINPI) |

A "More experiments in progress — Curatr Skills and others" footer on the homepage links to the broader project list on GitHub (`github.com/aks129`).

These projects are featured in two Substack posts:

- "Building a New Empowered Health System" (evestel.substack.com)
- "How I Build My Personal OpenClaw" (evestel.substack.com)

**Important:** These have no commercial angle — frame them as community/personal projects, not FHIR IQ products.

### Key API Routes

All API routes are in `src/app/api/`:

- `/api/chat` - AI chatbot using Claude API (fallback responses if API key not set)
- `/api/contact` - Contact form submission with Resend email service
- `/api/cohort-signup` - Healthcare AI Builders cohort signup. Sends notification to `gene@fhiriq.com` via Resend; sender configurable via `RESEND_FROM` (default `notifications@healthclaw.io`); submitter's email is set as `Reply-To` so replies route directly to the lead. User-facing request still succeeds if Resend fails — capture survives in server logs.
- `/api/workshop-signup` - Free workshop (Cohort 00) signup. Same Resend pattern as `/api/cohort-signup` (notification to `gene@fhiriq.com`, `RESEND_FROM` sender, submitter as `Reply-To`, Resend-failure-safe). Accepts optional `linkedin` URL and `build` description fields in addition to name/email.
- `/api/subscribe` - Newsletter subscription (Substack integration)
- `/api/builder` - AI-powered FHIR builder endpoint
- `/api/fhir/capabilities` - FHIR server capabilities metadata
- `/api/health` - Health check endpoint
- `/api/podcast-metrics` - MongoDB-backed podcast analytics
- `/api/portfolio-metrics` - MongoDB-backed portfolio analytics
- `/api/webhooks/commerce` - Commerce webhook handler

### Database Architecture

**MongoDB Connection:**

- Uses global caching pattern to reuse connections across serverless invocations
- Connection established via `src/lib/mongodb.ts`
- Mongoose models in `src/models/`
- Connection string: `MONGODB_URI` environment variable

**Important:** The MongoDB connection uses a cached singleton pattern to prevent connection exhaustion in serverless environments.

### Styling System

**The reality:** Most content pages use `min-h-screen bg-white` + Tailwind utility classes (25+ of ~36 pages). The dark "Blade Runner" theme in `globals.css` defines a full color system, but in practice it's used primarily for gradient hero sections (`bg-gradient-to-r from-accent-purple via-primary-blue to-primary-navy`) layered on light pages, not as a full page background. When adding a page, **copy the nav + container pattern from a stylistically-similar existing page** (e.g., `/podcast` for content pages, `/cql-to-sql` or `/investor` for landing/marketing pages) rather than starting blank or strictly applying `globals.css` tokens.

**Available:**

- CSS variables in `src/app/globals.css` — full Blade Runner palette (void-black, electric-blue, laser-red, steel-N, etc.) plus legacy mappings (`--primary-blue`, `--accent-purple`, etc.)
- Tailwind CSS 4 with `@theme inline` token bindings — `text-primary-blue`, `bg-primary-green`, `text-neutral-gray`, etc.
- Utility classes from globals.css: `.btn-primary`, `.btn-secondary`, `.btn-cta`, `.card`, `.card-glass`, `.badge-blue`/`-red`/`-green`
- Fonts: Geist + Geist_Mono + Inter, loaded via `next/font/google` in root layout

**Pages with bespoke visual identity** (e.g., the cohort funnel pages `/builders` and `/workshop` — paper/serif aesthetic with Fraunces + Newsreader + JetBrains Mono): use a **scoped CSS file** (e.g., `src/app/builders/builders.css`, `src/app/workshop/workshop.css`) with every rule prefixed by a unique wrapper class (e.g., `.builders-page`, `.workshop-page`) so the bespoke theme can't leak. CSS variables go on the wrapper, not `:root`. The wrapper class also doubles as the body-equivalent element (e.g., `body::before` → `.builders-page::before`). Match this pattern for future one-off landing pages.

### Page composition

**There is no shared Nav or Footer component.** ~22 pages inline their own nav (typically `<nav class="bg-white shadow-lg">` with the `FHIR IQ` brand link + section links). When adding a page, copy the nav block from the closest matching existing page rather than expecting a `<Nav>` import — `src/components/` only contains feature components (ChatBot, banners, LinkedInInsight, etc.), not chrome.

### AI Chatbot Architecture

The chatbot (`src/components/ChatBot.tsx` + `/api/chat`) has:

- Claude 3.5 Sonnet integration with fallback to rule-based responses
- Product knowledge base about FHIR IQ services (FPAS, FHIRspective, FHIR Quiz, etc.)
- System prompt focused on FHIR IQ products and services
- Conversation ID tracking
- Quick suggestion prompts

**Fallback behavior:** If `ANTHROPIC_API_KEY` is not set, uses keyword-based responses from built-in knowledge base.

## Environment Variables

Required variables in `.env.local` or Vercel:

```bash
# AI Chatbot
ANTHROPIC_API_KEY=sk-...           # Claude API key (optional - has fallback)

# Database
MONGODB_URI=mongodb+srv://...       # MongoDB connection string

# Email Service
RESEND_API_KEY=re_...              # Resend API key for contact / subscribe / cohort-signup
RESEND_FROM=FHIR Builders <notifications@fhirbuilders.com>  # Sender for /api/cohort-signup (per-route opt-in; default healthclaw.io). Must use a verified Resend domain.

# Newsletter
SUBSTACK_PUBLICATION_ID=evestel    # Substack publication

# Public
NEXT_PUBLIC_SITE_URL=https://fhiriq.com
NEXT_PUBLIC_LINKEDIN_PARTNER_ID=...  # LinkedIn Insight Tag partner ID
```

**See:** `CLAUDE_API_SETUP.md` and `EMAIL_SETUP.md` for detailed setup instructions.

## Important Patterns & Conventions

### Next.js App Router

- All pages use the App Router (not Pages Router)
- Server Components by default
- Client Components marked with `'use client'` directive
- Metadata exported from `layout.tsx` and page files

### TypeScript Configuration

- Path alias: `@/*` maps to `./src/*`
- Target: ES2017
- Strict mode enabled
- Module resolution: bundler

### CORS Configuration

`vercel.json` contains only API CORS headers (`/api/(.*)` → `Access-Control-Allow-Origin: *` and friends). All path rewrites live in `next.config.ts`, not `vercel.json`.

### Route Rewrite

The `/mappingguide` path is rewritten to `/mappingguide/index.html` via `next.config.ts` for static HTML hosting.

## Deployment

**Platform:** Vercel

**Build Configuration:**

- Uses Turbopack for both dev and production builds
- Automatic deployments on git push
- Environment variables configured in Vercel dashboard

**Important:** After updating environment variables in Vercel, redeploy the application for changes to take effect.

## Contact & Business Information

- Primary contact: <gene@fhiriq.com>
- Booking link: <https://calendar.app.google/TMvRGiiYfbBKNd889>
- Website: <https://fhiriq.com>

## Product URLs (for reference in code)

- FHIRspective Data Quality Analyzer: <https://fhirspective.vercel.app>
- FHIR Data Mapper: <https://agent-inter-op.vercel.app>
- FHIR Quiz Training Platform: <https://fhirquiz.vercel.app>
- FHIR ViewDefinition Builder: <https://fhir-viewdefinition-builder.vercel.app>
- CQL Builder POC: <https://s77.vercel.app>

## GitHub Orgs

Two GitHub accounts are both active and intentional — don't conflate them:

- **`github.com/aks129`** — Eugene's personal account. Hosts the personal/community projects (HealthClawGuardrails, SmartHealthConnect, fhirquiz, fhirspective, agent-inter-op, etc.). The homepage **footer GitHub social icon points here**.
- **`github.com/FHIR-IQ`** — the FHIR-IQ organization. Hosts org-owned product repos (e.g., AINPI).

When linking to a project's repo, use whichever org actually owns it — there's no fallback "default org" to assume. If a new project's home is uncertain, ask.

## Product Messaging & Positioning

**Primary Value Proposition:** "Turn Clinical Logic into Enterprise Intelligence"

**Key Messaging by Page:**

| Page | Headline | Subhead |
| ---- | -------- | ------- |
| Homepage | "FHIR IQ: The Semantic Intelligence Layer for Healthcare" | Solutions grid: CQL Engine, Data Quality, Advisory |
| `/cql-to-sql` | "Turn Clinical Logic into Enterprise Intelligence" | "Operationalize HEDIS and Quality Measures directly in your Data Warehouse" |
| `/library` | "Stop writing boilerplate" | "Use standard SQL on FHIR ViewDefinitions" |

**Product Comparison (for `/cql-to-sql` page):**

- **Old Way:** Java-based CQL Engines (Slow, Black Box)
- **New Way:** Native SQL Compilation (Fast, Transparent)

**Design Partner Program Copy:**

- Program name: "Join the Inner Circle"
- Offer: "We are selecting 3 partners for our Q1 2026 Pilot Program"
- Benefits: "Get early access to the engine and influence the roadmap"

## Analytics & Tracking

**LinkedIn Insight Tag:**

- Use `LINKEDIN_PARTNER_ID` environment variable placeholder
- Track page views on initialization
- Fire custom event when "Apply for Design Partner" button is clicked

## Notes for AI Development

When working with this codebase:

1. **Strategic Priority:** `/cql-to-sql` remains highest priority as the post-conference follow-up destination; `/early-access` is the active conversion funnel for Design Partners.

2. **Email Service:** Resend sender is per-route configurable via `RESEND_FROM`. **Verified Resend domains** (sender-eligible): `fhirbuilders.com`, `healthclaw.io`, `ainpi.dev`. **`fhiriq.com` is hosted on Wix** — DNS is controlled by Wix's nameservers, so we can't add the SPF/DKIM records Resend requires. Treat `@fhiriq.com` as a **receive-only** address: `gene@fhiriq.com` is fine as a `to:` recipient (Eugene's inbox is hosted elsewhere), but never as a Resend `from:`. Any new email-sending route must use one of the verified domains via `RESEND_FROM` or a hardcoded verified sender. As of 2026-05-22 all three sending routes (`/api/cohort-signup`, `/api/workshop-signup`, `/api/subscribe`) send from `notifications@fhirbuilders.com`.

   **Debugging Resend pipeline issues** — every sending route's `try/catch` swallows Resend errors so the user-facing form still returns success. That means failures are invisible from the user side and Vercel logs are slow to surface them. Use the Resend REST API directly for ground truth:
   - `curl -H "Authorization: Bearer $KEY" https://api.resend.com/domains` — verified domain status
   - `curl -H "Authorization: Bearer $KEY" "https://api.resend.com/emails?limit=10"` — recent sends with `last_event` (`delivered`, `bounced`, etc.)
   - If a `[PROD TEST]` send returns `200` from `/api/...` but doesn't appear in Resend's `/emails` list, the API call never reached Resend (likely 4xx from auth/domain — see next bullet).

   **Rotating `RESEND_API_KEY` requires a redeploy** — Vercel updates the env value at the platform level immediately, but warm Next.js serverless instances keep the old `process.env.RESEND_API_KEY` in memory until they cycle. After `vercel env add RESEND_API_KEY production --force`, run `vercel redeploy <latest-prod-url> --target production` to force fresh instances. Without the redeploy, signups continue silently 403'ing at Resend even though the env var "looks right" in `vercel env ls`.

3. **Chatbot Context:** The chatbot system prompt in `ChatBot.tsx` and `/api/chat/route.ts` should stay synchronized. Any product updates need to be reflected in both files.

4. **MongoDB Connection:** Always use the connection helper from `src/lib/mongodb.ts` - never create direct connections to avoid connection pool exhaustion.

5. **Static Assets:** Guides are served from `public/` directory (e.g., `public/mappingguide/`, `public/cqlguide/`).

6. **Visual conventions:** Match the conventions of a stylistically-similar existing page (e.g., `/podcast` for light-theme content pages, `/cql-to-sql` for marketing landing pages with gradient heros). The `globals.css` token system is available but the codebase is not strict about it — many pages use raw Tailwind utilities and `bg-white`. Don't introduce a new visual language unless asked.

7. **Homepage Pivot:** The homepage should emphasize "Platform" positioning over "Freelancer/Consultant" - use the Solutions grid pattern with CQL Engine as primary, Data Quality as secondary, and Advisory/Consulting as tertiary.
