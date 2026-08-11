import Link from 'next/link';
import ChatBot from '@/components/ChatBot';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import Reveal from '@/components/Reveal';
import PageAnalytics from '@/components/PageAnalytics';
import SubscribeForm from '@/components/SubscribeForm';
import TrackedLink from '@/components/TrackedLink';
import TranspileFigure from '@/components/TranspileFigure';
import { getEpisodes, formatEpisodeDate } from '@/lib/podcast';

/**
 * MONO homepage, adapted from agencidev.com.
 *
 * Server component. Every interactive part is a small client island
 * (TranspileFigure, SubscribeForm, TrackedLink, PageAnalytics, Reveal,
 * ChatBot), so the page itself ships no JS of its own.
 * Content and copy are unchanged from the previous build — this pass is
 * visual.
 */

const SHELL = 'mx-auto max-w-[84rem] px-4 sm:px-6';

/** Section with a marginal rail: mono label in the margin, content offset. */
function Section({
  label,
  children,
  className = '',
}: {
  label: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={`border-t border-line ${className}`}>
      <div className={`${SHELL} py-16 md:py-24`}>
        <div className="grid min-w-0 gap-8 md:grid-cols-[8.5rem_minmax(0,1fr)] md:gap-12">
          <p className="label label-bright md:pt-3">{label}</p>
          <div className="min-w-0">{children}</div>
        </div>
      </div>
    </section>
  );
}

function H2({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-title tracking-tight text-fg">
      {children}
    </h2>
  );
}

// The URLs this list previously carried were guesses — /show/outofthefhir
// and /podcast/out-of-the-fhir returned 400 and 404. These are the real
// ones, already in use on /podcast and each verified to return 200.
const PLATFORMS = [
  {
    href: 'https://evestel.substack.com/podcast',
    label: 'Substack',
    path: 'M22.539 8.242H1.46V5.406h21.08v2.836zM1.46 10.812V24L12 18.11 22.54 24V10.812H1.46zM22.54 0H1.46v2.836h21.08V0z',
  },
  {
    href: 'https://open.spotify.com/show/6GBZT7KA1Ug8xMZ4l5LThU',
    label: 'Spotify',
    path: 'M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z',
  },
  {
    href: 'https://podcasts.apple.com/us/podcast/out-of-the-fhir-podcast/id1822845248',
    label: 'Apple',
    path: 'M5.34 0A5.328 5.328 0 000 5.34v13.32A5.328 5.328 0 005.34 24h13.32A5.328 5.328 0 0024 18.66V5.34A5.328 5.328 0 0018.66 0H5.34zm6.525 2.568c4.988 0 8.94 3.16 9.69 7.62.09.42-.18.84-.6.93-.42.09-.84-.18-.93-.6C19.38 6.78 16.08 4.08 12 4.08c-4.08 0-7.38 2.7-8.025 6.438-.09.42-.51.69-.93.6-.42-.09-.69-.51-.6-.93.75-4.46 4.702-7.62 9.42-7.62zm.135 3.24c3.24 0 5.835 2.34 6.36 5.46.06.42-.24.81-.66.87-.42.06-.81-.24-.87-.66-.39-2.34-2.46-4.17-4.83-4.17s-4.44 1.83-4.83 4.17c-.06.42-.45.72-.87.66a.738.738 0 01-.66-.87c.525-3.12 3.12-5.46 6.36-5.46zm-.075 3.306A3.024 3.024 0 0114.94 12c0 1.32-.84 2.43-2.01 2.82v4.02c0 .51-.42.93-.93.93a.934.934 0 01-.93-.93v-4.02A3.006 3.006 0 019 12a3.024 3.024 0 012.925-3.006z',
  },
  {
    href: 'https://www.youtube.com/@OutoftheFHIRPodcast',
    label: 'YouTube',
    path: 'M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814z M9.545 15.568V8.432L15.818 12l-6.273 3.568z',
  },
] as const;

const CREDENTIALS = [
  { label: 'Outcomes', detail: 'Payer Interoperability Analytics & AI Lead' },
  { label: 'SQL on FHIR', detail: 'HL7 working group' },
  // A defined engagement (Apr–Aug 2025), not a standing role. The site used
  // to say "NCQA advisor" in the present tense in four places, "Former NCQA
  // Advisor" in a fifth and "NCQA collaborator" in a sixth.
  { label: 'NCQA', detail: 'Consultant · 2025' },
  { label: 'b.well Connected Health', detail: 'Director of Data & Analytics' },
  { label: 'UPMC Health System', detail: '5 years in Clinical Analytics' },
  { label: 'HL7 FHIR DevDays', detail: 'Speaker · HealthClaw' },
] as const;

/**
 * Standards work.
 *
 * This is the section that answers Dogwood, whose authority is personal
 * rather than published — their site carries no free reference material
 * because Lloyd McKenzie's name does the work. The counter is not to claim
 * more, it is to show where the work actually happens and let it be checked.
 *
 * Every line here is either independently verifiable or Eugene's own work
 * history. Nothing is inferred. In particular there is no named
 * implementation-guide authorship or co-chair role, because that has not
 * been confirmed — see the note in CLAUDE.md before adding one.
 */
const STANDARDS = [
  {
    heading: 'Working groups',
    items: [
      {
        name: 'SQL on FHIR',
        detail:
          'HL7 working group behind ViewDefinition — the specification underneath the CQL-to-SQL work above, and the ViewDefinition packs in the library.',
      },
      {
        name: 'Agents on FHIR',
        detail:
          'Weekly working group on what it takes to put agents against clinical data safely.',
      },
      {
        name: 'Quality measurement community',
        detail:
          'Early CQL practitioner, and among the first doing CQL-to-SQL conversion for measures that have to execute at scale.',
      },
    ],
  },
  {
    heading: 'Speaking',
    items: [
      {
        name: 'HL7 FHIR DevDays',
        detail: 'Presented HealthClaw — guardrails between AI agents and FHIR data.',
      },
      { name: 'Analytics on FHIR', detail: 'Conference speaker, 2025.' },
      { name: 'FHIR Camp', detail: '2025.' },
    ],
  },
] as const;

const PROJECTS = [
  {
    status: 'Live',
    name: 'HealthClaw Guardrails',
    body: 'A security layer between AI agents and clinical data. Redacts PHI on every read, enforces multi-step human approval for clinical writes — proposal, permission evaluation, HMAC confirmation, immutable audit log — and keeps your health agent interactions HIPAA-compliant.',
    tags: [
      '12 MCP Tools',
      'PHI Redaction',
      'FHIR R4/R6',
      'US Core v9',
      'Fasten Connect',
      'Local SQLite',
    ],
    site: { href: 'https://healthclaw.io', label: 'healthclaw.io' },
    repo: 'https://github.com/aks129/HealthClawGuardrails',
  },
  {
    status: 'Live',
    name: 'CareAgents',
    body: 'Spin up a personal health agent in under a minute. Every read redacted, every access audited, every action approved by you — guardrailed by HealthClaw. This is what the guardrail layer looks like once a person is actually using it.',
    tags: ['Personal health agent', 'Redacted reads', 'Audited access', 'Human approval'],
    site: { href: 'https://careagents.cloud', label: 'careagents.cloud' },
    repo: null,
  },
  {
    status: 'Live',
    name: 'Open Quality',
    body: '52 CMS eCQM packages for the 2026 reporting year, with provenance verified in CI and a CLI that validates and packs them. Alongside the measures sits a typed record of what implementers have actually learned about each one. CQL and SQL next to the measure, not buried in a PDF.',
    tags: ['52 eCQM packages', 'CI-verified provenance', 'CQL + SQL', 'oq CLI'],
    site: { href: 'https://openquality.us', label: 'openquality.us' },
    repo: 'https://github.com/FHIR-IQ/openquality',
  },
  {
    // Described from what the tool does rather than as vague "ecosystem
    // analysis". The synthetic-seed caveat is stated in full on /lab; keep
    // this card's claims to the methodology and the per-NPI checks, which
    // are live.
    status: 'Live',
    name: 'AINPI',
    body: 'An audit of how accurate the federal provider directory actually is, scored across every state and specialty on six dimensions. Click through to verify an individual NPI against the NPPES registry, the OIG exclusion list and SAM.gov, with no login in the way. Scoring is mapped to the REAL Health Providers Act.',
    tags: [
      'Provider directory audit',
      'NPPES',
      'OIG exclusions',
      'SAM.gov',
      'REAL Health Providers Act',
    ],
    site: { href: 'https://ainpi.dev', label: 'ainpi.dev' },
    repo: 'https://github.com/FHIR-IQ/AINPI',
  },
] as const;

// The agent reference leads deliberately. It is the one subject here that
// neither Dogwood nor Point-of-Care Partners covers, and the only one backed
// by shipped code, so it is the strongest thing to put first.
const RESOURCES = [
  {
    href: '/agentguide',
    kind: 'Reference',
    title: 'AI Agents on FHIR',
    desc: 'Access patterns, scopes, redaction and audit',
  },
  {
    href: '/architectures',
    kind: 'Reference',
    title: 'FHIR Architectures',
    desc: 'Proven architecture patterns for FHIR systems',
  },
  {
    href: '/cqlguide',
    kind: 'Guide',
    title: 'CQL Quality Measures',
    desc: 'Implement quality measures using CQL',
  },
  {
    href: '/profilingguide',
    kind: 'Guide',
    title: 'FHIR Profiling',
    desc: 'Data modeling and profiling best practices',
  },
] as const;

const ADVISORY = [
  'FHIR implementation strategy',
  'Data architecture & pipelines',
  'Quality measure implementation',
  'SQL on FHIR adoption',
  'AI & LLM integration',
  'Team training & enablement',
] as const;

function GitHubMark() {
  return (
    <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
      />
    </svg>
  );
}

export default async function Home() {
  const episodes = await getEpisodes(4);

  return (
    <div className="min-h-screen bg-bg">
      <PageAnalytics page="home" />
      <Reveal />
      <Nav />

      {/* ------------------------------------------------------------ hero */}
      <section className={`${SHELL} pb-14 pt-14 md:pb-20 md:pt-20`}>
        <div className="grid gap-8 md:grid-cols-[8.5rem_minmax(0,1fr)] md:gap-12">
          <p className="label flex items-start gap-2.5 self-start leading-relaxed md:pt-4">
            <span
              aria-hidden="true"
              className="mt-[5px] inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-fg"
            />
            <span>Out of the FHIR Podcast · New episodes weekly</span>
          </p>

          <div className="min-w-0">
            <h1 className="max-w-[52rem] text-display tracking-tight text-fg">
              I help healthcare orgs make sense of{' '}
              <em className="italic text-fg">
                FHIR, AI, and quality measurement
              </em>
            </h1>

            <p className="measure mt-8 text-lg leading-relaxed text-fg-2">
              I&apos;m Eugene Vestel. Through consulting, open-source tools, and
              the Out of the FHIR podcast, I help teams navigate healthcare
              interoperability and turn data into outcomes.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <TrackedLink
                href="https://evestel.substack.com"
                event="hero_cta_clicked"
                payload={{ button: 'subscribe_playbook' }}
                external
                className="btn-primary"
              >
                Subscribe to the Playbook
              </TrackedLink>
              <TrackedLink
                href="/podcast"
                event="hero_cta_clicked"
                payload={{ button: 'listen_podcast' }}
                className="btn-secondary"
              >
                Listen to the Podcast
              </TrackedLink>
            </div>

            <p className="label mt-9 border-t border-line pt-4 leading-relaxed">
              Payer Interoperability Analytics &amp; AI Lead at Outcomes ·
              Former NCQA consultant · 15+ years in healthcare data
            </p>
          </div>
        </div>
      </section>

      {/* -------------------------------------------- the signature moment */}
      {/* Fig. 1 gets its own band. Inside the hero column the code panes were
          277px wide against 492px of content, so both were clipped. */}
      <section className="border-t border-line bg-bg-2">
        <div className={`${SHELL} py-12 md:py-16`}>
          <div className="grid min-w-0 gap-8 md:grid-cols-[8.5rem_minmax(0,1fr)] md:gap-12">
            <div className="min-w-0 md:pt-3">
              <p className="label label-bright">Figure 1</p>
              <p className="caption mt-2 leading-snug">
                What &ldquo;quality measurement&rdquo; looks like when it stops
                being a slide.
              </p>
            </div>
            <TranspileFigure />
          </div>
        </div>
      </section>

      {/*
        Credential wall. The reference renders its client list with each name
        in a different typeface, which is what makes a plain row of words read
        as a considered object. Same move here across the three faces the
        system already loads, so it costs no extra weight.
      */}
      <section className="border-y border-line">
        <div className={`${SHELL} py-8`}>
          <p className="label mb-6">Track record</p>
          <ul className="grid grid-cols-2 gap-x-8 gap-y-7 md:grid-cols-3 lg:grid-cols-6">
            {CREDENTIALS.map((c, i) => (
              <li key={c.label}>
                <p
                  className={[
                    'leading-snug text-fg',
                    i % 3 === 0
                      ? 'text-[17px] tracking-tight'
                      : i % 3 === 1
                        ? 'serif text-[19px]'
                        : 'font-mono text-[14px] tracking-tight',
                  ].join(' ')}
                >
                  {c.label}
                </p>
                <p className="mt-1.5 text-xs leading-snug text-fg-3">
                  {c.detail}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ------------------------------------------------------- standards */}
      <Section label="Standards">
        <div className="reveal">
          <H2>Where the work happens</H2>
          <p className="measure mt-5 text-lg leading-relaxed text-fg-2">
            I hired and led{' '}
            <span className="text-fg">b.well Connected Health</span>&apos;s first
            FHIR team, stood up Analytics on FHIR there, and mapped the data for
            the interoperability platform now behind{' '}
            <span className="text-fg">Samsung Health</span> and{' '}
            <span className="text-fg">Fitbit</span>&apos;s medical records. The
            standards work below is where that experience keeps getting tested
            against other implementers.
          </p>
        </div>

        <div className="reveal mt-10 grid gap-10 border-t border-line pt-8 lg:grid-cols-2 lg:gap-16">
          {STANDARDS.map((group) => (
            <div key={group.heading} className="min-w-0">
              <p className="label label-bright">{group.heading}</p>
              <dl className="mt-5 space-y-5">
                {group.items.map((it) => (
                  <div key={it.name} className="min-w-0">
                    <dt className="text-lg leading-snug text-fg">{it.name}</dt>
                    <dd className="measure-tight mt-1 text-sm leading-relaxed text-fg-2">
                      {it.detail}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          ))}
        </div>
      </Section>

      {/* --------------------------------------------------------- podcast */}
      <Section label="Podcast">
        <div className="grid gap-12 lg:grid-cols-[1fr_minmax(0,0.85fr)] lg:gap-16">
          <div className="reveal">
            <H2>Out of the FHIR</H2>
            <p className="measure mt-5 text-lg leading-relaxed text-fg-2">
              Weekly conversations with the people building the future of
              healthcare interoperability. From HL7 work group chairs to startup
              founders to CMS policy makers — the stories behind the standards.
            </p>

            <ul className="mt-7 flex flex-wrap gap-2">
              {PLATFORMS.map((p) => (
                <li key={p.label}>
                  <a
                    href={p.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 border border-line-2 px-3 py-1.5 text-sm text-fg-2 transition-colors hover:border-fg hover:text-fg"
                  >
                    <svg
                      className="h-3.5 w-3.5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path d={p.path} />
                    </svg>
                    {p.label}
                  </a>
                </li>
              ))}
            </ul>

            <Link
              href="/podcast"
              className="mt-7 inline-block border-b border-fg pb-0.5 text-sm font-medium text-fg transition-colors hover:border-fg hover:text-fg"
            >
              Browse all episodes
            </Link>
          </div>

          {/* Real episodes from the Substack feed. If the feed is
              unreachable we say so and link out, rather than rendering an
              empty list or inventing placeholders. */}
          <div className="reveal">
            <p className="label border-b border-line pb-2">Latest episodes</p>
            {episodes.length > 0 ? (
              <ul>
                {episodes.map((ep) => (
                  <li key={ep.link} className="border-b border-line py-4">
                    <a
                      href={ep.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group block"
                    >
                      <p className="text-lg leading-snug text-fg group-hover:underline">
                        {ep.title}
                      </p>
                      <p className="label mt-2">
                        {formatEpisodeDate(ep.date)}
                      </p>
                    </a>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="py-4 text-sm leading-relaxed text-fg-2">
                Episode list is loading from Substack.{' '}
                <a
                  href="https://evestel.substack.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border-b border-line-3 text-fg hover:border-fg"
                >
                  Browse every episode there
                </a>
                .
              </p>
            )}
          </div>
        </div>
      </Section>

      {/* ------------------------------------------------------ newsletter */}
      <Section label="Newsletter">
        <div className="grid gap-12 lg:grid-cols-[1fr_minmax(0,0.8fr)] lg:gap-16">
          <div className="reveal">
            <H2>The FHIR IQ Playbook</H2>
            <p className="measure mt-5 text-lg leading-relaxed text-fg-2">
              A weekly newsletter on FHIR implementation, quality measurement,
              healthcare AI, and the tools and standards shaping
              interoperability. Written for the people doing the actual work.
            </p>
            <p className="caption mt-4">
              Read by 450+ healthcare data professionals · Presented at
              Analytics on FHIR 2025
            </p>
          </div>

          <div className="reveal lg:pt-2">
            <SubscribeForm location="main_section" cta="Subscribe Free" />
            <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-1.5">
              {['Weekly insights', 'No spam, ever', 'Unsubscribe anytime'].map(
                (t) => (
                  <li key={t} className="label">
                    {t}
                  </li>
                ),
              )}
            </ul>
          </div>
        </div>
      </Section>

      {/* ----------------------------------------------------- open source */}
      <Section label="Open Source">
        <div className="reveal">
          {/*
            Framed as a contribution rather than as a portfolio. These are
            usable by anyone without an engagement, which is the part of this
            practice that Dogwood (publishes nothing free) and Point-of-Care
            Partners (gates some material) do not have. Saying so plainly
            beats letting them read as credibility props for the consulting.
          */}
          <H2>Open work, not a portfolio</H2>
          <p className="measure mt-5 text-lg leading-relaxed text-fg-2">
            A trusted framework for putting AI agents on health data, a
            personal care agent built on top of it, an open corpus of the
            quality measures the whole industry keeps rewriting from scratch,
            and an audit of the federal provider directory. All open source,
            all running, all usable without hiring anyone.
          </p>
          <ul className="mt-5 flex flex-wrap gap-x-6 gap-y-2">
            {[
              {
                href: 'https://open.substack.com/pub/evestel/p/building-a-new-empowered-health-system',
                label: 'Building a New Empowered Health System',
              },
              {
                href: 'https://open.substack.com/pub/evestel/p/how-i-build-my-personal-openclaw',
                label: 'How I Build My Personal OpenClaw',
              },
            ].map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border-b border-line-2 pb-0.5 text-sm text-fg-2 transition-colors hover:border-fg hover:text-fg"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-12 border-t border-line">
          {PROJECTS.map((p) => (
            <article
              key={p.name}
              className="reveal grid gap-4 border-b border-line py-9 md:grid-cols-[minmax(0,1fr)_14rem] md:gap-10"
            >
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
                  <span className="label label-bright">{p.status}</span>
                  {p.site && (
                    <span className="label border border-line-2 px-2 py-0.5">
                      {p.site.label}
                    </span>
                  )}
                </div>
                <h3 className="mt-3 text-2xl leading-tight text-fg">
                  {p.name}
                </h3>
                <p className="measure mt-3 leading-relaxed text-fg-2">
                  {p.body}
                </p>
                <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2">
                  {p.site && (
                    <a
                      href={p.site.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="border-b border-fg pb-0.5 text-sm font-medium text-fg transition-colors hover:border-fg hover:text-fg"
                    >
                      Visit {p.site.label}
                    </a>
                  )}
                  {p.repo && (
                    <a
                      href={p.repo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-sm text-fg-2 transition-colors hover:text-fg"
                    >
                      <GitHubMark />
                      View on GitHub
                    </a>
                  )}
                </div>
              </div>

              <ul className="flex flex-wrap content-start gap-1.5 md:border-l md:border-line md:pl-6">
                {p.tags.map((t) => (
                  <li key={t} className="label border border-line px-2 py-1">
                    {t}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        <div className="mt-6 flex flex-wrap items-baseline gap-x-4 gap-y-1">
          <p className="caption">
            More experiments in progress — Curatr Skills and others
          </p>
          <a
            href="https://github.com/aks129"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-fg-2 transition-colors hover:text-fg"
          >
            <GitHubMark />
            See all projects on GitHub
          </a>
        </div>
      </Section>

      {/* -------------------------------------------------------- resources */}
      <Section label="Resources">
        <div className="reveal">
          <H2>Free guides &amp; references</H2>
          <p className="measure mt-5 text-lg leading-relaxed text-fg-2">
            Practical resources I&apos;ve written based on real implementation
            experience.
          </p>
        </div>

        <ul className="reveal mt-10 grid border-t border-line sm:grid-cols-2 lg:grid-cols-4">
          {RESOURCES.map((r) => (
            <li
              key={r.href}
              className="border-b border-line lg:border-r lg:last:border-r-0"
            >
              <Link
                href={r.href}
                className="group block h-full px-0 py-6 transition-colors lg:px-5"
              >
                <span className="label label-bright">{r.kind}</span>
                <span className="mt-2.5 block text-xl leading-snug text-fg group-hover:text-fg">
                  {r.title}
                </span>
                <span className="mt-1.5 block text-sm leading-snug text-fg-2">
                  {r.desc}
                </span>
              </Link>
            </li>
          ))}
        </ul>

        <Link
          href="/reference"
          className="mt-7 inline-block border-b border-fg pb-0.5 text-sm font-medium text-fg transition-colors hover:border-fg hover:text-fg"
        >
          View all resources
        </Link>
      </Section>

      {/* --------------------------------------------------------- advisory */}
      <Section label="Advisory">
        <div className="grid gap-12 lg:grid-cols-[1fr_minmax(0,0.8fr)] lg:gap-16">
          <div className="reveal">
            <H2>Work with me</H2>
            <p className="measure mt-5 text-lg leading-relaxed text-fg-2">
              I advise healthcare organizations on FHIR implementation strategy,
              data architecture, quality measurement, and AI readiness. Whether
              you&apos;re starting your FHIR journey or optimizing an existing
              implementation, I can help you move faster and avoid common
              pitfalls.
            </p>
            <TrackedLink
              href="https://calendar.app.google/TMvRGiiYfbBKNd889"
              event="advisory_cta_clicked"
              payload={{ button: 'book_call' }}
              external
              className="btn-primary mt-7"
            >
              Book a Call
            </TrackedLink>
          </div>

          <ul className="reveal border-t border-line lg:pt-1">
            {ADVISORY.map((item) => (
              <li
                key={item}
                className="flex items-baseline gap-3 border-b border-line py-3"
              >
                <span aria-hidden="true" className="h-px w-3 shrink-0 bg-line-3" />
                <span className="text-sm text-fg">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      {/* -------------------------------------------------------- final CTA */}
      <Section label="Stay in touch">
        <div className="grid gap-10 lg:grid-cols-[1fr_minmax(0,0.8fr)] lg:gap-16">
          <div className="reveal">
            <H2>Stay in the loop</H2>
            <p className="measure mt-5 leading-relaxed text-fg-2">
              Join 450+ healthcare data professionals getting weekly insights on
              FHIR, AI, and quality measurement. Read by engineers, architects,
              and analysts at health systems, payers, and vendors.
            </p>
          </div>
          <div className="reveal lg:pt-2">
            <SubscribeForm location="footer_section" />
          </div>
        </div>
      </Section>

      <Footer />
      <ChatBot />
    </div>
  );
}
