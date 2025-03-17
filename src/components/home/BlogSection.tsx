import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import BlogPostCard from "./BlogPostCard";
import { useBlogPosts } from "@/hooks/useBlogPosts";

const BlogSection = () => {
  const { data: posts, isLoading } = useBlogPosts();
  const [isHeaderVisible, setIsHeaderVisible] = useState(false);
  const [isButtonVisible, setIsButtonVisible] = useState(false);

  // Ensure animations work on both initial load and page reload
  useEffect(() => {
    // Small delay to ensure DOM is ready
    const headerTimer = setTimeout(() => {
      setIsHeaderVisible(true);
    }, 100);

    const buttonTimer = setTimeout(() => {
      setIsButtonVisible(true);
    }, 800);

    return () => {
      clearTimeout(headerTimer);
      clearTimeout(buttonTimer);
    };
  }, []);

  // Get the 2 most recent posts, ensuring we have a valid array
  const featuredPosts =
    posts && posts.length > 0
      ? posts.slice(0, 2).map((post) => ({
          id: post.slug,
          slug: post.slug,
          title: post.title,
          excerpt: post.description,
          featuredImage: post.featuredImage || "/placeholder.svg",
          date: new Date(post.date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          }),
          tags: post.tags || [],
        }))
      : [];

  return (
    <section className="py-20 bg-secondary/30 dark:bg-secondary/10">
      <div className="container mx-auto px-6">
        <div
          className={`max-w-4xl mx-auto mb-12 text-center transition-all duration-700 ${
            isHeaderVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-10"
          }`}
        >
          <h2 className="text-3xl font-bold mb-4">Latest Blog Posts</h2>
          <p className="text-muted-foreground">
            Thoughts, tutorials, and insights
          </p>
          <div className="h-1 w-20 bg-primary mx-auto mt-4"></div>
        </div>

        {isLoading ? (
          <div className="text-center mb-8">
            <p className="text-muted-foreground">Loading posts...</p>
          </div>
        ) : !featuredPosts || featuredPosts.length === 0 ? (
          <div className="text-center mb-8">
            <p className="text-muted-foreground">No blog posts found.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {featuredPosts.map((post, idx) => (
              <BlogPostCard key={post.id} post={post} index={idx + 1} />
            ))}
          </div>
        )}

        <div
          className={`text-center mt-12 transition-all duration-700 ${
            isButtonVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-10"
          }`}
        >
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 bg-secondary px-6 py-3 rounded-md hover:bg-secondary/80 transition-colors"
          >
            Read All Posts <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
