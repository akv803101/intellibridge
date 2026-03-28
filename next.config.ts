import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // Next 15.5 defaults this to true; it can break RSC dev + corrupt webpack chunks
  // ("SegmentViewNode" manifest error, then MODULE_NOT_FOUND ./594.js). Safe to disable.
  experimental: {
    devtoolSegmentExplorer: false,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
        pathname: '/**',
      },
    ],
  },
}

export default nextConfig
