'use client';

import Link from 'next/link';

export default function Services() {
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
              <Link href="/services" className="text-primary-blue font-semibold">
                Services
              </Link>
              <Link href="/resources" className="text-neutral-gray hover:text-primary-blue font-medium">
                Resources
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
        <div className="max-w-7xl mx-auto px-4">
          <div className="max-w-4xl">
            <h1 className="text-5xl font-bold mb-6">
              Advisory, Training & Implementation Services
            </h1>
            <p className="text-xl mb-8 leading-relaxed opacity-90">
              Partner with FHIR experts for strategic guidance, hands-on implementation support,
              and team enablement. From planning to production.
            </p>
            <div className="flex gap-4 flex-wrap">
              <a
                href="https://calendar.app.google/TMvRGiiYfbBKNd889"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white text-primary-blue px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition"
              >
                Schedule Discovery Call
              </a>
              <Link
                href="#services"
                className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-primary-blue transition"
              >
                View Services
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Approach Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-gray-900">
              A Proven Approach to FHIR Success
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              10+ years of healthcare interoperability experience across payers, providers, and digital health
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="bg-gray-50 rounded-xl p-8">
              <div className="w-14 h-14 bg-primary-blue/10 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-7 h-7 text-primary-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">Strategic Planning</h3>
              <p className="text-gray-600 mb-4">
                Get a clear, actionable roadmap before writing code
              </p>
              <ul className="space-y-2 text-gray-600 text-sm">
                <li className="flex items-start">
                  <span className="text-primary-green mr-2">✓</span>
                  Architecture design and review
                </li>
                <li className="flex items-start">
                  <span className="text-primary-green mr-2">✓</span>
                  Implementation guide selection
                </li>
                <li className="flex items-start">
                  <span className="text-primary-green mr-2">✓</span>
                  Risk identification
                </li>
              </ul>
            </div>

            <div className="bg-gray-50 rounded-xl p-8">
              <div className="w-14 h-14 bg-accent-purple/10 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-7 h-7 text-accent-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">Hands-On Implementation</h3>
              <p className="text-gray-600 mb-4">
                Working alongside your team, not just advising
              </p>
              <ul className="space-y-2 text-gray-600 text-sm">
                <li className="flex items-start">
                  <span className="text-primary-green mr-2">✓</span>
                  Code reviews and audits
                </li>
                <li className="flex items-start">
                  <span className="text-primary-green mr-2">✓</span>
                  Pair programming
                </li>
                <li className="flex items-start">
                  <span className="text-primary-green mr-2">✓</span>
                  Integration patterns
                </li>
              </ul>
            </div>

            <div className="bg-gray-50 rounded-xl p-8">
              <div className="w-14 h-14 bg-primary-green/10 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-7 h-7 text-primary-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">Training & Enablement</h3>
              <p className="text-gray-600 mb-4">
                Build your team&apos;s FHIR expertise for long-term success
              </p>
              <ul className="space-y-2 text-gray-600 text-sm">
                <li className="flex items-start">
                  <span className="text-primary-green mr-2">✓</span>
                  Custom workshops
                </li>
                <li className="flex items-start">
                  <span className="text-primary-green mr-2">✓</span>
                  Knowledge transfer
                </li>
                <li className="flex items-start">
                  <span className="text-primary-green mr-2">✓</span>
                  Documentation
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section id="services" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-gray-900">Service Offerings</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Flexible engagement models tailored to your needs
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Strategic Advisory */}
            <div className="bg-white rounded-xl p-8 shadow-sm hover:shadow-lg transition">
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-2xl font-bold text-gray-900">Strategic Advisory</h3>
                <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-medium">
                  2-4 weeks
                </span>
              </div>
              <p className="text-gray-600 mb-6">
                Expert validation and strategic guidance for organizations in the planning phase.
              </p>
              <div className="space-y-3 mb-6">
                <div className="flex items-start">
                  <span className="text-primary-green mr-2 mt-1">✓</span>
                  <span className="text-gray-600">FHIR architecture design and review</span>
                </div>
                <div className="flex items-start">
                  <span className="text-primary-green mr-2 mt-1">✓</span>
                  <span className="text-gray-600">Implementation guide selection</span>
                </div>
                <div className="flex items-start">
                  <span className="text-primary-green mr-2 mt-1">✓</span>
                  <span className="text-gray-600">Technical feasibility assessments</span>
                </div>
                <div className="flex items-start">
                  <span className="text-primary-green mr-2 mt-1">✓</span>
                  <span className="text-gray-600">Roadmap and milestone planning</span>
                </div>
              </div>
              <a
                href="https://calendar.app.google/TMvRGiiYfbBKNd889"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary w-full text-center block"
              >
                Discuss Your Needs
              </a>
            </div>

            {/* Implementation Partnership */}
            <div className="bg-white rounded-xl p-8 shadow-sm hover:shadow-lg transition border-2 border-primary-blue relative">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <span className="bg-primary-blue text-white px-4 py-1 rounded-full text-sm font-semibold">
                  Recommended
                </span>
              </div>
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-2xl font-bold text-gray-900">Implementation Partnership</h3>
                <span className="bg-primary-blue/10 text-primary-blue px-3 py-1 rounded-full text-sm font-medium">
                  3-6 months
                </span>
              </div>
              <p className="text-gray-600 mb-6">
                Ongoing engagement as an extension of your team to drive successful implementation.
              </p>
              <div className="space-y-3 mb-6">
                <div className="flex items-start">
                  <span className="text-primary-green mr-2 mt-1">✓</span>
                  <span className="text-gray-600">Everything in Strategic Advisory</span>
                </div>
                <div className="flex items-start">
                  <span className="text-primary-green mr-2 mt-1">✓</span>
                  <span className="text-gray-600">Hands-on implementation support</span>
                </div>
                <div className="flex items-start">
                  <span className="text-primary-green mr-2 mt-1">✓</span>
                  <span className="text-gray-600">Code reviews and architecture guidance</span>
                </div>
                <div className="flex items-start">
                  <span className="text-primary-green mr-2 mt-1">✓</span>
                  <span className="text-gray-600">Weekly sprint planning and reviews</span>
                </div>
                <div className="flex items-start">
                  <span className="text-primary-green mr-2 mt-1">✓</span>
                  <span className="text-gray-600">Team training and knowledge transfer</span>
                </div>
              </div>
              <a
                href="https://calendar.app.google/TMvRGiiYfbBKNd889"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary w-full text-center block"
              >
                Start Partnership
              </a>
            </div>

            {/* Code Review & Audit */}
            <div className="bg-white rounded-xl p-8 shadow-sm hover:shadow-lg transition">
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-2xl font-bold text-gray-900">Code Review & Audit</h3>
                <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-medium">
                  1-2 weeks
                </span>
              </div>
              <p className="text-gray-600 mb-6">
                Expert validation of your existing FHIR implementation with actionable recommendations.
              </p>
              <div className="space-y-3 mb-6">
                <div className="flex items-start">
                  <span className="text-primary-green mr-2 mt-1">✓</span>
                  <span className="text-gray-600">Comprehensive codebase review</span>
                </div>
                <div className="flex items-start">
                  <span className="text-primary-green mr-2 mt-1">✓</span>
                  <span className="text-gray-600">Architecture and pattern analysis</span>
                </div>
                <div className="flex items-start">
                  <span className="text-primary-green mr-2 mt-1">✓</span>
                  <span className="text-gray-600">Standards compliance verification</span>
                </div>
                <div className="flex items-start">
                  <span className="text-primary-green mr-2 mt-1">✓</span>
                  <span className="text-gray-600">Prioritized fix recommendations</span>
                </div>
              </div>
              <a
                href="https://calendar.app.google/TMvRGiiYfbBKNd889"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary w-full text-center block"
              >
                Request Audit
              </a>
            </div>

            {/* Team Training */}
            <div className="bg-white rounded-xl p-8 shadow-sm hover:shadow-lg transition">
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-2xl font-bold text-gray-900">Team Training</h3>
                <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-medium">
                  2-5 days
                </span>
              </div>
              <p className="text-gray-600 mb-6">
                Customized FHIR training tailored to your specific use case and team needs.
              </p>
              <div className="space-y-3 mb-6">
                <div className="flex items-start">
                  <span className="text-primary-green mr-2 mt-1">✓</span>
                  <span className="text-gray-600">Custom curriculum for your use case</span>
                </div>
                <div className="flex items-start">
                  <span className="text-primary-green mr-2 mt-1">✓</span>
                  <span className="text-gray-600">Hands-on workshops with real examples</span>
                </div>
                <div className="flex items-start">
                  <span className="text-primary-green mr-2 mt-1">✓</span>
                  <span className="text-gray-600">Implementation guide deep dives</span>
                </div>
                <div className="flex items-start">
                  <span className="text-primary-green mr-2 mt-1">✓</span>
                  <span className="text-gray-600">Best practices and common pitfalls</span>
                </div>
              </div>
              <a
                href="https://calendar.app.google/TMvRGiiYfbBKNd889"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary w-full text-center block"
              >
                Plan Training
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Who We Work With */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-gray-900">Who We Work With</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Organizations at every stage of their FHIR journey
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            <div className="bg-gray-50 p-6 rounded-xl text-center">
              <div className="text-4xl mb-4">🏥</div>
              <h3 className="font-bold text-lg mb-2 text-gray-900">Health Systems</h3>
              <p className="text-sm text-gray-600">
                Patient portals, care coordination, clinical data exchange
              </p>
            </div>

            <div className="bg-gray-50 p-6 rounded-xl text-center">
              <div className="text-4xl mb-4">💳</div>
              <h3 className="font-bold text-lg mb-2 text-gray-900">Payer Organizations</h3>
              <p className="text-sm text-gray-600">
                CARIN Blue Button, prior authorization, quality measurement
              </p>
            </div>

            <div className="bg-gray-50 p-6 rounded-xl text-center">
              <div className="text-4xl mb-4">🚀</div>
              <h3 className="font-bold text-lg mb-2 text-gray-900">Digital Health Startups</h3>
              <p className="text-sm text-gray-600">
                FHIR-native products, EHR integrations, compliance
              </p>
            </div>

            <div className="bg-gray-50 p-6 rounded-xl text-center">
              <div className="text-4xl mb-4">📊</div>
              <h3 className="font-bold text-lg mb-2 text-gray-900">Analytics Platforms</h3>
              <p className="text-sm text-gray-600">
                Quality measures, population health, data warehousing
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary-blue to-accent-purple text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Accelerate Your FHIR Implementation?
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Stop wasting time on trial and error. Get the strategic guidance and
            hands-on expertise you need to succeed.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <a
              href="https://calendar.app.google/TMvRGiiYfbBKNd889"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-primary-blue px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition text-lg"
            >
              Schedule Discovery Call
            </a>
            <Link
              href="/contact"
              className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-primary-blue transition text-lg"
            >
              Contact Us
            </Link>
          </div>
          <p className="text-sm mt-6 opacity-80">
            Free 30-minute consultation · No pressure · Immediate value
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">FHIR IQ</h3>
              <p className="text-gray-400">
                The Semantic Intelligence Layer for Healthcare
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Solutions</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/cql-to-sql" className="hover:text-white">CQL-to-SQL Engine</Link></li>
                <li><Link href="/solutions" className="hover:text-white">Data Quality</Link></li>
                <li><Link href="/services" className="hover:text-white">Advisory Services</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/library" className="hover:text-white">ViewDefinition Library</Link></li>
                <li><Link href="/tools" className="hover:text-white">Developer Tools</Link></li>
                <li><Link href="/architectures" className="hover:text-white">Architectures</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/about" className="hover:text-white">About</Link></li>
                <li><Link href="/contact" className="hover:text-white">Contact</Link></li>
                <li><Link href="/investor" className="hover:text-white">Investors</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 FHIR IQ. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
