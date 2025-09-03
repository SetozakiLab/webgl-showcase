import type { NextConfig } from "next";
import contents from "./src/data/contents.json" assert { type: "json" };
const enableRewrites = process.env.USE_REWRITES !== "false";

const nextConfig: NextConfig = {
  async rewrites() {
    if (!enableRewrites) return [];
    // /contents/<id> -> externalUrl へリライト（アドレスバー維持）
    const rules = contents
      .filter((c) => typeof c.externalUrl === "string" && !!c.externalUrl)
      .flatMap((c) => {
        const dest = String(c.externalUrl).replace(/\/$/, "");
        return [
          { source: `/contents/${c.id}`, destination: dest },
          { source: `/contents/${c.id}/:path*`, destination: `${dest}/:path*` },
        ];
      });
    return rules;
  },
  images: {
    remotePatterns: [
      // サムネイルを外部に置く場合に備えた許可例（必要に応じて追加）
      // { protocol: "https", hostname: "example.com" },
    ],
  },
};

export default nextConfig;
