'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function FHIRSquirePage() {
  useEffect(() => {
    // Track page view
    if (typeof window !== 'undefined' && 'gtag' in window) {
      (window as any).gtag('event', 'page_view', {
        page_title: 'FHIRSquire - FHIR Profile Advisor',
        page_path: '/fhirsquire'
      });
    }
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="bg-white shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center gap-8">
              <Link href="/" className="text-2xl font-bold text-primary-blue">
                FHIR IQ
              </Link>
              <div className="flex items-center gap-2">
                <span className="text-xl font-semibold text-gray-900">FHIRSquire</span>
                <span className="bg-accent-purple text-white px-2 py-1 rounded text-xs font-bold">AI-POWERED</span>
              </div>
            </div>
            <div className="hidden md:flex space-x-6">
              <Link href="/tools" className="text-neutral-gray hover:text-primary-blue font-medium">
                All Tools
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

      {/* Info Banner */}
      <div className="bg-gradient-to-r from-accent-purple to-primary-blue text-white py-4">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div>
                <p className="text-sm md:text-base font-medium">
                  <span className="font-bold">AI-Powered FHIR Profile Advisor</span> - Get instant guidance on FHIR profiles and implementation guides
                </p>
              </div>
            </div>
            <Link
              href="/tools"
              className="text-white hover:text-gray-200 text-sm font-semibold whitespace-nowrap"
            >
              View All Tools →
            </Link>
          </div>
        </div>
      </div>

      {/* Main Content - Embedded FHIRSquire Application */}
      <div className="relative w-full" style={{ height: 'calc(100vh - 140px)' }}>
        <iframe
          src="https://fhir-squire.vercel.app/"
          title="FHIRSquire - FHIR Profile Advisor"
          className="w-full h-full border-0"
          sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-popups-to-escape-sandbox"
          loading="eager"
        />
      </div>

      {/* Footer Info */}
      <div className="bg-gray-50 border-t border-gray-200 py-6">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-6 text-center">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Need Help?</h3>
              <p className="text-sm text-gray-600 mb-2">
                Get expert guidance on FHIR profile implementation
              </p>
              <Link href="/consulting" className="text-primary-blue hover:underline text-sm font-semibold">
                View Consulting Services
              </Link>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">More Tools</h3>
              <p className="text-sm text-gray-600 mb-2">
                Explore our complete suite of FHIR development tools
              </p>
              <Link href="/tools" className="text-primary-blue hover:underline text-sm font-semibold">
                Browse All Tools
              </Link>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Learn More</h3>
              <p className="text-sm text-gray-600 mb-2">
                Training courses and resources for FHIR development
              </p>
              <Link href="/training" className="text-primary-blue hover:underline text-sm font-semibold">
                View Training Options
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
