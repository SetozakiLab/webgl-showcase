import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Allow serving SVGs from public/ via next/image if needed
    dangerouslyAllowSVG: true,
  },

  async rewrites() {
    // Build-time rewrites generated from local JSON so unknown IDs fall back to 404 UI
    const contentsData = require("./src/data/contents.json");
    const assetPrefixes = ["TemplateData", "Build", "StreamingAssets"] as const;

    const beforeFiles = contentsData.flatMap((content: any) => {
      const id = String(content.id);
      const base = String(content.externalUrl).replace(/\/$/, "");
      const refererRegex = `https?://[^/]+/contents/${id}(?:/.*)?`;

      return [
        // 1) Serve the external index through our proxy to inject <base>
        { source: `/contents/${id}`, destination: `/api/proxy/${id}` },
        { source: `/contents/${id}/`, destination: `/api/proxy/${id}` },

        // 2) Anything nested under /contents/<id>/... should go to the external host
        { source: `/contents/${id}/:path*`, destination: `${base}/:path*` },

        // 3) Some Unity builds issue absolute-root asset requests; pass them through
        ...assetPrefixes.flatMap((p) => [
          {
            source: `/${p}/:path*`,
            has: [{ type: "header", key: "referer", value: refererRegex }],
            destination: `${base}/${p}/:path*`,
          },
          {
            source: `/contents/${p}/:path*`,
            has: [{ type: "header", key: "referer", value: refererRegex }],
            destination: `${base}/${p}/:path*`,
          },
        ]),
      ];
    });

    return { beforeFiles };
  },
};

export default nextConfig;
