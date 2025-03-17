
import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Calendar, Clock } from 'lucide-react';

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

const BlogPostCard = ({ post, className, index = 0 }: BlogPostCardProps) => {
  return (
    <div 
      className={cn(
        "bg-card border border-border rounded-xl overflow-hidden reveal transition-all duration-300 hover:shadow-md hover:-translate-y-0.5",
        index > 0 ? `stagger-${index}` : '',
        className
      )}
    >
      <div className="p-6">
        <div className="mb-4 flex justify-between items-center">
          {post.tags && post.tags.length > 0 && (
            <span className="text-xs font-medium bg-secondary px-2 py-1 rounded">
              {post.tags[0]}
            </span>
          )}
          <span className="text-xs text-muted-foreground">
            {post.date}
          </span>
        </div>
        <h3 className="text-xl font-bold mb-2">{post.title}</h3>
        <p className="text-muted-foreground text-sm mb-4">
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
