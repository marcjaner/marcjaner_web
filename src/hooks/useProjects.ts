
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

export function useProjects() {
  return useQuery({
    queryKey: ['projects'],
    queryFn: async (): Promise<Project[]> => {
      try {
        // Try to fetch from API
        const response = await fetch('/.netlify/functions/projects');
        
        if (response.ok) {
          return await response.json();
        }
        
        // Fallback to local files if API fails
        console.log('API request failed, using local files');
        return projectFiles
          .map(content => parseProjectMarkdown(content))
          .map(project => {
            // Remove content for list view
            const { content, ...rest } = project;
            return rest;
          });
      } catch (error) {
        console.error('Error fetching projects:', error);
        
        // Fallback to local files
        return projectFiles
          .map(content => parseProjectMarkdown(content))
          .map(project => {
            // Remove content for list view
            const { content, ...rest } = project;
            return rest;
          });
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
        // Try to fetch from API
        const response = await fetch(`/.netlify/functions/projects?slug=${slug}`);
        
        if (response.ok) {
          return await response.json();
        }
        
        // Fallback to local files if API fails
        console.log('API request failed, using local files');
        const allFiles = {
          'data-visualization-dashboard': dataVizProjectContent,
          'etl-pipeline-framework': etlPipelineContent,
          'automated-ml-pipeline': automatedMlContent,
        };
        
        const content = allFiles[slug as keyof typeof allFiles];
        if (!content) return null;
        
        return parseProjectMarkdown(content);
      } catch (error) {
        console.error('Error fetching project:', error);
        
        // Fallback to local files
        const allFiles = {
          'data-visualization-dashboard': dataVizProjectContent,
          'etl-pipeline-framework': etlPipelineContent,
          'automated-ml-pipeline': automatedMlContent,
        };
        
        const content = allFiles[slug as keyof typeof allFiles];
        if (!content) return null;
        
        return parseProjectMarkdown(content);
      }
    },
    enabled: !!slug
  });
}
