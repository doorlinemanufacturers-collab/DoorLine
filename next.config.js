/** @type {import('next').NextConfig} */
module.exports = {
  compress: true,
  poweredByHeader: false,
  images: {
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 60 * 60 * 24 * 30,
    remotePatterns: [{ protocol: 'https', hostname: '**.public.blob.vercel-storage.com' }],
  },
};
