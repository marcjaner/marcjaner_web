import { useQuery } from "@tanstack/react-query";
import type { MarkdownMeta } from "@/lib/markdown";

interface BlogPostResponse {
  title: string;
  date: string;
  description: string;
  slug: string;
  featuredImage: string;
  author: string;
  readTime: string;
  tags: string[];
  content?: string;
}

const NETLIFY_DEV_URL = "http://localhost:8888";
const getBaseUrl = () => (import.meta.env.DEV ? NETLIFY_DEV_URL : "");

export function useBlogPosts() {
  return useQuery<MarkdownMeta[]>({
    queryKey: ["blogPosts"],
    queryFn: async () => {
      try {
        const baseUrl = getBaseUrl();
        console.log(
          "Fetching blog posts from:",
          `${baseUrl}/.netlify/functions/blog`
        );

        const response = await fetch(`${baseUrl}/.netlify/functions/blog`);

        if (!response.ok) {
          throw new Error(`Failed to fetch blog posts: ${response.statusText}`);
        }

        const posts: BlogPostResponse[] = await response.json();
        console.log("Received posts:", posts);

        // Create a new array with spread operator to ensure it's a proper array
        return [...posts].map((post) => ({
          title: post.title,
          date: post.date,
          description: post.description,
          slug: post.slug,
          featuredImage: post.featuredImage,
          author: post.author,
          readTime: post.readTime,
          tags: post.tags,
        }));
      } catch (error) {
        console.error("Error fetching blog posts:", error);
        throw error;
      }
    },
    // Use more reasonable stale time since blog posts don't change often
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    refetchOnMount: true,
    refetchOnWindowFocus: false, // Don't refetch on window focus to avoid unnecessary requests
  });
}

export function useBlogPost(slug: string | undefined) {
  return useQuery<BlogPostResponse | null>({
    queryKey: ["blogPost", slug],
    queryFn: async () => {
      if (!slug) return null;

      try {
        const baseUrl = getBaseUrl();
        console.log(
          "Fetching blog post from:",
          `${baseUrl}/.netlify/functions/blog?slug=${slug}`
        );

        const response = await fetch(
          `${baseUrl}/.netlify/functions/blog?slug=${slug}`
        );

        if (!response.ok) {
          throw new Error(`Failed to fetch blog post: ${response.statusText}`);
        }

        const post = await response.json();
        console.log("Received post:", post);
        return post;
      } catch (error) {
        console.error("Error fetching blog post:", error);
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
