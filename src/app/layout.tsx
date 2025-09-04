import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
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
          {/* Site Header */}
          <header className="sticky top-0 z-50 border-b bg-background/70 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">
              <Link href="/" className="flex items-center gap-3 group">
                <Image
                  src="/logo.png"
                  alt="Setozaki Lab ロゴ"
                  width={140}
                  height={48}
                  className="h-8 w-auto select-none opacity-90 group-hover:opacity-100 transition-opacity"
                  priority
                />
                <span className="sr-only">ホームへ戻る</span>
              </Link>
              <nav className="hidden md:flex items-center gap-6 text-sm">
                <Link
                  href="/"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  ホーム
                </Link>
                <Link
                  href="/#contents"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  コンテンツ
                </Link>
                <a
                  href="https://setozakilab.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  研究室ホームページ
                </a>
                <a
                  href="https://github.com/setozakilab"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  GitHub
                </a>
              </nav>
            </div>
          </header>

          {/* Page Content */}
          <main className="flex-1">{children}</main>

          {/* Site Footer */}
          <footer className="border-t bg-card">
            <div className="container mx-auto px-4 py-10">
              <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="text-sm text-muted-foreground text-center md:text-left">
                  <p>
                    © 2025 Setozaki Lab, Nagasaki University. All rights
                    reserved.
                  </p>
                </div>
                <div className="flex items-center gap-5 text-sm">
                  <a
                    href="https://setozakilab.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    研究室ホームページ
                  </a>
                  <a
                    href="https://github.com/setozakilab/webgl-showcase"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    GitHub リポジトリ
                  </a>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
