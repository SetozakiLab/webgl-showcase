import { HeroSection } from "@/components/hero-section";
import { ContentCard } from "@/components/content-card";
import { getAllContents } from "@/lib/contents";

const contents = getAllContents();

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <HeroSection />

      <main id="contents" className="container mx-auto px-4 py-10 md:py-14">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-semibold tracking-tight">
            コンテンツ一覧
          </h2>
          <p className="text-sm text-muted-foreground">{contents.length} 件</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {contents.map((content) => (
            <ContentCard key={content.id} content={content} />
          ))}
        </div>
      </main>
    </div>
  );
}
