import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // Static HTML export for hosts that expect deploy artifacts under public/ (see vercel.json).
  output: 'export',
  // Required for next/image with output: 'export' (Sanity CDN URLs).
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
        pathname: '/**',
      },
    ],
  },
  // Next 15.5 defaults this to true; it can break RSC dev + corrupt webpack chunks.
  experimental: {
    devtoolSegmentExplorer: false,
  },
}

export default nextConfig
