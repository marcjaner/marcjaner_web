
import { useQuery } from '@tanstack/react-query';
import { BlogPost } from '@/types/collections';
import { parseBlogMarkdown } from '@/lib/markdown';

// Import blog content files
import airflowEtlContent from '@/content/blog/airflow-etl-pipelines.md?raw';

// Fallback data in case API fails
const blogFiles = [
  airflowEtlContent
];

export function useBlogPosts() {
  return useQuery({
    queryKey: ['blogPosts'],
    queryFn: async (): Promise<BlogPost[]> => {
      try {
        // Try to fetch from API
        const response = await fetch('/.netlify/functions/blog');
        
        if (response.ok) {
          return await response.json();
        }
        
        // Fallback to local files if API fails
        console.log('API request failed, using local files');
        return blogFiles
          .map(content => parseBlogMarkdown(content))
          .map(post => {
            // Remove content for list view
            const { content, ...rest } = post;
            return rest;
          });
      } catch (error) {
        console.error('Error fetching blog posts:', error);
        
        // Fallback to local files
        return blogFiles
          .map(content => parseBlogMarkdown(content))
          .map(post => {
            // Remove content for list view
            const { content, ...rest } = post;
            return rest;
          });
      }
    }
  });
}

export function useBlogPost(slug: string | undefined) {
  return useQuery({
    queryKey: ['blogPost', slug],
    queryFn: async (): Promise<BlogPost | null> => {
      if (!slug) return null;
      
      try {
        // Try to fetch from API
        const response = await fetch(`/.netlify/functions/blog?slug=${slug}`);
        
        if (response.ok) {
          return await response.json();
        }
        
        // Fallback to local files if API fails
        console.log('API request failed, using local files');
        const allFiles = {
          'airflow-etl-pipelines': airflowEtlContent,
        };
        
        const content = allFiles[slug as keyof typeof allFiles];
        if (!content) return null;
        
        return parseBlogMarkdown(content);
      } catch (error) {
        console.error('Error fetching blog post:', error);
        
        // Fallback to local files
        const allFiles = {
          'airflow-etl-pipelines': airflowEtlContent,
        };
        
        const content = allFiles[slug as keyof typeof allFiles];
        if (!content) return null;
        
        return parseBlogMarkdown(content);
      }
    },
    enabled: !!slug
  });
}
