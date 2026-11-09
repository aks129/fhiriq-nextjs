import type { Metadata, Viewport } from "next";
import { Instrument_Serif, Schibsted_Grotesk, Geist_Mono } from "next/font/google";
import "./globals.css";
import LinkedInInsight from "@/components/LinkedInInsight";
import { Analytics } from "@vercel/analytics/next";
import { PERSON, SITE_URL } from "@/lib/profile";

// Structured data for search engines: who the site is about, and which
// profiles are the same person (sameAs), so name searches resolve to one
// entity instead of splitting between fhiriq.com and eugenevestel.com.
const JSON_LD = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${SITE_URL}/#person`,
      name: PERSON.name,
      url: PERSON.homepage,
      sameAs: [PERSON.homepage, PERSON.linkedin, PERSON.github, PERSON.substack],
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: "FHIR IQ",
      publisher: { "@id": `${SITE_URL}/#person` },
    },
  ],
};

// MONO type, following agencidev: one variable sans plus one mono, and that
// is essentially the whole system.
//
// Body and headings: Schibsted Grotesk. Free variable grotesk standing in for
// the reference's licensed Sana Sans Variable. Geometric with a little
// warmth, and it holds at 13px.
const body = Schibsted_Grotesk({
  variable: "--ff-body",
  subsets: ["latin"],
  display: "swap",
});

// Mono: Geist Mono, the same face the reference uses for its live clock,
// BUILD counter and micro-labels.
const mono = Geist_Mono({
  variable: "--ff-mono",
  subsets: ["latin"],
  display: "swap",
});

// Serif: one job only. The reference sets each name in its client wall in a
// different typeface; this is the third voice in our credential row.
const serif = Instrument_Serif({
  variable: "--ff-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "FHIR IQ — Eugene Vestel",
    template: "%s | FHIR IQ",
  },
  description:
    "Free implementation reference for AI agents on FHIR and digital quality measures, from Eugene Vestel: open-source tools, the Out of the FHIR podcast, and advisory work.",
  keywords:
    "FHIR, SQL on FHIR, healthcare analytics, quality measures, HEDIS, HL7, interoperability, healthcare AI, CQL, Out of the FHIR podcast, Eugene Vestel",
  authors: [{ name: PERSON.name, url: SITE_URL }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: "FHIR IQ",
    title: "FHIR IQ — Eugene Vestel",
    description:
      "Free implementation reference for AI agents on FHIR and digital quality measures.",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "FHIR IQ — Eugene Vestel" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "FHIR IQ — Eugene Vestel",
    description:
      "Free implementation reference for AI agents on FHIR and digital quality measures.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${body.variable} ${mono.variable} ${serif.variable} antialiased font-sans`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }}
        />
        {children}
        <LinkedInInsight />
        <Analytics />
      </body>
    </html>
  );
}
