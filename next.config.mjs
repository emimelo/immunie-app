/** @type {import('next').NextConfig} */

import withPWA from 'next-pwa';

const nextConfig = {
    reactStrictMode: true,
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: '**',
        },
      ],
    },
};

export default withPWA({
  dest: 'public',
})(nextConfig);

