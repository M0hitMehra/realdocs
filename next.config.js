/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["cpjfwvhjeaochqoperao.supabase.co"],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig;
