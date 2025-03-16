
import { useQuery } from '@tanstack/react-query';
import { Project } from '@/types/collections';
import { parseProjectMarkdown } from '@/lib/markdown';

// Import project content files
import dataVizProjectContent from '@/content/projects/data-visualization-dashboard.md?raw';
import etlPipelineContent from '@/content/projects/etl-pipeline-framework.md?raw';
import automatedMlContent from '@/content/projects/automated-ml-pipeline.md?raw';

// Fallback data in case API fails
const projectFiles = [
  dataVizProjectContent,
  etlPipelineContent,
  automatedMlContent
];

// Parse all local project files
const getLocalProjects = (): Project[] => {
  return projectFiles.map(content => parseProjectMarkdown(content));
};

export function useProjects() {
  return useQuery({
    queryKey: ['projects'],
    queryFn: async (): Promise<Project[]> => {
      try {
        // Try to fetch from API
        const response = await fetch('/.netlify/functions/projects');
        
        if (response.ok && response.headers.get('content-type')?.includes('application/json')) {
          const data = await response.json();
          if (Array.isArray(data)) {
            return data;
          }
          // If data is not an array, fall back to local files
          console.log('API returned non-array data, using local files');
        }
        
        // Fallback to local files
        console.log('Using local project files');
        return getLocalProjects();
      } catch (error) {
        console.error('Error fetching projects:', error);
        
        // Fallback to local files
        console.log('Error caught, using local project files');
        return getLocalProjects();
      }
    }
  });
}

export function useProject(slug: string | undefined) {
  return useQuery({
    queryKey: ['project', slug],
    queryFn: async (): Promise<Project | null> => {
      if (!slug) return null;
      
      try {
        // First try local files for immediate response
        const allFiles = {
          'data-visualization-dashboard': dataVizProjectContent,
          'etl-pipeline-framework': etlPipelineContent,
          'automated-ml-pipeline': automatedMlContent,
        };
        
        // First check if we have this slug in our local files
        if (slug in allFiles || slug === '1') {
          const fileSlug = slug === '1' ? 'data-visualization-dashboard' : slug;
          const content = allFiles[fileSlug as keyof typeof allFiles];
          if (content) {
            console.log(`Loading project from local file: ${fileSlug}`);
            return parseProjectMarkdown(content);
          }
        }
        
        // Try to fetch from API as fallback
        try {
          const response = await fetch(`/.netlify/functions/projects?slug=${slug}`);
          
          if (response.ok && response.headers.get('content-type')?.includes('application/json')) {
            return await response.json();
          }
        } catch (apiError) {
          console.log('API fetch failed, already using local files');
        }
        
        // If we got here and still don't have data, return null
        return null;
      } catch (error) {
        console.error('Error fetching project:', error);
        return null;
      }
    },
    enabled: !!slug
  });
}
