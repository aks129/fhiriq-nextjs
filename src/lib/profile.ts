/**
 * The one place the site states facts about Eugene.
 *
 * Every page that names a role, a date, a contact channel or a credential
 * imports it from here. The reviewers who audited the site found four
 * different careers across /about, /consulting, /builders and the homepage
 * ("10+ years implementing FHIR", "Payer Interoperability ... AI Lead" in the
 * present tense, a personal Gmail address on one page). That drift is what
 * this file exists to prevent.
 *
 * Rules for editing:
 * - Only add a fact that can be shown to someone who asks: a public page,
 *   a press release, a repo, or Eugene's own employment record.
 * - Do not name a current employer. Past roles carry dates; the present is
 *   described by the public work (HealthClaw, Open Quality, the podcast).
 * - When a role ends, change it here and nowhere else.
 */

/**
 * The site's canonical origin. Production serves www and redirects the apex
 * to it, so canonical URLs, og:url and the sitemap use www. If the Vercel
 * domain setup is flipped to apex-primary, change it here only.
 */
export const SITE_URL = 'https://www.fhiriq.com';

export const PERSON = {
  name: 'Eugene Vestel',
  email: 'gene@fhiriq.com',
  location: 'Pittsburgh, Pennsylvania',
  bookingUrl: 'https://calendar.app.google/TMvRGiiYfbBKNd889',
  linkedin: 'https://www.linkedin.com/in/evestel/',
  github: 'https://github.com/aks129',
  substack: 'https://evestel.substack.com',
  homepage: 'https://eugenevestel.com',
} as const;

/** Healthcare data work runs from Medco Health Solutions (2007) onward. */
export const YEARS_IN_HEALTHCARE_DATA = '15+ years in healthcare data';

/**
 * One-sentence bio. Use it verbatim wherever a page introduces Eugene, so the
 * claim is identical everywhere.
 */
export const BIO =
  "I built b.well Connected Health's first FHIR team, spent five years in quality analytics at UPMC Health Plan, and now publish open-source tools and free reference for putting AI agents on FHIR data and running digital quality measures.";

export type Role = {
  org: string;
  title: string;
  dates: string;
  detail: string;
  /** Public source a reader can check, where one exists. */
  source?: { href: string; label: string };
};

export const EXPERIENCE: Role[] = [
  {
    org: 'HealthClaw',
    title: 'Creator',
    dates: '2025 –',
    detail:
      'Open-source guardrails between AI agents and FHIR data: field redaction on reads, human approval on writes, an audit trail of both.',
    source: { href: 'https://github.com/aks129/HealthClawGuardrails', label: 'GitHub' },
  },
  {
    org: 'Out of the FHIR',
    title: 'Host',
    dates: 'April 2025 –',
    detail:
      'Podcast conversations with people building healthcare interoperability.',
    source: {
      href: 'https://podcasts.apple.com/us/podcast/out-of-the-fhir-podcast/id1822845248',
      label: 'Apple Podcasts',
    },
  },
  {
    org: 'Outcomes',
    title: 'Senior Product Manager',
    dates: '2025 – 2026',
    detail: 'Product management at a national pharmacy data platform.',
  },
  {
    // A defined contract engagement, not a standing advisory role.
    org: 'NCQA',
    title: 'FHIR advisor (contract)',
    dates: '2025',
    detail:
      'Strategy for digital content services and AI adoption, and data quality strategy.',
  },
  {
    org: 'b.well Connected Health',
    title: 'Director of Analytics',
    dates: '2022 – 2025',
    detail:
      'Formed and led the first FHIR data team. Stood up analytics on FHIR, wrote the FHIR profiles for the platform, and mapped the data for the interoperability platform now behind Samsung Health and Fitbit medical records.',
  },
  {
    org: 'UPMC Health Plan',
    title: 'Manager, Strategic Data Management & Operations, Quality Analytics',
    dates: '2017 – 2022',
    detail:
      'Led the analytics team behind quality reporting, including HEDIS measure analysis and member outreach.',
  },
  {
    org: 'Allegheny Health Network',
    title: 'Manager, Business Intelligence',
    dates: '2014 – 2016',
    detail: 'Business intelligence for an integrated delivery network.',
  },
  {
    org: 'Express Scripts · Medco Health Solutions',
    title: 'Data reconciliation and finance systems',
    dates: '2007 – 2013',
    detail: 'Medicare Part D enrollment reconciliation and pharmacy benefit finance systems.',
  },
];

export const EDUCATION = [
  { school: 'University of Pittsburgh, Katz Graduate School of Business', degree: 'MBA, Healthcare', year: '2018' },
  { school: 'Brooklyn College', degree: 'B.S., Business Administration', year: '2006' },
] as const;

/**
 * The credential wall on the homepage. Short labels; each one must also
 * appear in EXPERIENCE or STANDARDS so it can be traced.
 */
export const CREDENTIALS = [
  { label: 'b.well Connected Health', detail: 'Built the first FHIR team' },
  { label: 'UPMC Health Plan', detail: '5 years · Quality Analytics' },
  { label: 'NCQA', detail: 'FHIR advisor · 2025' },
  { label: 'SQL on FHIR', detail: 'HL7 IG participant' },
  { label: 'HL7 FHIR DevDays', detail: 'Speaker · HealthClaw' },
  { label: 'HealthClaw', detail: 'Creator · open source' },
] as const;
