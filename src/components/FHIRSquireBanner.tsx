'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function FHIRSquireBanner() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="bg-gradient-to-r from-accent-purple to-primary-blue text-white py-3 px-4 relative">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3 flex-1">
          <span className="bg-white text-primary-blue px-3 py-1 rounded-full text-xs font-bold uppercase">
            New
          </span>
          <p className="text-sm md:text-base font-medium">
            <span className="font-bold">FHIRSquire</span> - Your AI-powered FHIR Profile Advisor is here!
            <span className="hidden md:inline"> Get instant guidance on FHIR profiles and implementation.</span>
          </p>
        </div>
        <div className="flex items-center gap-4 ml-4">
          <Link
            href="https://fhir-squire.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white text-primary-blue px-4 py-2 rounded-lg font-semibold hover:bg-gray-100 transition text-sm whitespace-nowrap"
          >
            Try It Now
          </Link>
          <button
            onClick={() => setIsVisible(false)}
            className="text-white hover:text-gray-200 transition"
            aria-label="Close banner"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
