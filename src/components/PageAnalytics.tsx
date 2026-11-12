'use client';

import { useEffect } from 'react';
import { trackEvent } from '@/lib/analytics';

/**
 * Scroll-depth milestones for the long pages. Page views come from
 * <Analytics /> in the root layout; this used to send its own page_view as
 * well, which double-counted.
 *
 * Two marks, not four: 50% says the page held attention, 90% says it was read
 * to the end. 25% and 75% added events without changing any decision.
 */
const MARKS = [50, 90];

export default function PageAnalytics({ page }: { page: string }) {
  useEffect(() => {
    const fired = new Set<number>();

    const onScroll = () => {
      const scrollable = document.body.scrollHeight - window.innerHeight;
      if (scrollable <= 0) return;
      const percent = Math.round((window.scrollY / scrollable) * 100);
      for (const mark of MARKS) {
        if (percent >= mark && !fired.has(mark)) {
          fired.add(mark);
          trackEvent('scroll_depth', { page, depth: mark });
        }
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [page]);

  return null;
}
