/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone', // essential for cPanel Node hosting
  images: {
    domains: ['localhost', 'anamulemon.com', 'jakaria.amazonfbasetup.com'], // add your actual domains here
  },
};

export default nextConfig;
