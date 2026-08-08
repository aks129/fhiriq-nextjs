'use client';

import { useEffect } from 'react';
import { trackEvent } from '@/lib/analytics';

/**
 * Page-view plus scroll-depth milestones, lifted out of the old homepage so
 * the page itself can be a server component. Same event names and thresholds.
 */
export default function PageAnalytics({ page }: { page: string }) {
  useEffect(() => {
    trackEvent('page_view', { page, timestamp: new Date().toISOString() });

    const fired = new Set<number>();
    const marks = [25, 50, 75, 90];

    const onScroll = () => {
      const scrollable = document.body.scrollHeight - window.innerHeight;
      if (scrollable <= 0) return;
      const percent = Math.round((window.scrollY / scrollable) * 100);
      for (const mark of marks) {
        if (percent >= mark && !fired.has(mark)) {
          fired.add(mark);
          trackEvent('scroll_depth', { depth: mark });
        }
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [page]);

  return null;
}
