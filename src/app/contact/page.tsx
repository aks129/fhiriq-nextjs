import type { Metadata } from 'next';
import Link from 'next/link';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import PageAnalytics from '@/components/PageAnalytics';
import ContactCTA from '@/components/ContactCTA';
import { PERSON } from '@/lib/profile';

/**
 * Contact.
 *
 * The previous page had a form that only opened the visitor's mail client
 * (which fails on locked-down hospital desktops), a "Start Chat" button with
 * no handler, and "we" copy for a one-person practice. Email and booking are
 * the two channels that actually reach Gene, so this page offers those and
 * says what to put in the message.
 */

export const metadata: Metadata = {
  title: 'Contact',
  description: `Email ${PERSON.email} or book a 30-minute intro call.`,
};

const SHELL = 'mx-auto max-w-[84rem] px-4 sm:px-6';

const REASONS = [
  {
    name: 'An engagement',
    detail: 'Say what you are deciding, which EHRs or data sources are involved, and your timeline.',
    link: { href: '/consulting', label: 'How engagements work' },
  },
  {
    name: 'The podcast',
    detail: 'Guest ideas and sponsorship. The media kit has audience numbers.',
    link: { href: '/media-kit', label: 'Media kit' },
  },
  {
    name: 'Speaking or writing',
    detail: 'Conferences, working groups, guest posts. Include the date and the audience.',
  },
  {
    name: 'The open-source projects',
    detail: 'Bugs and feature requests go to the GitHub repo, where others can see them.',
    link: { href: '/lab', label: 'The Lab' },
  },
] as const;

export default function Contact() {
  return (
    <div className="min-h-screen bg-bg">
      <PageAnalytics page="contact" />
      <Nav />

      <section className={`${SHELL} pb-14 pt-14 md:pb-20 md:pt-20`}>
        <div className="grid min-w-0 gap-8 md:grid-cols-[8.5rem_minmax(0,1fr)] md:gap-12">
          <p className="label label-bright md:pt-3">Contact</p>
          <div className="min-w-0">
            <h1 className="max-w-[52rem] text-display tracking-tight text-fg">
              Email is the fastest way to reach me
            </h1>
            <p className="measure mt-8 text-lg leading-relaxed text-fg-2">
              Every message comes to me directly.
            </p>
            <div className="mt-8">
              <ContactCTA location="contact_hero" />
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-line">
        <div className={`${SHELL} py-16 md:py-24`}>
          <div className="grid min-w-0 gap-8 md:grid-cols-[8.5rem_minmax(0,1fr)] md:gap-12">
            <p className="label label-bright md:pt-3">What to include</p>
            <dl className="grid min-w-0 gap-8 sm:grid-cols-2">
              {REASONS.map((r) => (
                <div key={r.name} className="min-w-0 border-t border-line pt-5">
                  <dt className="text-lg text-fg">{r.name}</dt>
                  <dd className="mt-2 text-sm leading-relaxed text-fg-2">
                    {r.detail}
                    {'link' in r && (
                      <>
                        {' '}
                        <Link
                          href={r.link.href}
                          className="border-b border-line-3 text-fg hover:border-fg"
                        >
                          {r.link.label}
                        </Link>
                      </>
                    )}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
