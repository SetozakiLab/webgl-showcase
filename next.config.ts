import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  // Commented out rewrites for demo purposes since external URLs don't exist
  // In production, uncomment and configure valid external URLs

  async rewrites() {
    // Generate rewrites for each content to proxy external URLs
    // This maintains the URL structure /contents/[id] while serving external content
    const contentsData = require("./src/data/contents.json");
    return contentsData.map((content: any) => ({
      source: `/contents/${content.id}/:path*`,
      destination: `${content.externalUrl}/:path*`,
    }));
  },
};

export default nextConfig;
