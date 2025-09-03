import contentsData from "@/data/contents.json";
import { Contents, Content } from "@/types/content";

/**
 * Get all contents
 */
export function getAllContents(): Contents {
  return contentsData as Contents;
}

/**
 * Get content by ID
 */
export function getContentById(id: string): Content | undefined {
  const contents = getAllContents();
  return contents.find((content) => content.id === id);
}

/**
 * Get all content IDs for static generation
 */
export function getAllContentIds(): string[] {
  const contents = getAllContents();
  return contents.map((content) => content.id);
}