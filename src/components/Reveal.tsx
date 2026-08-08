'use client';

import { useEffect } from 'react';

/**
 * Arms the scroll-reveal for elements carrying `.reveal`.
 *
 * The hard requirement is that motion must NEVER hide content. A reveal that
 * relies on IntersectionObserver alone fails exactly where it matters: a
 * full-page screenshot, a print render, a headless crawl, or any viewport
 * that never scrolls. Everything below the fold stays at opacity 0 forever,
 * because the observer fires with non-intersecting entries and then simply
 * never fires again.
 *
 * So this arms nothing until the reader has actually scrolled, and disarms
 * everything shortly afterwards regardless:
 *
 *   1. Nothing is armed at load. The page renders fully visible, always.
 *      That covers JS-off, reduced-motion, screenshots, print and crawlers
 *      without depending on any observer behaving.
 *   2. Arming happens on the first genuine scroll, and only for elements
 *      still well below the viewport.
 *   3. A blanket 2.5s failsafe then disarms whatever has not been revealed.
 *      The reveal is a grace note on the first screenful or two; after that
 *      everything is simply visible, which is the safe state.
 *   4. beforeprint disarms immediately.
 */
export default function Reveal() {
  useEffect(() => {
    const nodes = Array.from(document.querySelectorAll<HTMLElement>('.reveal'));
    if (nodes.length === 0) return;

    const disarm = () => nodes.forEach((n) => n.classList.remove('is-armed'));

    if (
      typeof IntersectionObserver === 'undefined' ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      return;
    }

    let io: IntersectionObserver | null = null;
    let failsafe = 0;
    let armed = false;

    const arm = () => {
      if (armed) return;
      armed = true;
      window.removeEventListener('scroll', arm);

      // Only elements comfortably below the fold — nothing on screen is ever
      // hidden and re-shown, so there is no flash.
      const cutoff = window.innerHeight * 1.1;
      const targets = nodes.filter(
        (n) => n.getBoundingClientRect().top > cutoff,
      );
      if (targets.length === 0) return;

      targets.forEach((n) => n.classList.add('is-armed'));

      io = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              entry.target.classList.add('is-in');
              io?.unobserve(entry.target);
            }
          }
        },
        { rootMargin: '0px 0px -6% 0px', threshold: 0.04 },
      );
      targets.forEach((n) => io?.observe(n));

      failsafe = window.setTimeout(() => {
        disarm();
        io?.disconnect();
      }, 2500);
    };

    window.addEventListener('scroll', arm, { passive: true, once: true });
    window.addEventListener('beforeprint', disarm);

    return () => {
      window.removeEventListener('scroll', arm);
      window.removeEventListener('beforeprint', disarm);
      window.clearTimeout(failsafe);
      io?.disconnect();
      disarm();
    };
  }, []);

  return null;
}
