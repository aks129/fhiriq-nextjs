'use client';

import { useEffect } from 'react';

declare global {
  interface Window {
    _linkedin_data_partner_ids?: string[];
    lintrk?: (action: string, data: object) => void;
  }
}

interface LinkedInInsightProps {
  partnerId?: string;
}

/**
 * LinkedIn Insight Tag component for B2B visitor tracking
 *
 * Usage:
 * 1. Add NEXT_PUBLIC_LINKEDIN_PARTNER_ID to your environment variables
 * 2. Include <LinkedInInsight /> in your root layout
 *
 * To track custom events (like Design Partner button clicks):
 * ```
 * if (typeof window !== 'undefined' && window.lintrk) {
 *   window.lintrk('track', { conversion_id: 'your_conversion_id' });
 * }
 * ```
 */
export default function LinkedInInsight({ partnerId }: LinkedInInsightProps) {
  const linkedInPartnerId = partnerId || process.env.NEXT_PUBLIC_LINKEDIN_PARTNER_ID;

  useEffect(() => {
    if (!linkedInPartnerId || linkedInPartnerId === 'LINKEDIN_PARTNER_ID') {
      // Skip if no partner ID is configured
      console.log('LinkedIn Insight Tag: No partner ID configured');
      return;
    }

    // Initialize LinkedIn partner IDs array
    window._linkedin_data_partner_ids = window._linkedin_data_partner_ids || [];
    window._linkedin_data_partner_ids.push(linkedInPartnerId);

    // Load LinkedIn Insight script
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.async = true;
    script.src = 'https://snap.licdn.com/li.lms-analytics/insight.min.js';

    // Insert script
    const firstScript = document.getElementsByTagName('script')[0];
    if (firstScript && firstScript.parentNode) {
      firstScript.parentNode.insertBefore(script, firstScript);
    } else {
      document.head.appendChild(script);
    }

    // Add noscript fallback
    const noscript = document.createElement('noscript');
    const img = document.createElement('img');
    img.height = 1;
    img.width = 1;
    img.style.display = 'none';
    img.alt = '';
    img.src = `https://px.ads.linkedin.com/collect/?pid=${linkedInPartnerId}&fmt=gif`;
    noscript.appendChild(img);
    document.body.appendChild(noscript);

    // Cleanup on unmount
    return () => {
      // Remove the script and noscript on cleanup (optional)
      try {
        if (script.parentNode) {
          script.parentNode.removeChild(script);
        }
        if (noscript.parentNode) {
          noscript.parentNode.removeChild(noscript);
        }
      } catch {
        // Ignore cleanup errors
      }
    };
  }, [linkedInPartnerId]);

  return null; // This component doesn't render anything
}

/**
 * Helper function to track LinkedIn conversion events
 * Use this when tracking specific actions like button clicks
 */
export function trackLinkedInConversion(conversionId: string) {
  if (typeof window !== 'undefined' && window.lintrk) {
    window.lintrk('track', { conversion_id: conversionId });
  }
}
