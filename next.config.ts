import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    // ✅ Ignores TypeScript build errors
    ignoreBuildErrors: true,
  },
  eslint: {
    // ✅ Ignores ESLint errors during build
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
