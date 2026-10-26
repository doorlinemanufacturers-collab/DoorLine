/** @type {import('next').NextConfig} */
module.exports = {
  async redirects() {
    return [
      { source: '/products', destination: '/aluminum-handles', permanent: true },
      { source: '/collections/aluminum-fittings-lahore', destination: '/collections/aluminum-hinges-lahore', permanent: true },
    ];
  },
  compress: true,
  poweredByHeader: false,
  images: {
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 60 * 60 * 24 * 30,
    remotePatterns: [{ protocol: 'https', hostname: '**.public.blob.vercel-storage.com' }],
  },
};
