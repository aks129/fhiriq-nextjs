# Repository Consolidation Documentation

**Date:** November 1, 2025
**Action:** Consolidated `fhiriqsite` into `fhiriq-nextjs`

## Background

FHIR IQ previously had two repositories:

1. **fhiriq-nextjs** - Modern Next.js 15 application (currently deployed on Vercel)
2. **fhiriqsite** - Legacy Wix Studio + Velo-based site (no longer deployed)

## Decision

Consolidated all valuable content from `fhiriqsite` into `fhiriq-nextjs` to:
- Maintain single source of truth
- Preserve valuable documentation and specifications
- Simplify development workflow
- Keep all project history accessible

## Active Repository

**Repository:** https://github.com/aks129/fhiriq-nextjs
**Branch:** master
**Deployment:** Vercel (Production)
**Platform:** Next.js 15 + React 19 + TypeScript + Tailwind CSS

## Archived Repository

**Repository:** https://github.com/aks129/fhiriqsite
**Branch:** main
**Status:** Can be archived (all valuable content migrated)
**Platform:** Wix Studio + Velo (Legacy)

## Migrated Content

### Documentation (`/docs`)
- Architecture documentation
- Chatbot setup guides
- Information architecture
- PRD (Product Requirements Document)
- Style guides
- Velo bootstrap documentation
- RSS sync scheduling
- Release documentation

### Specifications (`/specs`)
Complete spec-driven development documentation including:
- **Analytics:** KPI framework, GA4 config, PostHog funnels, weekly reporting
- **Content:** Blog/podcast strategy, content plans, homepage/solutions/tools/training content
- **Design System:** Brand guidelines, identity, component library, accessibility, motion
- **Features:** AI chatbot, commerce system, FHIR app builder, FHIR IQ Copilot, tools catalog
- **Integrations:** Third-party APIs, Wix commerce
- **Site Architecture:** CMS data model, sitemap, IA, SEO strategy, technical architecture
- **Strategy:** Competitive analysis, content positioning, design differentiation, roadmap
- **Workflows:** Deployment process, security/compliance, spec-driven development, testing

### Assets (`/assets`)
- Brand assets (logos, colors, typography)
- Mockups and wireframes
- Design files

### Prompts (`/prompts`)
- Claude prompts for CMS model generation
- Wix Velo widget scaffolding prompts
- AI builder scaffolding prompts

### Other Documentation
- `CLAUDE_LEGACY.md` - Original Claude Code guidance from Wix project
- `PARTNERSHIP_LANGUAGE_UPDATE.md` - Partnership language guidelines

## Repository Structure After Consolidation

```
fhiriq-nextjs/
├── .claude/                    # Claude Code configuration
├── .github/                    # GitHub workflows
├── .vercel/                    # Vercel deployment config
├── assets/                     # 🆕 Brand assets from fhiriqsite
├── docs/                       # 🆕 Documentation from fhiriqsite
├── prompts/                    # 🆕 Claude prompts from fhiriqsite
├── public/                     # Next.js public assets
├── specs/                      # 🆕 Specifications from fhiriqsite
├── src/
│   ├── app/                   # Next.js 15 App Router
│   │   ├── about/
│   │   ├── api/              # API routes
│   │   ├── blog/
│   │   ├── builder/
│   │   ├── consulting/       # ✅ Recently fixed
│   │   ├── contact/
│   │   ├── games/
│   │   ├── mappingguide/
│   │   ├── partners/
│   │   ├── podcast/
│   │   ├── portfolio/
│   │   ├── products/
│   │   ├── solutions/
│   │   ├── store/
│   │   ├── tools/
│   │   ├── training/
│   │   └── layout.tsx
│   ├── components/           # React components
│   └── lib/                  # Utilities
├── CLAUDE_API_SETUP.md
├── CLAUDE_LEGACY.md          # 🆕 From fhiriqsite
├── EMAIL_SETUP.md
├── PARTNERSHIP_LANGUAGE_UPDATE.md  # 🆕 From fhiriqsite
├── README.md
├── REPO_CONSOLIDATION.md     # 🆕 This file
├── SUBSTACK_NEWSLETTER_SETUP.md
├── next.config.ts
├── package.json
├── tsconfig.json
└── vercel.json
```

## What Was NOT Migrated

The following were NOT migrated as they were Wix-specific:
- `/wix/` - Wix Velo code
- `/fhiriq/` - Wix site structure
- `/fhiriqsitewix/` - Wix site backup
- `/builder-service/` - Wix builder service code
- `/checklists/` - Wix-specific migration checklists
- `wix.config.js` - Wix configuration

These files are preserved in the archived `fhiriqsite` repository if needed.

## Archival Instructions

Once you've verified the consolidation is complete:

1. **Verify Vercel Deployment:**
   ```bash
   vercel ls
   # Confirm deployments are from fhiriq-nextjs
   ```

2. **Archive fhiriqsite Repository:**
   - Go to https://github.com/aks129/fhiriqsite/settings
   - Scroll to "Danger Zone"
   - Click "Archive this repository"
   - Confirm archival

3. **Update Documentation:**
   - Update any external links pointing to fhiriqsite
   - Update team documentation to reference fhiriq-nextjs only

## Git History Preservation

Both repositories maintain their full git history:
- `fhiriq-nextjs`: Complete commit history preserved
- `fhiriqsite`: Can be unarchived if needed for historical reference

## Deployment Information

**Production URL:** https://fhiriq.com (via Vercel)
**Vercel Project:** fhiriq-nextjs
**GitHub Repository:** https://github.com/aks129/fhiriq-nextjs
**Branch:** master
**Auto-deploy:** Enabled (deploys on push to master)

## Contact

For questions about this consolidation, review the commit history or contact the repository maintainer.

---

**Last Updated:** November 1, 2025
**Consolidation Commit:** 6d79584
