import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
  basePath: "/rakuda-invoice",
  trailingSlash: true,
};

export default nextConfig;
