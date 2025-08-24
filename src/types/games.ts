export type Game = {
  id: string;
  title: string;
  description?: string;
  thumbnail: string; // public 配下のパス（/thumbnails/...）
  tags?: string[];
};
