import Image from "next/image";
import Link from "next/link";
import { getAllContents } from "@/lib/content";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function Home() {
  const contents = getAllContents();
  return (
    <main className="container mx-auto px-6 py-10">
      <h1 className="text-2xl font-semibold mb-6">
        Unity WebGL コンテンツ一覧
      </h1>
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {contents.map((c) => (
          <li key={c.id}>
            <Link
              href={`/contents/${c.id}`}
              className="block focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 rounded-lg"
            >
              <Card className="h-full">
                <CardHeader>
                  <CardTitle className="text-base">{c.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="aspect-[16/9] relative mb-3 overflow-hidden rounded-md bg-black/5">
                    <Image
                      src={c.thumbnail}
                      alt={`${c.title} のサムネイル`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      priority={false}
                    />
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {c.tags?.slice(0, 3).map((t: string) => (
                      <Badge key={t} variant="secondary">
                        {t}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
