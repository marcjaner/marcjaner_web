import matter from "gray-matter";
import { Project, BlogPost } from "@/types/collections";

type ContentType = "blog" | "projects";

export interface MarkdownMeta {
  title: string;
  date: string;
  description: string;
  slug: string;
  featuredImage?: string;
  author?: string;
  readTime?: string;
  tags?: string[];
  [key: string]: string | string[] | undefined;
}

interface MarkdownContent {
  meta: MarkdownMeta;
  content: string;
}

interface BlogResponse extends MarkdownMeta {
  content: string;
}

interface MarkdownModule {
  metadata: MarkdownMeta;
  default: string;
}

const NETLIFY_DEV_URL = "http://localhost:8888";

// Get all markdown files metadata from a specific content type
export async function getAllContentMeta(
  type: ContentType
): Promise<MarkdownMeta[]> {
  const baseUrl = import.meta.env.DEV ? NETLIFY_DEV_URL : "";
  const response = await fetch(`${baseUrl}/.netlify/functions/${type}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch ${type}: ${response.statusText}`);
  }
  const data = (await response.json()) as MarkdownMeta[];
  return data;
}

// Get a specific markdown content by slug
export async function getContentBySlug(
  type: ContentType,
  slug: string
): Promise<MarkdownContent> {
  const baseUrl = import.meta.env.DEV ? NETLIFY_DEV_URL : "";
  const response = await fetch(
    `${baseUrl}/.netlify/functions/${type}?slug=${slug}`
  );
  if (!response.ok) {
    throw new Error(
      `Failed to fetch ${type} with slug ${slug}: ${response.statusText}`
    );
  }
  const data = (await response.json()) as BlogResponse;

  return {
    meta: {
      title: data.title,
      date: data.date,
      description: data.description,
      slug: data.slug,
      featuredImage: data.featuredImage,
      author: data.author,
      readTime: data.readTime,
      tags: data.tags,
    },
    content: data.content,
  };
}

export function parseProjectMarkdown(content: string): Project {
  const { data: meta, content: markdownContent } = matter(content);
  return {
    id: meta.slug,
    slug: meta.slug,
    title: meta.title,
    description: meta.description,
    content: markdownContent,
    featuredImage: meta.featuredImage,
    technologies: meta.technologies || [],
    githubUrl: meta.githubUrl,
    liveUrl: meta.liveUrl,
    featured: meta.featured || false,
    date: meta.date,
  };
}

export function parseBlogMarkdown(content: string): BlogPost {
  const { data: meta, content: markdownContent } = matter(content);
  return {
    id: meta.slug,
    slug: meta.slug,
    title: meta.title,
    excerpt: meta.description,
    content: markdownContent,
    featuredImage: meta.featuredImage,
    author: meta.author || "",
    date: meta.date,
    readTime: meta.readTime || "",
    tags: meta.tags || [],
    featured: meta.featured || false,
  };
}
