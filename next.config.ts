import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '1337',
        pathname: '/uploads/**',
      },
      // Add your Render.com domain if needed
      {
        protocol: 'https',
        hostname: 'blog-cms-w8sh.onrender.com',
        port: '',
        pathname: '/uploads/**',
      }
    ],
  },
  webpack: (config) => {
    config.resolve.extensions = ['.ts', '.tsx', '.js', '.jsx', '.json']
    return config
  }
};

export default nextConfig;