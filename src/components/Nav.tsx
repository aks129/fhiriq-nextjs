import Link from 'next/link';
import TrackedLink from './TrackedLink';

/**
 * The site's first shared Nav. 36 routes each inlined their own <nav> before
 * this existed, which is why a palette change used to be a 36-file diff.
 *
 * Server component. The mobile disclosure is a native <details>, so the menu
 * opens with zero JavaScript and is keyboard operable for free.
 */

const LINKS = [
  { href: '/podcast', label: 'Podcast' },
  { href: '/blog', label: 'Newsletter' },
  { href: '/lab', label: 'Lab' },
  { href: '/resources', label: 'Resources' },
  { href: '/about', label: 'About' },
] as const;

function Masthead() {
  return (
    <Link href="/" className="group inline-block shrink-0">
      <span className="font-display text-2xl leading-none tracking-tight text-ink">
        FHIR IQ
      </span>
      {/* Masthead rule. The wordmark is the mark — no gradient chip. */}
      <span className="mt-1 block h-[2px] w-full bg-verm transition-transform duration-200 ease-out group-hover:scale-x-105 origin-left" />
      <span className="label mt-1.5 block">Eugene Vestel</span>
    </Link>
  );
}

export default function Nav() {
  return (
    <header className="sticky top-0 z-50 border-b border-rule bg-paper/95 backdrop-blur-sm">
      <nav
        aria-label="Primary"
        className="mx-auto flex max-w-[78rem] items-start justify-between gap-8 px-6 py-4 md:py-5"
      >
        <Masthead />

        {/* Desktop */}
        <div className="hidden items-center gap-7 pt-1.5 md:flex">
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="border-b border-transparent pb-0.5 text-sm text-ink-2 transition-colors hover:border-verm hover:text-ink"
            >
              {l.label}
            </Link>
          ))}
          <TrackedLink
            href="https://evestel.substack.com"
            event="nav_cta_clicked"
            payload={{ button: 'subscribe' }}
            external
            className="border border-verm-text px-3.5 py-1.5 text-sm font-medium text-verm-text transition-colors hover:bg-verm-text hover:text-paper"
          >
            Subscribe
          </TrackedLink>
        </div>

        {/* Mobile: native disclosure, no JS */}
        <details className="group relative md:hidden">
          <summary
            className="label cursor-pointer list-none px-2 py-2 text-ink-2 marker:content-none [&::-webkit-details-marker]:hidden"
            aria-label="Toggle navigation menu"
          >
            <span className="group-open:hidden">Menu</span>
            <span className="hidden group-open:inline">Close</span>
          </summary>
          <div className="absolute right-0 top-full z-50 mt-3 w-56 border border-rule-2 bg-paper p-1 shadow-[0_10px_30px_-18px_rgba(0,0,0,0.5)]">
            {LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="block border-b border-rule px-3 py-2.5 text-sm text-ink-2 last:border-b-0 hover:bg-paper-2 hover:text-ink"
              >
                {l.label}
              </Link>
            ))}
            <TrackedLink
              href="https://evestel.substack.com"
              event="nav_cta_clicked"
              payload={{ button: 'subscribe_mobile' }}
              external
              className="mt-1 block bg-verm-text px-3 py-2.5 text-sm font-medium text-paper"
            >
              Subscribe
            </TrackedLink>
          </div>
        </details>
      </nav>
    </header>
  );
}
