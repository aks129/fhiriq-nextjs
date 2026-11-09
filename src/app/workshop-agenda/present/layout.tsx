import type { Metadata } from 'next';

// The Cohort 00 slide deck. A record of a cohort that has run; kept out of
// search so it is not read as a current offer.
export const metadata: Metadata = {
  robots: { index: false, follow: true },
};

export default function PresentLayout({ children }: { children: React.ReactNode }) {
  return children;
}
