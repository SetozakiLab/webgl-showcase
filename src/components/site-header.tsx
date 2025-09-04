"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b bg-background/70 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group">
          <Image
            src="/logo.png"
            alt="ロゴ"
            width={128}
            height={128}
            className="h-8 w-auto select-none opacity-90 group-hover:opacity-100 transition-opacity"
            priority
          />
          <span className="whitespace-nowrap text-sm sm:text-base font-bold text-muted-foreground group-hover:text-foreground transition-colors">
            | WebGL Content Portal
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-2">
          <Button asChild variant="link" size="sm">
            <Link href="/">ホーム</Link>
          </Button>
          <Button asChild variant="link" size="sm">
            <Link href="/#contents">コンテンツ</Link>
          </Button>
          <Button asChild variant="link" size="sm">
            <a
              href="https://setozakilab.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              研究室ホームページ
            </a>
          </Button>
          <Button asChild variant="link" size="sm">
            <a
              href="https://github.com/setozakilab"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
          </Button>
        </nav>
      </div>
    </header>
  );
}
