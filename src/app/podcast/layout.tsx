import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Out of the FHIR Podcast',
  description:
    'Conversations with the people building healthcare interoperability, and the stories behind the standards. Hosted by Eugene Vestel.',
  openGraph: {
    title: 'Out of the FHIR Podcast | FHIR IQ',
    description:
      'Conversations on healthcare interoperability, FHIR, and the standards shaping modern health data. Hosted by Eugene Vestel.',
    url: '/podcast',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Out of the FHIR Podcast',
    description: 'Conversations on healthcare interoperability and FHIR.',
  },
};

export default function PodcastLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
