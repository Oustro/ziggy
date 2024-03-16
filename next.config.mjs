/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.vercel-storage.com',
        port: '',
      },
      {
        protocol: 'https',
        hostname: 'www.useziggy.com',
        port: '',
      }
    ]
  }
};

export default nextConfig;
