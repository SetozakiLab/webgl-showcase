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
    // Generate rewrites for each content to proxy external URLs.
    // Use beforeFiles so rewrites take precedence even if a matching page exists
    // (e.g. app/contents/[id]/page.tsx acts as a fallback UI only).
    const contentsData = require("./src/data/contents.json");
    const assetPrefixes = ["TemplateData", "Build", "StreamingAssets"] as const;
    const rules = contentsData.flatMap((content: any) => {
      const base = String(content.externalUrl).replace(/\/$/, "");
      const refererRegex = `https?://[^/]+/contents/${content.id}(?:/.*)?`;
      const basic = [
        // exact match (/contents/<id>) -> external root
        { source: `/contents/${content.id}`, destination: `${base}/` },
        // nested assets (/contents/<id>/*) -> external with same path
        {
          source: `/contents/${content.id}/:path*`,
          destination: `${base}/:path*`,
        },
      ];
      const assetRules = assetPrefixes.flatMap((p) => [
        // Absolute-like root requests made after landing on /contents/<id>
        {
          source: `/${p}/:path*`,
          has: [{ type: "header", key: "referer", value: refererRegex }],
          destination: `${base}/${p}/:path*`,
        },
        // Some builds end up requesting under /contents/<prefix>/...
        {
          source: `/contents/${p}/:path*`,
          has: [{ type: "header", key: "referer", value: refererRegex }],
          destination: `${base}/${p}/:path*`,
        },
      ]);
      return [...basic, ...assetRules];
    });
    return { beforeFiles: rules };
  },
};

export default nextConfig;
