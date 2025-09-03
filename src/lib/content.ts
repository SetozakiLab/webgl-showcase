import { z } from "zod";
import contentsRaw from "@/data/contents.json";

export const ContentSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  description: z.string().default(""),
  thumbnail: z.string().url().or(z.string().startsWith("/")),
  externalUrl: z.string().url(),
  tags: z.array(z.string()).default([]),
});

export type Content = z.infer<typeof ContentSchema>;

export const ContentsSchema = z.array(ContentSchema);

export function getAllContents(): Content[] {
  const parsed = ContentsSchema.safeParse(contentsRaw);
  if (!parsed.success) {
    console.error(parsed.error.format());
    throw new Error("contents.json のスキーマ検証に失敗しました");
  }
  return parsed.data;
}

export function findContentById(id: string): Content | undefined {
  return getAllContents().find((c) => c.id === id);
}
