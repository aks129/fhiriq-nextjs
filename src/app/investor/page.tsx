'use client';

import Link from 'next/link';

export default function Investor() {
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
              <Link href="/architectures" className="text-neutral-gray hover:text-primary-blue font-medium">
                Architectures
              </Link>
              <Link href="/tools" className="text-neutral-gray hover:text-primary-blue font-medium">
                Tools
              </Link>
              <Link href="/resources" className="text-neutral-gray hover:text-primary-blue font-medium">
                Resources
              </Link>
              <Link href="/about" className="text-neutral-gray hover:text-primary-blue font-medium">
                About
              </Link>
              <Link href="/contact" className="text-neutral-gray hover:text-primary-blue font-medium">
                Contact
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Header */}
      <section className="bg-gradient-to-br from-primary-blue via-purple-700 to-indigo-800 text-white py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-sm uppercase tracking-wider text-blue-200 mb-4">
            Idea Vision
          </p>
          <h1 className="text-5xl font-bold mb-4">Open Quality</h1>
          <p className="text-2xl text-blue-100 font-light">
            Explainable AI for Healthcare Quality & Improvement
          </p>
        </div>
      </section>

      {/* The Problem */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-xl bg-red-100 flex items-center justify-center">
              <span className="text-2xl">⚠️</span>
            </div>
            <h2 className="text-3xl font-bold text-gray-900">The Problem</h2>
          </div>
          <p className="text-xl text-gray-700 mb-8 leading-relaxed">
            Healthcare organizations know what failed in quality — but almost never why.
          </p>
          <div className="grid md:grid-cols-2 gap-4 mb-8">
            <div className="bg-gray-50 rounded-xl p-5">
              <p className="text-gray-700">Quality measures are opaque.</p>
            </div>
            <div className="bg-gray-50 rounded-xl p-5">
              <p className="text-gray-700">Data is inconsistent.</p>
            </div>
            <div className="bg-gray-50 rounded-xl p-5">
              <p className="text-gray-700">Guidelines are complex.</p>
            </div>
            <div className="bg-gray-50 rounded-xl p-5">
              <p className="text-gray-700">Pop health tools generate gap lists, not clarity.</p>
            </div>
          </div>
          <div className="bg-red-50 rounded-xl p-6 border border-red-100">
            <p className="text-gray-700 leading-relaxed">
              The result: <strong>tens of millions in penalties</strong>, poor patient outcomes,
              slow improvement, and endless manual review. The entire system lacks explainability.
            </p>
          </div>
        </div>
      </section>

      {/* The Solution */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center">
              <span className="text-2xl">💡</span>
            </div>
            <h2 className="text-3xl font-bold text-gray-900">The Solution</h2>
          </div>
          <p className="text-xl text-gray-700 mb-6 leading-relaxed">
            Open Quality is the first AI that explains healthcare quality. It interprets clinical logic,
            identifies missing or incorrect data, and shows teams how to fix issues with transparent,
            evidence-based reasoning.
          </p>
          <div className="bg-blue-50 rounded-xl p-6 border border-blue-100">
            <p className="text-lg text-gray-700 italic">
              Think of it as: "OpenEvidence for quality improvement."
            </p>
          </div>
        </div>
      </section>

      {/* What Our AI Does */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center">
              <span className="text-2xl">🤖</span>
            </div>
            <h2 className="text-3xl font-bold text-gray-900">What Our AI Does</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              { icon: "📋", text: "Understands clinical rules & guidelines" },
              { icon: "🔥", text: "Interprets CQL, FHIR, value sets" },
              { icon: "✅", text: "Explains pass/fail reasons" },
              { icon: "⚠️", text: "Identifies missing data & mapping issues" },
              { icon: "🔍", text: "Detects upstream data quality signals" },
              { icon: "➡️", text: "Provides \"what to do next\" recommendations" },
              { icon: "💡", text: "Generates root cause insights" },
              { icon: "🗃️", text: "Integrates with SQL-on-FHIR workflows" }
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-4 bg-gray-50 rounded-xl p-5">
                <span className="text-2xl">{item.icon}</span>
                <p className="text-gray-700">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Now */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center">
              <span className="text-2xl">⚡</span>
            </div>
            <h2 className="text-3xl font-bold text-gray-900">Why Now</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-4 mb-6">
            {[
              "Digital Quality Measures (dQMs) are accelerating",
              "SQL-on-FHIR is creating new standardization",
              "Health systems need cost reduction",
              "Payers face STARS pressure",
              "Clinicians expect transparent AI",
              "Data quality problems are growing"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3">
                <span className="text-green-600 text-xl">✓</span>
                <p className="text-gray-700">{item}</p>
              </div>
            ))}
          </div>
          <div className="bg-orange-50 rounded-xl p-6 border border-orange-100">
            <p className="text-gray-700 italic">
              This is a category-defining moment — just as OpenEvidence was for clinical reasoning.
            </p>
          </div>
        </div>
      </section>

      {/* Moat */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">
              <span className="text-2xl">🛡️</span>
            </div>
            <h2 className="text-3xl font-bold text-gray-900">Moat</h2>
          </div>
          <div className="space-y-3">
            {[
              "CQL & FHIR-native logic understanding (rare skill)",
              "Explainable AI — transparent, audit-friendly, trusted",
              "Data quality detection",
              "AI-driven root cause analysis",
              "Partnerships with data platforms (Firemetrics, Particle, Fasten, etc.)",
              "Founder expertise across NCQA, dQMs, SQL-on-FHIR, FHIR data quality"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-4 bg-gray-50 rounded-xl p-5">
                <span className="text-blue-600 text-xl">🛡️</span>
                <p className="text-gray-700">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Business Model */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center">
              <span className="text-2xl">💰</span>
            </div>
            <h2 className="text-3xl font-bold text-gray-900">Business Model</h2>
          </div>
          <div className="bg-white rounded-xl p-8 shadow-md">
            <p className="text-xl text-gray-900 font-semibold mb-6">SaaS Subscription</p>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gray-50 rounded-xl p-6 text-center">
                <p className="text-sm text-gray-500 mb-2">Pilot Pricing</p>
                <p className="text-3xl font-bold text-gray-900">$8–12k/month</p>
              </div>
              <div className="bg-gray-50 rounded-xl p-6 text-center">
                <p className="text-sm text-gray-500 mb-2">Enterprise Pricing</p>
                <p className="text-3xl font-bold text-gray-900">$150k–500k/year</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Go-to-Market */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-xl bg-cyan-100 flex items-center justify-center">
              <span className="text-2xl">🚀</span>
            </div>
            <h2 className="text-3xl font-bold text-gray-900">Go-to-Market</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              "SQL-on-FHIR keynote demo",
              "Data platform distribution",
              "FHIR community & LinkedIn thought leadership",
              "Podcast exposure",
              "Direct pilots with quality & analytics teams"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3">
                <span className="text-cyan-600 text-xl">→</span>
                <p className="text-gray-700">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-xl bg-indigo-100 flex items-center justify-center">
              <span className="text-2xl">👥</span>
            </div>
            <h2 className="text-3xl font-bold text-gray-900">Team</h2>
          </div>
          <div className="bg-white rounded-xl p-8 shadow-md">
            <p className="text-xl font-semibold text-gray-900 mb-3">Founder: Eugene Vestel</p>
            <p className="text-gray-700 leading-relaxed">
              FHIR data expert, NCQA collaborator, creator of CQL→SQL converter, host of "Out of the FHIR Podcast,"
              and leader in modern interoperability + quality models.
            </p>
          </div>
        </div>
      </section>

      {/* Ask */}
      <section className="py-20 bg-gradient-to-br from-primary-blue via-purple-700 to-indigo-800 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
              <span className="text-2xl">📈</span>
            </div>
            <h2 className="text-3xl font-bold">Ask</h2>
          </div>
          <p className="text-xl text-blue-100 mb-2">
            Exploring pre-seed conversations
          </p>
          <p className="text-5xl font-bold mb-4">
            $1.5M – $2M
          </p>
          <p className="text-blue-100 mb-10 max-w-xl mx-auto">
            to accelerate product, expand measure coverage, and onboard pilot partners.
          </p>
          <Link
            href="/contact"
            className="inline-block bg-white text-primary-blue px-8 py-4 rounded-xl font-semibold hover:bg-blue-50 transition text-lg"
          >
            Get in Touch
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-gray-400">Open Quality · Idea Vision</p>
            <div className="flex gap-8">
              <Link href="/differentiation" className="text-gray-400 hover:text-white transition">
                Differentiation Matrix
              </Link>
              <Link href="/contact" className="text-gray-400 hover:text-white transition">
                Contact
              </Link>
              <Link href="/about" className="text-gray-400 hover:text-white transition">
                About
              </Link>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-700 text-center">
            <p className="text-gray-400">&copy; 2025 FHIR IQ. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
