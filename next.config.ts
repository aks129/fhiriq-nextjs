import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // A stray ~/package-lock.json makes Next infer the home folder as the
  // workspace root, which makes local Turbopack builds crawl. Pin it here.
  turbopack: { root: __dirname },
  async redirects() {
    // Routes retired because the products behind them are archived and their
    // targets 404 (FHIRSquire, FPAS, the ViewDefinition builder, healthio and
    // the other games). Permanent redirects so existing inbound links, search
    // results and QR codes still land somewhere real instead of a 404.
    const retired = [
      '/cql-to-sql',
      '/fhirsquire',
      '/solutions',
      '/solutions/fpas',
      '/builder',
      '/tools',
      '/tools/fhir-builder',
      '/library',
      '/portfolio',
      '/games',
      '/games/healthio',
      '/games/ai-agent',
      '/games/hti6-builder',
      // Retired because the page could not support its own claims. /partners
      // listed HL7 International, HIMSS and NCQA as partners — a claim about
      // real third-party organisations that nothing here verifies — over four
      // fabricated client testimonials.
      '/partners',
      // Retired in the October 2026 QA pass. Each was product-era copy that
      // the site could not stand behind: /investor named data-platform
      // "partnerships" and pitched a raise, /differentiation scored named
      // vendors with an X on every row, and /early-access and
      // /innovation-pilot-terms recruited design partners for a proprietary
      // engine that the open-source work replaced.
      '/investor',
      '/differentiation',
      '/early-access',
      '/innovation-pilot-terms',
    ];
    return [
      ...retired.map((source) => ({ source, destination: '/', permanent: true })),
      // The Lab now carries the live projects, so point old tool traffic there.
      { source: '/products', destination: '/lab', permanent: true },
      // /resources was a card list that still advertised three archived
      // products. /reference replaces it as the reference desk.
      { source: '/resources', destination: '/reference', permanent: true },
      // /training sold three courses and two certifications that do not exist,
      // with cohort dates from February 2024 and invented "seats remaining"
      // counts. The real training funnel is the workshop, so send it there.
      { source: '/training', destination: '/workshop', permanent: true },
      // /services duplicated /consulting with older copy.
      { source: '/services', destination: '/consulting', permanent: true },
      // /store sold fifteen data products, all "instant download", none of
      // which existed; every button went to /contact.
      { source: '/store', destination: '/lab', permanent: true },
      // /security described controls a one-person practice does not run
      // (annual penetration tests, 24/7 monitoring, a Security Officer). The
      // honest statement now lives on /privacy.
      { source: '/security', destination: '/privacy', permanent: true },
    ];
  },
  async rewrites() {
    return [
      {
        source: '/mappingguide',
        destination: '/mappingguide/index.html',
      },
    ];
  },
};

export default nextConfig;
