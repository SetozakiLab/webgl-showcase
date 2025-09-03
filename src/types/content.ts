export interface Content {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  externalUrl: string;
  tags: string[];
}

export type Contents = Content[];