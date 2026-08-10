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
    ];
    return [
      ...retired.map((source) => ({ source, destination: '/', permanent: true })),
      // The Lab now carries the live projects, so point old tool traffic there.
      { source: '/products', destination: '/lab', permanent: true },
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
