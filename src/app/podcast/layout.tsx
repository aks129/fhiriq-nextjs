import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Out of the FHIR Podcast',
  description:
    'Weekly conversations with the people building the future of healthcare interoperability. HL7 work group chairs, startup founders, CMS policy makers — the stories behind the standards. Hosted by Eugene Vestel.',
  openGraph: {
    title: 'Out of the FHIR Podcast | FHIR IQ',
    description:
      'Weekly conversations on healthcare interoperability, FHIR, and the standards shaping modern health data. Hosted by Eugene Vestel.',
    url: 'https://fhiriq.com/podcast',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Out of the FHIR Podcast',
    description: 'Weekly conversations on healthcare interoperability and FHIR.',
  },
};

export default function PodcastLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
