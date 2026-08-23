import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  transpilePackages: ["@bunui/react", "@bunui/styles"],
};

export default nextConfig;
