'use client';

import { useState } from 'react';
import Link from 'next/link';

const GAMES = [
  { href: '/games/healthio', label: 'FHIR Quiz' },
  { href: '/games/hti6-builder', label: 'HTI-6' },
  { href: '/games/ai-agent', label: 'AI Agent' },
] as const;

/**
 * Promo strip for /games. Now an ink bar in normal document flow above the
 * nav, rather than a fixed amber-to-purple gradient pinned at top-16 — which
 * assumed a 64px nav and overlapped anything taller.
 */
export default function HealthIOBanner() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="panel border-b border-line-2">
      <div className="mx-auto flex max-w-[84rem] items-center gap-4 px-6 py-2.5">
        <p className="flex min-w-0 flex-1 items-baseline gap-3 text-sm">
          <span className="label text-fg shrink-0">Fun &amp; Games</span>
          <span className="truncate text-fg/85">
            Three challenges, three badges. How well do you know healthcare?
          </span>
        </p>

        <div className="hidden shrink-0 items-center gap-1.5 md:flex">
          {GAMES.map((g) => (
            <Link
              key={g.href}
              href={g.href}
              className="label border border-line-2 px-2.5 py-1 text-fg-3 transition-colors hover:border-fg hover:text-fg"
            >
              {g.label}
            </Link>
          ))}
        </div>

        <Link
          href="/games/healthio"
          className="label shrink-0 border border-fg px-2.5 py-1 text-fg md:hidden"
        >
          Play
        </Link>

        <button
          onClick={() => setIsVisible(false)}
          className="shrink-0 p-1 text-fg-3 transition-colors hover:text-fg"
          aria-label="Dismiss banner"
        >
          <svg
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
