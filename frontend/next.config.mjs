// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   output: 'standalone', // essential for cPanel Node hosting
// };
//
// export default nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone', // essential for cPanel Node hosting

  // Disable various caching mechanisms
  experimental: {
    isrMemoryCacheSize: 0, // Disable ISR memory cache
  },

  // Add headers to prevent caching
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'no-cache, no-store, must-revalidate, max-age=0',
          },
          {
            key: 'Pragma',
            value: 'no-cache',
          },
          {
            key: 'Expires',
            value: '0',
          },
        ],
      },
    ];
  },

  // Disable static optimization for pages that use your API
  async rewrites() {
    return [];
  },

  // Force dynamic rendering
  trailingSlash: false,

  // Disable image optimization if causing caching issues
  images: {
    unoptimized: true,
  },
};

export default nextConfig;