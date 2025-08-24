import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Unity WebGL ショーケース",
  description: "複数の Unity WebGL ビルドをブラウザで体験できます",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <header className="px-6 py-4 md:px-10 border-b border-black/10 dark:border-white/10 bg-background/70 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-40">
          <div className="max-w-6xl mx-auto flex items-center justify-between">
            <Link href="/" className="font-semibold">
              Unity WebGL ショーケース
            </Link>
            <nav className="text-sm text-gray-500">GitHub Pages 対応</nav>
          </div>
        </header>
        <div className="max-w-6xl mx-auto">{children}</div>
        <footer className="px-6 py-8 md:px-10 mt-16 text-center text-xs text-gray-500 border-t border-black/10 dark:border-white/10">
          © {new Date().getFullYear()} WebGL Showcase
        </footer>
      </body>
    </html>
  );
}
