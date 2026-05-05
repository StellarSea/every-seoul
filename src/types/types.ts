export interface Newsletter {
  id: number;
  title: string;
  date: string;
  category: string;
  relevance: number;
  image?: string;
  tags: string[];
  views: number;
  featured?: boolean;
  excerpt: string;
}
