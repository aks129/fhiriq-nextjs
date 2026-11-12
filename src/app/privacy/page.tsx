import type { Metadata } from 'next';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import { PERSON } from '@/lib/profile';

/**
 * Privacy, and the security statement that /security used to make.
 *
 * Written from what the code does, not from a template. The previous policy
 * described payment processing, user accounts, "employee training" and
 * "regular security assessments", none of which exist. If you add a form, a
 * tracker or a processor, add it here in the same change.
 *
 * The LinkedIn section renders only when the Insight Tag is configured, so the
 * policy cannot claim a tracker that is not running, or miss one that is.
 */

export const metadata: Metadata = {
  title: 'Privacy',
  description: 'What fhiriq.com collects, where it goes, and how to ask for it to be deleted.',
};

const UPDATED = 'November 2026';
const SHELL = 'mx-auto max-w-[84rem] px-4 sm:px-6';

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="border-t border-line py-8">
      <h2 className="text-xl text-fg">{title}</h2>
      <div className="measure mt-3 space-y-3 leading-relaxed text-fg-2">{children}</div>
    </section>
  );
}

export default function Privacy() {
  const linkedin = Boolean(process.env.NEXT_PUBLIC_LINKEDIN_PARTNER_ID);

  return (
    <div className="min-h-screen bg-bg">
      <Nav />
      <main className={`${SHELL} pb-10 pt-14 md:pt-20`}>
        <div className="grid min-w-0 gap-8 md:grid-cols-[8.5rem_minmax(0,1fr)] md:gap-12">
          <p className="label label-bright md:pt-3">Privacy</p>
          <div className="min-w-0">
            <h1 className="text-display tracking-tight text-fg">Privacy</h1>
            <p className="label mt-4">Updated {UPDATED}</p>
            <p className="measure mt-8 text-lg leading-relaxed text-fg-2">
              fhiriq.com is the personal site of {PERSON.name}. There are no
              accounts, no payments and no advertising. This page lists
              everything the site collects.
            </p>

            <div className="mt-10">
              <Block title="Page views">
                <p>
                  Vercel Web Analytics counts page views and a few anonymous
                  events: a click on a main link or button (navigation,
                  contact, newsletter), a message
                  sent in the chat (not its text), and how far down a long
                  page you scrolled. It does not set cookies and does not
                  identify individual visitors. Vercel,
                  which hosts the site, also keeps standard server logs,
                  including IP addresses, for a limited period.
                </p>
              </Block>

              {linkedin && (
                <Block title="LinkedIn Insight Tag">
                  <p>
                    The site loads LinkedIn&apos;s Insight Tag, which sets
                    cookies so LinkedIn can report aggregate audience and
                    conversion data. LinkedIn&apos;s privacy policy applies to
                    that data.
                  </p>
                </Block>
              )}

              <Block title="Forms">
                <p>
                  The newsletter form sends your email address to me as a
                  notification, then opens Substack, which manages the
                  subscriber list. Substack&apos;s privacy policy applies from
                  there.
                </p>
                <p>
                  The workshop and cohort sign-up forms send what you enter
                  (name, email and the other fields shown) to me by email
                  through Resend. They are not stored in a database.
                </p>
              </Block>

              <Block title="Chat">
                <p>
                  Messages typed into the site chat are sent to Anthropic&apos;s
                  API to generate a reply. Do not enter health information or
                  anything confidential.
                </p>
              </Block>

              <Block title="Booking">
                <p>
                  Calls are booked through Google Calendar. Google&apos;s privacy
                  policy applies to what you enter there.
                </p>
              </Block>

              <Block title="Security">
                <p>
                  This is a one-person practice. I do not hold SOC 2 or HITRUST
                  certification. Client engagements happen inside the
                  client&apos;s environment and under the client&apos;s agreements,
                  including a BAA where one is required. I do not keep client
                  PHI on my own systems.
                </p>
              </Block>

              <Block title="Your data">
                <p>
                  Nothing collected here is sold or shared beyond the services
                  named above. To see or delete anything you have sent, email{' '}
                  <a
                    href={`mailto:${PERSON.email}`}
                    className="border-b border-line-3 text-fg hover:border-fg"
                  >
                    {PERSON.email}
                  </a>
                  .
                </p>
              </Block>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
