import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Unity WebGL Showcase",
  description: "Unity WebGL コンテンツのショーケースサイト",
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
