import { track } from '@vercel/analytics';

type Prop = string | number | boolean | null;

/**
 * Client-side event tracking. Vercel Web Analytics is the only sink: the
 * site loads no other analytics script, and /privacy says so. Page views
 * are counted by <Analytics /> in the root layout, so never send a custom
 * page_view event; it double-counts and spends event quota.
 *
 * Send events for decisions, not activity: someone asked for contact,
 * subscribed, used the chat, or read a long page to the end.
 *
 * Vercel accepts flat primitive properties only. Never pass an email, a
 * chat message or any other personal data as a property.
 */
export function trackEvent(
  eventName: string,
  properties: Record<string, unknown> = {},
): void {
  try {
    const flat: Record<string, Prop> = {};
    for (const [k, v] of Object.entries(properties)) {
      if (v === null || ['string', 'number', 'boolean'].includes(typeof v)) {
        flat[k] = v as Prop;
      }
    }
    track(eventName, flat);
  } catch (error) {
    console.error('Event tracking error:', error);
  }
}

export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
