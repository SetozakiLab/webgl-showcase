import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Game } from "@/types/games";
import { readGames, gameIndexHtmlExists } from "@/lib/games";
import { FullscreenButton } from "@/components/FullscreenButton";

type Props = { params: { id: string } };

export async function generateStaticParams() {
  const games = readGames();
  // 実体の index.html が無いものは除外
  return games
    .filter((g) => gameIndexHtmlExists(g.id))
    .map((g) => ({ id: g.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = params;
  const games = readGames();
  const game = games.find((g) => g.id === id);
  if (!game) return {};
  const title = `${game.title} | Unity WebGL ショーケース`;
  return {
    title,
    description: game.description,
    openGraph: {
      title,
      description: game.description,
      images: game.thumbnail,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: game.description ?? undefined,
      images: game.thumbnail,
    },
  };
}

export default async function GamePage({ params }: Props) {
  const { id } = params;
  const games = readGames();
  const game = games.find((g) => g.id === id);

  if (!game || !gameIndexHtmlExists(id)) {
    notFound();
  }

  const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  const src = `${basePath}/games/${id}/index.html`;

  return (
    <main className="min-h-screen px-6 py-8 md:px-10 md:py-12">
      <Link href="/" className="text-sm text-blue-600 hover:underline">
        ← 一覧に戻る
      </Link>
      <h1 className="text-2xl md:text-3xl font-semibold mt-3">{game!.title}</h1>
      {game!.description ? (
        <p className="text-sm text-gray-500 mt-1">{game!.description}</p>
      ) : null}

      <div className="mt-6">
        <div
          id="game-container"
          className="relative w-full aspect-video border rounded-lg overflow-hidden bg-black/90"
        >
          {/* GitHub Pages を考慮し、iframe 埋め込み */}
          <iframe
            src={src}
            title={game!.title}
            allow="fullscreen; autoplay"
            loading="eager"
            className="absolute inset-0 size-full"
          />
        </div>
        <FullscreenButton targetSelector="#game-container" />
        <p className="text-xs text-gray-500 mt-3">
          ロードに時間がかかる場合があります。読み込まれないときはページを再読み込みしてください。
        </p>
      </div>
    </main>
  );
}
