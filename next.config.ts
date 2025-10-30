import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    domains: ['avatars.githubusercontent.com'], // tambahkan domain external
  },
  devIndicators: false,
}

export default nextConfig
