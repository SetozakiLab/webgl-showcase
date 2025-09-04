import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getAllContents } from "@/lib/contents";

const contents = getAllContents();

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
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
              <Link
                href="#contents"
                className="inline-flex h-10 items-center rounded-md bg-primary px-5 text-sm font-medium text-primary-foreground shadow transition-transform hover:translate-y-[-1px]"
              >
                コンテンツを見る
              </Link>
              <a
                href="https://setozakilab.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-10 items-center rounded-md border px-5 text-sm font-medium text-foreground/90 hover:bg-muted/40"
              >
                研究室サイトへ
              </a>
            </div>
          </div>
        </div>
      </section>

      <main id="contents" className="container mx-auto px-4 py-10 md:py-14">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-semibold tracking-tight">
            コンテンツ一覧
          </h2>
          <p className="text-sm text-muted-foreground">{contents.length} 件</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {contents.map((content) => (
            <Link
              key={content.id}
              href={`/contents/${content.id}`}
              className="group block"
            >
              <Card className="h-full transition-all duration-300 border-border/70 group-hover:border-foreground/20 group-hover:shadow-lg">
                <CardHeader className="pb-4">
                  <div className="aspect-video relative overflow-hidden rounded-md">
                    <Image
                      src={content.thumbnail}
                      alt={content.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                      loading="lazy"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <CardTitle className="text-lg md:text-xl">
                    {content.title}
                  </CardTitle>
                  <p className="text-muted-foreground text-sm line-clamp-3">
                    {content.description}
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {content.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
