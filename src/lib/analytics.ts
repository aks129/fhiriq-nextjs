/**
 * Client-side event tracking. Lifted verbatim out of the old homepage so the
 * same events keep firing to the same sinks (gtag, PostHog) with the same
 * names — the redesign is visual, not analytical.
 */
export function trackEvent(
  eventName: string,
  properties: Record<string, unknown> = {},
): void {
  try {
    console.log('Track event:', eventName, properties);
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
