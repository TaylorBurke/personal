export interface Project {
  slug: string;
  title: string;
  description: string;
  longDescription: string;
  category: string;
  image?: string;
  tags: string[];
  liveUrl?: string;
  githubUrl?: string;
  featured: boolean;
  year: string;
}
