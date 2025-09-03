import { notFound, redirect } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { findContentById, getAllContents } from "@/lib/content";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ClientRedirect } from "./client-redirect";

type Params = { id: string };

export async function generateStaticParams() {
  return getAllContents().map((c) => ({ id: c.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const content = findContentById(params.id);
  if (!content) return {};
  return {
    title: `${content.title} | WebGL Showcase`,
    description: content.description,
    openGraph: {
      title: content.title,
      description: content.description,
      images: content.thumbnail ? [{ url: content.thumbnail }] : undefined,
      url: `/contents/${content.id}`,
    },
    twitter: {
      card: "summary_large_image",
      title: content.title,
      description: content.description,
      images: content.thumbnail ? [content.thumbnail] : undefined,
    },
  };
}

export default function ContentRedirectPage({ params }: { params: Params }) {
  const content = findContentById(params.id);
  if (!content) notFound();

  // リライトが前提。USE_REWRITES=false のときはサーバーリダイレクトを優先。
  if (process.env.USE_REWRITES === "false") {
    redirect(content.externalUrl);
  }

  return (
    <main className="container mx-auto px-6 py-10">
      <ClientRedirect to={content.externalUrl} />
      <Card>
        <CardHeader>
          <CardTitle>{content.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4 text-sm text-muted-foreground">
            このページでは外部ホスティング先のコンテンツへ遷移します。数秒待っても表示されない場合は、以下のリンクから手動で開いてください。
          </p>
          <div className="flex gap-3">
            <Button asChild>
              <a href={content.externalUrl} target="_blank" rel="noopener">
                外部で開く
              </a>
            </Button>
            <Button variant="secondary" asChild>
              <Link href="/">一覧へ戻る</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
