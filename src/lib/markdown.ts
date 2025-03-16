
import { BlogPost, Project } from '@/types/collections';
import matter from 'gray-matter';

// Function to parse markdown content with front matter
export function parseMarkdown(content: string) {
  try {
    // Configure gray-matter to work in browser environments
    const options = {
      engines: {
        yaml: {
          parse: (input: string) => {
            // Simple YAML-like parser for front matter
            const result: Record<string, any> = {};
            const lines = input.trim().split('\n');
            
            for (const line of lines) {
              // Skip empty lines
              if (!line.trim()) continue;
              
              // Handle array values like "tags: [a, b, c]" or "tags: ['a', 'b', 'c']"
              if (line.includes('[') && line.includes(']')) {
                const [key, arrayStr] = line.split(':').map(s => s.trim());
                // Extract array content between brackets
                const arrayContent = arrayStr.substring(
                  arrayStr.indexOf('[') + 1, 
                  arrayStr.lastIndexOf(']')
                );
                
                // Split by comma and clean up quotes and spaces
                const arrayValues = arrayContent
                  .split(',')
                  .map(item => item.trim().replace(/^["']|["']$/g, ''));
                  
                result[key] = arrayValues;
              } else {
                // Handle regular key-value pairs
                const [key, value] = line.split(':').map(s => s.trim());
                
                // Convert values to appropriate types
                if (value === 'true') {
                  result[key] = true;
                } else if (value === 'false') {
                  result[key] = false;
                } else if (!isNaN(Number(value))) {
                  result[key] = Number(value);
                } else {
                  result[key] = value;
                }
              }
            }
            
            return result;
          },
          stringify: (obj: Record<string, any>) => {
            // Simple YAML stringifier
            return Object.entries(obj)
              .map(([key, value]) => {
                if (Array.isArray(value)) {
                  return `${key}: [${value.join(', ')}]`;
                }
                return `${key}: ${value}`;
              })
              .join('\n');
          }
        }
      }
    };

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
    
    // Parse front matter with our custom YAML parser
    const frontMatter = options.engines.yaml.parse(frontMatterText);
    
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
