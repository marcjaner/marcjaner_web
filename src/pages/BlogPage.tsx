import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Calendar, Clock, Tag } from "lucide-react";
import { useBlogPosts } from "@/hooks/useBlogPosts";
import type { MarkdownMeta } from "@/lib/markdown";
import MetaTags from "@/components/MetaTags";

const getImageUrl = (path: string) => {
  // If the path is already a full URL, return it as is
  if (path.startsWith("http")) {
    return path;
  }
  // In development, use the Netlify Dev server URL
  if (import.meta.env.DEV) {
    return `http://localhost:8888${path}`;
  }
  // In production, use relative path (it will be relative to the deployed domain)
  return path;
};

const BlogPage = () => {
  const { data: posts, isLoading: loading, error, refetch } = useBlogPosts();
  const [isHeaderVisible, setIsHeaderVisible] = useState(false);
  const [postsVisibility, setPostsVisibility] = useState<boolean[]>([]);

  // Ensure animations work on both initial load and page reload
  useEffect(() => {
    // Small delay to ensure DOM is ready
    const headerTimer = setTimeout(() => {
      setIsHeaderVisible(true);
    }, 100);

    return () => clearTimeout(headerTimer);
  }, []);

  // Set up post visibility when posts data changes
  useEffect(() => {
    if (posts && posts.length > 0) {
      // Initialize all posts as invisible
      const initialVisibility = Array(posts.length).fill(false);
      setPostsVisibility(initialVisibility);

      // Stagger the appearance of each post
      posts.forEach((_, index) => {
        setTimeout(() => {
          setPostsVisibility((prev) => {
            const newVisibility = [...prev];
            newVisibility[index] = true;
            return newVisibility;
          });
        }, 300 + index * 150);
      });
    }
  }, [posts]);

  const renderBlogPostDetail = (post: MarkdownMeta, index: number) => (
    <div
      key={post.slug}
      className={`flex flex-col md:flex-row gap-8 transition-all duration-700 ${
        postsVisibility[index]
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-10"
      }`}
    >
      <div className="md:w-1/3">
        <div className="aspect-[4/3] rounded-xl overflow-hidden bg-muted">
          <Link to={`/blog/${post.slug}`}>
            <img
              src={
                post.featuredImage
                  ? getImageUrl(post.featuredImage)
                  : "/placeholder.svg"
              }
              alt={post.title}
              className="w-full h-full object-cover"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = "/placeholder.svg";
              }}
            />
          </Link>
        </div>
      </div>
      <div className="md:w-2/3">
        <div className="flex flex-wrap gap-2 mb-3">
          {post.tags?.map((tag: string, i: number) => (
            <Link
              key={i}
              to={`/blog/tags/${tag.toLowerCase()}`}
              className="inline-flex items-center gap-1 text-xs font-medium bg-secondary px-2 py-1 rounded hover:bg-secondary/80 hover:text-primary transition-colors"
            >
              <Tag size={12} /> {tag}
            </Link>
          ))}
        </div>
        <h2 className="text-2xl font-bold mb-3">
          <Link
            to={`/blog/${post.slug}`}
            className="hover:text-primary transition-colors"
          >
            {post.title}
          </Link>
        </h2>
        <p className="text-muted-foreground mb-4">{post.description}</p>
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Calendar size={14} />{" "}
            {new Date(post.date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </div>
          {post.readTime && (
            <div className="flex items-center gap-1">
              <Clock size={14} /> {post.readTime}
            </div>
          )}
        </div>
      </div>
    </div>
  );

  // Always show the header section, even during loading
  const headerSection = (
    <div
      className={`max-w-4xl mx-auto mb-16 text-center transition-all duration-700 ${
        isHeaderVisible
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-10"
      }`}
    >
      <h1 className="text-4xl font-bold mb-6">Blog</h1>
      <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
        Thoughts, tutorials, and insights on data engineering, software
        development, and technology.
      </p>
      <div className="h-1 w-20 bg-primary mx-auto mt-4"></div>
    </div>
  );

  if (loading) {
    return (
      <>
        <MetaTags
          title="Blog | Marc Janer"
          description="Thoughts, tutorials, and insights on data engineering, software development, and technology."
          image="/images/home/marc_janer.jpg"
        />
        <section className="py-20">
          <div className="container mx-auto px-6">
            {headerSection}
            <div className="text-center">
              <p className="text-muted-foreground">Loading posts...</p>
            </div>
          </div>
        </section>
      </>
    );
  }

  if (error) {
    return (
      <>
        <MetaTags
          title="Blog | Marc Janer"
          description="Thoughts, tutorials, and insights on data engineering, software development, and technology."
          image="/images/home/marc_janer.jpg"
        />
        <section className="py-20">
          <div className="container mx-auto px-6">
            {headerSection}
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-4">Error Loading Posts</h2>
              <p className="text-muted-foreground mb-4">
                {error instanceof Error
                  ? error.message
                  : "Failed to fetch posts"}
              </p>
              <button
                onClick={() => refetch()}
                className="text-primary hover:underline"
              >
                Try Again
              </button>
            </div>
          </div>
        </section>
      </>
    );
  }

  // Ensure posts is a valid array
  const validPosts = posts && posts.length > 0 ? [...posts] : [];

  return (
    <>
      <MetaTags
        title="Blog | Marc Janer"
        description="Thoughts, tutorials, and insights on data engineering, software development, and technology."
        image="/images/home/marc_janer.jpg"
      />
      <section className="py-20">
        <div className="container mx-auto px-6">
          {headerSection}

          {validPosts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No blog posts found.</p>
              <button
                onClick={() => refetch()}
                className="text-primary hover:underline mt-4"
              >
                Refresh
              </button>
            </div>
          ) : (
            <div className="max-w-4xl mx-auto">
              <div className="space-y-12">
                {validPosts.map((post, index) =>
                  renderBlogPostDetail(post, index)
                )}
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default BlogPage;
