'use client';

import Link from 'next/link';
import { trackEvent } from '@/lib/analytics';

/**
 * The smallest possible client island: a link that fires an analytics event.
 * Exists so pages can stay server components instead of becoming 'use client'
 * wholesale just to attach one onClick.
 */
export default function TrackedLink({
  href,
  event,
  payload,
  external = false,
  className,
  children,
}: {
  href: string;
  event: string;
  payload?: Record<string, unknown>;
  external?: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  const onClick = () => trackEvent(event, payload ?? {});

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        onClick={onClick}
        className={className}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} onClick={onClick} className={className}>
      {children}
    </Link>
  );
}
