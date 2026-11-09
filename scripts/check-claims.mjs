#!/usr/bin/env node
/**
 * Fails the build when copy the site has already had to retract comes back.
 *
 * Every pattern here was live on fhiriq.com at some point and was removed
 * because it could not be shown to be true: invented metrics, scarcity
 * counters, testimonials, a compliance claim, archived products, a stale job
 * title. See "Only link to things that are live" and "No invented social
 * proof" in CLAUDE.md.
 *
 * Comment lines are skipped, so code can explain why something was removed.
 * To add a fact that trips a rule, put it in src/lib/profile.ts with its
 * source, or change the rule here in the same commit and say why.
 *
 * Run: npm run check:claims (also runs before every build).
 */
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';

const ROOT = new URL('..', import.meta.url).pathname;
const SRC = join(ROOT, 'src');

/** [pattern, why it is banned] */
const RULES = [
  [/HIPAA[- ]compliant/i, 'Software cannot make anyone HIPAA compliant; HealthClaw says so itself'],
  [/most popular/i, 'Popularity badge with nothing behind it'],
  [/\b10\+ years\b/i, 'FHIR work starts in 2022; use YEARS_IN_HEALTHCARE_DATA'],
  [/\b450\+/, 'Unsourced subscriber count'],
  [/seats (filled|left|open)|\d+\s*\/\s*\d+\s*seats|seats_open/i, 'Scarcity counter'],
  [/placeholder:\s*true/, 'Placeholder testimonial data'],
  [/(our|the) (team of )?experts|our consultants|our growing community/i, 'One-person practice; write in the first person'],
  [/\bproven (process|approach|framework)\b/i, 'Unsupported superlative'],
  [/new episodes weekly|weekly (conversations|newsletter)/i, 'The feed is not weekly'],
  [/at Outcomes|Payer Interoperability Analytics/i, 'Past role; it lives in profile.ts with dates'],
  [/eugene\.vestel@gmail|support@fhiriq/i, 'Use PERSON.email'],
  [/calendar\.app\.google/, 'Use PERSON.bookingUrl', ['src/lib/profile.ts']],
  [/SmartHealthConnect|FHIRspective|AgentInterOp|Agent Interop|fhirquiz|FHIR Quiz|InteropGame|FHIRSquire|\bFPAS\b|Plumly/i, 'Archived project; do not advertise it'],
  [/claude-3-5-sonnet|claude-3-opus/, 'Retired model id'],
];

function walk(dir, out = []) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) walk(p, out);
    else if (/\.(tsx?|mjs|js)$/.test(name)) out.push(p);
  }
  return out;
}

const isComment = (line) => /^\s*(\/\/|\*|\/\*|\{\/\*)/.test(line);

let failures = 0;
for (const file of walk(SRC)) {
  const rel = relative(ROOT, file);
  readFileSync(file, 'utf8')
    .split('\n')
    .forEach((line, i) => {
      if (isComment(line)) return;
      for (const [re, why, allow = []] of RULES) {
        if (allow.includes(rel)) continue;
        if (re.test(line)) {
          failures++;
          console.error(`${rel}:${i + 1}  ${why}\n    ${line.trim().slice(0, 140)}`);
        }
      }
    });
}

if (failures) {
  console.error(`\ncheck-claims: ${failures} problem(s). See the header of scripts/check-claims.mjs.`);
  process.exit(1);
}
console.log('check-claims: ok');
