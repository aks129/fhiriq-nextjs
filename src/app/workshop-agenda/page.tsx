import Link from 'next/link';
import type { Metadata } from 'next';
import './workshop-agenda.css';

export const metadata: Metadata = {
  title: 'Workshop Agenda · FHIR IQ Cohort 00',
  description:
    'How Cohort 00 ships — the 6-week arc, pod model, weekly cadence, contact surfaces, and reciprocal commitments for the free Building Healthcare AI with Claude Code workshop.',
  openGraph: {
    title: 'Workshop Agenda · FHIR IQ Cohort 00',
    description:
      'The full agenda for the free 6-week Building Healthcare AI with Claude Code workshop. 5 sessions, pods of 4, live IDE, shipped slices.',
    url: 'https://fhiriq.com/workshop-agenda',
  },
};

const FONT_LINK =
  'https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght,SOFT@9..144,300..900,0..100&family=Newsreader:ital,opsz,wght@0,6..72,300..700;1,6..72,400&family=JetBrains+Mono:wght@400;500;700&display=swap';

const teasers = [
  { num: '01 / 04', label: 'Hook', title: 'Why now', body: 'By popular demand. Free Cohort 00 — once.' },
  { num: '02 / 04', label: 'Receipts', title: 'The DMs were unambiguous', body: 'Founders and clinicians who actually want to ship.' },
  { num: '03 / 04', label: 'System', title: 'Five sessions. Zero homework theater.', body: 'Setup → MCP → FHIR workflows → ship → demo.' },
  { num: '04 / 04', label: 'Ask', title: 'Want in?', body: '20 seats. First come. fhiriq.com/workshop.' },
];

const sessions = [
  {
    num: '01',
    title: 'VS Code + Git + Claude Code, fluent',
    desc: 'The day-one setup that makes the rest of the sprint feel obvious. We get every laptop in the room building.',
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
    em: 'workflows',
  },
  {
    num: '04',
    title: 'Ship one real slice',
    desc: 'Deployed. Tested. Watched by a real user before session 5. The session you cannot miss.',
  },
  {
    num: '05',
    title: 'Demo + what to build next',
    desc: 'Show what you shipped to the group. Get the next 90 days mapped before you leave.',
  },
];

const podSteps = [
  {
    num: '01',
    title: 'Five pods of four',
    desc: 'I assign pods 72 hours before Session 1, after both intro calls. You meet your three teammates in your pod Slack channel — same problem, same Friday demo.',
  },
  {
    num: '02',
    title: 'One problem per pod',
    desc: 'Picked from the FHIR IQ Problem Board at kickoff. Linked back to the clinician who posted it so the work has an audience from day one.',
  },
  {
    num: '03',
    title: 'Cadence',
    desc: 'Daily 15-min async standup in pod channel. Two 30-min syncs per week (Mon plan, Wed unblock). Friday demo to the cohort with a senior leader watching.',
    em: 'Cadence',
  },
  {
    num: '04',
    title: 'Mentor per pod',
    desc: 'One senior healthcare engineer or clinical informaticist on your pod for the full 6 weeks. 45-min weekly call plus async Slack triage.',
  },
];

const surfaces = [
  {
    name: 'Slack',
    purpose: 'Working comms, pod channels, code, links, async unblocks.',
    rule: 'Default-public. No DMs for program questions.',
  },
  {
    name: 'WhatsApp',
    purpose: 'Signal only — "starting in 5", "demo link is", "need access to X".',
    rule: 'If it can wait 4 hours, it goes in Slack.',
  },
  {
    name: 'Weekly cohort call · Fridays',
    purpose: 'Pod demos and the only synchronous group session.',
    rule: 'Mandatory live. 3 misses = removed.',
  },
  {
    name: '1:1 with Eugene · Google Meet',
    purpose: 'Strategy, blockers, intros to senior leaders.',
    rule: 'Two per builder. Ad-hoc — reply to any cohort email and I send a Meet invite.',
  },
  {
    name: 'Weekly report-out',
    purpose: 'What you shipped · blockers · asks. Public on fhirbuilders.com.',
    rule: 'Due Thu 5pm ET. 5 sentences min.',
  },
  {
    name: 'Pitch board',
    purpose: '1-page pitch per pod — problem, user, what shipping means.',
    rule: 'Posted end of Week 2. Updated end of Week 4.',
  },
];

const terms = [
  { strong: 'Ship live in Session 4.', rest: 'Deployed URL, real FHIR read or write, a real user has touched it.' },
  { strong: 'Appear on camera at Demo Day.', rest: '90-second pitch + 3-minute demo to senior healthcare leaders + Cohort 01 waitlist.' },
  { strong: 'Submit a testimonial within 7 days.', rest: 'One written paragraph + one 60-second video. Both used to sell Cohort 01.' },
  { strong: 'Let your project be the case study.', rest: 'Linked from fhirbuilders.com/showcase under the Cohort 00 charter badge.' },
];

export default function WorkshopAgendaPage() {
  return (
    <>
      <link rel="stylesheet" href={FONT_LINK} />

      <div className="workshop-agenda-page">
        <div className="wrap">
          <nav className="top">
            <Link href="/workshop-agenda" className="logo">FHIR<span>IQ</span>/workshop-agenda</Link>
            <div className="nav-links">
              <Link href="/">fhiriq.com</Link>
              <Link href="/workshop">/workshop</Link>
              <Link href="/builders">/builders</Link>
            </div>
          </nav>

          {/* HERO */}
          <section className="hero">
            <div className="eyebrow">Cohort 00 · Workshop Agenda</div>
            <h1 className="display">
              How Cohort 00<br />
              <span className="em">ships.</span>
            </h1>
            <p className="lede">
              The agenda doc for the free, hands-on, 6-week sprint — Building Healthcare AI with Claude Code.
              Why this exists, who&apos;s running it, what we&apos;re going to build together, and what happens next.
              Save the link; we&apos;ll reference it on every call.
            </p>

            <div className="stamps">
              <span className="stamp featured">Free · Cohort 00</span>
              <span className="stamp outline-ink">6-week sprint</span>
              <span className="stamp outline-ink">5 sessions</span>
              <span className="stamp outline-ink">5 pods of 4</span>
              <span className="stamp outline-ink">Capped at 20</span>
            </div>

            {/* Carousel teaser strip — the 4-slide LinkedIn carousel mirrored as agenda nav */}
            <div className="teaser-strip" aria-hidden>
              {teasers.map((t) => (
                <div className="teaser" key={t.num}>
                  <div className="teaser-num">
                    <span>{t.label}</span>
                    <span>{t.num}</span>
                  </div>
                  <h4>{t.title}</h4>
                  <p>{t.body}</p>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* WHY */}
        <section className="tone-paper-light">
          <div className="wrap">
            <div className="eyebrow">Why now</div>
            <h2>
              Demos die in the gap between<br />
              prototype and <span className="scrib">clinician-touchable</span>.
            </h2>
            <p className="lede">
              Most healthcare AI cohorts teach concepts. This one is a forcing function to ship. If you don&apos;t want to
              ship in 6 weeks, this is the wrong room. If you do — Cohort 00 is the room that&apos;s small enough that I know
              every project well enough to actually unstick you.
            </p>

            <div className="quote-block">
              <p className="quote">
                &ldquo;Definitely interested. I&apos;m already deep in Claude Design and Code for a consumer iOS app — but I&apos;m beyond eager to learn more.&rdquo;
              </p>
              <div className="quote-attr">— <strong>iOS founder</strong> · already shipping in Claude Code</div>
            </div>

            <div className="quote-block alt">
              <p className="quote">
                &ldquo;I want to get fluent in Claude Code, MCP, and vector DB before going deeper. I&apos;d build a
                FHIR-native survey-to-intervention workflow for depression screening + SDoH.&rdquo;
              </p>
              <div className="quote-attr">— <strong>Practicing clinician</strong> · builder, FHIR-curious</div>
            </div>
          </div>
        </section>

        {/* WHO I AM */}
        <section>
          <div className="wrap">
            <div className="eyebrow">Who&apos;s running this</div>
            <h2>One operator, <span className="em">not a course platform.</span></h2>

            <div className="author">
              <div className="av">EV</div>
              <div className="who">
                <div className="name">Eugene Vestel</div>
                <div className="role">Founder, FHIR IQ · Ships things</div>
              </div>
            </div>

            <p>
              Healthcare interoperability operator. Founder of FHIR IQ — the semantic intelligence layer for healthcare
              data — and host of <em>Out of the FHIR®</em>, the podcast covering FHIR adoption, payer/provider data flows,
              and the move from CQL toward native SQL-on-FHIR. Recently presented CQL-to-SQL compilation at Analytics on
              FHIR (December 2025); recruiting Q1 2026 design partners for the engine now.
            </p>

            <p>
              Building in public: <strong>HealthClaw</strong> — a security layer between AI agents and clinical data —
              plus AINPI (national provider directory analysis), FHIRspective, FHIR ViewDefinition Builder, and a steady
              stream of FHIR tools at <a href="https://github.com/aks129" target="_blank" rel="noopener noreferrer">github.com/aks129</a>{" "}
              and <a href="https://github.com/FHIR-IQ" target="_blank" rel="noopener noreferrer">github.com/FHIR-IQ</a>.
              Also runs DevDays FHIR Side Chats with Firely.
            </p>

            <p>
              I run cohorts the way I run my own projects: live, in the IDE, with someone watching. Cohort 00 is small
              by design because I want to know every builder&apos;s problem well enough to unstick them in real time.
            </p>

            <div className="bio-links">
              <a href="https://www.linkedin.com/in/evestel/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
              <a href="https://evestel.substack.com" target="_blank" rel="noopener noreferrer">Substack — evestel.substack.com</a>
              <a href="https://fhiriq.com" target="_blank" rel="noopener noreferrer">fhiriq.com</a>
              <a href="https://eugenevestel.com" target="_blank" rel="noopener noreferrer">eugenevestel.com</a>
            </div>
          </div>
        </section>

        {/* WHAT WE'LL BE DOING — 5 sessions */}
        <section className="tone-ink">
          <div className="wrap">
            <div className="eyebrow">What we&apos;ll be doing</div>
            <h2>
              Five sessions. Zero <span className="em">homework theater.</span>
            </h2>
            <p className="lede">
              Live, on a call, with your IDE open. We work the problem together. You don&apos;t leave a session
              without something to push.
            </p>

            <div className="rows">
              {sessions.map((s) => (
                <div className="row" key={s.num}>
                  <span className="n">{s.num}</span>
                  <div>
                    <div className="t">
                      {s.em ? (
                        <>
                          {s.title.replace(s.em, '')}
                          <span className="em">{s.em}</span>
                        </>
                      ) : (
                        s.title
                      )}
                    </div>
                    <p className="d">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* HOW — pods */}
        <section>
          <div className="wrap">
            <div className="eyebrow">How we&apos;ll build together</div>
            <h2>Pods of four. <span className="em">One problem each.</span></h2>
            <p className="lede">
              The pod is the engine — I&apos;m not. Four builders to a pod, one shared problem, one mentor,
              one Friday demo slot. You don&apos;t build alone, and I don&apos;t become the bottleneck.
            </p>

            <div className="rows">
              {podSteps.map((s) => (
                <div className="row" key={s.num}>
                  <span className="n">{s.num}</span>
                  <div>
                    <div className="t">
                      {s.em ? (
                        <>
                          {s.title.replace(s.em, '')}
                          <span className="em">{s.em}</span>
                        </>
                      ) : (
                        s.title
                      )}
                    </div>
                    <p className="d">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CONTACT SURFACES */}
        <section className="tone-paper-light">
          <div className="wrap">
            <div className="eyebrow">Where we talk</div>
            <h2>Six surfaces. <span className="em">One job each.</span></h2>
            <p className="lede">
              Every channel has one job. State the rule on day one, quote it back when it&apos;s misused.
              This is the difference between a cohort and a Zoom hangout.
            </p>

            <div className="surface-table">
              {surfaces.map((s) => (
                <div className="surface" key={s.name}>
                  <h3 className="surface-name">{s.name}</h3>
                  <p className="surface-purpose">{s.purpose}</p>
                  <p className="surface-rule">{s.rule}</p>
                </div>
              ))}
            </div>

            <div className="call" style={{ marginTop: 36, maxWidth: 720 }}>
              <div className="call-label">Slack — join now</div>
              <h3>Cohort 00 workspace</h3>
              <div className="call-time" style={{ wordBreak: "break-all" }}>
                join.slack.com/t/fhirbuilders/shared_invite/zt-405j5tykg-T9v8~nNaX9tFZZgzaj37Ow
              </div>
              <a
                className="call-link"
                href="https://join.slack.com/t/fhirbuilders/shared_invite/zt-405j5tykg-T9v8~nNaX9tFZZgzaj37Ow"
                target="_blank"
                rel="noopener noreferrer"
              >
                Join the Slack
              </a>
            </div>
          </div>
        </section>

        {/* INTRO CALLS */}
        <section>
          <div className="wrap">
            <div className="eyebrow">Before Session 1</div>
            <h2>Two intro calls. <span className="em">Pick one.</span></h2>
            <p className="lede">
              Same 45-minute agenda runs twice. Meet the rest of the cohort, see how the 6 weeks work,
              and get your pod assignment 72 hours later. Recording goes out to everyone after both run.
            </p>

            <div className="calls">
              <div className="call">
                <div className="call-label">Session A · Wed</div>
                <h3>Wednesday, June 3</h3>
                <div className="call-time">3:00 – 3:45 PM ET · 12:00 – 12:45 PM PT</div>
                <a
                  className="call-link"
                  href="https://meet.google.com/xkg-cnqo-jse"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Join on Google Meet
                </a>
              </div>

              <div className="call">
                <div className="call-label">Session B · Thu</div>
                <h3>Thursday, June 4</h3>
                <div className="call-time">8:00 – 8:45 PM ET · 5:00 – 5:45 PM PT</div>
                <a
                  className="call-link"
                  href="https://meet.google.com/zuk-sunu-ahf"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Join on Google Meet
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* RECIPROCAL TERMS */}
        <section className="tone-ink">
          <div className="wrap">
            <div className="eyebrow">Reciprocal terms</div>
            <h2>
              Free isn&apos;t the absence of a price. It&apos;s a <span className="em">trade.</span>
            </h2>
            <p className="lede">
              Cohort 00 is free because you are the proof. In exchange for the seat:
            </p>

            <ul className="terms">
              {terms.map((t) => (
                <li key={t.strong}>
                  <span className="check">✓</span>
                  <div>
                    <strong>{t.strong}</strong> {t.rest}
                  </div>
                </li>
              ))}
            </ul>

            <p style={{ marginTop: 32, fontFamily: "'JetBrains Mono', monospace", fontSize: 13, letterSpacing: '0.06em', color: 'rgba(244,239,230,0.7)' }}>
              Not workable? Reply to your confirmation email before Session 1 and I&apos;ll move your seat to the waitlist. After Session 1, you&apos;re committed.
            </p>
          </div>
        </section>

        {/* WHAT'S NEXT */}
        <section className="tone-ember">
          <div className="wrap">
            <div className="eyebrow">What&apos;s next</div>
            <h1 className="display" style={{ color: 'var(--paper)' }}>
              After Demo Day,<br />
              the work <span className="scrib">keeps shipping.</span>
            </h1>
            <p className="lede">
              Cohort 00 ends. The platform doesn&apos;t. Your project stays on the showcase, your pod stays in
              Slack, your sandbox keeps running. Two ways to keep building:
            </p>

            <div className="chip-row">
              <span className="chip">Alumni · $29/mo charter</span>
              <span className="chip outline">Cohort 01 · Paid, Aug–Sep</span>
              <span className="chip outline">Mentor a pod · Free quarter</span>
              <span className="chip outline">Pitch on Demo Day · Bring partners</span>
            </div>

            <div className="cta-buttons">
              <Link href="/builders" className="btn-primary">
                See the Builders cohort
              </Link>
              <Link href="/workshop" className="btn-ghost">
                Back to /workshop
              </Link>
            </div>
          </div>
        </section>

        <div className="wrap">
          {/* FOOTER */}
          <footer className="footer-section">
            <div className="footer-grid">
              <div>FHIR IQ · Workshop Agenda · Cohort 00 · v1</div>
              <div>
                <Link href="/">fhiriq.com</Link> ·{' '}
                <Link href="/workshop">/workshop</Link> ·{' '}
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
