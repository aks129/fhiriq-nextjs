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
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <Link href="/" className="text-2xl font-bold text-primary-blue">
                FHIR IQ
              </Link>
              <span className="ml-4 text-gray-400">|</span>
              <span className="ml-4 text-lg font-semibold text-gray-700">FHIR Mapping Guide</span>
            </div>
            <Link href="/" className="text-primary-blue hover:text-primary-navy font-medium">
              ← Back to Home
            </Link>
          </div>
        </div>
      </nav>

      {/* GitHub Contribution Banner */}
      <div className="bg-gradient-to-r from-green-600 to-teal-600 text-white">
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
                className="bg-white text-green-700 px-4 py-2 rounded-lg font-semibold hover:bg-green-50 transition inline-flex items-center gap-2"
              >
                <span>📖</span> View on GitHub
              </a>
              <a
                href="https://github.com/aks129/fhiriq-nextjs/edit/master/docs/guides/mapping-guide.md"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/10 text-white border-2 border-white px-4 py-2 rounded-lg font-semibold hover:bg-white/20 transition inline-flex items-center gap-2"
              >
                <span>✏️</span> Contribute
              </a>
            </div>
          </div>
        </div>
      </div>

      <div style={{ padding: '2rem', textAlign: 'center' }}>
        <p className="text-gray-700">Redirecting to FHIR IQ Mapping Wiki...</p>
      </div>
    </div>
  );
}
