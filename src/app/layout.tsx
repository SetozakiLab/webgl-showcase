import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Unity WebGL Showcase",
  description: "研究室の Unity WebGL プロジェクトを紹介・配信するハブサイト",
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
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <header className="border-b">
          <div className="container mx-auto px-6 py-4">
            <a href="/" className="font-semibold">
              Unity WebGL Showcase
            </a>
          </div>
        </header>
        {children}
        <footer className="border-t mt-10">
          <div className="container mx-auto px-6 py-6 text-sm text-muted-foreground">
            © {new Date().getFullYear()} Lab Showcase
          </div>
        </footer>
      </body>
    </html>
  );
}
