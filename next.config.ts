import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
        pathname: '**',
      },
    ],
  },
  // Fix for potential 400 bad request on Sanity API calls
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
};

export default nextConfig;