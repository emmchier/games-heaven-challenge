import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.igdb.com',
        pathname: '/igdb/image/upload/**', // Ruta exacta para restringir el acceso a las imágenes relevantes
      },
    ],
  },
};

export default nextConfig;
