import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import "./globals.css";

export const metadata: Metadata = {
  title: "コンテンツポータル - Setozaki Lab",
  description:
    "長崎大学の瀬戸崎研究室が運営する、Unity等で制作されたコンテンツの展示ポータルサイト",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
  ),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className="font-sans antialiased">
        <div className="min-h-dvh flex flex-col">
          <SiteHeader />

          {/* Page Content */}
          <main className="flex-1">{children}</main>

          <SiteFooter />
        </div>
      </body>
    </html>
  );
}
