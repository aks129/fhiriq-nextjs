'use client';

import { useState } from 'react';

export default function CQLBuilderBanner() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="bg-gradient-to-r from-bg-3 to-bg-3 text-white py-3 px-4 relative">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3 flex-1">
          <span className="bg-white text-fg px-3 py-1 rounded-full text-xs font-bold uppercase">
            POC
          </span>
          <p className="text-sm md:text-base font-medium">
            <span className="font-bold">CQL Builder</span> - Generate CQL code with natural language!
            <span className="hidden md:inline"> AI-powered Clinical Quality Language code generation for eCQMs.</span>
          </p>
        </div>
        <div className="flex items-center gap-4 ml-4">
          <a
            href="https://s77.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white text-fg px-4 py-2 rounded-lg font-semibold hover:bg-bg-2 transition text-sm whitespace-nowrap"
          >
            Try CQL Builder
          </a>
          <button
            onClick={() => setIsVisible(false)}
            className="text-white hover:text-fg-2 transition"
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
