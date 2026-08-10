/**
 * Cohort 00 joining details.
 *
 * The Slack invite lived hardcoded in two places — /workshop-agenda and the
 * /workshop-agenda/present deck shown on intro calls — and it expired.
 * Slack's shared invite links can be time- or use-limited, so this will
 * happen again; keeping the URL in one constant means the next rotation is
 * a one-line change rather than a search.
 *
 * Verified 2026-08-10: the previous link
 * (zt-405j5tykg-T9v8~nNaX9tFZZgzaj37Ow) returns Slack's "This link is no
 * longer active" error page. It is deliberately not shipped.
 *
 * To restore: create a shared invite in the fhirbuilders workspace, prefer
 * one that does not expire, and set it here. The UI switches back to a
 * direct join link automatically.
 */
export const SLACK_INVITE: string | null = null;

/** Where to send people while there is no working invite. */
export const SLACK_FALLBACK_EMAIL = 'gene@fhiriq.com';

export const SLACK_FALLBACK_HREF = `mailto:${SLACK_FALLBACK_EMAIL}?subject=${encodeURIComponent(
  'Cohort 00 Slack invite',
)}&body=${encodeURIComponent(
  "Hi Gene — could you send me an invite to the FHIR Builders Slack workspace?\n\nThanks!",
)}`;
