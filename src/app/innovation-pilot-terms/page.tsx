import Link from 'next/link';

export default function InnovationPilotTerms() {
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

      {/* Back Link */}
      <div className="max-w-3xl mx-auto px-6 pt-8">
        <Link
          href="/cql-to-sql"
          className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-900 text-sm"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to CQL-to-SQL
        </Link>
      </div>

      {/* Content */}
      <main className="max-w-3xl mx-auto px-6 py-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">
          Design Partner Pilot Program
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Rules of Engagement
        </p>

        <div className="prose prose-lg max-w-none">
          <p className="text-gray-600 mb-8">
            The following terms outline the mutual expectations and IP arrangements for participants
            in the FHIR IQ Design Partner Pilot Program (&quot;Program&quot;). These are intended as a
            framework for discussion and will be formalized in a separate agreement.
          </p>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center gap-3">
              <span className="w-8 h-8 bg-primary-blue/10 rounded-full flex items-center justify-center text-primary-blue text-sm font-bold">1</span>
              You Own Your Data and Clinical Logic
            </h2>
            <ul className="space-y-3 text-gray-600">
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 text-primary-green mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                All data you provide remains your sole property
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 text-primary-green mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Your CQL measure definitions, quality logic, and clinical content belong to you
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 text-primary-green mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                FHIR IQ will not use your data for any purpose beyond the pilot engagement
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 text-primary-green mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                All data will be deleted upon pilot completion unless otherwise agreed
              </li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center gap-3">
              <span className="w-8 h-8 bg-primary-blue/10 rounded-full flex items-center justify-center text-primary-blue text-sm font-bold">2</span>
              FHIR IQ Owns the Engine and Algorithms
            </h2>
            <ul className="space-y-3 text-gray-600">
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 text-primary-green mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                The CQL-to-SQL compilation engine is proprietary FHIR IQ technology
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 text-primary-green mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Optimization algorithms and translation methods remain FHIR IQ IP
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 text-primary-green mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Generated SQL output is licensed for your internal use during and after the pilot
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 text-primary-green mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                ViewDefinitions created during the pilot may be open-sourced with mutual consent
              </li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center gap-3">
              <span className="w-8 h-8 bg-primary-blue/10 rounded-full flex items-center justify-center text-primary-blue text-sm font-bold">3</span>
              90-Day Fixed Sprint Duration
            </h2>
            <ul className="space-y-3 text-gray-600">
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 text-primary-green mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                The pilot program runs for exactly 90 calendar days from kickoff
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 text-primary-green mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Scope will be mutually defined and documented before the sprint begins
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 text-primary-green mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Weekly check-ins and milestone reviews throughout the engagement
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 text-primary-green mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Final deliverables and learnings documented at sprint conclusion
              </li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center gap-3">
              <span className="w-8 h-8 bg-primary-blue/10 rounded-full flex items-center justify-center text-primary-blue text-sm font-bold">4</span>
              Direct Access to Founder/Architect
            </h2>
            <ul className="space-y-3 text-gray-600">
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 text-primary-green mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Weekly 1-on-1 calls with the founder/technical architect
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 text-primary-green mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Direct Slack or email access for questions and feedback
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 text-primary-green mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Your input directly shapes product roadmap and priorities
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 text-primary-green mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Early access to new features and capabilities
              </li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center gap-3">
              <span className="w-8 h-8 bg-primary-blue/10 rounded-full flex items-center justify-center text-primary-blue text-sm font-bold">5</span>
              Partner Expectations
            </h2>
            <ul className="space-y-3 text-gray-600">
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 text-accent-orange mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
                Designate a technical point of contact for the pilot
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 text-accent-orange mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
                Provide timely feedback on deliverables and product iterations
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 text-accent-orange mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
                Share relevant CQL/quality measure requirements for the pilot scope
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 text-accent-orange mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
                Willingness to provide a testimonial or case study (with approval)
              </li>
            </ul>
          </section>

          <div className="bg-gray-50 rounded-xl p-6 mt-12">
            <p className="text-gray-600 text-sm">
              <strong>Note:</strong> These terms are a summary framework. Formal participation requires
              execution of a mutual NDA and Pilot Agreement. If you have questions about any of
              these terms, please{' '}
              <a href="mailto:gene@fhiriq.com" className="text-primary-blue hover:underline">
                contact us directly
              </a>.
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <Link
            href="/early-access"
            className="inline-block bg-accent-purple hover:bg-purple-700 text-white px-8 py-4 rounded-lg font-semibold transition text-lg"
          >
            Apply for Design Partner Program
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 mt-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div>
              <Link href="/" className="text-2xl font-bold">FHIR IQ</Link>
              <p className="text-gray-400 mt-2">The Semantic Intelligence Layer for Healthcare</p>
            </div>
            <div className="flex gap-8">
              <Link href="/" className="text-gray-400 hover:text-white transition">Home</Link>
              <Link href="/cql-to-sql" className="text-gray-400 hover:text-white transition">CQL-to-SQL</Link>
              <Link href="/library" className="text-gray-400 hover:text-white transition">ViewDefinition Library</Link>
              <Link href="/contact" className="text-gray-400 hover:text-white transition">Contact</Link>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-800 text-center">
            <p className="text-gray-400">&copy; 2025 FHIR IQ. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
