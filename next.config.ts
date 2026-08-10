import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
