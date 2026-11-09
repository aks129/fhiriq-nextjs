import type { Metadata } from 'next';
import Link from 'next/link';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import Reveal from '@/components/Reveal';
import PageAnalytics from '@/components/PageAnalytics';
import ContactCTA from '@/components/ContactCTA';
import { BIO } from '@/lib/profile';
import { INTRO_CALL, OTHER, REVIEWS, type Engagement } from '@/lib/engagements';

/**
 * How engagements work.
 *
 * Rebuilt in the October 2026 QA pass. The previous page carried a "Most
 * Popular" badge, "Many clients come back", "10+ years implementing FHIR"
 * (FHIR work starts in 2022), a "View Case Studies" button with no case
 * studies behind it, and a five-step "proven process". Client work is
 * confidential, so the proof here is the public work, and the offers are
 * described by scope and deliverables, which the reader can hold me to.
 *
 * Offers and prices live in src/lib/engagements.ts; facts about Eugene live in
 * src/lib/profile.ts.
 */

export const metadata: Metadata = {
  title: 'Work with me',
  description:
    'Fixed-scope reviews for AI agents on FHIR data, digital quality measures and patient-access apps, plus code review, training and ongoing advisory. Scope, deliverables and starting prices.',
};

const SHELL = 'mx-auto max-w-[84rem] px-4 sm:px-6';

function Section({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <section className="border-t border-line">
      <div className={`${SHELL} py-16 md:py-24`}>
        <div className="grid min-w-0 gap-8 md:grid-cols-[8.5rem_minmax(0,1fr)] md:gap-12">
          <p className="label label-bright md:pt-3">{label}</p>
          <div className="min-w-0">{children}</div>
        </div>
      </div>
    </section>
  );
}

function Offer({ e }: { e: Engagement }) {
  const external = e.reading?.href.startsWith('http');
  return (
    <article id={e.id} className="reveal grid gap-6 border-b border-line py-9 md:grid-cols-[minmax(0,1fr)_14rem] md:gap-10">
      <div className="min-w-0">
        <h3 className="text-2xl leading-tight text-fg">{e.name}</h3>
        <p className="measure mt-2 leading-relaxed text-fg-2">{e.forWho}</p>
        <p className="label mt-6">You get</p>
        <ul className="measure mt-3 space-y-2">
          {e.deliverables.map((d) => (
            <li key={d} className="flex gap-3 text-sm leading-relaxed text-fg-2">
              <span aria-hidden="true" className="mt-[0.7em] h-px w-3 shrink-0 bg-line-3" />
              <span>{d}</span>
            </li>
          ))}
        </ul>
        {e.reading &&
          (external ? (
            <a
              href={e.reading.href}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-block border-b border-line-3 pb-0.5 text-sm text-fg-2 transition-colors hover:border-fg hover:text-fg"
            >
              {e.reading.label}
            </a>
          ) : (
            <Link
              href={e.reading.href}
              className="mt-6 inline-block border-b border-line-3 pb-0.5 text-sm text-fg-2 transition-colors hover:border-fg hover:text-fg"
            >
              {e.reading.label}
            </Link>
          ))}
      </div>
      <dl className="flex gap-8 md:block md:space-y-4 md:border-l md:border-line md:pl-6">
        <div>
          <dt className="label">Price</dt>
          <dd className="mt-1 text-lg text-fg">{e.price}</dd>
        </div>
        <div>
          <dt className="label">Duration</dt>
          <dd className="mt-1 text-sm text-fg-2">{e.duration}</dd>
        </div>
      </dl>
    </article>
  );
}

const STEPS = [
  {
    name: 'Intro call',
    detail: `${INTRO_CALL}. You describe the decision; I tell you whether I am the right person for it, and if not, who might be.`,
  },
  {
    name: 'Written scope',
    detail: 'A short proposal: what I will look at, what you get, the price and the dates.',
  },
  {
    name: 'The work',
    detail: 'Done in your environment, under your agreements, including a BAA where one is needed.',
  },
  {
    name: 'Handover',
    detail: 'Written deliverables your team keeps. No ongoing obligation.',
  },
] as const;

const PUBLIC_WORK = [
  {
    href: '/agentguide',
    title: 'AI agents on FHIR',
    desc: 'The reference the agent review is built on.',
  },
  {
    href: 'https://github.com/aks129/HealthClawGuardrails',
    title: 'HealthClaw Guardrails',
    desc: 'Redaction, approval and audit as running, tested code.',
  },
  {
    href: 'https://openquality.us',
    title: 'Open Quality',
    desc: '52 CMS eCQM packages for 2026 with CQL and SQL side by side.',
  },
  {
    href: '/podcast',
    title: 'Out of the FHIR',
    desc: 'Conversations with the people building interoperability.',
  },
] as const;

export default function Consulting() {
  return (
    <div className="min-h-screen bg-bg">
      <PageAnalytics page="consulting" />
      <Reveal />
      <Nav />

      <section className={`${SHELL} pb-14 pt-14 md:pb-20 md:pt-20`}>
        <div className="grid min-w-0 gap-8 md:grid-cols-[8.5rem_minmax(0,1fr)] md:gap-12">
          <p className="label label-bright md:pt-3">Work with me</p>
          <div className="min-w-0">
            <h1 className="max-w-[52rem] text-display tracking-tight text-fg">
              A second opinion on one decision with real stakes
            </h1>
            <p className="measure mt-8 text-lg leading-relaxed text-fg-2">
              {BIO}
            </p>
            <p className="measure mt-4 text-lg leading-relaxed text-fg-2">
              Most of what I know is free on this site. Engagements are for when
              you need it applied to your data, your vendors and your deadline.
            </p>
            <div className="mt-8">
              <ContactCTA location="consulting_hero" />
            </div>
          </div>
        </div>
      </section>

      <Section label="Reviews">
        <div className="reveal">
          <h2 className="text-title tracking-tight text-fg">Fixed-scope reviews</h2>
          <p className="measure mt-5 text-lg leading-relaxed text-fg-2">
            A defined question, a defined end, and a written answer.
          </p>
        </div>
        <div className="mt-10 border-t border-line">
          {REVIEWS.map((e) => (
            <Offer key={e.id} e={e} />
          ))}
        </div>
      </Section>

      <Section label="Also">
        <div className="border-t border-line">
          {OTHER.map((e) => (
            <Offer key={e.id} e={e} />
          ))}
        </div>
      </Section>

      <Section label="How it starts">
        <ol className="reveal grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((s, i) => (
            <li key={s.name} className="min-w-0 border-t border-line pt-5">
              <p className="label">{String(i + 1).padStart(2, '0')}</p>
              <h3 className="mt-2 text-lg text-fg">{s.name}</h3>
              <p className="mt-2 text-sm leading-relaxed text-fg-2">{s.detail}</p>
            </li>
          ))}
        </ol>
        <p className="reveal measure mt-10 leading-relaxed text-fg-2">
          Capacity is limited and I schedule engagements one at a time. Before
          we start I check for conflicts with my other commitments and tell you
          in writing.
        </p>
      </Section>

      <Section label="Judge the work">
        <div className="reveal">
          <h2 className="text-title tracking-tight text-fg">
            Client work is confidential. This is not.
          </h2>
        </div>
        <ul className="reveal mt-10 grid border-t border-line sm:grid-cols-2 lg:grid-cols-4">
          {PUBLIC_WORK.map((w) => {
            const ext = w.href.startsWith('http');
            const inner = (
              <>
                <span className="block text-lg leading-snug text-fg">
                  {w.title}
                  {ext && <span aria-hidden className="ml-1.5 text-fg-3">↗</span>}
                </span>
                <span className="mt-1.5 block text-sm leading-snug text-fg-2">{w.desc}</span>
              </>
            );
            const cls = 'block h-full py-6 lg:px-5 lg:first:pl-0';
            return (
              <li key={w.href} className="border-b border-line lg:border-r lg:last:border-r-0">
                {ext ? (
                  <a href={w.href} target="_blank" rel="noopener noreferrer" className={cls}>
                    {inner}
                  </a>
                ) : (
                  <Link href={w.href} className={cls}>
                    {inner}
                  </Link>
                )}
              </li>
            );
          })}
        </ul>
      </Section>

      <Section label="Questions">
        <dl className="reveal measure space-y-8">
          <div>
            <dt className="text-lg text-fg">Do you work outside the US?</dt>
            <dd className="mt-2 leading-relaxed text-fg-2">
              My depth is in US guides: US Core, QI-Core, CARIN and the CMS
              measures. Base FHIR R4 is international, and I can work from
              another jurisdiction&apos;s guides, but say so on the intro call.
            </dd>
          </div>
          <div>
            <dt className="text-lg text-fg">Remote or onsite?</dt>
            <dd className="mt-2 leading-relaxed text-fg-2">
              Remote by default. Onsite for training when it is worth the travel.
            </dd>
          </div>
          <div>
            <dt className="text-lg text-fg">What if scope changes?</dt>
            <dd className="mt-2 leading-relaxed text-fg-2">
              We agree on the change in writing before I do the extra work.
            </dd>
          </div>
        </dl>
      </Section>

      <Section label="Start">
        <div className="reveal">
          <h2 className="text-title tracking-tight text-fg">Bring one decision</h2>
          <p className="measure mt-5 text-lg leading-relaxed text-fg-2">
            An architecture, an access model, a measure that has to survive
            audit. Email works as well as a call.
          </p>
          <div className="mt-8">
            <ContactCTA location="consulting_footer" note={false} />
          </div>
        </div>
      </Section>

      <Footer />
    </div>
  );
}
