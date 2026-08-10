import type { Metadata } from 'next';
import Link from 'next/link';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import Reveal from '@/components/Reveal';
import PageAnalytics from '@/components/PageAnalytics';

/**
 * The reference desk.
 *
 * This replaces /resources, which was a card list that still advertised
 * Interop Quest, the FHIR App Builder and the Data Quality Analyzer — all
 * archived.
 *
 * The organising idea is competitive rather than cosmetic. Dogwood publishes
 * no free reference material and rides on personal standards authority;
 * Point-of-Care Partners publishes regulatory intelligence, which is policy
 * rather than implementation. Nobody in that set publishes deep technical
 * reference for people actually building, so this is the gap the site can
 * occupy — and the material already existed, it was just scattered across
 * four orphaned routes with no hub.
 *
 * Tracks are ordered by wedge, not by size: agents on health data first,
 * quality measurement second, foundations last. Every entry must point at
 * something real; see the "Only link to things that are live" rule in
 * CLAUDE.md.
 */

export const metadata: Metadata = {
  title: 'Reference — FHIR implementation guides',
  description:
    'Free, implementation-level reference on FHIR: AI agent access patterns, CQL and digital quality measurement, profiling, mapping, and reference architectures.',
};

const SHELL = 'mx-auto max-w-[84rem] px-4 sm:px-6';

type Entry = {
  href: string;
  kind: string;
  title: string;
  desc: string;
  external?: boolean;
};

type Track = {
  label: string;
  heading: string;
  blurb: string;
  entries: Entry[];
};

const TRACKS: Track[] = [
  {
    label: '01 / Agents',
    heading: 'AI on health data',
    blurb:
      'What changes when the client reading a record is a language model rather than an application whose behaviour was fixed before you granted it access.',
    entries: [
      {
        href: '/agentguide',
        kind: 'Reference',
        title: 'Putting AI agents on FHIR data',
        desc: 'Access patterns, SMART v2 scopes, the redaction boundary people miss, audit records that survive review, and the failure modes that show up in practice.',
      },
      {
        href: 'https://healthclaw.io',
        kind: 'Open source',
        title: 'HealthClaw Guardrails',
        desc: 'The broker pattern as running code — redaction, audit and human sign-off enforced server-side rather than requested in a prompt.',
        external: true,
      },
      {
        href: 'https://careagents.cloud',
        kind: 'Open source',
        title: 'CareAgents',
        desc: 'A personal health agent stood up in under a minute, guardrailed by HealthClaw. Useful as a worked example of the whole stack.',
        external: true,
      },
    ],
  },
  {
    label: '02 / Quality',
    heading: 'Digital quality measurement',
    blurb:
      'Measures that actually execute. CQL is the specification language; getting from a published measure to a number you can defend is the part that is rarely written down.',
    entries: [
      {
        href: '/cqlguide',
        kind: 'Guide',
        title: 'CQL for quality measures',
        desc: 'Population criteria, value sets and measurement periods, worked through real CMS measure logic rather than toy examples.',
      },
      {
        href: 'https://openquality.us',
        kind: 'Open source',
        title: 'Open Quality',
        desc: 'An MIT-licensed corpus of quality measures with verified provenance and implementer notes, carrying CQL and SQL side by side.',
        external: true,
      },
    ],
  },
  {
    label: '03 / Foundations',
    heading: 'Modelling and integration',
    blurb:
      'The parts of an implementation that are decided early and are expensive to revisit: how the data is shaped, how it gets in, and how the system is arranged.',
    entries: [
      {
        href: '/architectures',
        kind: 'Guide',
        title: 'FHIR reference architectures',
        desc: 'Eight patterns — facade, clinical data repository, health apps, clinical reasoning, analytics, data lake and more — with the trade-offs that decide between them.',
      },
      {
        href: '/profilingguide',
        kind: 'Guide',
        title: 'FHIR profiling design',
        desc: 'Constraining and extending base resources without breaking the interoperability you adopted FHIR to get.',
      },
      {
        href: '/mappingguide',
        kind: 'Guide',
        title: 'Mapping to FHIR',
        desc: 'Moving HL7 v2, C-CDA and claims data into FHIR resources, and the modelling decisions that make or break the result.',
      },
    ],
  },
];

function Card({ e }: { e: Entry }) {
  const inner = (
    <>
      <span className="label label-bright">{e.kind}</span>
      <span className="mt-2.5 block text-xl leading-snug text-fg">
        {e.title}
        {e.external && (
          <span aria-hidden className="ml-1.5 text-fg-3">
            ↗
          </span>
        )}
      </span>
      <span className="measure-tight mt-2 block text-sm leading-relaxed text-fg-2">
        {e.desc}
      </span>
    </>
  );

  const cls =
    'group block h-full min-w-0 border-b border-line py-6 transition-colors lg:border-r lg:px-5 lg:last:border-r-0';

  return e.external ? (
    <a href={e.href} className={cls}>
      {inner}
    </a>
  ) : (
    <Link href={e.href} className={cls}>
      {inner}
    </Link>
  );
}

export default function ReferencePage() {
  return (
    <div className="min-h-screen bg-bg">
      <PageAnalytics page="reference" />
      <Reveal />
      <Nav />

      {/* ------------------------------------------------------------- hero */}
      <section className={`${SHELL} pb-14 pt-14 md:pb-20 md:pt-20`}>
        <div className="grid min-w-0 gap-8 md:grid-cols-[8.5rem_minmax(0,1fr)] md:gap-12">
          <p className="label label-bright md:pt-3">Reference</p>
          <div className="min-w-0">
            <h1 className="max-w-[52rem] text-display tracking-tight text-fg">
              Implementation reference, free
            </h1>
            <p className="measure mt-6 text-lg leading-relaxed text-fg-2">
              Most of what is published about FHIR is either specification —
              precise and enormous — or vendor material. The gap in between is
              the part practitioners actually need: what the trade-offs are,
              which decisions are expensive to reverse, and what breaks in
              production.
            </p>
            <p className="measure mt-4 text-lg leading-relaxed text-fg-2">
              These are written from implementation work, not from reading the
              spec back to you. No signup, no gate.
            </p>
          </div>
        </div>
      </section>

      {TRACKS.map((t) => (
        <section key={t.label} className="border-t border-line">
          <div className={`${SHELL} py-16 md:py-24`}>
            <div className="grid min-w-0 gap-8 md:grid-cols-[8.5rem_minmax(0,1fr)] md:gap-12">
              <p className="label label-bright md:pt-3">{t.label}</p>
              <div className="min-w-0">
                <div className="reveal">
                  <h2 className="text-title tracking-tight text-fg">
                    {t.heading}
                  </h2>
                  <p className="measure mt-5 text-lg leading-relaxed text-fg-2">
                    {t.blurb}
                  </p>
                </div>

                <ul className="reveal mt-10 grid min-w-0 border-t border-line sm:grid-cols-2 lg:grid-cols-3">
                  {t.entries.map((e) => (
                    <li key={e.href} className="min-w-0">
                      <Card e={e} />
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* -------------------------------------------------------- advisory */}
      <section className="border-t border-line">
        <div className={`${SHELL} py-16 md:py-24`}>
          <div className="grid min-w-0 gap-8 md:grid-cols-[8.5rem_minmax(0,1fr)] md:gap-12">
            <p className="label label-bright md:pt-3">Advisory</p>
            <div className="reveal min-w-0">
              <h2 className="text-title tracking-tight text-fg">
                When the reading runs out
              </h2>
              <p className="measure mt-5 text-lg leading-relaxed text-fg-2">
                These cover the general case. If you are deciding something
                specific — an architecture, an agent access model, a measure
                that has to survive audit — that is what the advisory work is
                for.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href="https://calendar.app.google/TMvRGiiYfbBKNd889"
                  className="rounded-[6px] bg-fg px-4 py-2.5 text-sm font-medium text-bg transition-opacity hover:opacity-85"
                >
                  Book a call
                </a>
                <Link
                  href="/consulting"
                  className="chip px-4 py-2.5 text-sm text-fg-2 transition-colors hover:text-fg"
                >
                  How engagements work
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
