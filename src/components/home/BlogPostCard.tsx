import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Calendar, Clock } from "lucide-react";

interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  featuredImage: string;
  date: string;
  tags?: string[];
}

interface BlogPostCardProps {
  post: BlogPost;
  className?: string;
  index?: number;
}

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

const BlogPostCard = ({ post, className, index = 0 }: BlogPostCardProps) => {
  const [isVisible, setIsVisible] = useState(false);

  // Ensure animations work on both initial load and page reload
  useEffect(() => {
    // Small delay to ensure DOM is ready
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100 + index * 150);

    return () => clearTimeout(timer);
  }, [index]);

  return (
    <div
      className={cn(
        "bg-card border border-border rounded-xl overflow-hidden transition-all duration-500 hover:shadow-md hover:-translate-y-0.5",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10",
        className
      )}
    >
      <Link to={`/blog/${post.slug}`} className="block">
        <div className="aspect-[4/3] w-full">
          <img
            src={getImageUrl(post.featuredImage)}
            alt={post.title}
            className="w-full h-full object-cover"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = "/placeholder.svg";
            }}
          />
        </div>
      </Link>
      <div className="p-6">
        <div className="mb-4 flex justify-between items-center">
          {post.tags && post.tags.length > 0 && (
            <span className="text-xs font-medium bg-secondary px-2 py-1 rounded">
              {post.tags[0]}
            </span>
          )}
          <span className="text-xs text-muted-foreground">{post.date}</span>
        </div>
        <h3 className="text-xl font-bold mb-2 line-clamp-2">{post.title}</h3>
        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
          {post.excerpt}
        </p>
        <Link
          to={`/blog/${post.slug}`}
          className="text-primary hover:underline text-sm font-medium"
        >
          Read More
        </Link>
      </div>
    </div>
  );
};

export default BlogPostCard;
