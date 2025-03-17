
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { BlogPost, Project } from "@/types/collections";

type ContentType = "blog" | "projects";

interface MarkdownMeta {
  title: string;
  date: string;
  description: string;
  slug: string;
  [key: string]: any;
}

interface MarkdownContent {
  meta: MarkdownMeta;
  content: string;
}

// Get all markdown files metadata from a specific content type
export function getAllContentMeta(type: ContentType): MarkdownMeta[] {
  const files = fs.readdirSync(path.join(process.cwd(), "content", type));

  const posts = files
    .filter((filename) => filename.endsWith(".md"))
    .map((filename) => {
      const fileContent = fs.readFileSync(
        path.join(process.cwd(), "content", type, filename),
        "utf-8"
      );

      const { data: meta } = matter(fileContent);

      return {
        ...meta,
        slug: filename.replace(".md", ""),
      } as MarkdownMeta;
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return posts;
}

// Get a specific markdown content by slug
export function getContentBySlug(
  type: ContentType,
  slug: string
): MarkdownContent {
  const filePath = path.join(process.cwd(), "content", type, `${slug}.md`);
  const fileContent = fs.readFileSync(filePath, "utf-8");
  const { data: meta, content } = matter(fileContent);

  return {
    meta: {
      ...(meta as MarkdownMeta),
      slug,
    },
    content,
  };
}

// Parse markdown content for blog posts
export function parseBlogMarkdown(content: string): BlogPost {
  const { data, content: markdownContent } = matter(content);
  
  return {
    id: data.id || Math.random().toString(36).substring(2, 9),
    slug: data.slug || '',
    title: data.title || 'Untitled Post',
    excerpt: data.excerpt || data.description || '',
    content: markdownContent || '',
    featuredImage: data.featuredImage || 'https://source.unsplash.com/random/800x600/?data',
    author: data.author || 'Anonymous',
    date: data.date || new Date().toLocaleDateString(),
    readTime: data.readTime || `${Math.ceil(markdownContent.length / 1500)} min read`,
    tags: Array.isArray(data.tags) ? data.tags : data.tags ? [data.tags] : [],
    featured: data.featured || false,
  };
}

// Parse markdown content for projects
export function parseProjectMarkdown(content: string): Project {
  const { data, content: markdownContent } = matter(content);
  
  return {
    id: data.id || Math.random().toString(36).substring(2, 9),
    slug: data.slug || '',
    title: data.title || 'Untitled Project',
    description: data.description || '',
    content: markdownContent || '',
    featuredImage: data.featuredImage || 'https://source.unsplash.com/random/800x600/?code',
    technologies: Array.isArray(data.technologies) ? data.technologies : data.technologies ? [data.technologies] : [],
    githubUrl: data.githubUrl || '',
    liveUrl: data.liveUrl || '',
    featured: data.featured || false,
    date: data.date || new Date().toLocaleDateString(),
  };
}
