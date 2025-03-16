
import { BlogPost, Project } from '@/types/collections';

// Function to parse markdown content with front matter
export function parseMarkdown(content: string) {
  try {
    // Parse the markdown content
    const parts = content.split('---');
    
    // Ensure valid format with frontmatter
    if (parts.length < 3) {
      throw new Error('Invalid markdown format: missing frontmatter');
    }
    
    // Front matter is between the first two '---' markers
    const frontMatterText = parts[1];
    // Content is everything after the second '---'
    const markdownContent = parts.slice(2).join('---');
    
    // Parse front matter by splitting key-value pairs
    const frontMatter: Record<string, any> = {};
    const lines = frontMatterText.trim().split('\n');
    
    for (const line of lines) {
      // Skip empty lines
      if (!line.trim()) continue;
      
      // Handle array values like "tags: [a, b, c]"
      if (line.includes('[') && line.includes(']')) {
        const keyVal = line.split(':');
        if (keyVal.length >= 2) {
          const key = keyVal[0].trim();
          const value = line.substring(line.indexOf('[') + 1, line.lastIndexOf(']'));
          frontMatter[key] = value.split(',').map(item => item.trim().replace(/^["']|["']$/g, ''));
        }
      } else {
        // Handle regular key-value pairs
        const keyVal = line.split(':');
        if (keyVal.length >= 2) {
          const key = keyVal[0].trim();
          const value = keyVal.slice(1).join(':').trim();
          
          // Convert values to appropriate types
          if (value === 'true') {
            frontMatter[key] = true;
          } else if (value === 'false') {
            frontMatter[key] = false;
          } else if (!isNaN(Number(value))) {
            frontMatter[key] = Number(value);
          } else {
            frontMatter[key] = value;
          }
        }
      }
    }
    
    return {
      frontMatter,
      content: markdownContent.trim()
    };
  } catch (error) {
    console.error("Error parsing markdown:", error);
    throw error;
  }
}

// Function to parse project markdown files
export function parseProjectMarkdown(content: string): Project {
  try {
    const { frontMatter, content: markdownContent } = parseMarkdown(content);
    console.log("Project frontMatter:", frontMatter);
    
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
      featured: Boolean(frontMatter.featured),
      date: frontMatter.date as string,
    };
  } catch (error) {
    console.error("Error parsing project markdown:", error);
    throw error;
  }
}

// Function to parse blog post markdown files
export function parseBlogMarkdown(content: string): BlogPost {
  try {
    const { frontMatter, content: markdownContent } = parseMarkdown(content);
    console.log("Blog frontMatter:", frontMatter);
    
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
      featured: Boolean(frontMatter.featured),
    };
  } catch (error) {
    console.error("Error parsing blog markdown:", error);
    throw error;
  }
}
