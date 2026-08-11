import type { Metadata } from 'next';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import Reveal from '@/components/Reveal';

/**
 * The Lab — the open-source work, framed as what it is.
 *
 * This page used to read as a portfolio: "things that are running", proof
 * that the consultant can build. That undersells it and gets the direction
 * of the relationship backwards. These are tools other people can use
 * without engaging anyone, and that is the point of them.
 *
 * The competitive fact underneath: Dogwood publishes nothing free, and
 * Point-of-Care Partners gates some of its material. Running four things in
 * the open is the part of this practice neither of them has, so it should
 * be stated plainly rather than left as a credibility prop.
 *
 * Every entry is verified against the Vercel production list and the
 * non-archived GitHub repos before being written; nothing goes here without
 * a live URL. Descriptions are taken from what each site actually does, not
 * from memory — including AINPI's own disclosure that its aggregate view is
 * still running on synthetic seed data. Do not quietly drop that note to
 * make the list look stronger.
 */

export const metadata: Metadata = {
  title: 'The Lab',
  description:
    'Open-source healthcare interoperability tools anyone can use: HealthClaw guardrails for AI agents, CareAgents, the Open Quality measure corpus, and the AINPI provider directory audit.',
};

type Project = {
  name: string;
  href: string;
  label: string;
  desc: string;
  gives: string;
  note?: string;
  tags: string[];
  repo?: string;
};

const PROJECTS: Project[] = [
  {
    name: 'HealthClaw Guardrails',
    href: 'https://healthclaw.io',
    label: 'healthclaw.io',
    desc: 'A trusted framework for putting AI agents on health data. Redaction, audit and human sign-off are enforced server-side, so an agent cannot read PHI unredacted or write to a chart without an approval step.',
    gives:
      'A policy broker you can run in front of your own FHIR server, rather than a set of rules you ask a model to follow.',
    tags: ['12 MCP tools', 'FHIR R4/R6', 'US Core v9', 'PHI redaction', 'Audit log'],
    repo: 'https://github.com/aks129/HealthClawGuardrails',
  },
  {
    name: 'CareAgents',
    href: 'https://careagents.cloud',
    label: 'careagents.cloud',
    desc: 'A personal health agent you can stand up in under a minute, integrated and guardrailed by HealthClaw. Every read redacted, every access audited, every action approved by the person whose data it is.',
    gives:
      'Somewhere to watch the guardrails work end to end before you commit to building on them.',
    tags: ['Personal health agent', 'Guardrailed by HealthClaw'],
  },
  {
    name: 'Open Quality',
    href: 'https://openquality.us',
    label: 'openquality.us',
    desc: 'An open corpus of quality measures, and a shared record of what implementers have learned about each one. CQL and SQL next to the measure instead of buried in a specification PDF.',
    gives:
      '52 CMS eCQM packages for the 2026 reporting year with provenance verified in CI, an oq CLI that validates and packs them, and three conformance levels so a shared measure is distinguishable from a verified one. Open licences only, checked against an SPDX allowlist; value sets are referenced rather than embedded so the licensing stays machine-enforceable.',
    tags: ['52 eCQM packages', 'CQL + SQL', 'CI-verified provenance', 'oq CLI'],
    repo: 'https://github.com/FHIR-IQ/openquality',
  },
  {
    name: 'AINPI',
    href: 'https://ainpi.dev',
    label: 'ainpi.dev',
    desc: 'An audit of how accurate the federal provider directory actually is, scored across every state and specialty on six dimensions: field completeness, cross-source agreement, currency, endpoint reachability, federal integrity and specialty validity. Scoring is mapped to the REAL Health Providers Act.',
    gives:
      'Per-provider verification against primary sources — click through to check an NPI against the NPPES registry, the OIG exclusion list and SAM.gov, with no login in the way.',
    note: 'The aggregate visualisation currently runs on a deterministic synthetic seed while the measurement pipeline is wired up, and the site says so on the page rather than letting anyone cite a number that has not been measured yet.',
    tags: ['NPPES', 'OIG exclusions', 'SAM.gov', 'REAL Health Providers Act'],
    repo: 'https://github.com/FHIR-IQ/AINPI',
  },
];

const SHELL = 'mx-auto max-w-[84rem] px-4 sm:px-6';

export default function Lab() {
  return (
    <div className="min-h-screen bg-bg">
      <Reveal />
      <Nav />

      <section className={`${SHELL} pb-14 pt-14 md:pb-20 md:pt-20`}>
        <div className="grid gap-8 md:grid-cols-[8.5rem_minmax(0,1fr)] md:gap-12">
          <p className="label self-start md:pt-4">The Lab</p>
          <div className="min-w-0">
            <h1 className="max-w-[46rem] text-display tracking-tight text-fg">
              Work you can use <em className="italic">without hiring me</em>
            </h1>
            <p className="measure mt-8 text-lg leading-relaxed text-fg-2">
              Four things run in public: a trusted framework for putting AI
              agents on health data, an agent built on top of it, an open
              corpus of the quality measures the industry keeps rewriting from
              scratch, and an audit of the federal provider directory.
            </p>
            <p className="measure mt-4 text-lg leading-relaxed text-fg-2">
              All of it is open source and usable without talking to anyone.
              Consulting buys the time to build these; it is not what they are
              for. Everything here has a live URL, and if a project gets
              archived it comes off the page.
            </p>
          </div>
        </div>
      </section>

      <section className="border-t border-line">
        <div className={`${SHELL} py-12 md:py-16`}>
          <div className="grid gap-8 md:grid-cols-[8.5rem_minmax(0,1fr)] md:gap-12">
            <p className="label label-bright md:pt-3">Projects</p>
            <div className="min-w-0 border-t border-line">
              {PROJECTS.map((p) => (
                <article
                  key={p.name}
                  className="reveal grid gap-4 border-b border-line py-9 md:grid-cols-[minmax(0,1fr)_14rem] md:gap-10"
                >
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
                      <span className="label label-bright">Live</span>
                      <span className="label border border-line-2 px-2 py-0.5">
                        {p.label}
                      </span>
                    </div>
                    <h2 className="mt-3 text-2xl leading-tight text-fg">
                      {p.name}
                    </h2>
                    <p className="measure mt-3 leading-relaxed text-fg-2">
                      {p.desc}
                    </p>

                    <div className="measure mt-4 border-l border-line-2 pl-4">
                      <p className="label label-bright">What you get</p>
                      <p className="mt-1.5 leading-relaxed text-fg-2">
                        {p.gives}
                      </p>
                    </div>

                    {/*
                      Status caveats are published, not hidden. AINPI discloses
                      on its own site that the aggregate view is seeded with
                      synthetic data; repeating that here is the only honest
                      way to describe it.
                    */}
                    {p.note && (
                      <p className="measure caption mt-4">{p.note}</p>
                    )}

                    <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2">
                      <a
                        href={p.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="border-b border-line-3 pb-0.5 text-sm font-medium text-fg transition-colors hover:border-fg"
                      >
                        Visit {p.label}
                      </a>
                      {p.repo && (
                        <a
                          href={p.repo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-fg-2 transition-colors hover:text-fg"
                        >
                          View source
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
          </div>
        </div>
      </section>

      <section className="border-t border-line">
        <div className={`${SHELL} py-12`}>
          <div className="grid gap-8 md:grid-cols-[8.5rem_minmax(0,1fr)] md:gap-12">
            <p className="label label-bright md:pt-1">More</p>
            <p className="text-sm leading-relaxed text-fg-2">
              Earlier experiments have been archived rather than left running
              as broken links. The full history, including what did not work,
              is on{' '}
              <a
                href="https://github.com/aks129"
                target="_blank"
                rel="noopener noreferrer"
                className="border-b border-line-3 text-fg hover:border-fg"
              >
                GitHub
              </a>
              .
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
