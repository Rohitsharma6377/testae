/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'via.placeholder.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'encrypted-tbn0.gstatic.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'amitkk.ae',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'pagedone.io',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
