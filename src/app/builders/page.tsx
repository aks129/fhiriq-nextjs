'use client';

import { useState, type FormEvent } from 'react';
import Link from 'next/link';
import './builders.css';

const FONT_LINK =
  'https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght,SOFT@9..144,300..900,0..100&family=Newsreader:ital,opsz,wght@0,6..72,300..700;1,6..72,400&family=JetBrains+Mono:wght@400;500;700&display=swap';

type FormState = { name: string; email: string; role: string; build: string };
type Status = 'idle' | 'submitting' | 'success' | 'error';

export default function BuildersPage() {
  const [form, setForm] = useState<FormState>({ name: '', email: '', role: '', build: '' });
  const [status, setStatus] = useState<Status>('idle');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const update = (k: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('submitting');
    setErrorMsg(null);
    try {
      const res = await fetch('/api/cohort-signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setStatus('error');
        setErrorMsg(data?.error || 'Submission failed. Please try again, or email gene@fhiriq.com directly.');
        return;
      }
      setStatus('success');
    } catch (err) {
      console.error('Signup error:', err);
      setStatus('error');
      setErrorMsg('Network error. Please try again, or email gene@fhiriq.com directly.');
    }
  }

  return (
    <>
      <link rel="stylesheet" href={FONT_LINK} />

      <div className="builders-page">
        <div className="wrap">
          <nav>
            <Link href="/builders" className="logo">FHIR<span>IQ</span>/cohort</Link>
            <Link href="/" className="nav-back">← fhiriq.com</Link>
          </nav>

          {/* HERO */}
          <section className="hero">
            <div className="eyebrow">Cohort 01 · Now enrolling</div>
            <h1 className="hero-headline">
              Stop reading about<br />
              healthcare AI.<br />
              <span className="underline-art">Start <span className="italic">shipping</span> it.</span>
            </h1>
            <p className="hero-sub">
              A small cohort for healthcare PMs, clinicians, and builders who want a working system — not another course library. The exact playbook I used to ship HealthClaw, AINPI, and 25+ other projects with Claude Code + FHIR.
            </p>

            <div className="hero-cta-row">
              <a href="#signup" className="btn-primary">Book your free intro call</a>
              <a href="#how" className="btn-secondary">how it works</a>
              <Link href="/workshop" className="btn-secondary">or try the free workshop first →</Link>
            </div>

            <div className="stamps">
              <div className="stamp"><span className="stamp-dot" />50 seats total</div>
              <div className="stamp"><span className="stamp-dot" />$29 first month</div>
              <div className="stamp"><span className="stamp-dot" />Live · founder-led</div>
              <div className="stamp"><span className="stamp-dot" />Ship by DevDays MN, June 2026</div>
            </div>

            <div className="spec-card">
              <div className="spec-card-title">{'// Cohort spec'}</div>
              <div className="spec-card-row"><span>start</span><span className="v">rolling</span></div>
              <div className="spec-card-row"><span>format</span><span className="v">live + 1:1</span></div>
              <div className="spec-card-row"><span>time/wk</span><span className="v">2–3 hrs</span></div>
              <div className="spec-card-row"><span>seats_open</span><span className="v">48 / 50</span></div>
              <div className="spec-card-row"><span>stack</span><span className="v">Claude Code, FHIR, MCP</span></div>
            </div>
          </section>
        </div>

        {/* PROOF */}
        <section className="proof-section">
          <div className="wrap">
            <div className="section-label">What you&apos;ll be able to build</div>
            <h2 className="section-title">Real projects. <span className="italic">Not toy demos.</span></h2>
            <p className="section-lede">Everything below was built solo, on nights and weekends, using the same system you&apos;ll learn. Most would normally take a team months.</p>

            <div className="proof-grid">
              <div className="proof-card">
                <div className="proof-tag">Production · MCP + FHIR</div>
                <h3>HealthClaw Guardrails</h3>
                <p>PHI redaction, step-up auth, MCP tool validation, Curatr data-quality eval. Running on Railway with full test coverage.</p>
              </div>
              <div className="proof-card">
                <div className="proof-tag">Open source · CMS audit</div>
                <h3>AINPI.dev</h3>
                <p>An audit of the CMS National Provider Directory with five data-quality findings. Pre-registered methodology, published findings.</p>
              </div>
              <div className="proof-card">
                <div className="proof-tag">SMART on FHIR</div>
                <h3>SmartHealthConnect</h3>
                <p>Patient access app with SMART on FHIR auth. Built end-to-end in weeks, not quarters.</p>
              </div>
              <div className="proof-card">
                <div className="proof-tag">Quality measures</div>
                <h3>CQL on Medplum</h3>
                <p>Breast cancer screening, ADHD med monitoring, LDL compliance. Live CQL measures running against a real FHIR server.</p>
              </div>
              <div className="proof-card">
                <div className="proof-tag">Analytics</div>
                <h3>Payer analytics dashboards</h3>
                <p>Sigma dashboards built on FHIR-derived data. The pattern that powers my day-job platform.</p>
              </div>
              <div className="proof-card">
                <div className="proof-tag">+ 20 more</div>
                <h3>Your project here</h3>
                <p>What&apos;s the one healthcare problem you can&apos;t get out of your head? That&apos;s what you&apos;ll build in this cohort.</p>
              </div>
            </div>
          </div>
        </section>

        <div className="wrap">
          {/* WHO IT'S FOR */}
          <section id="who">
            <div className="section-label">Who this is for</div>
            <h2 className="section-title">Four kinds of people <span className="italic">tend to thrive here.</span></h2>

            <div className="who-grid">
              <div className="who-card">
                <div className="who-num">01</div>
                <h4>Healthcare PMs</h4>
                <p>You see the gaps clearly. You&apos;re tired of waiting two quarters for engineering capacity to validate an idea.</p>
              </div>
              <div className="who-card">
                <div className="who-num">02</div>
                <h4>Clinicians who want to build</h4>
                <p>You know the workflow. You know what&apos;s broken. You don&apos;t want to learn a CS degree before you can prototype.</p>
              </div>
              <div className="who-card">
                <div className="who-num">03</div>
                <h4>Engineers new to FHIR</h4>
                <p>You can code. FHIR has a learning curve. We compress it from months to weeks.</p>
              </div>
              <div className="who-card">
                <div className="who-num">04</div>
                <h4>Founders + operators</h4>
                <p>You&apos;re shipping a healthcare product and AI-assisted dev is your unfair advantage. Use it well.</p>
              </div>
            </div>

            <div className="who-grid who-grid--solo">
              <div className="who-card not-for who-card--narrow">
                <div className="who-num">Not for</div>
                <h4>Passive learners</h4>
                <p>If you want to watch videos and feel productive, this isn&apos;t it. Every week ends with you having shipped something, or you&apos;ve been honest with yourself about why you didn&apos;t.</p>
              </div>
            </div>
          </section>

          {/* HOW IT WORKS */}
          <section id="how">
            <div className="section-label">How it works</div>
            <h2 className="section-title">Three steps. <span className="italic">No pressure.</span></h2>
            <p className="section-lede">You can stop at any stage. The intro call alone is worth your time — you&apos;ll leave with the methodology whether you join or not.</p>

            <div className="ladder">
              <div className="rung">
                <div className="rung-num">STEP 01</div>
                <div className="rung-price">Free</div>
                <div className="rung-price-sub">45–60 minutes · 1:1 with me</div>
                <h4>Intro call</h4>
                <ul>
                  <li>Full walkthrough of the system</li>
                  <li>Talk through the project you want to build</li>
                  <li>Honest take on whether the cohort fits</li>
                  <li>You keep the methodology either way</li>
                </ul>
              </div>

              <div className="rung featured">
                <div className="rung-badge">Most popular</div>
                <div className="rung-num">STEP 02</div>
                <div className="rung-price">$29</div>
                <div className="rung-price-sub">first month, intro rate</div>
                <h4>The Cohort</h4>
                <ul>
                  <li>Weekly live group calls</li>
                  <li>Builder sessions — work alongside the group</li>
                  <li>Resource library (prompts, templates, MCP configs)</li>
                  <li>1:1 time with me to unstick your project</li>
                  <li>Private community channel</li>
                </ul>
              </div>

              <div className="rung">
                <div className="rung-num">STEP 03</div>
                <div className="rung-price">$99<span className="rung-price-suffix">/mo</span></div>
                <div className="rung-price-sub">recurring after month one</div>
                <h4>Keep building</h4>
                <ul>
                  <li>Everything in Step 02, ongoing</li>
                  <li>Advanced topics as the cohort matures</li>
                  <li>Connections to FHIR community + DevDays</li>
                  <li>Cancel anytime</li>
                </ul>
              </div>
            </div>
          </section>

          {/* ABOUT */}
          <section id="about">
            <div className="section-label">Who&apos;s teaching this</div>
            <h2 className="section-title">I&apos;m Eugene. <span className="italic">I ship things.</span></h2>

            <div className="about-grid">
              <div className="about-bio">
                <p>I&apos;m a senior PM at a national pharmacy data platform by day, and the founder of <strong>FHIR IQ</strong> by night. Over the past 18 months I&apos;ve shipped 25+ healthcare AI projects solo using Claude Code, FHIR, and a system I refined the hard way.</p>
                <p>Before that: <strong>Director of FHIR Data Analytics</strong> at a health tech startup. Before that: building the data layer at <strong>b.well Connected Health</strong>, powering Samsung Health, Google Fitbit, and major health systems. Roughly 15 years in this industry.</p>
                <p>I&apos;m not selling a secret. I&apos;m selling time — the months I&apos;ve already spent figuring out what works, so you don&apos;t have to. I&apos;ve taught this in 1:1s. I&apos;m formalizing it into a cohort because the demand is there and the timing is right.</p>
                <p>Speaking at <strong>HL7 DevDays Minneapolis, June 2026.</strong> Host of <em>Out of the FHIR</em> podcast. Author of the <em>FHIR IQ Playbook</em> on Substack.</p>
              </div>

              <div className="about-stats">
                <div className="stat-row"><span className="label">Projects shipped</span><span className="value">25+</span></div>
                <div className="stat-row"><span className="label">Years in healthcare</span><span className="value">15</span></div>
                <div className="stat-row"><span className="label">FHIR Goats members</span><span className="value">780</span></div>
                <div className="stat-row"><span className="label">Substack subscribers</span><span className="value">560</span></div>
                <div className="stat-row"><span className="label">DevDays MN 2026</span><span className="value">Speaker</span></div>
              </div>
            </div>
          </section>
        </div>

        {/* SIGNUP */}
        <section className="signup-section" id="signup">
          <div className="wrap signup-inner">
            <div className="section-label">Get on the list</div>
            <h2 className="section-title">Book your free intro call.</h2>
            <p className="section-lede">Tell me a little about you and what you want to build. I&apos;ll reach out within 48 hours to schedule.</p>

            <div className="signup-grid">
              <div className="signup-left">
                <h3>Two seats already taken from my Substack. 48 left.</h3>
                <p>This is a small group on purpose. I want to know everyone&apos;s project well enough to actually help unstick them.</p>
                <p>If the cohort isn&apos;t a fit after the intro call, no pressure. You&apos;ll still leave with the methodology and a clear next step on your project.</p>
                <div className="meta">
                  Questions before signing up?<br />
                  DM me on LinkedIn or reply to any Substack post.
                  <br /><br />
                  <strong>Want to try before you commit?</strong>{' '}
                  <Link href="/workshop">Cohort 00 is free — start there →</Link>
                </div>
              </div>

              {status === 'success' ? (
                <div className="form-success">
                  <div className="check">✓</div>
                  <h3>You&apos;re on the list.</h3>
                  <p>I&apos;ll reach out within 48 hours to schedule your intro call. Check your inbox (and spam folder) for a note from Eugene at FHIR IQ.</p>
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
                    <label htmlFor="role">Which best describes you?</label>
                    <select id="role" name="role" required value={form.role} onChange={update('role')}>
                      <option value="">Pick one…</option>
                      <option>Healthcare PM</option>
                      <option>Clinician</option>
                      <option>Engineer / Developer</option>
                      <option>Founder / Operator</option>
                      <option>Other</option>
                    </select>
                  </div>
                  <div className="form-row">
                    <label htmlFor="build">In one sentence — what do you want to build?</label>
                    <textarea
                      id="build"
                      name="build"
                      placeholder="A patient-facing app, a quality-measure dashboard, a workflow tool, an audit, etc."
                      value={form.build}
                      onChange={update('build')}
                    />
                  </div>
                  <button type="submit" className="submit-btn" disabled={status === 'submitting'}>
                    {status === 'submitting' ? 'Sending…' : 'Request my intro call →'}
                  </button>
                  {status === 'error' && errorMsg && <div className="form-error">{errorMsg}</div>}
                  <div className="form-foot">No spam. No drip sequence. Just a reply from Eugene.</div>
                </form>
              )}
            </div>
          </div>
        </section>

        <div className="wrap">
          {/* FAQ */}
          <section id="faq">
            <div className="section-label">Frequently asked</div>
            <h2 className="section-title">Honest answers.</h2>

            <div className="faq-list">
              <details className="faq-item">
                <summary>What&apos;s the time commitment?</summary>
                <p>2–3 hours per week. One group call, one builder session you can attend live or watch on replay. Anything more is up to you — most people ship faster the more they put in.</p>
              </details>
              <details className="faq-item">
                <summary>Do I need to know how to code?</summary>
                <p>No. The whole point of the system is that you don&apos;t need to be a full-time engineer to ship real software. If you can read a paragraph and follow instructions, you can do this. Engineers benefit too — the FHIR-specific patterns alone are worth it.</p>
              </details>
              <details className="faq-item">
                <summary>Is this just Claude Code tutorials?</summary>
                <p>No. There are free tutorials all over YouTube. This is the playbook for shipping real healthcare projects — how to scope, prompt, validate, deploy, and not get stuck. Claude Code is the tool. The system is the value.</p>
              </details>
              <details className="faq-item">
                <summary>How do you handle PHI and HIPAA?</summary>
                <p>We cover safe development practices, PHI redaction patterns, and architecture for compliant builds. None of the exercises require you to use real PHI — we use synthetic FHIR data throughout.</p>
              </details>
              <details className="faq-item">
                <summary>What&apos;s the refund policy?</summary>
                <p>Cancel anytime. The intro call is free. The first-month $29 is non-refundable but you keep all the resources. Months 2+ at $99 are month-to-month, cancel whenever.</p>
              </details>
              <details className="faq-item">
                <summary>Who is this NOT for?</summary>
                <p>If you want a passive course you watch at 11pm and feel good about, this isn&apos;t it. We ship things. If you&apos;re not willing to actually start a project, your money is better spent elsewhere.</p>
              </details>
              <details className="faq-item">
                <summary>What if I&apos;m going to DevDays Minneapolis in June?</summary>
                <p>Even better. This cohort is structured so you&apos;ll show up to DevDays with something built — and people will want to talk to you about it.</p>
              </details>
            </div>
          </section>

          {/* FOOTER */}
          <footer className="footer-section">
            <div className="footer-grid">
              <div>FHIR IQ · Healthcare AI Builders · Cohort 01</div>
              <div>
                <Link href="/">fhiriq.com</Link> ·{' '}
                <a href="https://evestel.substack.com" target="_blank" rel="noopener noreferrer">Substack</a> ·{' '}
                <a href="https://www.linkedin.com/in/evestel/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </>
  );
}
