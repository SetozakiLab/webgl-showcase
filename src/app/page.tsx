import Link from "next/link";
import gamesData from "@/data/games.json";
import type { Game } from "@/types/games";
import { gameIndexHtmlExists } from "@/lib/games";

export default function Home() {
  const games = gamesData as Game[];
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  return (
    <main className="min-h-screen px-6 py-10 md:px-10 md:py-12">
      <h1 className="text-2xl md:text-3xl font-semibold">
        Unity WebGL ショーケース
      </h1>
      <p className="text-sm mt-2 text-gray-500">公開中のゲーム一覧</p>

      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        {games
          .filter((g) => gameIndexHtmlExists(g.id))
          .map((g: Game) => (
            <li key={g.id} className="group">
              <Link
                href={`/games/${g.id}/`}
                className="block rounded-lg border border-black/10 dark:border-white/10 overflow-hidden focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {/* 画像は <img> でOK（Next Image最適化は無効化） */}
                <img
                  src={`${basePath}${g.thumbnail}`}
                  alt={`${g.title} サムネイル`}
                  loading="lazy"
                  className="aspect-video w-full object-cover"
                />
                <div className="p-4">
                  <h2 className="font-medium text-base md:text-lg">
                    {g.title}
                  </h2>
                  {g.description ? (
                    <p className="text-xs md:text-sm text-gray-500 mt-1 line-clamp-2">
                      {g.description}
                    </p>
                  ) : null}
                  {g.tags && g.tags.length > 0 ? (
                    <div className="flex flex-wrap gap-2 mt-3">
                      {g.tags?.map((t: string) => (
                        <span
                          key={t}
                          className="text-[10px] md:text-xs px-2 py-0.5 rounded-full bg-black/5 dark:bg-white/10"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  ) : null}
                </div>
              </Link>
            </li>
          ))}
      </ul>
    </main>
  );
}
