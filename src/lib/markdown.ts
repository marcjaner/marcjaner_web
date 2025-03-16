
import { BlogPost, Project } from '@/types/collections';

// Simple function to parse markdown content with front matter
export function parseMarkdown(content: string) {
  try {
    // Parse the markdown content
    const parts = content.split('---');
    
    // Ensure valid format with frontmatter
    if (parts.length < 3) {
      console.error("Invalid markdown format: missing frontmatter");
      throw new Error('Invalid markdown format: missing frontmatter');
    }
    
    // Front matter is between the first two '---' markers
    const frontMatterText = parts[1];
    // Content is everything after the second '---'
    const markdownContent = parts.slice(2).join('---');
    
    // Parse front matter
    const frontMatter: Record<string, any> = {};
    const lines = frontMatterText.trim().split('\n');
    
    for (const line of lines) {
      // Skip empty lines
      if (!line.trim()) continue;
      
      // Handle array values like tags: [item1, item2]
      if (line.includes('[') && line.includes(']')) {
        const keyValMatch = line.match(/([^:]+):\s*\[(.*)\]/);
        if (keyValMatch && keyValMatch.length >= 3) {
          const key = keyValMatch[1].trim();
          const valueStr = keyValMatch[2].trim();
          
          // Handle empty arrays
          if (!valueStr) {
            frontMatter[key] = [];
          } else {
            frontMatter[key] = valueStr
              .split(',')
              .map(item => item.trim().replace(/^["']|["']$/g, ''));
          }
        }
      } else {
        // Handle regular key-value pairs
        const keyVal = line.split(':');
        if (keyVal.length >= 2) {
          const key = keyVal[0].trim();
          // Join back any colons in the value (e.g., for URLs)
          const value = keyVal.slice(1).join(':').trim();
          
          // Process value based on its type
          if (value.toLowerCase() === 'true') {
            frontMatter[key] = true;
          } else if (value.toLowerCase() === 'false') {
            frontMatter[key] = false;
          } else if (!isNaN(Number(value)) && value.trim() !== '') {
            frontMatter[key] = Number(value);
          } else if (value === 'undefined' || value === '') {
            frontMatter[key] = undefined;
          } else if (value.startsWith('"') && value.endsWith('"')) {
            frontMatter[key] = value.slice(1, -1);
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
    
    // Ensure all required fields have valid values
    return {
      id: frontMatter.id || '',
      slug: frontMatter.slug || frontMatter.id || '',
      title: frontMatter.title || '',
      description: frontMatter.description || '',
      content: markdownContent,
      featuredImage: frontMatter.featuredImage || '/placeholder.svg',
      technologies: Array.isArray(frontMatter.technologies) ? frontMatter.technologies : [],
      githubUrl: frontMatter.githubUrl || undefined,
      liveUrl: frontMatter.liveUrl || undefined,
      featured: Boolean(frontMatter.featured),
      date: frontMatter.date || '',
    };
  } catch (error) {
    console.error("Error parsing project markdown:", error);
    throw new Error(`Failed to parse project: ${error instanceof Error ? error.message : String(error)}`);
  }
}

// Function to parse blog post markdown files
export function parseBlogMarkdown(content: string): BlogPost {
  try {
    const { frontMatter, content: markdownContent } = parseMarkdown(content);
    
    console.log("Blog frontMatter:", frontMatter);
    
    return {
      id: frontMatter.id || '',
      slug: frontMatter.slug || frontMatter.id || '',
      title: frontMatter.title || '',
      excerpt: frontMatter.excerpt || '',
      content: markdownContent,
      featuredImage: frontMatter.featuredImage || '/placeholder.svg',
      author: frontMatter.author || '',
      date: frontMatter.date || '',
      readTime: frontMatter.readTime || '',
      tags: Array.isArray(frontMatter.tags) ? frontMatter.tags : [],
      featured: Boolean(frontMatter.featured),
    };
  } catch (error) {
    console.error("Error parsing blog markdown:", error);
    throw new Error(`Failed to parse blog post: ${error instanceof Error ? error.message : String(error)}`);
  }
}
