import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getAllContents } from "@/lib/contents";

const contents = getAllContents();

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <header className="bg-card border-b">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-4xl font-bold text-center text-foreground">
            Unity WebGL ショーケース
          </h1>
          <p className="text-center text-muted-foreground mt-2">
            研究室で作成されたWebGLゲームコンテンツ一覧
          </p>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {contents.map((content) => (
            <Link
              key={content.id}
              href={`/contents/${content.id}`}
              className="transition-transform hover:scale-105"
            >
              <Card className="h-full hover:shadow-lg transition-shadow">
                <CardHeader className="pb-4">
                  <div className="aspect-video relative overflow-hidden rounded-md">
                    <Image
                      src={content.thumbnail}
                      alt={content.title}
                      fill
                      className="object-cover"
                      loading="lazy"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <CardTitle className="text-xl">{content.title}</CardTitle>
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

      <footer className="bg-card border-t mt-16">
        <div className="container mx-auto px-4 py-8 text-center text-muted-foreground">
          <p>© 2024 Unity WebGL Showcase. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
