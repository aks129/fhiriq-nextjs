'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function CQLToSQL() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [downloadSubmitted, setDownloadSubmitted] = useState(false);

  const handleDownloadGuide = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Track LinkedIn event for guide download
    if (typeof window !== 'undefined' && 'lintrk' in window) {
      (window as unknown as { lintrk: (action: string, data: object) => void }).lintrk('track', { conversion_id: 'guide_download' });
    }

    // Simulate form submission - replace with actual API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setDownloadSubmitted(true);
    setIsSubmitting(false);
  };

  const handleApplyPartner = () => {
    // Track LinkedIn event for partner application
    if (typeof window !== 'undefined' && 'lintrk' in window) {
      (window as unknown as { lintrk: (action: string, data: object) => void }).lintrk('track', { conversion_id: 'design_partner_apply' });
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <Link href="/" className="text-2xl font-bold text-primary-blue">
                FHIR IQ
              </Link>
            </div>
            <div className="hidden md:flex space-x-8">
              <Link href="/solutions" className="text-neutral-gray hover:text-primary-blue font-medium">
                Solutions
              </Link>
              <Link href="/library" className="text-neutral-gray hover:text-primary-blue font-medium">
                Library
              </Link>
              <Link href="/tools" className="text-neutral-gray hover:text-primary-blue font-medium">
                Tools
              </Link>
              <Link href="/services" className="text-neutral-gray hover:text-primary-blue font-medium">
                Services
              </Link>
              <Link href="/about" className="text-neutral-gray hover:text-primary-blue font-medium">
                About
              </Link>
              <a href="https://calendar.app.google/TMvRGiiYfbBKNd889" target="_blank" rel="noopener noreferrer" className="btn-primary text-sm">
                Book Meeting
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-navy via-primary-blue to-accent-purple text-white py-20">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <div className="inline-block bg-white/10 backdrop-blur px-4 py-2 rounded-full text-sm font-medium mb-6">
            Analytics on FHIR 2025 · December 5th
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            Turn Clinical Logic into<br />Enterprise Intelligence
          </h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90 max-w-3xl mx-auto">
            Operationalize HEDIS and Quality Measures directly in your Data Warehouse
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <a href="#download-guide" className="bg-white text-primary-blue px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition text-lg">
              Download the Guide
            </a>
            <a href="#design-partner" onClick={handleApplyPartner} className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-primary-blue transition text-lg">
              Apply for Pilot Program
            </a>
          </div>
        </div>
      </section>

      {/* Problem/Solution Comparison */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              A New Approach to Clinical Quality Language
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Traditional CQL engines weren&apos;t designed for modern data platforms. We&apos;re changing that.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Old Way */}
            <div className="bg-white rounded-2xl p-8 border-2 border-red-200 relative">
              <div className="absolute -top-4 left-8 bg-red-100 text-red-700 px-4 py-1 rounded-full text-sm font-semibold">
                Traditional Approach
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6 mt-4">Java-based CQL Engines</h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-red-100 rounded-full flex items-center justify-center mt-1">
                    <svg className="w-4 h-4 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </div>
                  <div>
                    <span className="font-semibold text-gray-900">Slow Performance</span>
                    <p className="text-gray-600 text-sm">Processes records one-at-a-time, doesn&apos;t leverage warehouse parallelism</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-red-100 rounded-full flex items-center justify-center mt-1">
                    <svg className="w-4 h-4 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </div>
                  <div>
                    <span className="font-semibold text-gray-900">Black Box Logic</span>
                    <p className="text-gray-600 text-sm">Hard to debug, audit, or explain why a patient passed/failed a measure</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-red-100 rounded-full flex items-center justify-center mt-1">
                    <svg className="w-4 h-4 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </div>
                  <div>
                    <span className="font-semibold text-gray-900">Separate Infrastructure</span>
                    <p className="text-gray-600 text-sm">Requires dedicated compute, separate from your analytics stack</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-red-100 rounded-full flex items-center justify-center mt-1">
                    <svg className="w-4 h-4 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </div>
                  <div>
                    <span className="font-semibold text-gray-900">Limited Integration</span>
                    <p className="text-gray-600 text-sm">Results don&apos;t easily flow into BI tools or downstream analytics</p>
                  </div>
                </li>
              </ul>
            </div>

            {/* New Way */}
            <div className="bg-white rounded-2xl p-8 border-2 border-green-200 relative">
              <div className="absolute -top-4 left-8 bg-green-100 text-green-700 px-4 py-1 rounded-full text-sm font-semibold">
                Our Approach
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6 mt-4">Native SQL Compilation</h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mt-1">
                    <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <span className="font-semibold text-gray-900">Fast, Parallel Execution</span>
                    <p className="text-gray-600 text-sm">Runs natively in Snowflake, Databricks, BigQuery - leverages their scale</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mt-1">
                    <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <span className="font-semibold text-gray-900">Transparent Logic</span>
                    <p className="text-gray-600 text-sm">Human-readable SQL you can inspect, debug, and audit line-by-line</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mt-1">
                    <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <span className="font-semibold text-gray-900">Zero New Infrastructure</span>
                    <p className="text-gray-600 text-sm">Runs where your data already lives - no new systems to manage</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mt-1">
                    <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <span className="font-semibold text-gray-900">Native BI Integration</span>
                    <p className="text-gray-600 text-sm">Results are tables - connect directly to Tableau, Power BI, or any tool</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              From CQL to SQL in Three Steps
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-blue/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary-blue">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Input CQL Library</h3>
              <p className="text-gray-600">
                Start with your existing CQL measure definitions - HEDIS, eCQMs, or custom quality logic
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-accent-purple/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-accent-purple">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Compile to SQL</h3>
              <p className="text-gray-600">
                Our engine translates CQL semantics into optimized, warehouse-specific SQL queries
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary-green/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary-green">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Execute & Analyze</h3>
              <p className="text-gray-600">
                Run directly in your warehouse, connect to BI tools, and gain instant visibility
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Lead Magnet - Download Guide */}
      <section id="download-guide" className="py-20 bg-gradient-to-br from-gray-900 to-primary-navy text-white">
        <div className="max-w-4xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                The Engineer&apos;s Guide to CQL on Data Warehouses
              </h2>
              <p className="text-lg opacity-90 mb-6">
                A technical deep-dive into compiling Clinical Quality Language to native SQL for modern analytics platforms.
              </p>
              <ul className="space-y-3 text-white/80">
                <li className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-primary-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  CQL-to-SQL translation patterns
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-primary-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  ViewDefinition integration with SQL on FHIR
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-primary-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Performance optimization strategies
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-primary-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Example: HEDIS BCS measure walkthrough
                </li>
              </ul>
            </div>

            <div className="bg-white/10 backdrop-blur rounded-2xl p-8">
              {downloadSubmitted ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-primary-green rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-semibold mb-2">Check Your Inbox!</h3>
                  <p className="text-white/80">
                    We&apos;ve sent the guide to your email address.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleDownloadGuide}>
                  <h3 className="text-2xl font-semibold mb-6">Get the Free Guide</h3>
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="guide-email" className="block text-sm font-medium mb-2">Work Email</label>
                      <input
                        id="guide-email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@company.com"
                        className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-primary-blue"
                        required
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-primary-blue hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold transition disabled:opacity-50"
                    >
                      {isSubmitting ? 'Sending...' : 'Download Guide'}
                    </button>
                  </div>
                  <p className="text-xs text-white/60 mt-4">
                    We respect your privacy. No spam, ever.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Design Partner Program */}
      <section id="design-partner" className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="inline-block bg-accent-purple/10 text-accent-purple px-4 py-2 rounded-full text-sm font-semibold mb-6">
            Limited Availability
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Join the Inner Circle
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            We are selecting <strong>3 partners</strong> for our Q1 2026 Pilot Program. Get early access to the engine and influence the roadmap.
          </p>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="bg-gray-50 rounded-xl p-6">
              <div className="text-3xl mb-3">🔑</div>
              <h3 className="font-semibold text-gray-900 mb-2">Early Access</h3>
              <p className="text-gray-600 text-sm">
                Be first to use the CQL-to-SQL engine on your own measures and data
              </p>
            </div>
            <div className="bg-gray-50 rounded-xl p-6">
              <div className="text-3xl mb-3">🎯</div>
              <h3 className="font-semibold text-gray-900 mb-2">Shape the Product</h3>
              <p className="text-gray-600 text-sm">
                Direct input on features, priorities, and roadmap direction
              </p>
            </div>
            <div className="bg-gray-50 rounded-xl p-6">
              <div className="text-3xl mb-3">👤</div>
              <h3 className="font-semibold text-gray-900 mb-2">Founder Access</h3>
              <p className="text-gray-600 text-sm">
                Weekly calls with the founder/architect throughout the 90-day sprint
              </p>
            </div>
          </div>

          <div className="flex gap-4 justify-center flex-wrap">
            <Link
              href="/early-access"
              onClick={handleApplyPartner}
              className="bg-accent-purple hover:bg-purple-700 text-white px-8 py-4 rounded-lg font-semibold transition text-lg"
            >
              Apply for Design Partner Program
            </Link>
          </div>

          <p className="text-sm text-gray-500 mt-6">
            <Link href="/innovation-pilot-terms" className="underline hover:text-gray-700">
              View Pilot Program Terms
            </Link>
          </p>
        </div>
      </section>

      {/* Trust Signal */}
      <section className="py-8 bg-gray-100">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-gray-600 flex items-center justify-center gap-2">
            <svg className="w-5 h-5 text-primary-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            As presented at <strong>Analytics on FHIR 2025</strong>
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div>
              <Link href="/" className="text-2xl font-bold">FHIR IQ</Link>
              <p className="text-gray-400 mt-2">The Semantic Intelligence Layer for Healthcare</p>
            </div>
            <div className="flex gap-8">
              <Link href="/" className="text-gray-400 hover:text-white transition">Home</Link>
              <Link href="/library" className="text-gray-400 hover:text-white transition">ViewDefinition Library</Link>
              <Link href="/early-access" className="text-gray-400 hover:text-white transition">Design Partner Program</Link>
              <Link href="/contact" className="text-gray-400 hover:text-white transition">Contact</Link>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-800 text-center">
            <p className="text-gray-400">&copy; 2025 FHIR IQ. All rights reserved.</p>
            <p className="text-sm text-gray-500 mt-2">
              FHIR® is a registered trademark of Health Level Seven International (HL7®) and is used with permission.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
