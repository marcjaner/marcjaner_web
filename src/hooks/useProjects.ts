import { useQuery } from "@tanstack/react-query";
import type { Project } from "@/types/collections";

interface ProjectResponse {
  id: string;
  slug: string;
  title: string;
  description: string;
  featuredImage: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  featured: boolean;
  date: string;
  content?: string;
}

const NETLIFY_DEV_URL = "http://localhost:8888";
const getBaseUrl = () => (import.meta.env.DEV ? NETLIFY_DEV_URL : "");

export function useProjects() {
  return useQuery<Project[]>({
    queryKey: ["projects"],
    queryFn: async () => {
      try {
        const baseUrl = getBaseUrl();
        console.log(
          "Fetching projects from:",
          `${baseUrl}/.netlify/functions/projects`
        );

        const response = await fetch(`${baseUrl}/.netlify/functions/projects`);

        if (!response.ok) {
          throw new Error(`Failed to fetch projects: ${response.statusText}`);
        }

        const projects: ProjectResponse[] = await response.json();
        console.log("Received projects:", projects);

        // Create a new array with spread operator to ensure it's a proper array
        return [...projects].map((project) => ({
          id: project.id,
          slug: project.slug,
          title: project.title,
          description: project.description,
          featuredImage: project.featuredImage,
          technologies: project.technologies,
          githubUrl: project.githubUrl,
          liveUrl: project.liveUrl,
          featured: project.featured,
          date: project.date,
          content: project.content || "", // Ensure content is always provided
        }));
      } catch (error) {
        console.error("Error fetching projects:", error);
        throw error;
      }
    },
    // Use more reasonable stale time since projects don't change often
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    refetchOnMount: true,
    refetchOnWindowFocus: false, // Don't refetch on window focus to avoid unnecessary requests
  });
}

export function useProject(slug: string | undefined) {
  return useQuery<Project | null>({
    queryKey: ["project", slug],
    queryFn: async () => {
      if (!slug) return null;

      try {
        const baseUrl = getBaseUrl();
        console.log(
          "Fetching project from:",
          `${baseUrl}/.netlify/functions/projects?slug=${slug}`
        );

        const response = await fetch(
          `${baseUrl}/.netlify/functions/projects?slug=${slug}`
        );

        if (!response.ok) {
          throw new Error(`Failed to fetch project: ${response.statusText}`);
        }

        const project: ProjectResponse = await response.json();
        console.log("Received project:", project);

        // Ensure the returned project matches the Project interface
        return {
          id: project.id,
          slug: project.slug,
          title: project.title,
          description: project.description,
          featuredImage: project.featuredImage,
          technologies: project.technologies,
          githubUrl: project.githubUrl,
          liveUrl: project.liveUrl,
          featured: project.featured,
          date: project.date,
          content: project.content || "", // Ensure content is always provided
        };
      } catch (error) {
        console.error("Error fetching project:", error);
        throw error;
      }
    },
    enabled: !!slug,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    refetchOnMount: true,
    refetchOnWindowFocus: false,
  });
}
