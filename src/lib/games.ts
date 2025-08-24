import fs from "node:fs";
import path from "node:path";
import type { Game } from "@/types/games";
import games from "@/data/games.json";

export function readGames(): Game[] {
  return games as Game[];
}

export function gameIndexHtmlExists(id: string): boolean {
  const file = path.join(process.cwd(), "public", "games", id, "index.html");
  return fs.existsSync(file);
}
