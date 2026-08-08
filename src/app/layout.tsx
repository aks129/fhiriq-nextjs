import type { Metadata, Viewport } from "next";
import { Instrument_Serif, Hanken_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import LinkedInInsight from "@/components/LinkedInInsight";

// SPECIMEN type. Three faces, three jobs.
// Display: Instrument Serif. One weight, sharp serifs, and an italic that
// carries every figure caption. The editorial voice of the whole system.
const display = Instrument_Serif({
  variable: "--ff-display",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  display: "swap",
});

// Body: Hanken Grotesk. Variable, warm, holds up at 13px in a dense table.
const body = Hanken_Grotesk({
  variable: "--ff-body",
  subsets: ["latin"],
  display: "swap",
});

// Mono: JetBrains Mono. Codes, rates, measure IDs, line numbers. globals.css
// named this face for years but never loaded it, so every .font-mono on the
// site was silently falling back to the system monospace.
const mono = JetBrains_Mono({
  variable: "--ff-mono",
  subsets: ["latin"],
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
        className={`${display.variable} ${body.variable} ${mono.variable} antialiased font-sans`}
      >
        {children}
        <LinkedInInsight />
      </body>
    </html>
  );
}
