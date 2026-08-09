'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

/**
 * Fig. 1 — the signature moment.
 *
 * A real CQL numerator definition and the warehouse SQL it compiles to, set
 * as a figure on the page. The motion is a compiler pass: a cursor walks the
 * source, and each source line lights the target lines it produced.
 *
 * The critical property: NOTHING is ever hidden. Both panes render complete
 * on the server and stay complete. The animation only moves a highlight, so
 * with JS off, under reduced motion, in a screenshot, or in a non-scrolling
 * render, the figure is fully legible. There is no state in which this
 * component shows an empty or partial pane.
 */

const CQL: readonly string[] = [
  `valueset "Systolic BP": '2.16.840.1.113883.3.526.3.1032'`,
  ``,
  `define "Numerator":`,
  `  exists (`,
  `    [Observation: "Systolic BP"] BP`,
  `      where BP.effective during "Measurement Period"`,
  `        and BP.value < 140 'mm[Hg]'`,
  `  )`,
];

const SQL: readonly string[] = [
  `SELECT DISTINCT p.patient_id`,
  `FROM   patient AS p`,
  `JOIN   observation AS o`,
  `  ON   o.subject_ref = p.patient_id`,
  `JOIN   valueset_member AS v`,
  `  ON   v.code = o.code`,
  ` AND   v.system = o.code_system`,
  `WHERE  v.valueset_oid = '2.16.840.1.113883.3.526.3.1032'`,
  `  AND  o.effective BETWEEN :period_start AND :period_end`,
  `  AND  o.value_quantity < 140`,
];

/** Which source lines produce which target lines. 1-indexed, matching gutters. */
const PASSES: readonly { cql: number[]; sql: number[] }[] = [
  { cql: [1], sql: [5, 6, 7, 8] },
  { cql: [3, 4], sql: [1, 2] },
  { cql: [5], sql: [3, 4] },
  { cql: [6], sql: [9] },
  { cql: [7], sql: [10] },
];

const STEP_MS = 620;

// Scaffolding recedes, logic advances. Two tones, no rainbow highlighting.
const KEYWORDS =
  /\b(SELECT|DISTINCT|FROM|JOIN|ON|AND|OR|WHERE|BETWEEN|AS|define|exists|where|during|valueset|and)\b/g;

function Tokenized({ line }: { line: string }) {
  if (!line) return <>{' '}</>;
  const parts = line.split(KEYWORDS);
  return (
    <>
      {parts.map((part, i) =>
        // split() with a capturing group puts the delimiters at odd indices.
        i % 2 === 1 ? (
          <span key={i} className="text-fg-3">
            {part}
          </span>
        ) : (
          <span key={i}>{part}</span>
        ),
      )}
    </>
  );
}

function Pane({
  label,
  sublabel,
  lines,
  active,
  tone,
}: {
  label: string;
  sublabel: string;
  lines: readonly string[];
  active: Set<number>;
  tone: 'source' | 'target';
}) {
  return (
    <div className="min-w-0">
      <div className="flex items-baseline justify-between gap-3 border-b border-line-2 px-4 py-2.5 sm:px-5">
        <span className="label text-fg">{label}</span>
        <span className="label text-fg-3 normal-case tracking-normal">
          {sublabel}
        </span>
      </div>
      <pre className="overflow-x-auto px-2 py-4 sm:px-3">
        <code className="block font-mono text-[12px] leading-[1.75] sm:text-[13px]">
          {lines.map((line, i) => {
            const n = i + 1;
            const on = active.has(n);
            return (
              <span
                key={n}
                // Monochrome, so the pass reads through tone and a rule
                // rather than colour. Source is marked, target is filled —
                // the asymmetry is what makes the direction legible.
                className={[
                  'flex gap-3 border-l-2 pl-2 pr-3 transition-colors duration-300 sm:pl-3',
                  on
                    ? tone === 'source'
                      ? 'border-fg-3 bg-white/[0.03]'
                      : 'border-fg bg-white/[0.07]'
                    : 'border-transparent',
                ].join(' ')}
              >
                <span
                  aria-hidden="true"
                  className={`w-4 shrink-0 select-none text-right tabular-nums ${
                    on ? 'text-fg' : 'text-fg-3'
                  }`}
                >
                  {n}
                </span>
                <span
                  className={`whitespace-pre ${
                    on ? 'text-fg' : 'text-fg/70'
                  }`}
                >
                  <Tokenized line={line} />
                </span>
              </span>
            );
          })}
        </code>
      </pre>
    </div>
  );
}

export default function TranspileFigure() {
  // -1 means "at rest": the completed figure, no highlight. This is also the
  // server-rendered state, so SSR output is the finished figure.
  const [step, setStep] = useState(-1);
  const [canAnimate, setCanAnimate] = useState(false);
  const hostRef = useRef<HTMLElement | null>(null);
  const timers = useRef<number[]>([]);

  const clearTimers = () => {
    timers.current.forEach((t) => window.clearTimeout(t));
    timers.current = [];
  };

  const play = useCallback(() => {
    clearTimers();
    PASSES.forEach((_, i) => {
      timers.current.push(
        window.setTimeout(() => setStep(i), i * STEP_MS),
      );
    });
    // Settle back to the complete, unhighlighted figure.
    timers.current.push(
      window.setTimeout(() => setStep(-1), PASSES.length * STEP_MS + 900),
    );
  }, []);

  useEffect(() => {
    const reduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;
    if (reduced) return;
    setCanAnimate(true);

    const host = hostRef.current;
    if (!host || typeof IntersectionObserver === 'undefined') return;

    let played = false;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting && !played) {
            played = true;
            play();
            io.disconnect();
          }
        }
      },
      { threshold: 0.35 },
    );
    io.observe(host);
    return () => {
      io.disconnect();
      clearTimers();
    };
  }, [play]);

  const pass = step >= 0 ? PASSES[step] : null;
  const activeCql = new Set(pass?.cql ?? []);
  const activeSql = new Set(pass?.sql ?? []);

  return (
    // min-w-0 all the way down: grid and flex children default to
    // min-width:auto, which lets the <pre> push its track wider than the
    // viewport instead of scrolling inside it.
    <figure ref={hostRef} className="relative min-w-0">
      <div className="panel relative min-w-0 border border-line-2">
        {/* Figure rail */}
        <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2 border-b border-line-2 px-4 py-3 sm:px-5">
          <div className="flex items-baseline gap-3">
            <span className="label text-fg">Fig. 1</span>
            <span className="label text-fg-3 normal-case tracking-normal">
              CBP · Controlling High Blood Pressure
            </span>
          </div>
          {canAnimate && (
            <button
              type="button"
              onClick={play}
              className="label border border-line-2 px-2.5 py-1 text-fg-3 transition-colors hover:border-fg hover:text-fg"
            >
              Run the pass
            </button>
          )}
        </div>

        {/* Side by side only from xl. The longest SQL line needs ~492px; at
            md the two panes get ~292px each and the code is unreadable, so
            below xl they stack and each gets the full column. */}
        <div className="grid min-w-0 xl:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] xl:divide-x xl:divide-line-2">
          <Pane
            label="Source"
            sublabel="CQL"
            lines={CQL}
            active={activeCql}
            tone="source"
          />
          <div className="min-w-0 border-t border-line-2 xl:border-t-0">
            <Pane
              label="Compiled"
              sublabel="ANSI SQL"
              lines={SQL}
              active={activeSql}
              tone="target"
            />
          </div>
        </div>

        {/* Readout. Structural facts about the figure, not a benchmark. */}
        <dl className="flex flex-wrap gap-x-6 gap-y-1.5 border-t border-line-2 px-4 py-3 sm:px-5">
          {[
            ['Measure', '1'],
            ['Value sets', '1'],
            ['Source lines', String(CQL.filter(Boolean).length)],
            ['Target lines', String(SQL.length)],
          ].map(([k, v]) => (
            <div key={k} className="flex items-baseline gap-2">
              <dt className="label text-fg-3">{k}</dt>
              <dd className="font-mono text-xs tabular-nums text-fg">
                {v}
              </dd>
            </div>
          ))}
        </dl>
      </div>

      <figcaption className="caption mt-4 measure">
        Fig. 1 — A quality-measure numerator written once in CQL, and the
        warehouse SQL it compiles to. The value set resolves to a join, the
        measurement period to a bounded predicate.
      </figcaption>
    </figure>
  );
}
