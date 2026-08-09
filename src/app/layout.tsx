import type { Metadata, Viewport } from "next";
import { Instrument_Serif, Schibsted_Grotesk, Geist_Mono } from "next/font/google";
import "./globals.css";
import LinkedInInsight from "@/components/LinkedInInsight";

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
  metadataBase: new URL("https://fhiriq.com"),
  title: {
    default: "FHIR IQ — Eugene Vestel",
    template: "%s | FHIR IQ",
  },
  description:
    "Eugene Vestel helps healthcare organizations navigate FHIR, AI, and quality measurement. Host of Out of the FHIR podcast. NCQA advisor, 15+ years in healthcare data.",
  keywords:
    "FHIR, SQL on FHIR, healthcare analytics, quality measures, HEDIS, HL7, interoperability, healthcare AI, CQL, Out of the FHIR podcast, Eugene Vestel",
  authors: [{ name: "Eugene Vestel", url: "https://fhiriq.com" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://fhiriq.com",
    siteName: "FHIR IQ",
    title: "FHIR IQ — Eugene Vestel",
    description:
      "Healthcare interoperability, FHIR, AI, and quality measurement. Host of Out of the FHIR podcast.",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "FHIR IQ — Eugene Vestel" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "FHIR IQ — Eugene Vestel",
    description:
      "Healthcare interoperability, FHIR, AI, and quality measurement. Host of Out of the FHIR podcast.",
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
        {children}
        <LinkedInInsight />
      </body>
    </html>
  );
}
