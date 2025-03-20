import { useQuery } from "@tanstack/react-query";
import { useBlogPosts } from "./useBlogPosts";

export function useBlogTags() {
  const { data: posts } = useBlogPosts();

  return useQuery({
    queryKey: ["blogTags"],
    queryFn: () => {
      if (!posts) return [];

      // Get unique tags from all posts
      const tags = new Set<string>();
      posts.forEach((post) => {
        post.tags?.forEach((tag) => tags.add(tag));
      });

      return Array.from(tags).sort();
    },
    enabled: !!posts,
  });
}

export function usePostsByTag(tag: string | undefined) {
  const { data: posts } = useBlogPosts();

  return useQuery({
    queryKey: ["blogPosts", "tag", tag],
    queryFn: () => {
      if (!posts || !tag) return [];

      return posts.filter((post) =>
        post.tags?.some((t) => t.toLowerCase() === tag.toLowerCase())
      );
    },
    enabled: !!posts && !!tag,
  });
}
