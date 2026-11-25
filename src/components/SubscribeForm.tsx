'use client';

import { useId, useState } from 'react';
import { trackEvent, isValidEmail } from '@/lib/analytics';
import { NEWSLETTER_FREE_SIGNUP } from '@/lib/profile';

/**
 * Newsletter capture.
 *
 * The form is Substack's free sign-up (NEWSLETTER_FREE_SIGNUP), submitted
 * natively by the reader, so Substack subscribes them and sends its welcome.
 * Before it goes, a beacon to /api/subscribe tells Gene who signed up and from
 * where. It used to open Substack's prefilled /subscribe page instead, which
 * shows a plan picker with a paid plan preselected.
 */
function notifySignup(email: string) {
  const body = JSON.stringify({ email: email.trim() });
  try {
    if (navigator.sendBeacon?.('/api/subscribe', new Blob([body], { type: 'application/json' }))) {
      return;
    }
  } catch {
    // fall through to fetch
  }
  void fetch('/api/subscribe', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body,
    keepalive: true,
  }).catch(() => undefined);
}

export default function SubscribeForm({
  location,
  cta = 'Subscribe',
  className = '',
}: {
  location: string;
  cta?: string;
  className?: string;
}) {
  const id = useId();
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string | null>(null);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    if (!isValidEmail(email)) {
      e.preventDefault();
      setError('Enter a valid email address.');
      return;
    }
    // No preventDefault: the browser now posts the form to Substack.
    trackEvent('newsletter_signup', { location });
    notifySignup(email);
  }

  return (
    <div className={className}>
      <form
        action={NEWSLETTER_FREE_SIGNUP}
        method="post"
        onSubmit={onSubmit}
        className="flex flex-col gap-2 sm:flex-row"
      >
        <input type="hidden" name="source" value="embed" />
        <label htmlFor={id} className="sr-only">
          Email address
        </label>
        <input
          id={id}
          type="email"
          name="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setError(null);
          }}
          placeholder="you@organization.org"
          autoComplete="email"
          required
          className="min-w-0 flex-1 px-3.5 py-3 text-sm"
        />
        <button type="submit" className="btn-primary shrink-0">
          {cta}
        </button>
      </form>
      <p
        role="status"
        aria-live="polite"
        className={`mt-2 min-h-[1.25rem] text-sm ${error ? 'text-fg' : 'text-fg-2'}`}
      >
        {error ?? 'Free. Substack sends it, and every issue has an unsubscribe link.'}
      </p>
    </div>
  );
}
