/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    taint: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "api.realworld.io",
      },
    ],
  },
};

export default nextConfig;
