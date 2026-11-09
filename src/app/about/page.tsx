import type { Metadata } from 'next';
import Link from 'next/link';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import Reveal from '@/components/Reveal';
import PageAnalytics from '@/components/PageAnalytics';
import TrackedLink from '@/components/TrackedLink';
import {
  BIO,
  EDUCATION,
  EXPERIENCE,
  PERSON,
  YEARS_IN_HEALTHCARE_DATA,
} from '@/lib/profile';

/**
 * About. Every fact on this page comes from src/lib/profile.ts, so it cannot
 * drift from the homepage or /consulting. The previous version described FHIR
 * IQ as "a healthcare technology company delivering AI-powered data
 * intelligence solutions", which is the product-era positioning the site no
 * longer makes.
 */

export const metadata: Metadata = {
  title: 'About Eugene Vestel',
  description: `${BIO} ${YEARS_IN_HEALTHCARE_DATA}.`,
  openGraph: {
    title: 'About Eugene Vestel | FHIR IQ',
    description: BIO,
    url: '/about',
  },
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

const STANDARDS = [
  {
    name: 'SQL on FHIR v2',
    detail: 'Participant in the HL7 implementation guide that defines ViewDefinition.',
  },
  {
    name: 'Agents on FHIR',
    detail: 'Weekly working group on putting agents against clinical data safely.',
  },
  { name: 'HL7 FHIR DevDays', detail: 'Speaker, presenting HealthClaw.' },
  { name: 'Analytics on FHIR', detail: 'Speaker, 2025.' },
  { name: 'FHIR Camp', detail: '2025.' },
] as const;

export default function About() {
  return (
    <div className="min-h-screen bg-bg">
      <PageAnalytics page="about" />
      <Reveal />
      <Nav />

      <section className={`${SHELL} pb-14 pt-14 md:pb-20 md:pt-20`}>
        <div className="grid min-w-0 gap-8 md:grid-cols-[8.5rem_minmax(0,1fr)] md:gap-12">
          <p className="label label-bright md:pt-3">About</p>
          <div className="min-w-0">
            <h1 className="max-w-[52rem] text-display tracking-tight text-fg">
              {PERSON.name}
            </h1>
            <p className="measure mt-8 text-lg leading-relaxed text-fg-2">
              {BIO}
            </p>
            <p className="measure mt-4 text-lg leading-relaxed text-fg-2">
              {YEARS_IN_HEALTHCARE_DATA}, starting in pharmacy benefits and
              Medicare Part D, then quality analytics at a payer-provider, then
              building on FHIR. The work I publish now is the part of that I
              think other teams should not have to rediscover.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <TrackedLink
                href={PERSON.bookingUrl}
                event="about_cta_clicked"
                payload={{ button: 'book_call' }}
                external
                className="btn-primary"
              >
                Book a call
              </TrackedLink>
              <a
                href={PERSON.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary"
              >
                LinkedIn
              </a>
            </div>
          </div>
        </div>
      </section>

      <Section label="Experience">
        <ol className="border-t border-line">
          {EXPERIENCE.map((r) => (
            <li
              key={r.org}
              className="reveal grid gap-2 border-b border-line py-7 md:grid-cols-[10rem_minmax(0,1fr)] md:gap-8"
            >
              <p className="label pt-1">{r.dates}</p>
              <div className="min-w-0">
                <h2 className="text-xl leading-snug text-fg">{r.org}</h2>
                <p className="mt-1 text-sm text-fg-3">{r.title}</p>
                <p className="measure mt-3 leading-relaxed text-fg-2">
                  {r.detail}
                </p>
                {r.source && (
                  <a
                    href={r.source.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-block border-b border-line-3 pb-0.5 text-sm text-fg-2 transition-colors hover:border-fg hover:text-fg"
                  >
                    {r.source.label}
                  </a>
                )}
              </div>
            </li>
          ))}
        </ol>
      </Section>

      <Section label="Standards">
        <dl className="reveal grid gap-6 sm:grid-cols-2">
          {STANDARDS.map((s) => (
            <div key={s.name} className="min-w-0">
              <dt className="text-lg leading-snug text-fg">{s.name}</dt>
              <dd className="measure-tight mt-1 text-sm leading-relaxed text-fg-2">
                {s.detail}
              </dd>
            </div>
          ))}
        </dl>
      </Section>

      <Section label="Education">
        <ul className="reveal border-t border-line">
          {EDUCATION.map((e) => (
            <li
              key={e.school}
              className="grid gap-2 border-b border-line py-5 md:grid-cols-[10rem_minmax(0,1fr)] md:gap-8"
            >
              <p className="label pt-1">{e.year}</p>
              <div>
                <p className="text-lg text-fg">{e.degree}</p>
                <p className="mt-1 text-sm text-fg-3">{e.school}</p>
              </div>
            </li>
          ))}
        </ul>
      </Section>

      <Section label="Contact">
        <div className="reveal">
          <p className="measure text-lg leading-relaxed text-fg-2">
            Email{' '}
            <a
              href={`mailto:${PERSON.email}`}
              className="border-b border-line-3 text-fg hover:border-fg"
            >
              {PERSON.email}
            </a>
            , or see{' '}
            <Link
              href="/consulting"
              className="border-b border-line-3 text-fg hover:border-fg"
            >
              how engagements work
            </Link>
            . Based in {PERSON.location}.
          </p>
        </div>
      </Section>

      <Footer />
    </div>
  );
}
