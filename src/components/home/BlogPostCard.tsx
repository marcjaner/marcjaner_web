
import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface BlogPostCardProps {
  id: number;
  className?: string;
}

const BlogPostCard = ({ id, className }: BlogPostCardProps) => {
  return (
    <div 
      className={cn(
        "bg-card border border-border rounded-xl overflow-hidden reveal transition-all duration-300 hover:shadow-md hover:-translate-y-0.5",
        `stagger-${id}`,
        className
      )}
    >
      <div className="p-6">
        <div className="mb-4 flex justify-between items-center">
          <span className="text-xs font-medium bg-secondary px-2 py-1 rounded">
            Data Engineering
          </span>
          <span className="text-xs text-muted-foreground">
            May {id + 10}, 2023
          </span>
        </div>
        <h3 className="text-xl font-bold mb-2">Blog Post Title {id}</h3>
        <p className="text-muted-foreground text-sm mb-4">
          A short excerpt from the blog post that gives readers a preview 
          of what they can expect from the full article.
        </p>
        <Link 
          to={`/blog/post-${id}`} 
          className="text-primary hover:underline text-sm font-medium"
        >
          Read More
        </Link>
      </div>
    </div>
  );
};

export default BlogPostCard;
