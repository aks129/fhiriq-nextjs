import type { Metadata } from 'next';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import Reveal from '@/components/Reveal';

/**
 * The Lab — what is actually running.
 *
 * Every entry here was verified against the Vercel production list and the
 * non-archived GitHub repos before being written. The previous version listed
 * five tools, all of which 404'd: the ViewDefinition Library and FHIRSquire
 * routes had been retired, and fhirspective, agent-inter-op and s77 are
 * archived. Nothing goes on this page without a live URL.
 */

export const metadata: Metadata = {
  title: 'The Lab',
  description:
    'Open-source healthcare AI and interoperability projects that are actually running: HealthClaw, CareAgents, Open Quality and AINPI.',
};

type Project = {
  name: string;
  href: string;
  label: string;
  desc: string;
  tags: string[];
  repo?: string;
};

const PROJECTS: Project[] = [
  {
    name: 'HealthClaw Guardrails',
    href: 'https://healthclaw.io',
    label: 'healthclaw.io',
    desc: 'An open-source guardrail layer between AI agents and FHIR health data. Redaction, audit and human sign-off are enforced server-side, so an agent cannot read PHI unredacted or write to a chart without an approval step.',
    tags: ['MCP', 'FHIR R4/R6', 'PHI redaction', 'Audit log'],
    repo: 'https://github.com/aks129/HealthClawGuardrails',
  },
  {
    name: 'CareAgents',
    href: 'https://careagents.cloud',
    label: 'careagents.cloud',
    desc: 'A personal care agent you can stand up in under a minute. Every read redacted, every access audited, every action approved by you. This is HealthClaw with a person actually using it.',
    tags: ['Personal health agent', 'Guardrailed by HealthClaw'],
  },
  {
    name: 'Open Quality',
    href: 'https://openquality.us',
    label: 'openquality.us',
    desc: 'An open, MIT-licensed corpus of healthcare quality measures with verified provenance, plus a typed record of what implementers have learned about each one. CQL and SQL next to the measure instead of buried in a specification PDF.',
    tags: ['MIT licensed', 'CQL + SQL', 'Verified provenance'],
    repo: 'https://github.com/FHIR-IQ/openquality',
  },
  {
    name: 'AINPI',
    href: 'https://ainpi.dev',
    label: 'ainpi.dev',
    desc: 'An ongoing analysis of the CMS health tech ecosystem and the national provider directory modernization effort. Mapping the players, the standards and the FHIR-based architecture behind the next directory.',
    tags: ['CMS ecosystem', 'NPPES', 'Policy analysis'],
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
              Things that are <em className="italic">running</em>
            </h1>
            <p className="measure mt-8 text-lg leading-relaxed text-fg-2">
              Open-source healthcare AI and interoperability work. Everything
              on this page has a live URL — if a project gets archived, it
              comes off.
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
