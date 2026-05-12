import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/cql-to-sql',
        destination: '/',
        permanent: true,
      },
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
