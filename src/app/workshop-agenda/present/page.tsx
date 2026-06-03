"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import "./present.css";

const FONT_LINK =
  "https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght,SOFT@9..144,300..900,0..100&family=Newsreader:ital,opsz,wght@0,6..72,300..700;1,6..72,400&family=JetBrains+Mono:wght@400;500;700&display=swap";

// Cohort 00 roster — 14 confirmed signups as of 2026-06-02 evening
const ROSTER: { name: string; building: string }[] = [
  { name: "John Noss", building: "Blue Button → expand" },
  { name: "Eric Guasch", building: "Primary-care network ops" },
  { name: "Divesh Aidasani", building: "EMR for home health" },
  { name: "Matthew Maher", building: "FHIR-based prior auth" },
  { name: "John Lee", building: "Anonymous patient tooling" },
  { name: "Joel Sathiyendra", building: "Scoping at intro call" },
  { name: "Mark Gunnels", building: "Experiment → shippable" },
  { name: "Michael Campbell", building: "FHIR-native build" },
  { name: "Vanessa Paolantonio", building: "Scoping at intro call" },
  { name: "Adam Carewe", building: "Anything and everything" },
  { name: "Rick Moore", building: "FHIR record locator service" },
  { name: "Sergei Polevikov", building: "Wants to build — scoping" },
  { name: "Eslam Elgebaly", building: "FHIR translation layer over legacy CIS" },
  { name: "Jayte Boehler", building: "Private, secure AI patient app" },
];

const SESSIONS = [
  {
    n: "01",
    title: "VS Code + Git + Claude Code, fluent.",
    d: "The day-one setup that makes the rest of the sprint feel obvious.",
  },
  {
    n: "02",
    title: "MCP servers + vector DB",
    d: "Live FHIR hands for your agent. Synthea, Medplum, the four tools that earn their seat.",
  },
  {
    n: "03",
    title: "FHIR-native workflows",
    titleEm: "workflows",
    d: "Survey → intervention. Screening → referral. Patient, provider, payer, or vendor — your call.",
  },
  {
    n: "04",
    title: "Ship one real slice",
    d: "Deployed. Tested. Watched by a real user before session 5.",
  },
  {
    n: "05",
    title: "Demos + what's next",
    d: "Public Demo Day. 90-sec pitch + 3-min demo. Senior leaders watching.",
  },
];

const POD_RULES = [
  {
    n: "01",
    title: "Five pods of four",
    d: "Assigned 72 hours before Session 1. Same problem, same Friday demo.",
  },
  {
    n: "02",
    title: "One problem per pod",
    d: "Picked from the Problem Board at kickoff. Linked back to the clinician who posted it.",
  },
  {
    n: "03",
    title: "Cadence",
    titleEm: "Cadence",
    d: "Daily 15-min async standup. Two 30-min syncs/week. Friday demo to the cohort.",
  },
  {
    n: "04",
    title: "Mentor per pod",
    d: "One senior healthcare engineer on your pod for the full 6 weeks.",
  },
];

const SURFACES = [
  {
    name: "Slack",
    purpose: "Working comms, pod channels, code, async unblocks.",
    rule: "Default-public. No DMs for program questions.",
  },
  {
    name: "WhatsApp",
    purpose: 'Signal only — "starting in 5", "demo link is", access requests.',
    rule: "If it can wait 4 hours, it goes in Slack.",
  },
  {
    name: "Weekly cohort call · Fri",
    purpose: "Pod demos and the only synchronous group session.",
    rule: "Mandatory live. 3 misses = removed.",
  },
  {
    name: "1:1 with Eugene",
    purpose: "Strategy, blockers, intros to senior leaders.",
    rule: "Two per builder. Google Meet, ad-hoc.",
  },
  {
    name: "Weekly report-out",
    purpose: "Shipped · blockers · asks. Public on fhirbuilders.com.",
    rule: "Due Thu 5pm ET. 5 sentences min.",
  },
  {
    name: "Pitch board",
    purpose: "1-page pitch per pod. Updated every 2 weeks.",
    rule: "Posted end of Week 2 and Week 4.",
  },
];

const TERMS = [
  {
    strong: "Ship live in Session 4.",
    rest: "Deployed URL, real FHIR read or write, a real user has touched it.",
  },
  {
    strong: "Appear on camera at Demo Day.",
    rest: "90-sec pitch + 3-min demo. Senior leaders + Cohort 01 waitlist watching.",
  },
  {
    strong: "Submit a testimonial within 7 days.",
    rest: "Written paragraph + 60-second video. Used to sell Cohort 01.",
  },
  {
    strong: "Let your project be the case study.",
    rest: "Linked from fhirbuilders.com/showcase under the Cohort 00 charter badge.",
  },
];

const SLIDE_COUNT = 14;

export default function PresentPage() {
  const [i, setI] = useState(0);
  const [showHint, setShowHint] = useState(true);

  const goNext = useCallback(() => setI((n) => Math.min(SLIDE_COUNT - 1, n + 1)), []);
  const goPrev = useCallback(() => setI((n) => Math.max(0, n - 1)), []);
  const goTo = useCallback((n: number) => setI(Math.max(0, Math.min(SLIDE_COUNT - 1, n))), []);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "ArrowRight" || e.key === "ArrowDown" || e.key === " " || e.key === "PageDown") {
        e.preventDefault();
        goNext();
      } else if (
        e.key === "ArrowLeft" ||
        e.key === "ArrowUp" ||
        e.key === "PageUp" ||
        (e.shiftKey && e.key === " ")
      ) {
        e.preventDefault();
        goPrev();
      } else if (e.key === "Home") {
        goTo(0);
      } else if (e.key === "End") {
        goTo(SLIDE_COUNT - 1);
      } else if (e.key === "f" || e.key === "F") {
        if (document.fullscreenElement) document.exitFullscreen();
        else document.documentElement.requestFullscreen();
      } else if (/^[1-9]$/.test(e.key)) {
        goTo(Number.parseInt(e.key, 10) - 1);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [goNext, goPrev, goTo]);

  // Hide the hint after first navigation
  useEffect(() => {
    if (i > 0) setShowHint(false);
  }, [i]);

  return (
    <>
      <link rel="stylesheet" href={FONT_LINK} />

      <div className="present-page">
        <div className="toolbar">
          <button type="button" onClick={() => goPrev()} aria-label="Previous slide">←</button>
          <button type="button" onClick={() => goNext()} aria-label="Next slide">→</button>
          <button
            type="button"
            onClick={() => {
              if (document.fullscreenElement) document.exitFullscreen();
              else document.documentElement.requestFullscreen();
            }}
          >
            Fullscreen
          </button>
          <Link href="/workshop-agenda">Exit</Link>
        </div>

        <div className="track" style={{ transform: `translateX(-${i * 100}vw)` }}>
          {/* 01 — TITLE */}
          <Slide n={1} tone="paper">
            <div className="slide-inner">
              <div className="eyebrow">FHIR IQ · Cohort 00 · Intro Call</div>
              <h1 className="xxl" style={{ marginTop: 24 }}>
                Building
                <br />
                Healthcare AI<br />
                with <span className="scrib">Claude Code.</span>
              </h1>
              <div className="lede" style={{ marginTop: 56, maxWidth: 720 }}>
                A 45-minute session to meet the cohort, see how the next 6 weeks work,
                and lock in the rules of the room.
              </div>
              <div className="chip-row">
                <span className="stamper">Free · Cohort 00</span>
                <span className="stamper" style={{ transform: "rotate(2deg)", color: "var(--ink)", borderColor: "var(--ink)" }}>
                  6-week sprint · 5 pods of 4
                </span>
              </div>
              <div className="author">
                <div className="av">EV</div>
                <div>
                  <div className="who-name">Eugene Vestel</div>
                  <div className="who-role">Founder, FHIR IQ · Ships things</div>
                </div>
              </div>
            </div>
          </Slide>

          {/* 02 — WHY */}
          <Slide n={2} tone="paper-light">
            <div className="slide-inner">
              <div className="eyebrow">Why this exists</div>
              <h1 className="lg" style={{ marginTop: 16 }}>
                Demos die in the gap<br />
                between prototype and{" "}
                <span className="scrib">clinician-touchable.</span>
              </h1>
              <div className="lede">
                Most healthcare AI cohorts teach concepts. This one is a forcing function to ship.
                Small enough that I know every project well enough to actually unstick you.
              </div>
              <div className="chip-row">
                <span className="chip">Tactics, not panels</span>
                <span className="chip outline" style={{ color: "var(--ink)" }}>
                  IDE open, not slides
                </span>
                <span className="chip outline" style={{ color: "var(--ink)" }}>
                  Real FHIR, not toy data
                </span>
              </div>
            </div>
          </Slide>

          {/* 03 — WHO I AM */}
          <Slide n={3} tone="paper">
            <div className="slide-inner">
              <div className="eyebrow">Who&apos;s running this</div>
              <h1 className="lg" style={{ marginTop: 16 }}>
                One operator,<br />
                <span className="em">not a course platform.</span>
              </h1>
              <div className="lede" style={{ maxWidth: 940 }}>
                Healthcare interoperability operator. Founder of <strong>FHIR IQ</strong> — the semantic
                intelligence layer for healthcare data — and host of <em>Out of the FHIR®</em>.
                Building HealthClaw (security layer between AI agents and clinical data) and
                publishing FHIR tools in public at github.com/aks129.
              </div>
              <div className="lede" style={{ marginTop: 16, maxWidth: 940 }}>
                Run cohorts the way I run projects: live, IDE-open, someone watching.
              </div>
              <div className="author">
                <div className="av">EV</div>
                <div>
                  <div className="who-name">Eugene Vestel</div>
                  <div className="who-role">fhiriq.com · evestel.substack.com · linkedin.com/in/evestel</div>
                </div>
              </div>
            </div>
          </Slide>

          {/* 04 — ROSTER */}
          <Slide n={4} tone="paper-light">
            <div className="slide-inner">
              <div className="eyebrow">Who&apos;s here</div>
              <h1 className="md" style={{ marginTop: 16 }}>
                Cohort 00 · <span className="em">{ROSTER.length} of 20 so far.</span>
              </h1>
              <div className="roster">
                {ROSTER.map((r) => (
                  <div className="who" key={r.name}>
                    <span className="name">{r.name}</span>
                    <span className="building">— {r.building}</span>
                  </div>
                ))}
              </div>
            </div>
          </Slide>

          {/* 05 — INTROS RULES */}
          <Slide n={5} tone="ink">
            <div className="slide-inner">
              <div className="eyebrow">Now: your intros</div>
              <div className="timer-grid">
                <div>
                  <div className="big-num">45<span style={{ fontSize: "0.4em" }}>s</span></div>
                  <div
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                      color: "var(--highlight)",
                      fontSize: "clamp(14px, 1.2vw, 18px)",
                      marginTop: 8,
                    }}
                  >
                    Hard timer · each
                  </div>
                </div>
                <div className="timer-rules">
                  <ul>
                    <li><span className="bullet">·</span> <span><strong>Name</strong> + org</span></li>
                    <li><span className="bullet">·</span> <span><strong>What you want to build</strong></span></li>
                    <li><span className="bullet">·</span> <span><strong>Pod fit</strong> — clinician? eng? PM? designer?</span></li>
                    <li><span className="bullet">·</span> <span>I&apos;ll go first to model it.</span></li>
                  </ul>
                </div>
              </div>
            </div>
          </Slide>

          {/* 06 — THE ARC */}
          <Slide n={6} tone="paper">
            <div className="slide-inner">
              <div className="eyebrow">What we&apos;ll be doing</div>
              <h1 className="lg" style={{ marginTop: 16 }}>
                Five sessions.<br />
                Zero <span className="em">homework theater.</span>
              </h1>
              <div className="rows">
                {SESSIONS.map((s) => (
                  <div className="row" key={s.n}>
                    <span className="n">{s.n}</span>
                    <div>
                      <div className="t">
                        {s.titleEm ? (
                          <>
                            {s.title.replace(s.titleEm, "")}
                            <span className="em">{s.titleEm}</span>
                          </>
                        ) : (
                          s.title
                        )}
                      </div>
                      <p className="d">{s.d}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Slide>

          {/* 07 — PODS */}
          <Slide n={7} tone="paper-light">
            <div className="slide-inner">
              <div className="eyebrow">How we&apos;ll build together</div>
              <h1 className="lg" style={{ marginTop: 16 }}>
                Pods of four.<br />
                <span className="em">One problem each.</span>
              </h1>
              <div className="rows">
                {POD_RULES.map((s) => (
                  <div className="row" key={s.n}>
                    <span className="n">{s.n}</span>
                    <div>
                      <div className="t">
                        {s.titleEm ? (
                          <>
                            {s.title.replace(s.titleEm, "")}
                            <span className="em">{s.titleEm}</span>
                          </>
                        ) : (
                          s.title
                        )}
                      </div>
                      <p className="d">{s.d}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Slide>

          {/* 08 — CADENCE */}
          <Slide n={8} tone="ink">
            <div className="slide-inner">
              <div className="eyebrow">Pod cadence</div>
              <h1 className="lg" style={{ marginTop: 16, color: "var(--paper)" }}>
                Five hours a week.<br />
                <span className="em">More if you want.</span>
              </h1>
              <div className="rows" style={{ marginTop: 56 }}>
                <div className="row">
                  <span className="n">Daily</span>
                  <div>
                    <div className="t">15-min async standup in pod channel</div>
                    <p className="d">Yesterday · today · blocked · agent tasks queued.</p>
                  </div>
                </div>
                <div className="row">
                  <span className="n">2× wk</span>
                  <div>
                    <div className="t">Pod sync — Mon plan, Wed unblock</div>
                    <p className="d">30 minutes each. Camera optional. Pair-program if you can.</p>
                  </div>
                </div>
                <div className="row" style={{ borderBottom: "none" }}>
                  <span className="n">Fri</span>
                  <div>
                    <div className="t">Pod demo to the cohort</div>
                    <p className="d">10 min/pod · one senior leader on camera reviewing live.</p>
                  </div>
                </div>
              </div>
            </div>
          </Slide>

          {/* 09 — CONTACT SURFACES */}
          <Slide n={9} tone="paper-light">
            <div className="slide-inner">
              <div className="eyebrow">Where we talk</div>
              <h1 className="md" style={{ marginTop: 16 }}>
                Six surfaces. <span className="em">One job each.</span>
              </h1>
              <div className="surfaces">
                {SURFACES.map((s) => (
                  <div className="surface" key={s.name}>
                    <div className="surface-name">{s.name}</div>
                    <div className="surface-purpose">{s.purpose}</div>
                    <div className="surface-rule">{s.rule}</div>
                  </div>
                ))}
              </div>
            </div>
          </Slide>

          {/* 10 — fhirbuilders.com walkthrough */}
          <Slide n={10} tone="ember">
            <div className="slide-inner">
              <div className="eyebrow">Now: live walkthrough</div>
              <h1 className="xl" style={{ marginTop: 32, color: "var(--paper)" }}>
                Switch tab to <span className="scrib">fhirbuilders.com</span>
              </h1>
              <div className="lede" style={{ marginTop: 36, maxWidth: 920 }}>
                Your inside-the-house surface for the next 6 weeks. The Cohort 00 home, the
                Problem Board, the Sandbox, the Showcase — and where your shipped work lives.
              </div>
              <div style={{ marginTop: 56, display: "flex", gap: 36, alignItems: "flex-end", flexWrap: "wrap" }}>
                <div className="qr-box">
                  <div className="qr-label">Bookmark</div>
                  <div className="qr-url">fhirbuilders.com/cohort/cohort-00</div>
                </div>
                <div className="chip-row" style={{ margin: 0 }}>
                  <span className="chip">/cohort/cohort-00</span>
                  <span className="chip outline">/problems</span>
                  <span className="chip outline">/sandbox</span>
                  <span className="chip outline">/showcase</span>
                </div>
              </div>
            </div>
          </Slide>

          {/* 11 — RECIPROCAL TERMS */}
          <Slide n={11} tone="ink">
            <div className="slide-inner">
              <div className="eyebrow">Reciprocal terms</div>
              <h1 className="lg" style={{ marginTop: 16, color: "var(--paper)" }}>
                Free isn&apos;t the absence of a price.<br />
                It&apos;s a <span className="em">trade.</span>
              </h1>
              <ul className="terms">
                {TERMS.map((t) => (
                  <li key={t.strong}>
                    <span className="check">✓</span>
                    <div>
                      <strong>{t.strong}</strong> {t.rest}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </Slide>

          {/* 12 — WHAT'S NEXT */}
          <Slide n={12} tone="ember">
            <div className="slide-inner">
              <div className="eyebrow">After Demo Day</div>
              <h1 className="xl" style={{ marginTop: 24, color: "var(--paper)" }}>
                The work <span className="scrib">keeps shipping.</span>
              </h1>
              <div className="lede" style={{ marginTop: 36, maxWidth: 920 }}>
                Cohort 00 ends. Your project lives. Your pod stays. Two ways to stay in:
              </div>
              <div className="chip-row" style={{ marginTop: 40 }}>
                <span className="chip">Alumni · $29/mo charter</span>
                <span className="chip outline">Cohort 01 · Aug 2026</span>
                <span className="chip outline">Mentor a pod · free quarter</span>
                <span className="chip outline">Pitch on Demo Day</span>
              </div>
            </div>
          </Slide>

          {/* 13 — Q&A */}
          <Slide n={13} tone="paper">
            <div className="slide-inner">
              <div className="eyebrow">Open floor</div>
              <h1 className="xxl" style={{ marginTop: 56 }}>
                <span className="scrib">Questions.</span>
              </h1>
              <div className="lede" style={{ marginTop: 56, maxWidth: 720 }}>
                Most common: time commitment · can I miss a session · can I bring a teammate ·
                what counts as &ldquo;shipped&rdquo; · what about my IP.
              </div>
            </div>
          </Slide>

          {/* 14 — CLOSE */}
          <Slide n={14} tone="ink">
            <div className="slide-inner">
              <div className="eyebrow">Thank you</div>
              <h1 className="lg" style={{ marginTop: 16, color: "var(--paper)" }}>
                Pre-work tomorrow.<br />
                Pods <span className="em">Friday.</span><br />
                Session 1 <span className="em">Mon Jun 8.</span>
              </h1>
              <div className="lede" style={{ marginTop: 36, maxWidth: 920 }}>
                I&apos;ll send the Slack + WhatsApp invites, the setup checklist, and your Cal.com
                1:1 link within 24 hours. You&apos;ll see your pod by Friday EOD.
              </div>
              <div className="author" style={{ marginTop: 56 }}>
                <div className="av">EV</div>
                <div>
                  <div className="who-name">See you Monday.</div>
                  <div className="who-role">gene@fhiriq.com · fhirbuilders.com/cohort/cohort-00</div>
                </div>
              </div>
            </div>
          </Slide>
        </div>

        {/* Progress dots */}
        <div className="dots">
          {Array.from({ length: SLIDE_COUNT }).map((_, n) => (
            <button
              key={n}
              type="button"
              className={n === i ? "active" : undefined}
              onClick={() => goTo(n)}
              aria-label={`Go to slide ${n + 1}`}
            />
          ))}
        </div>

        {showHint && (
          <div className="keyboard-hint">
            <kbd>→</kbd> next · <kbd>←</kbd> back · <kbd>F</kbd> fullscreen · <kbd>1–9</kbd> jump
          </div>
        )}
      </div>
    </>
  );
}

function Slide({
  n,
  tone,
  children,
}: {
  n: number;
  tone: "paper" | "paper-light" | "ink" | "ember";
  children: React.ReactNode;
}) {
  const toneClass = tone === "paper" ? "" : `tone-${tone}`;
  return (
    <div className={`slide ${toneClass}`.trim()}>
      {children}
      <div className="slide-footer">
        <div className="logo">
          FHIR<span>IQ</span>
        </div>
        <div className="counter">
          {String(n).padStart(2, "0")} / {String(SLIDE_COUNT).padStart(2, "0")}
        </div>
      </div>
    </div>
  );
}
