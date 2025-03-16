
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, Clock, Tag } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { useBlogPost } from '@/hooks/useBlogPosts';

const BlogDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const { data: post, isLoading, error } = useBlogPost(slug);

  if (isLoading) {
    return (
      <div className="container mx-auto px-6 py-20">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-muted-foreground">Loading blog post...</p>
        </div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="container mx-auto px-6 py-20">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-3xl font-bold mb-4">Post Not Found</h1>
          <p className="text-muted-foreground mb-6">
            The blog post you're looking for doesn't exist or has been moved.
          </p>
          <Link to="/blog" className="text-primary hover:underline">
            Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <section className="py-20">
      <div className="container mx-auto px-6">
        <article className="max-w-3xl mx-auto">
          <Link 
            to="/blog" 
            className="inline-flex items-center text-sm text-primary hover:underline mb-8"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Blog
          </Link>
          
          <header className="mb-10">
            <div className="flex flex-wrap gap-2 mb-4">
              {post.tags && post.tags.map((tag, i) => (
                <span 
                  key={i} 
                  className="inline-flex items-center gap-1 text-xs font-medium bg-secondary px-2 py-1 rounded"
                >
                  <Tag size={12} /> {tag}
                </span>
              ))}
            </div>
            <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
            <p className="text-xl text-muted-foreground mb-6">{post.excerpt}</p>
            <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6">
              <div className="flex items-center gap-1">
                <Calendar size={14} /> {post.date}
              </div>
              <div className="flex items-center gap-1">
                <Clock size={14} /> {post.readTime}
              </div>
            </div>
            <div className="aspect-video rounded-xl overflow-hidden bg-muted mb-8">
              <img 
                src={post.featuredImage} 
                alt={post.title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = '/placeholder.svg';
                }}
              />
            </div>
          </header>
          
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <ReactMarkdown>{post.content}</ReactMarkdown>
          </div>
        </article>
      </div>
    </section>
  );
};

export default BlogDetail;
