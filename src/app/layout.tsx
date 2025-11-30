import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import LinkedInInsight from "@/components/LinkedInInsight";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FHIR IQ - The Semantic Intelligence Layer for Healthcare",
  description: "Turn clinical logic into enterprise intelligence. CQL-to-SQL compilation, FHIR data quality, and healthcare AI solutions.",
  keywords: "FHIR, CQL, SQL on FHIR, healthcare analytics, quality measures, HEDIS, HL7, interoperability, AI",
  authors: [{ name: "FHIR IQ" }],
  viewport: "width=device-width, initial-scale=1",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <LinkedInInsight />
      </body>
    </html>
  );
}
