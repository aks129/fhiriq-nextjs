/**
 * Engagements and prices. /consulting renders this; /media-kit links to it
 * rather than carrying its own numbers. Before this file existed the two
 * pages quoted different prices for overlapping work, and the intro call was
 * 20, 30 or 45 to 60 minutes depending on which page you read.
 *
 * Describe scope and deliverables only. No outcome claims ("faster",
 * "saves"), no client names, no badges like "Most Popular".
 */

/** Matches the appointment length configured on the Google booking page. */
export const INTRO_CALL = 'Free 30-minute intro call';

export type Engagement = {
  id: string;
  name: string;
  /** Who it is for, in their words. */
  forWho: string;
  price: string;
  duration: string;
  deliverables: string[];
  /** Free reference that covers the general case, so a reader can self-serve first. */
  reading?: { href: string; label: string };
};

/** Fixed-scope reviews, ordered by the site's positioning: agents first. */
export const REVIEWS: Engagement[] = [
  {
    id: 'agent-review',
    name: 'Agent-on-FHIR review',
    forWho:
      'AI companies and health systems putting a model or agent in front of clinical data.',
    price: 'From $5K',
    duration: '2 to 4 weeks',
    deliverables: [
      'An access-pattern decision for your deployment: broker, SMART app or MCP server',
      'SMART v2 scope and token design per workflow, with read and write separated',
      'A redaction boundary that covers narrative and free text, not just structured fields',
      'An audit record design that captures model, prompt revision, tool call and approver',
      'A human-approval path for any write, and a written findings memo your governance committee can review',
    ],
    reading: { href: '/agentguide', label: 'The agent guide covers the general case' },
  },
  {
    id: 'measure-review',
    name: 'Digital quality measure review',
    forWho:
      'Quality and informatics teams whose eCQM or HEDIS numbers they need to defend.',
    price: 'From $5K',
    duration: '2 to 4 weeks',
    deliverables: [
      'One measure traced from source data to reported rate',
      'Where the logic, the value sets or the data drop patients, with examples',
      'CQL and SQL side by side for the definitions that matter',
      'A prioritised list of fixes, data or logic',
    ],
    reading: { href: 'https://openquality.us', label: 'Open Quality has the 2026 CMS eCQM packages' },
  },
  {
    id: 'app-readiness',
    name: 'Patient-access app readiness',
    forWho:
      'Digital health teams connecting a consumer or care-management app to EHRs and payers.',
    price: 'From $5K',
    duration: '2 to 3 weeks',
    deliverables: [
      'SMART App Launch plan: standalone and EHR launch, v2 scopes',
      'The EHR developer-program path you will go through, and what it asks for',
      'US Core mapping of the data you ingest',
      'Whether payer Patient Access APIs or TEFCA Individual Access Services change the plan',
      'An integration plan and risk list your engineers can build from',
    ],
    reading: { href: '/reference', label: 'Profiling and mapping guides' },
  },
];

export const OTHER: Engagement[] = [
  {
    id: 'code-review',
    name: 'Code and architecture review',
    forWho: 'Teams with a FHIR implementation already running.',
    price: 'From $3K',
    duration: '1 to 2 weeks',
    deliverables: [
      'Review of the codebase and the profiles and IGs it targets',
      'A report with prioritised fixes',
    ],
  },
  {
    id: 'training',
    name: 'Team training',
    forWho: 'Engineering and analytics teams new to FHIR, CQL or SQL on FHIR.',
    price: 'From $8K',
    duration: '2 to 5 days',
    deliverables: [
      'A curriculum built around your use case and data',
      'Hands-on sessions with real resources, not toy examples',
    ],
  },
  {
    id: 'advisory',
    name: 'Ongoing advisory',
    forWho: 'Teams that want a standing second opinion while they build.',
    price: 'From $15K / month',
    duration: 'Monthly, typically 3 to 6 months',
    deliverables: [
      'A weekly working session',
      'Architecture and design review as decisions come up',
    ],
  },
];
