import Link from 'next/link';
import TrackedLink from './TrackedLink';
import Clock from './Clock';

/**
 * Shared Nav, restyled to the reference's floating chip: a raised panel with
 * one hairline and an 8px radius, sitting on the black ground rather than a
 * full-width bar. Clock sits opposite it as nav metadata.
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

export default function Nav() {
  return (
    <header className="sticky top-0 z-50 bg-bg/80 backdrop-blur-md">
      <nav
        aria-label="Primary"
        className="mx-auto flex max-w-[84rem] items-center justify-between gap-4 px-4 py-3 sm:px-6"
      >
        {/* Desktop: the whole nav is one chip, as on the reference */}
        <div className="chip hidden items-center gap-1 py-1.5 pl-4 pr-1.5 md:flex">
          <Link
            href="/"
            className="mr-4 text-sm font-medium tracking-tight text-fg"
          >
            FHIR IQ
            <span className="ml-1 align-super text-[9px] text-fg-3">®</span>
          </Link>
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="rounded-[6px] px-2.5 py-1.5 text-sm text-fg-2 transition-colors hover:bg-bg-3 hover:text-fg"
            >
              {l.label}
            </Link>
          ))}
          <TrackedLink
            href="https://evestel.substack.com"
            event="nav_cta_clicked"
            payload={{ button: 'subscribe' }}
            external
            className="ml-1 rounded-[6px] bg-fg px-3 py-1.5 text-sm font-medium text-bg transition-opacity hover:opacity-85"
          >
            Subscribe
          </TrackedLink>
        </div>

        {/* Mobile: brand chip + native disclosure */}
        <Link
          href="/"
          className="chip px-3.5 py-2 text-sm font-medium tracking-tight text-fg md:hidden"
        >
          FHIR IQ
        </Link>

        <div className="flex items-center gap-3">
          <span className="hidden md:inline">
            <Clock />
          </span>

          <details className="group relative md:hidden">
            <summary className="chip label cursor-pointer list-none px-3 py-2 text-fg-2 marker:content-none [&::-webkit-details-marker]:hidden">
              <span className="group-open:hidden">Menu</span>
              <span className="hidden group-open:inline">Close</span>
            </summary>
            <div className="chip absolute right-0 top-full z-50 mt-2 w-56 overflow-hidden p-1">
              {LINKS.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="block rounded-[6px] px-3 py-2.5 text-sm text-fg-2 hover:bg-bg-3 hover:text-fg"
                >
                  {l.label}
                </Link>
              ))}
              <TrackedLink
                href="https://evestel.substack.com"
                event="nav_cta_clicked"
                payload={{ button: 'subscribe_mobile' }}
                external
                className="mt-1 block rounded-[6px] bg-fg px-3 py-2.5 text-center text-sm font-medium text-bg"
              >
                Subscribe
              </TrackedLink>
            </div>
          </details>
        </div>
      </nav>
    </header>
  );
}
