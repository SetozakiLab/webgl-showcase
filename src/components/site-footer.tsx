import { Button } from "@/components/ui/button";

export function SiteFooter() {
  return (
    <footer className="border-t bg-card">
      <div className="container mx-auto px-4 py-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-sm text-muted-foreground text-center md:text-left">
            <p>
              © 2025 Setozaki Lab, Nagasaki University. All rights reserved.
            </p>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Button asChild variant="link" size="sm">
              <a
                href="https://setozakilab.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                研究室ホームページ
              </a>
            </Button>
            <Button asChild variant="link" size="sm">
              <a
                href="https://github.com/setozakilab/webgl-showcase"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub リポジトリ
              </a>
            </Button>
            <Button asChild variant="link" size="sm">
              <a
                href="https://github.com/setozakilab"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub 組織
              </a>
            </Button>
          </div>
        </div>
      </div>
    </footer>
  );
}
