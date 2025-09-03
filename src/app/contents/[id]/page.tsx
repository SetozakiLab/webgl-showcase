import { notFound } from "next/navigation";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, ExternalLink, Play } from "lucide-react";
import { RefreshButton } from "@/components/refresh-button";
import { getAllContentIds, getContentById } from "@/lib/contents";
import { Metadata } from "next";

interface ContentPageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return getAllContentIds().map((id) => ({
    id,
  }));
}

export async function generateMetadata({ params }: ContentPageProps): Promise<Metadata> {
  const { id } = await params;
  const content = getContentById(id);

  if (!content) {
    return {
      title: "Content Not Found",
    };
  }

  return {
    title: `${content.title} - Unity WebGL Showcase`,
    description: content.description,
    openGraph: {
      title: content.title,
      description: content.description,
      images: [content.thumbnail],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: content.title,
      description: content.description,
      images: [content.thumbnail],
    },
  };
}

export default async function ContentPage({ params }: ContentPageProps) {
  const { id } = await params;
  const content = getContentById(id);

  if (!content) {
    notFound();
  }

  // This fallback page is shown when rewrites don't work or as a backup
  return (
    <div className="min-h-screen bg-background">
      <header className="bg-card border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Link href="/">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                一覧に戻る
              </Button>
            </Link>
            <h1 className="text-2xl font-bold">{content.title}</h1>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="text-3xl">{content.title}</CardTitle>
              <p className="text-muted-foreground">{content.description}</p>
              <div className="flex flex-wrap gap-2 mt-4">
                {content.tags.map((tag) => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-muted/50 p-6 rounded-lg text-center">
                <Play className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-lg font-semibold mb-2">ゲームを開始</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  ゲームコンテンツが自動的に読み込まれない場合は、以下のオプションをご利用ください。
                </p>
                <div className="flex gap-4 justify-center flex-wrap">
                  <Button asChild size="lg">
                    <Link href={content.externalUrl} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      新しいタブで開く
                    </Link>
                  </Button>
                  <RefreshButton />
                  <Button variant="outline" asChild>
                    <Link href="/">
                      <ArrowLeft className="w-4 h-4 mr-2" />
                      一覧に戻る
                    </Link>
                  </Button>
                </div>
              </div>

              <div className="text-center text-sm text-muted-foreground">
                <p>
                  このページは自動的に外部ホスティングからコンテンツを読み込みます。<br />
                  読み込みに時間がかかる場合や、問題が発生した場合は「新しいタブで開く」をご利用ください。
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}