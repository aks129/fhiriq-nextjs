'use client';

import Link from 'next/link';
import { useEffect } from 'react';

export default function MappingGuidePage() {
  useEffect(() => {
    // Redirect to the static HTML file after showing the banner
    const timer = setTimeout(() => {
      window.location.href = '/mappingguide/index.html';
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-bg-2">
      {/* Navigation */}
      <nav className="bg-bg shadow-lg">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <Link href="/" className="text-2xl font-bold text-primary-blue">
                FHIR IQ
              </Link>
              <span className="ml-4 text-fg-3">|</span>
              <span className="ml-4 text-lg font-semibold text-fg-2">FHIR Mapping Guide</span>
            </div>
            <Link href="/" className="text-primary-blue hover:text-primary-navy font-medium">
              ← Back to Home
            </Link>
          </div>
        </div>
      </nav>

      {/* GitHub Contribution Banner */}
      <div className="bg-gradient-to-r from-bg-3 to-bg-3 text-fg">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <span className="text-2xl">📝</span>
              <div>
                <div className="font-semibold">Community-Driven Mapping Guide</div>
                <div className="text-sm opacity-90">Share your HL7 v2, CDA, and data mapping experiences</div>
              </div>
            </div>
            <div className="flex gap-3">
              <a
                href="https://github.com/aks129/fhiriq-nextjs/blob/master/docs/guides/mapping-guide.md"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-bg text-fg px-4 py-2 rounded-lg font-semibold hover:bg-bg-2 transition inline-flex items-center gap-2"
              >
                <span>📖</span> View on GitHub
              </a>
              <a
                href="https://github.com/aks129/fhiriq-nextjs/edit/master/docs/guides/mapping-guide.md"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/10 text-fg border-2 border-white px-4 py-2 rounded-lg font-semibold hover:bg-white/20 transition inline-flex items-center gap-2"
              >
                <span>✏️</span> Contribute
              </a>
            </div>
          </div>
        </div>
      </div>

      <div style={{ padding: '2rem', textAlign: 'center' }}>
        <p className="text-fg-2">Redirecting to FHIR IQ Mapping Wiki...</p>
      </div>
    </div>
  );
}
