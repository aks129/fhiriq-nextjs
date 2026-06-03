'use client';

import { useState, type FormEvent } from 'react';
import Link from 'next/link';
import './workshop.css';

const FONT_LINK =
  'https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght,SOFT@9..144,300..900,0..100&family=Newsreader:ital,opsz,wght@0,6..72,300..700;1,6..72,400&family=JetBrains+Mono:wght@400;500;700&display=swap';

type FormState = { name: string; email: string; linkedin: string; build: string };
type Status = 'idle' | 'submitting' | 'success' | 'error';

const sessions = [
  {
    num: '01',
    title: 'VS Code + Git + Claude Code, fluent',
    desc: "The day-one setup that makes the rest of the sprint feel obvious. We get every laptop in the room building.",
  },
  {
    num: '02',
    title: 'MCP servers + vector DB',
    desc: 'Live FHIR hands for your agent. Synthea, Medplum, the four tools that actually earn their seat.',
  },
  {
    num: '03',
    title: 'FHIR-native workflows',
    desc: 'Survey → intervention. Screening → referral. Patient, provider, payer, or vendor — your call.',
  },
  {
    num: '04',
    title: 'Ship one real slice',
    desc: 'Deployed. Tested. Watched by a real user before session 5. No theater.',
  },
  {
    num: '05',
    title: 'Demo + what to build next',
    desc: 'Show what you shipped to the group. Get the next 90 days mapped before you leave.',
  },
];

const walkaway = [
  'A Claude Code + FHIR dev environment that works on Monday morning',
  'One deployed FHIR-native feature you built (not a demo, a real slice)',
  'The prompting + MCP patterns for shipping more on your own after the sprint',
  'A small group of healthcare builders who actually saw what you made',
];

export default function WorkshopPage() {
  const [form, setForm] = useState<FormState>({ name: '', email: '', linkedin: '', build: '' });
  const [status, setStatus] = useState<Status>('idle');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const update = (k: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('submitting');
    setErrorMsg(null);
    try {
      const res = await fetch('/api/workshop-signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setStatus('error');
        setErrorMsg(data?.error || "Submission didn't go through. Try again, or DM me on LinkedIn.");
        return;
      }
      setStatus('success');
    } catch (err) {
      console.error('Workshop signup error:', err);
      setStatus('error');
      setErrorMsg("Network hiccup. Try again, or DM me on LinkedIn.");
    }
  }

  return (
    <>
      <link rel="stylesheet" href={FONT_LINK} />

      <div className="workshop-page">
        <div className="wrap">
          <nav>
            <Link href="/workshop" className="logo">FHIR<span>IQ</span>/workshop</Link>
            <Link href="/" className="nav-back">← fhiriq.com</Link>
          </nav>

          {/* COHORT 00 STATUS BANNER */}
          <div
            style={{
              marginTop: 24,
              padding: "10px 14px",
              border: "1px solid var(--ember)",
              background: "rgba(230, 58, 31, 0.06)",
              color: "var(--ember-deep)",
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 12,
              letterSpacing: "0.06em",
              display: "flex",
              alignItems: "center",
              gap: 10,
              flexWrap: "wrap",
            }}
          >
            <span style={{ background: "var(--ember)", color: "var(--paper-light)", padding: "3px 8px", borderRadius: 3, fontWeight: 600 }}>
              COHORT 00 · LIVE
            </span>
            <span>Intro calls running this week · 14 of 20 seats filled · last signups close Fri Jun 5</span>
            <a href="#cohort-01" style={{ marginLeft: "auto", color: "var(--ember)", textDecoration: "underline", whiteSpace: "nowrap" }}>
              Cohort 01 waitlist →
            </a>
          </div>

          {/* HERO */}
          <section className="hero">
            <div className="eyebrow">By popular demand · Free workshop</div>
            <h1>
              Building Healthcare AI<br />
              with <span className="italic">Claude Code.</span>
            </h1>
            <p className="hero-sub">
              A live, hands-on workshop. Small group. No fluff. You leave with something running on real FHIR — not a slide deck, not a tutorial replay.
            </p>

            <div className="hero-cta-row">
              <a href="#signup" className="btn-primary">Save my seat</a>
              <a
                href="https://www.linkedin.com/in/evestel/"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary"
              >
                or DM me on LinkedIn
              </a>
            </div>

            <div className="stamps">
              <span className="stamp featured">Cohort 00</span>
              <span className="stamp">First session free</span>
              <span className="stamp">6-week sprint</span>
              <span className="stamp">1–2× per week</span>
              <span className="stamp">Capped at 20</span>
            </div>
          </section>

          {/* DM PROOF */}
          <section>
            <div className="section-label">Why now</div>
            <h2>The DMs were <span className="italic">unambiguous.</span></h2>
            <p className="lede">Two from this week&apos;s inbox. Names with permission, paraphrased lightly for length.</p>

            <div className="quote-block">
              <p className="quote">
                &ldquo;Definitely interested. I&apos;m already deep in Claude Design and Code for a consumer iOS app — but I&apos;m beyond eager to learn more.&rdquo;
              </p>
              <div className="quote-attr">
                <strong>iOS founder</strong> · already shipping in Claude Code
              </div>
            </div>

            <div className="quote-block">
              <p className="quote">
                &ldquo;I want to get fluent in Claude Code, MCP, and vector DB before going deeper. I&apos;d build a FHIR-native survey-to-intervention workflow for depression screening + SDoH.&rdquo;
              </p>
              <div className="quote-attr">
                <strong>Practicing clinician</strong> · builder, FHIR-curious
              </div>
            </div>
          </section>

          {/* SESSIONS */}
          <section>
            <div className="section-label">What we&apos;ll cover</div>
            <h2>Five sessions. <span className="italic">Zero homework theater.</span></h2>
            <p className="lede">
              Live, on a call, with your IDE open. We work the problem together. You don&apos;t leave a session without something to push.
            </p>

            <div className="session-list">
              {sessions.map((s) => (
                <div key={s.num} className="session">
                  <div className="session-num">{s.num}</div>
                  <div>
                    <div className="session-title">{s.title}</div>
                    <div className="session-desc">{s.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* WALK AWAY */}
          <section>
            <div className="walkaway">
              <div className="section-label">What you walk away with</div>
              <h2>Real output. <span className="italic">By design.</span></h2>
              <ul className="walkaway-list">
                {walkaway.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </section>
        </div>

        {/* SIGNUP */}
        <section className="signup" id="signup">
          <div className="wrap">
            <div className="section-label">Save your seat</div>
            <h2>20 seats. <span className="italic">First come.</span></h2>
            <p className="lede">
              Drop your name and what you want to build. I&apos;ll reply with the date for Session 1 and the prep doc. If the cohort fills before I get to you, you go on the next one.
            </p>

            {status === 'success' ? (
              <div className="form-success">
                <div className="check">✓</div>
                <h3>You&apos;re in.</h3>
                <p>
                  I&apos;ll email you within 48 hours with the Session 1 date and the prep doc. Check your inbox (and spam folder) for a note from Eugene at FHIR IQ.
                </p>
              </div>
            ) : (
              <form className="signup-form" onSubmit={handleSubmit}>
                <div className="form-row">
                  <label htmlFor="name">Your name</label>
                  <input type="text" id="name" name="name" required value={form.name} onChange={update('name')} />
                </div>
                <div className="form-row">
                  <label htmlFor="email">Email</label>
                  <input type="email" id="email" name="email" required value={form.email} onChange={update('email')} />
                </div>
                <div className="form-row">
                  <label htmlFor="linkedin">
                    LinkedIn URL <span className="optional">— optional, helps me prep</span>
                  </label>
                  <input
                    type="url"
                    id="linkedin"
                    name="linkedin"
                    placeholder="https://www.linkedin.com/in/..."
                    value={form.linkedin}
                    onChange={update('linkedin')}
                  />
                </div>
                <div className="form-row">
                  <label htmlFor="build">
                    What do you want to build? <span className="optional">— one sentence is plenty</span>
                  </label>
                  <textarea
                    id="build"
                    name="build"
                    placeholder="e.g. FHIR-native depression screening → referral workflow. Or a SMART on FHIR patient app. Or just &quot;I want to learn.&quot;"
                    value={form.build}
                    onChange={update('build')}
                  />
                </div>
                <button type="submit" className="submit-btn" disabled={status === 'submitting'}>
                  {status === 'submitting' ? 'Sending…' : 'Save my seat →'}
                </button>
                {status === 'error' && errorMsg && <div className="form-error">{errorMsg}</div>}
                <div className="form-foot">No drip sequence. No course-platform onboarding. Just a reply from Eugene.</div>
              </form>
            )}
          </div>
        </section>

        <div className="wrap">
          {/* WHAT HAPPENS NEXT */}
          <section>
            <div className="next-steps">
              <h3>What happens after you sign up</h3>
              <ol>
                <li>You get a confirmation email within 5 minutes.</li>
                <li>Within 48 hours I email you the Session 1 date, time, and a 15-minute prep doc — Claude Code installed, a Medplum sandbox you can log in to, and the synthetic FHIR bundle we&apos;ll work with.</li>
                <li>We meet live. You leave Session 1 with the dev environment running and a clear sketch of what you&apos;ll ship.</li>
                <li>If the workshop isn&apos;t for you after Session 1, no pressure. You keep the setup and the prep doc either way.</li>
              </ol>
            </div>
          </section>

          {/* COHORT 01 WAITLIST */}
          <section id="cohort-01">
            <div className="upgrade" style={{ borderColor: "var(--ember)" }}>
              <div className="upgrade-eyebrow">Cohort 00 closes Friday</div>
              <h3>
                Missed it? <span className="italic">Cohort 01 starts Aug 17.</span>
              </h3>
              <p>
                Same format, paid program — $29 first month, $99/mo after.
                Cohort 00 graduates set the curriculum, the mentors, and the
                ship-or-refund standard. Cohort 01 spots open after Demo Day
                (Fri Jul 3); waitlist gets first invite + a discounted founding rate.
              </p>
              <a
                href="mailto:gene@fhiriq.com?subject=Cohort%2001%20waitlist&body=Hi%20Eugene%2C%0A%0AAdd%20me%20to%20the%20Cohort%2001%20waitlist.%20%0A%0AWhat%20I%27d%20build%3A%20%5Boptional%2C%20one%20line%5D%0A%0AThanks%2C%0A"
                className="upgrade-link"
              >
                Email me to join the waitlist →
              </a>
            </div>
          </section>

          {/* CROSS-LINK TO /builders */}
          <section>
            <div className="upgrade">
              <div className="upgrade-eyebrow">After the workshop</div>
              <h3>Want to keep building <span className="italic">past week 6?</span></h3>
              <p>
                The Healthcare AI Builders cohort is the longer-term home. Same crowd, more depth, 1:1 time, private channel.
                $29 for the first month, $99/mo after. Cancel anytime.
              </p>
              <Link href="/builders" className="upgrade-link">
                See the Builders cohort →
              </Link>
            </div>
          </section>

          {/* FOOTER */}
          <footer className="footer-section">
            <div className="footer-grid">
              <div>FHIR IQ · Workshop · Cohort 00</div>
              <div>
                <Link href="/">fhiriq.com</Link> ·{' '}
                <Link href="/builders">/builders</Link> ·{' '}
                <a href="https://www.linkedin.com/in/evestel/" target="_blank" rel="noopener noreferrer">LinkedIn</a> ·{' '}
                <a href="https://evestel.substack.com" target="_blank" rel="noopener noreferrer">Substack</a>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </>
  );
}
