import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ["i.ibb.co"], // ✅ add your image host here
  },
  reactCompiler: true,
};

export default nextConfig;
