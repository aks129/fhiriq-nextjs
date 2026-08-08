'use client';

import { useId, useState } from 'react';
import { trackEvent, isValidEmail } from '@/lib/analytics';

/**
 * Newsletter capture. Same endpoint and same events as the old inline form;
 * the alert()-based feedback is replaced with inline status text so the
 * result is announced to screen readers instead of hijacking the tab.
 */
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
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{
    kind: 'ok' | 'error';
    message: string;
  } | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!isValidEmail(email)) {
      setStatus({ kind: 'error', message: 'Enter a valid email address.' });
      return;
    }

    setLoading(true);
    setStatus(null);
    trackEvent('newsletter_cta_clicked', { location });

    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await response.json();

      if (response.ok) {
        setStatus({ kind: 'ok', message: 'Subscribed. Check your inbox.' });
        trackEvent('newsletter_signup', { email });
        setEmail('');
      } else {
        setStatus({
          kind: 'error',
          message: data.error || 'Could not subscribe. Try again.',
        });
      }
    } catch (error) {
      console.error('Newsletter signup error:', error);
      setStatus({ kind: 'error', message: 'Could not subscribe. Try again.' });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={className}>
      <form onSubmit={onSubmit} className="flex flex-col gap-2 sm:flex-row">
        <label htmlFor={id} className="sr-only">
          Email address
        </label>
        <input
          id={id}
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@organization.org"
          autoComplete="email"
          required
          className="min-w-0 flex-1 px-3.5 py-3 text-sm"
        />
        <button
          type="submit"
          disabled={loading}
          className="btn-primary shrink-0 disabled:opacity-60"
        >
          {loading ? 'Subscribing…' : cta}
        </button>
      </form>
      <p
        role="status"
        aria-live="polite"
        className={`mt-2 min-h-[1.25rem] text-sm ${
          status?.kind === 'error' ? 'text-verm-text' : 'text-ink-2'
        }`}
      >
        {status?.message ?? ''}
      </p>
    </div>
  );
}
