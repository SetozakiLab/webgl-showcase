import type { Metadata } from "next";
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
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
