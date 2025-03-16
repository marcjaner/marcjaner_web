
export interface Project {
  id: string;
  slug: string;
  title: string;
  description: string;
  content: string;
  featuredImage: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  featured: boolean;
  date: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  featuredImage: string;
  author: string;
  date: string;
  readTime: string;
  tags: string[];
  featured: boolean;
}
