/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  output: "standalone",
  experimental: {
    serverComponentsExternalPackages: ["mysql2"],
  },
};

module.exports = nextConfig;
