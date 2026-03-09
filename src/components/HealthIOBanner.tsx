'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function HealthIOBanner() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="fixed top-16 left-0 right-0 z-40 bg-gradient-to-r from-[#F59E0B] to-[#EF4444] text-white py-3 px-4 shadow-lg">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <span className="text-2xl flex-shrink-0" aria-hidden="true">&#x1F3C6;</span>
          <p className="text-sm md:text-base font-medium truncate">
            <span className="font-bold">FHIR IQ Badge Challenge</span>
            <span className="hidden sm:inline"> &mdash; Test your FHIR knowledge at HIMSS 2026!</span>
          </p>
        </div>
        <div className="flex items-center gap-3 ml-4 flex-shrink-0">
          <Link
            href="/games/healthio"
            className="bg-white text-[#EF4444] px-4 py-1.5 rounded-lg font-semibold hover:bg-gray-100 transition text-sm whitespace-nowrap"
          >
            Play Now
          </Link>
          <button
            onClick={() => setIsVisible(false)}
            className="text-white/80 hover:text-white transition p-1"
            aria-label="Dismiss banner"
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
