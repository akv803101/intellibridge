import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  output: 'export',
  // Without this, static export emits /blog.html; many hosts only serve /blog as blog/index.html → 404.
  trailingSlash: true,
  images: {
    unoptimized: true,
    remotePatterns: [
      { protocol: 'https', hostname: 'cdn.sanity.io', pathname: '/**' },
    ],
  },
  experimental: {
    devtoolSegmentExplorer: false,
  },
}

export default nextConfig
