import { track } from '@vercel/analytics';

type Prop = string | number | boolean | null;

/**
 * Client-side event tracking.
 *
 * Vercel Web Analytics is the sink that is actually loaded on this site; the
 * gtag and PostHog branches only fire if one of those scripts is ever added.
 * Before November 2026 they were the only sinks, so every CTA event was a
 * no-op in production. Vercel custom events need a Pro plan; on Hobby the
 * call is accepted and dropped.
 *
 * Vercel accepts flat primitive properties only, and never pass an email or
 * any other personal data as a property.
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
    if (typeof window !== 'undefined' && 'gtag' in window) {
      (
        window as unknown as {
          gtag: (type: string, event: string, properties: unknown) => void;
        }
      ).gtag('event', eventName, properties);
    }
    if (typeof window !== 'undefined' && 'posthog' in window) {
      (
        window as unknown as {
          posthog: { capture: (event: string, properties: unknown) => void };
        }
      ).posthog.capture(eventName, properties);
    }
  } catch (error) {
    console.error('Event tracking error:', error);
  }
}

export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
