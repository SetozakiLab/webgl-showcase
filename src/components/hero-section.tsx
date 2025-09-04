import Link from "next/link";
import { Button } from "@/components/ui/button";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(1000px_600px_at_10%_-20%,oklch(0.967_0.001_286.375)_0%,transparent_60%),radial-gradient(800px_500px_at_90%_120%,oklch(0.967_0.001_286.375)_0%,transparent_60%)]" />
      <div className="container mx-auto px-4 py-16 md:py-24 relative">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
            コンテンツ紹介ポータル
          </h1>
          <p className="mt-4 text-muted-foreground text-base md:text-lg">
            長崎大学の瀬戸崎研究室の活動の中で制作されたWebGL対応のコンテンツを紹介するポータルサイトです。
          </p>
          <div className="mt-8 flex items-center justify-center gap-3">
            <Button asChild>
              <Link href="#contents">コンテンツを見る</Link>
            </Button>
            <Button asChild variant="outline">
              <a
                href="https://setozakilab.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                研究室サイトへ
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
