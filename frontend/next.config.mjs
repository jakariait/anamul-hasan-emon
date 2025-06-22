/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone', // essential for cPanel Node hosting
  images: {
    domains: ['localhost', 'your-production-domain.com'], // add your actual domains here
  },
};

export default nextConfig;
