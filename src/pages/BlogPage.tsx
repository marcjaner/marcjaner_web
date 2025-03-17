
import React from 'react';
import { useBlogPosts } from '@/hooks/useBlogPosts';
import { Card } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { Calendar, Clock, Tag } from 'lucide-react';
import BlogPostCard from '@/components/home/BlogPostCard';

const BlogPage = () => {
  const { data: posts, isLoading, error } = useBlogPosts();

  // For blog page, we use a different layout with larger cards
  const renderBlogPostDetail = (post: any, index: number) => (
    <div 
      key={post.id} 
      className={`flex flex-col md:flex-row gap-8 reveal ${index < 3 ? `stagger-${index + 3}` : ''}`}
    >
      <div className="md:w-1/3">
        <div className="aspect-[4/3] rounded-xl overflow-hidden bg-muted">
          <Link to={`/blog/${post.slug}`}>
            <img 
              src={post.featuredImage} 
              alt={post.title}
              className="w-full h-full object-cover"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = '/placeholder.svg';
              }}
            />
          </Link>
        </div>
      </div>
      <div className="md:w-2/3">
        <div className="flex flex-wrap gap-2 mb-3">
          {post.tags && post.tags.map((tag: string, i: number) => (
            <span 
              key={i} 
              className="inline-flex items-center gap-1 text-xs font-medium bg-secondary px-2 py-1 rounded"
            >
              <Tag size={12} /> {tag}
            </span>
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
        <p className="text-muted-foreground mb-4">
          {post.excerpt}
        </p>
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Calendar size={14} /> {post.date}
          </div>
          <div className="flex items-center gap-1">
            <Clock size={14} /> {post.readTime}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <section className="py-20">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto mb-16 text-center reveal">
          <h1 className="text-4xl font-bold mb-6">Blog</h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Thoughts, tutorials, and insights on data engineering, software development,
            and technology.
          </p>
          <div className="h-1 w-20 bg-primary mx-auto mt-4"></div>
        </div>
        
        {isLoading ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Loading blog posts...</p>
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Error loading blog posts. Please try again later.</p>
          </div>
        ) : !posts || posts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No blog posts found.</p>
          </div>
        ) : (
          <div className="max-w-4xl mx-auto">
            <div className="space-y-12">
              {posts.map((post, index) => renderBlogPostDetail(post, index))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default BlogPage;
