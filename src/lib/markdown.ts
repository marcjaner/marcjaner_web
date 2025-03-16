
import { BlogPost, Project } from '@/types/collections';
import matter from 'gray-matter';

// Function to parse markdown content with front matter
export function parseMarkdown(content: string) {
  try {
    // Use string-based approach to avoid Buffer issues in browser
    const { data, content: markdownContent } = matter(content);
    return {
      frontMatter: data,
      content: markdownContent,
    };
  } catch (error) {
    console.error("Error parsing markdown:", error);
    throw error;
  }
}

// Function to parse project markdown files
export function parseProjectMarkdown(content: string): Project {
  const { frontMatter, content: markdownContent } = parseMarkdown(content);
  
  // Ensure slug is defined, fallback to id if not provided
  const slug = frontMatter.slug || frontMatter.id as string;
  
  return {
    id: frontMatter.id as string,
    slug: slug,
    title: frontMatter.title as string,
    description: frontMatter.description as string,
    content: markdownContent,
    featuredImage: frontMatter.featuredImage as string,
    technologies: frontMatter.technologies as string[],
    githubUrl: frontMatter.githubUrl as string | undefined,
    liveUrl: frontMatter.liveUrl as string | undefined,
    featured: frontMatter.featured as boolean,
    date: frontMatter.date as string,
  };
}

// Function to parse blog post markdown files
export function parseBlogMarkdown(content: string): BlogPost {
  const { frontMatter, content: markdownContent } = parseMarkdown(content);
  
  // Ensure slug is defined, fallback to id if not provided
  const slug = frontMatter.slug || frontMatter.id as string;
  
  return {
    id: frontMatter.id as string,
    slug: slug,
    title: frontMatter.title as string,
    excerpt: frontMatter.excerpt as string,
    content: markdownContent,
    featuredImage: frontMatter.featuredImage as string,
    author: frontMatter.author as string,
    date: frontMatter.date as string,
    readTime: frontMatter.readTime as string,
    tags: frontMatter.tags as string[],
    featured: frontMatter.featured || false,
  };
}
