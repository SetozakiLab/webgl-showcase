import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Content } from "@/types/content";

type Props = {
  content: Content;
};

export function ContentCard({ content }: Props) {
  return (
    <Link href={`/contents/${content.id}`} className="group block">
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
          <CardTitle className="text-lg md:text-xl">{content.title}</CardTitle>
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
  );
}
