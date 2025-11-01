'use client';

import Link from 'next/link';

export default function Consulting() {
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
              <Link href="/tools" className="text-neutral-gray hover:text-primary-blue font-medium">
                Tools
              </Link>
              <Link href="/training" className="text-neutral-gray hover:text-primary-blue font-medium">
                Training
              </Link>
              <Link href="/consulting" className="text-primary-blue font-semibold">
                Consulting
              </Link>
              <Link href="/blog" className="text-neutral-gray hover:text-primary-blue font-medium">
                Blog
              </Link>
              <Link href="/podcast" className="text-neutral-gray hover:text-primary-blue font-medium">
                Podcast
              </Link>
              <Link href="/about" className="text-neutral-gray hover:text-primary-blue font-medium">
                About
              </Link>
              <a
                href="https://calendar.app.google/TMvRGiiYfbBKNd889"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary text-sm"
              >
                Book Meeting
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-navy to-primary-blue text-white py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="max-w-4xl">
            <h1 className="text-5xl font-bold mb-6">
              Strategic FHIR Consulting That Delivers Results
            </h1>
            <p className="text-xl mb-8 leading-relaxed">
              Partner with an expert who has successfully architected and implemented FHIR solutions
              for payers, providers, and digital health companies. Get the strategic guidance and
              hands-on expertise you need to succeed.
            </p>
            <div className="flex gap-4">
              <a
                href="https://calendar.app.google/TMvRGiiYfbBKNd889"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white text-primary-blue px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition"
              >
                Schedule Discovery Call
              </a>
              <Link
                href="/portfolio"
                className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-primary-blue transition"
              >
                View Case Studies
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* The Problem Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-primary-navy text-center">
              Why Most FHIR Projects Fail
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gray-50 p-6 rounded-lg">
                <div className="text-3xl mb-3">⚠️</div>
                <h3 className="font-semibold text-lg mb-2">Underestimated Complexity</h3>
                <p className="text-neutral-gray">
                  Organizations treat FHIR like just another API integration, missing the nuances
                  of healthcare data standards, implementation guides, and compliance requirements.
                </p>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg">
                <div className="text-3xl mb-3">🔄</div>
                <h3 className="font-semibold text-lg mb-2">Endless Iterations</h3>
                <p className="text-neutral-gray">
                  Without clear architectural direction, teams spend months building the wrong
                  thing, only to restart when they hit validation or regulatory walls.
                </p>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg">
                <div className="text-3xl mb-3">💸</div>
                <h3 className="font-semibold text-lg mb-2">Budget Overruns</h3>
                <p className="text-neutral-gray">
                  What starts as a 3-month project turns into 12+ months, burning through budget
                  and missing critical market windows.
                </p>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg">
                <div className="text-3xl mb-3">👥</div>
                <h3 className="font-semibold text-lg mb-2">Knowledge Gaps</h3>
                <p className="text-neutral-gray">
                  Your developers are brilliant engineers, but FHIR requires specialized healthcare
                  interoperability expertise they don&apos;t have.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How I Help Section */}
      <section className="py-16 bg-bg-secondary">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-primary-navy">
              A Proven Approach to FHIR Success
            </h2>
            <p className="text-xl text-neutral-gray max-w-3xl mx-auto">
              I bring 10+ years of healthcare interoperability experience and a track record
              of successful FHIR implementations across multiple industries.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="bg-white rounded-lg p-8 shadow-sm">
              <div className="w-16 h-16 bg-primary-blue/10 rounded-lg flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-primary-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3 text-primary-navy">Strategic Planning</h3>
              <p className="text-neutral-gray mb-4">
                Get a clear, actionable roadmap before writing a single line of code. I help you:
              </p>
              <ul className="space-y-2 text-neutral-gray text-sm">
                <li className="flex items-start">
                  <span className="text-primary-green mr-2">✓</span>
                  <span>Define the right architecture for your use case</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary-green mr-2">✓</span>
                  <span>Select appropriate implementation guides</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary-green mr-2">✓</span>
                  <span>Identify technical risks early</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary-green mr-2">✓</span>
                  <span>Create realistic timelines and milestones</span>
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-lg p-8 shadow-sm">
              <div className="w-16 h-16 bg-accent-purple/10 rounded-lg flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-accent-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3 text-primary-navy">Hands-On Implementation</h3>
              <p className="text-neutral-gray mb-4">
                I don&apos;t just give advice and disappear. I roll up my sleeves and work alongside your team:
              </p>
              <ul className="space-y-2 text-neutral-gray text-sm">
                <li className="flex items-start">
                  <span className="text-primary-green mr-2">✓</span>
                  <span>Architecture reviews and code audits</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary-green mr-2">✓</span>
                  <span>Pair programming and knowledge transfer</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary-green mr-2">✓</span>
                  <span>Integration pattern implementation</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary-green mr-2">✓</span>
                  <span>Validation and testing strategies</span>
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-lg p-8 shadow-sm">
              <div className="w-16 h-16 bg-primary-green/10 rounded-lg flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-primary-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3 text-primary-navy">Launch & Scale</h3>
              <p className="text-neutral-gray mb-4">
                Get your solution production-ready and ensure it scales as you grow:
              </p>
              <ul className="space-y-2 text-neutral-gray text-sm">
                <li className="flex items-start">
                  <span className="text-primary-green mr-2">✓</span>
                  <span>Production readiness assessments</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary-green mr-2">✓</span>
                  <span>Performance optimization</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary-green mr-2">✓</span>
                  <span>Security and compliance validation</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary-green mr-2">✓</span>
                  <span>Team training and documentation</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Consulting Services */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-primary-navy">Consulting Services</h2>
            <p className="text-xl text-neutral-gray max-w-3xl mx-auto">
              Flexible engagement models tailored to your needs and timeline
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            <div className="card">
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-2xl font-bold text-primary-navy">Strategic Advisory</h3>
                <span className="bg-bg-accent text-primary-blue px-3 py-1 rounded-full text-sm font-semibold">
                  From $5K
                </span>
              </div>
              <p className="text-neutral-gray mb-6">
                Perfect for organizations in the planning phase or needing expert validation of their approach.
              </p>
              <div className="space-y-3 mb-6">
                <div className="flex items-start">
                  <span className="text-primary-green mr-2 mt-1">✓</span>
                  <span className="text-neutral-gray">FHIR architecture design and review</span>
                </div>
                <div className="flex items-start">
                  <span className="text-primary-green mr-2 mt-1">✓</span>
                  <span className="text-neutral-gray">Implementation guide selection and strategy</span>
                </div>
                <div className="flex items-start">
                  <span className="text-primary-green mr-2 mt-1">✓</span>
                  <span className="text-neutral-gray">Technical feasibility assessments</span>
                </div>
                <div className="flex items-start">
                  <span className="text-primary-green mr-2 mt-1">✓</span>
                  <span className="text-neutral-gray">Roadmap and milestone planning</span>
                </div>
                <div className="flex items-start">
                  <span className="text-primary-green mr-2 mt-1">✓</span>
                  <span className="text-neutral-gray">Vendor and technology evaluation</span>
                </div>
              </div>
              <div className="bg-bg-accent p-4 rounded-lg mb-6">
                <div className="text-sm font-semibold text-primary-navy mb-1">Typical Duration</div>
                <div className="text-neutral-gray">2-4 weeks</div>
              </div>
              <a
                href="https://calendar.app.google/TMvRGiiYfbBKNd889"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary w-full text-center block"
              >
                Schedule Consultation
              </a>
            </div>

            <div className="card border-2 border-primary-blue relative">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <span className="bg-primary-blue text-white px-4 py-1 rounded-full text-sm font-semibold">
                  Most Popular
                </span>
              </div>
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-2xl font-bold text-primary-navy">Implementation Partnership</h3>
                <span className="bg-primary-blue/10 text-primary-blue px-3 py-1 rounded-full text-sm font-semibold">
                  From $15K/mo
                </span>
              </div>
              <p className="text-neutral-gray mb-6">
                Ongoing engagement where I work as an extension of your team to drive successful implementation.
              </p>
              <div className="space-y-3 mb-6">
                <div className="flex items-start">
                  <span className="text-primary-green mr-2 mt-1">✓</span>
                  <span className="text-neutral-gray">Everything in Strategic Advisory</span>
                </div>
                <div className="flex items-start">
                  <span className="text-primary-green mr-2 mt-1">✓</span>
                  <span className="text-neutral-gray">Hands-on implementation support</span>
                </div>
                <div className="flex items-start">
                  <span className="text-primary-green mr-2 mt-1">✓</span>
                  <span className="text-neutral-gray">Code reviews and architecture guidance</span>
                </div>
                <div className="flex items-start">
                  <span className="text-primary-green mr-2 mt-1">✓</span>
                  <span className="text-neutral-gray">Team training and knowledge transfer</span>
                </div>
                <div className="flex items-start">
                  <span className="text-primary-green mr-2 mt-1">✓</span>
                  <span className="text-neutral-gray">Weekly sprint planning and reviews</span>
                </div>
                <div className="flex items-start">
                  <span className="text-primary-green mr-2 mt-1">✓</span>
                  <span className="text-neutral-gray">Slack/Teams access for quick questions</span>
                </div>
              </div>
              <div className="bg-primary-blue/5 p-4 rounded-lg mb-6">
                <div className="text-sm font-semibold text-primary-navy mb-1">Typical Duration</div>
                <div className="text-neutral-gray">3-6 months</div>
              </div>
              <a
                href="https://calendar.app.google/TMvRGiiYfbBKNd889"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary w-full text-center block"
              >
                Schedule Consultation
              </a>
            </div>

            <div className="card">
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-2xl font-bold text-primary-navy">Code Review & Audit</h3>
                <span className="bg-bg-accent text-primary-blue px-3 py-1 rounded-full text-sm font-semibold">
                  From $3K
                </span>
              </div>
              <p className="text-neutral-gray mb-6">
                Get expert validation of your existing FHIR implementation with actionable recommendations.
              </p>
              <div className="space-y-3 mb-6">
                <div className="flex items-start">
                  <span className="text-primary-green mr-2 mt-1">✓</span>
                  <span className="text-neutral-gray">Comprehensive codebase review</span>
                </div>
                <div className="flex items-start">
                  <span className="text-primary-green mr-2 mt-1">✓</span>
                  <span className="text-neutral-gray">Architecture and design pattern analysis</span>
                </div>
                <div className="flex items-start">
                  <span className="text-primary-green mr-2 mt-1">✓</span>
                  <span className="text-neutral-gray">Standards compliance verification</span>
                </div>
                <div className="flex items-start">
                  <span className="text-primary-green mr-2 mt-1">✓</span>
                  <span className="text-neutral-gray">Security and performance assessment</span>
                </div>
                <div className="flex items-start">
                  <span className="text-primary-green mr-2 mt-1">✓</span>
                  <span className="text-neutral-gray">Detailed report with prioritized fixes</span>
                </div>
              </div>
              <div className="bg-bg-accent p-4 rounded-lg mb-6">
                <div className="text-sm font-semibold text-primary-navy mb-1">Typical Duration</div>
                <div className="text-neutral-gray">1-2 weeks</div>
              </div>
              <a
                href="https://calendar.app.google/TMvRGiiYfbBKNd889"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary w-full text-center block"
              >
                Schedule Consultation
              </a>
            </div>

            <div className="card">
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-2xl font-bold text-primary-navy">Team Training</h3>
                <span className="bg-bg-accent text-primary-blue px-3 py-1 rounded-full text-sm font-semibold">
                  From $8K
                </span>
              </div>
              <p className="text-neutral-gray mb-6">
                Bring your team up to speed with customized FHIR training tailored to your specific use case.
              </p>
              <div className="space-y-3 mb-6">
                <div className="flex items-start">
                  <span className="text-primary-green mr-2 mt-1">✓</span>
                  <span className="text-neutral-gray">Customized curriculum for your use case</span>
                </div>
                <div className="flex items-start">
                  <span className="text-primary-green mr-2 mt-1">✓</span>
                  <span className="text-neutral-gray">Hands-on workshops with real examples</span>
                </div>
                <div className="flex items-start">
                  <span className="text-primary-green mr-2 mt-1">✓</span>
                  <span className="text-neutral-gray">Implementation guide deep dives</span>
                </div>
                <div className="flex items-start">
                  <span className="text-primary-green mr-2 mt-1">✓</span>
                  <span className="text-neutral-gray">Best practices and common pitfalls</span>
                </div>
                <div className="flex items-start">
                  <span className="text-primary-green mr-2 mt-1">✓</span>
                  <span className="text-neutral-gray">Q&A and ongoing support materials</span>
                </div>
              </div>
              <div className="bg-bg-accent p-4 rounded-lg mb-6">
                <div className="text-sm font-semibold text-primary-navy mb-1">Typical Duration</div>
                <div className="text-neutral-gray">2-5 days</div>
              </div>
              <a
                href="https://calendar.app.google/TMvRGiiYfbBKNd889"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary w-full text-center block"
              >
                Schedule Consultation
              </a>
            </div>
          </div>

          <div className="mt-12 text-center">
            <p className="text-neutral-gray mb-4">
              Need a custom engagement model? Let&apos;s discuss what works best for your situation.
            </p>
            <a
              href="https://calendar.app.google/TMvRGiiYfbBKNd889"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-blue font-semibold hover:underline"
            >
              Schedule a Custom Consultation →
            </a>
          </div>
        </div>
      </section>

      {/* Who I Work With */}
      <section className="py-16 bg-bg-secondary">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-primary-navy">Who I Work With</h2>
            <p className="text-xl text-neutral-gray max-w-3xl mx-auto">
              I partner with organizations at every stage of their FHIR journey
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            <div className="bg-white p-6 rounded-lg text-center">
              <div className="text-4xl mb-4">🏥</div>
              <h3 className="font-bold text-lg mb-2 text-primary-navy">Health Systems</h3>
              <p className="text-sm text-neutral-gray">
                Building patient portals, care coordination platforms, and clinical data exchange solutions
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg text-center">
              <div className="text-4xl mb-4">💳</div>
              <h3 className="font-bold text-lg mb-2 text-primary-navy">Payer Organizations</h3>
              <p className="text-sm text-neutral-gray">
                Implementing CARIN Blue Button, prior authorization, and quality measurement systems
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg text-center">
              <div className="text-4xl mb-4">🚀</div>
              <h3 className="font-bold text-lg mb-2 text-primary-navy">Digital Health Startups</h3>
              <p className="text-sm text-neutral-gray">
                Launching FHIR-native products, EHR integrations, and compliance-ready solutions
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg text-center">
              <div className="text-4xl mb-4">🔬</div>
              <h3 className="font-bold text-lg mb-2 text-primary-navy">Research Organizations</h3>
              <p className="text-sm text-neutral-gray">
                Enabling clinical research, real-world evidence, and data aggregation platforms
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Results & Testimonials */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-primary-navy">Proven Results</h2>
            <p className="text-xl text-neutral-gray max-w-3xl mx-auto">
              Real outcomes from organizations I&apos;ve helped succeed with FHIR
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="text-center">
              <div className="text-5xl font-bold text-primary-blue mb-2">60%</div>
              <div className="text-neutral-gray">Faster time to production</div>
              <div className="text-sm text-neutral-gray mt-2">vs. organizations going it alone</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-primary-green mb-2">$500K+</div>
              <div className="text-neutral-gray">Average cost savings</div>
              <div className="text-sm text-neutral-gray mt-2">from avoiding costly mistakes</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-accent-purple mb-2">100%</div>
              <div className="text-neutral-gray">First-time validation success</div>
              <div className="text-sm text-neutral-gray mt-2">for implementation guide compliance</div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div className="bg-bg-secondary p-8 rounded-lg">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 bg-primary-blue/20 rounded-full"></div>
                <div>
                  <div className="font-bold text-primary-navy">Sarah Chen</div>
                  <div className="text-sm text-neutral-gray">VP Engineering, Digital Health Startup</div>
                </div>
              </div>
              <p className="text-neutral-gray italic">
                &ldquo;We were 6 months into our FHIR project and completely stuck. Within 3 weeks of engaging with FHIR IQ,
                we had a clear path forward and avoided what would have been a complete rebuild. The ROI was immediate
                and obvious.&rdquo;
              </p>
            </div>

            <div className="bg-bg-secondary p-8 rounded-lg">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 bg-primary-green/20 rounded-full"></div>
                <div>
                  <div className="font-bold text-primary-navy">Michael Rodriguez</div>
                  <div className="text-sm text-neutral-gray">Chief Architect, Regional Health System</div>
                </div>
              </div>
              <p className="text-neutral-gray italic">
                &ldquo;The strategic advisory engagement gave us confidence we were building the right thing. The architecture
                patterns and implementation guide selection saved us months of trial and error. Worth every penny.&rdquo;
              </p>
            </div>
          </div>

          <div className="text-center mt-12">
            <Link href="/portfolio" className="text-primary-blue font-semibold hover:underline">
              View More Case Studies →
            </Link>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16 bg-bg-secondary">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-primary-navy">How We&apos;ll Work Together</h2>
            <p className="text-xl text-neutral-gray max-w-3xl mx-auto">
              A proven process that gets you from strategy to production efficiently
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="space-y-8">
              <div className="flex gap-6">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-primary-blue text-white rounded-full flex items-center justify-center font-bold text-xl">
                    1
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2 text-primary-navy">Discovery Call</h3>
                  <p className="text-neutral-gray">
                    We&apos;ll discuss your goals, current challenges, and technical requirements. I&apos;ll assess if
                    we&apos;re a good fit and provide initial recommendations. No charge, no obligation.
                  </p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-primary-blue text-white rounded-full flex items-center justify-center font-bold text-xl">
                    2
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2 text-primary-navy">Proposal & Planning</h3>
                  <p className="text-neutral-gray">
                    You&apos;ll receive a detailed proposal with scope, timeline, deliverables, and investment.
                    We&apos;ll align on success metrics and engagement structure.
                  </p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-primary-blue text-white rounded-full flex items-center justify-center font-bold text-xl">
                    3
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2 text-primary-navy">Kickoff & Deep Dive</h3>
                  <p className="text-neutral-gray">
                    We&apos;ll meet with your team, review existing work, and establish communication channels.
                    I&apos;ll deliver an initial assessment and prioritized action plan.
                  </p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-primary-blue text-white rounded-full flex items-center justify-center font-bold text-xl">
                    4
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2 text-primary-navy">Execution & Support</h3>
                  <p className="text-neutral-gray">
                    Regular touchpoints, hands-on implementation support, and continuous course correction
                    as we work toward your goals. You&apos;ll always know where we stand.
                  </p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-primary-green text-white rounded-full flex items-center justify-center font-bold text-xl">
                    5
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2 text-primary-navy">Launch & Transition</h3>
                  <p className="text-neutral-gray">
                    We&apos;ll ensure your team has everything they need to succeed independently: documentation,
                    training, and a clear playbook for maintaining and evolving your FHIR implementation.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Me */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-primary-navy">Why Work With Me</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-primary-blue/10 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-primary-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                </div>
              </div>
              <div>
                <h3 className="font-bold text-lg mb-2 text-primary-navy">Battle-Tested Expertise</h3>
                <p className="text-neutral-gray">
                  10+ years implementing FHIR across payers, providers, and digital health. I&apos;ve seen and solved
                  the problems you&apos;re facing.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-primary-blue/10 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-primary-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
              </div>
              <div>
                <h3 className="font-bold text-lg mb-2 text-primary-navy">Results-Focused</h3>
                <p className="text-neutral-gray">
                  I&apos;m not interested in long consulting engagements that go nowhere. My goal is to make you
                  successful and self-sufficient as quickly as possible.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-primary-blue/10 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-primary-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                  </svg>
                </div>
              </div>
              <div>
                <h3 className="font-bold text-lg mb-2 text-primary-navy">Hands-On Technical Leader</h3>
                <p className="text-neutral-gray">
                  I&apos;m a developer and architect first. I can review code, design systems, and write production-ready
                  implementations myself.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-primary-blue/10 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-primary-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
              </div>
              <div>
                <h3 className="font-bold text-lg mb-2 text-primary-navy">Knowledge Transfer</h3>
                <p className="text-neutral-gray">
                  I ensure your team learns while we work together. You&apos;ll have the knowledge and confidence
                  to maintain and extend your solution.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-bg-secondary">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-primary-navy">Common Questions</h2>
          </div>

          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg">
              <h3 className="font-bold text-lg mb-2 text-primary-navy">
                Do you work with organizations outside the US?
              </h3>
              <p className="text-neutral-gray">
                Yes. While I specialize in US-based implementation guides like US Core and CARIN Blue Button,
                I&apos;ve worked with international organizations implementing FHIR R4 and can adapt to other jurisdictions.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg">
              <h3 className="font-bold text-lg mb-2 text-primary-navy">
                What if our project needs change mid-engagement?
              </h3>
              <p className="text-neutral-gray">
                Flexibility is built in. For ongoing engagements, we&apos;ll adjust priorities and scope as needed.
                For fixed-scope projects, we&apos;ll discuss changes and agree on any adjustments before proceeding.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg">
              <h3 className="font-bold text-lg mb-2 text-primary-navy">
                Do you work onsite or remotely?
              </h3>
              <p className="text-neutral-gray">
                Most engagements are remote, which keeps costs down and allows for flexible scheduling. For certain
                strategic initiatives or team training, I can travel onsite when it adds significant value.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg">
              <h3 className="font-bold text-lg mb-2 text-primary-navy">
                How quickly can we get started?
              </h3>
              <p className="text-neutral-gray">
                After our discovery call and proposal approval, most strategic advisory engagements can start within
                1-2 weeks. Implementation partnerships typically kick off within 2-3 weeks.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg">
              <h3 className="font-bold text-lg mb-2 text-primary-navy">
                What happens after our engagement ends?
              </h3>
              <p className="text-neutral-gray">
                You&apos;ll have complete documentation, trained team members, and a clear path forward. Many clients
                come back for periodic reviews or new initiatives, but there&apos;s no ongoing obligation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-gradient-to-r from-primary-blue to-accent-purple text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Succeed With FHIR?
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Stop wasting time and money on trial and error. Get the strategic guidance and
            hands-on expertise you need to launch your FHIR implementation successfully.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <a
              href="https://calendar.app.google/TMvRGiiYfbBKNd889"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-primary-blue px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition text-lg"
            >
              Schedule Your Discovery Call
            </a>
            <Link
              href="/portfolio"
              className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-primary-blue transition text-lg"
            >
              See My Work
            </Link>
          </div>
          <p className="text-sm mt-6 opacity-80">
            Free 30-minute consultation · No pressure · Immediate value
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary-navy text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">FHIR IQ</h3>
              <p className="text-gray-400">
                Leading healthcare interoperability solutions powered by AI and FHIR expertise.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Solutions</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/solutions" className="hover:text-white">By Industry</Link></li>
                <li><Link href="/consulting" className="hover:text-white">Consulting</Link></li>
                <li><Link href="/training" className="hover:text-white">Training</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/blog" className="hover:text-white">Blog</Link></li>
                <li><Link href="/podcast" className="hover:text-white">Podcast</Link></li>
                <li><Link href="/portfolio" className="hover:text-white">Portfolio</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/about" className="hover:text-white">About</Link></li>
                <li><Link href="/contact" className="hover:text-white">Contact</Link></li>
                <li><Link href="/partners" className="hover:text-white">Partners</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 FHIR IQ. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
