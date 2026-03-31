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

There is no test runner configured. The codebase has no unit or integration tests.

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
│   ├── library/        # ViewDefinition library (SQL on FHIR resources)
│   ├── innovation-pilot-terms/  # Legal terms for pilot program
│   │
│   ├── about/          # Company about page
│   ├── architectures/  # Technical architecture pages
│   ├── blog/           # Blog
│   ├── builder/        # FHIR builder tool page
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
│   └── training/       # Training offerings
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

There are ~30 additional routes in the app (see directory structure above) covering products, services, consulting, training, guides, games, and legal pages.

### Personal Health AI (OpenClaw Community Projects)

Three non-commercial, open-source personal passion projects featured on the homepage under "Personal Health AI":

| Project | Status | Description |
| ------- | ------ | ----------- |
| **HealthClaw Guardrails** | Live | Security layer between AI agents and clinical data. 12 MCP tools, PHI redaction, FHIR R4/R6 — [healthclaw.io](https://healthclaw.io) · [GitHub](https://github.com/aks129/HealthClawGuardrails) |
| **Smart Health Connect** | Open Source | SMART on FHIR patient records platform (Liara AI Health). Aggregates Epic/Cerner data with AI health insights — [GitHub](https://github.com/aks129/SmartHealthConnect) |
| **Curatr Skills** | In Development | Data quality curation skill library for OpenClaw — validates/curates FHIR records for agent consumption |

These projects are featured in two Substack posts:

- "Building a New Empowered Health System" (evestel.substack.com)
- "How I Build My Personal OpenClaw" (evestel.substack.com)

**Important:** These have no commercial angle — frame them as community/personal projects, not FHIR IQ products.

### Key API Routes

All API routes are in `src/app/api/`:

- `/api/chat` - AI chatbot using Claude API (fallback responses if API key not set)
- `/api/contact` - Contact form submission with Resend email service
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

**Design System:**

- Brand colors defined in `src/app/globals.css` with CSS variables
- Primary colors: Blue (#2563EB), Green (#059669), Navy (#1E293B)
- Accent colors: Purple (#7C3AED), Orange (#EA580C)
- Uses Tailwind CSS 4 with custom theme configuration
- Fonts: Geist and Geist_Mono (via `next/font/google`, loaded in root layout)

**Utility Classes:**

- `.btn-primary`, `.btn-secondary` - Button styles
- `.card` - Card component pattern
- Custom color utilities: `.text-primary-blue`, `.bg-primary-green`, etc.

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
RESEND_API_KEY=re_...              # Resend API key for contact forms

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

API routes have CORS enabled via `vercel.json` headers for cross-origin requests.

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

2. **Email Service:** Resend requires domain verification for fhiriq.com before production use. Temporary workaround uses `onboarding@resend.dev`.

3. **Chatbot Context:** The chatbot system prompt in `ChatBot.tsx` and `/api/chat/route.ts` should stay synchronized. Any product updates need to be reflected in both files.

4. **MongoDB Connection:** Always use the connection helper from `src/lib/mongodb.ts` - never create direct connections to avoid connection pool exhaustion.

5. **Static Assets:** Guides are served from `public/` directory (e.g., `public/mappingguide/`, `public/cqlguide/`).

6. **Brand Consistency:** Always use CSS variables from `globals.css` for colors, not hardcoded hex values.

7. **Homepage Pivot:** The homepage should emphasize "Platform" positioning over "Freelancer/Consultant" - use the Solutions grid pattern with CQL Engine as primary, Data Quality as secondary, and Advisory/Consulting as tertiary.
