'use client';

import { useState, type FormEvent } from 'react';
import Link from 'next/link';
import { BIO } from '@/lib/profile';
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
            <div className="eyebrow">Healthcare AI Builders · Waitlist open</div>
            <h1 className="hero-headline">
              Stop reading about<br />
              healthcare AI.<br />
              <span className="underline-art">Start <span className="italic">shipping</span> it.</span>
            </h1>
            <p className="hero-sub">
              A small cohort for healthcare PMs, clinicians, and builders who want a working system, not another course library. The same Claude Code and FHIR workflow I use to build HealthClaw, Open Quality and AINPI.
            </p>

            <div className="hero-cta-row">
              <a href="#signup" className="btn-primary">Book your free intro call</a>
              <a href="#how" className="btn-secondary">how it works</a>
              <Link href="/workshop" className="btn-secondary">or try the free workshop first →</Link>
            </div>

            <div className="stamps">
              <div className="stamp"><span className="stamp-dot" />Small group</div>
              <div className="stamp"><span className="stamp-dot" />$29 first month</div>
              <div className="stamp"><span className="stamp-dot" />Live · founder-led</div>
            </div>

            <div className="spec-card">
              <div className="spec-card-title">{'// Cohort spec'}</div>
              <div className="spec-card-row"><span>start</span><span className="v">rolling</span></div>
              <div className="spec-card-row"><span>format</span><span className="v">live + 1:1</span></div>
              <div className="spec-card-row"><span>time/wk</span><span className="v">2–3 hrs</span></div>
              <div className="spec-card-row"><span>stack</span><span className="v">Claude Code, FHIR, MCP</span></div>
            </div>
          </section>
        </div>

        {/* PROOF */}
        <section className="proof-section">
          <div className="wrap">
            <div className="section-label">What you&apos;ll be able to build</div>
            <h2 className="section-title">Real projects. <span className="italic">Not toy demos.</span></h2>
            <p className="section-lede">Everything below is public and built with the same workflow you&apos;ll learn.</p>

            <div className="proof-grid">
              <div className="proof-card">
                <div className="proof-tag">Production · MCP + FHIR</div>
                <h3>HealthClaw Guardrails</h3>
                <p>PHI redaction, step-up auth, MCP tool validation, Curatr data-quality eval. 29 MCP tools and 4,000+ tests, per the repo.</p>
              </div>
              <div className="proof-card">
                <div className="proof-tag">Open source · CMS audit</div>
                <h3>AINPI.dev</h3>
                <p>A provider-directory accuracy audit with per-NPI checks against NPPES, the OIG exclusion list and SAM.gov. The aggregate view runs on a synthetic seed while the measurement pipeline is built, as the site says.</p>
              </div>
              <div className="proof-card">
                <div className="proof-tag">Quality measures</div>
                <h3>Open Quality</h3>
                <p>52 CMS eCQM packages for the 2026 reporting year, with CQL and SQL side by side and provenance checked in CI.</p>
              </div>
              <div className="proof-card">
                <div className="proof-tag">Yours</div>
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
                <div className="rung-price-sub">1:1 with me</div>
                <h4>Intro call</h4>
                <ul>
                  <li>Full walkthrough of the system</li>
                  <li>Talk through the project you want to build</li>
                  <li>Honest take on whether the cohort fits</li>
                  <li>You keep the methodology either way</li>
                </ul>
              </div>

              <div className="rung featured">
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
                <p>{BIO}</p>
                <p>I&apos;m not selling a secret. I&apos;m selling time: the months I&apos;ve already spent figuring out what works, so you don&apos;t have to.</p>
                <p>HL7 FHIR DevDays speaker. Host of <em>Out of the FHIR</em> podcast. Author of the <em>FHIR IQ Playbook</em> on Substack.</p>
              </div>

              <div className="about-stats">
                <div className="stat-row"><span className="label">Healthcare data</span><span className="value">15+ yrs</span></div>
                <div className="stat-row"><span className="label">Open-source projects live</span><span className="value">4</span></div>
                <div className="stat-row"><span className="label">Podcast</span><span className="value">Out of the FHIR</span></div>
                <div className="stat-row"><span className="label">HL7 FHIR DevDays</span><span className="value">Speaker</span></div>
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
                <h3>A small group, on purpose.</h3>
                <p>I want to know everyone&apos;s project well enough to actually help unstick them.</p>
                <p>If the cohort isn&apos;t a fit after the intro call, no pressure. You&apos;ll still leave with the methodology and a clear next step on your project.</p>
                <div className="meta">
                  Questions before signing up?<br />
                  DM me on LinkedIn or reply to any Substack post.
                  <br /><br />
                  <strong>Want to try before you commit?</strong>{' '}
                  <Link href="/workshop">The workshop is free. Start there →</Link>
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
              <div>FHIR IQ · Healthcare AI Builders</div>
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
