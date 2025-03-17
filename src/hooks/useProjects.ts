import { useQuery } from "@tanstack/react-query";
import { Project } from "@/types/collections";
import { parseProjectMarkdown } from "@/lib/markdown";

// Parse all local project files
const getLocalProjects = (): Project[] => {
  return projectFiles.map((content) => parseProjectMarkdown(content));
};

export function useProjects() {
  return useQuery({
    queryKey: ["projects"],
    queryFn: async (): Promise<Project[]> => {
      // Skip API call and use local files directly
      console.log("Using local project files directly");
      return getLocalProjects();
    },
  });
}

export function useProject(slug: string | undefined) {
  return useQuery({
    queryKey: ["project", slug],
    queryFn: async (): Promise<Project | null> => {
      if (!slug) return null;

      try {
        // Use local files directly
        const allFiles = {};

        // Check if we have this slug in our local files
        if (slug in allFiles || slug === "1") {
          const fileSlug = slug === "1" ? "data-visualization-dashboard" : slug;
          const content = allFiles[fileSlug as keyof typeof allFiles];
          if (content) {
            console.log(`Loading project from local file: ${fileSlug}`);
            return parseProjectMarkdown(content);
          }
        }

        // If we got here and still don't have data, return null
        return null;
      } catch (error) {
        console.error("Error fetching project:", error);
        return null;
      }
    },
    enabled: !!slug,
  });
}
