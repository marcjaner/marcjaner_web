
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Calendar, Clock, Tag } from 'lucide-react';
import { BlogPost } from '@/types/collections';
import ReactMarkdown from 'react-markdown';

// Import blog markdown files
import airflowPost from '@/content/blog/airflow-etl-pipelines.md?raw';
import { parseBlogMarkdown } from '@/lib/markdown';

const BlogDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      console.log("Loading blog post with slug:", slug);
      
      // This would eventually pull from a collection or API, but for now we're using a hard-coded list
      const markdownContents = [airflowPost];
      const parsedPosts: BlogPost[] = [];
      
      for (const content of markdownContents) {
        try {
          const post = parseBlogMarkdown(content);
          console.log("Parsed blog post:", post);
          if (post && post.id) {
            parsedPosts.push(post);
          }
        } catch (err) {
          console.error("Error parsing individual blog post:", err);
        }
      }
      
      const foundPost = parsedPosts.find(p => p.slug === slug);
      
      if (foundPost) {
        console.log("Found matching post:", foundPost);
        setPost(foundPost);
        setError(null);
      } else {
        console.error("No post found with slug:", slug);
        setError("Blog post not found");
        // If post not found, redirect to blog listing after a short delay
        setTimeout(() => {
          navigate('/blog', { replace: true });
        }, 3000);
      }
    } catch (error) {
      console.error("Error loading blog post:", error);
      setError("Failed to load blog post");
    } finally {
      setLoading(false);
    }
  }, [slug, navigate]);

  if (loading) {
    return (
      <div className="container mx-auto px-6 py-20">
        <div className="max-w-3xl mx-auto">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-muted rounded w-3/4"></div>
            <div className="h-4 bg-muted rounded w-1/2"></div>
            <div className="h-64 bg-muted rounded"></div>
            <div className="space-y-2">
              <div className="h-4 bg-muted rounded"></div>
              <div className="h-4 bg-muted rounded"></div>
              <div className="h-4 bg-muted rounded w-5/6"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-6 py-20">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-3xl font-bold mb-4">Error Loading Post</h1>
          <p className="text-muted-foreground mb-6">
            {error}
          </p>
          <p className="text-sm">Redirecting to blog page...</p>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="container mx-auto px-6 py-20">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-3xl font-bold mb-4">Post Not Found</h1>
          <p className="text-muted-foreground mb-6">
            The blog post you're looking for doesn't exist or has been moved.
          </p>
        </div>
      </div>
    );
  }

  return (
    <section className="py-20">
      <div className="container mx-auto px-6">
        <article className="max-w-3xl mx-auto">
          <header className="mb-10">
            <div className="flex flex-wrap gap-2 mb-4">
              {post?.tags && post.tags.map((tag, i) => (
                <span 
                  key={i} 
                  className="inline-flex items-center gap-1 text-xs font-medium bg-secondary px-2 py-1 rounded"
                >
                  <Tag size={12} /> {tag}
                </span>
              ))}
            </div>
            <h1 className="text-4xl font-bold mb-4">{post?.title}</h1>
            <p className="text-xl text-muted-foreground mb-6">{post?.excerpt}</p>
            <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6">
              <div className="flex items-center gap-1">
                <Calendar size={14} /> {post?.date}
              </div>
              <div className="flex items-center gap-1">
                <Clock size={14} /> {post?.readTime}
              </div>
            </div>
            <div className="aspect-video rounded-xl overflow-hidden bg-muted mb-8">
              <img 
                src={post?.featuredImage} 
                alt={post?.title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = '/placeholder.svg';
                }}
              />
            </div>
          </header>
          
          <div className="prose prose-lg dark:prose-invert max-w-none">
            {post?.content && <ReactMarkdown>{post.content}</ReactMarkdown>}
          </div>
        </article>
      </div>
    </section>
  );
};

export default BlogDetail;
