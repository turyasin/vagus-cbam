import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static export for Cloudflare Pages deployment
  // Faz 2'de SSR gerektiğinde kaldırılacak
  output: "export",
  trailingSlash: true,
};

export default nextConfig;
