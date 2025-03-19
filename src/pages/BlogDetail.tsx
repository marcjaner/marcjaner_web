import React from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Calendar, Clock, Tag } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { useBlogPost } from "@/hooks/useBlogPosts";

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
              {post.tags &&
                post.tags.map((tag: string, i: number) => (
                  <span
                    key={i}
                    className="inline-flex items-center gap-1 text-xs font-medium bg-secondary px-2 py-1 rounded"
                  >
                    <Tag size={12} /> {tag}
                  </span>
                ))}
            </div>
            <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
            <p className="text-xl text-muted-foreground mb-6">
              {post.description}
            </p>
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-6">
              {post.author && (
                <div className="flex items-center gap-2">
                  <img
                    src="/placeholder-avatar.svg"
                    alt={post.author}
                    className="w-6 h-6 rounded-full"
                  />
                  {post.author}
                </div>
              )}
              <div className="flex items-center gap-1">
                <Calendar size={14} />
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
            {post.featuredImage && (
              <div className="aspect-[16/9] rounded-xl overflow-hidden bg-muted mb-8">
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
            )}
          </header>

          <div
            className="prose prose-lg dark:prose-invert max-w-none 
            [&_pre]:bg-secondary/50 [&_pre]:p-6 [&_pre]:rounded-lg [&_pre]:overflow-x-auto 
            [&_code]:text-sm [&_code]:font-mono [&_code:not(pre_code)]:bg-secondary/50 [&_code:not(pre_code)]:px-1.5 [&_code:not(pre_code)]:py-0.5 [&_code:not(pre_code)]:rounded
            [&_h1]:text-3xl [&_h1]:font-bold [&_h1]:mt-8 [&_h1]:mb-4
            [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:mt-8 [&_h2]:mb-4
            [&_h3]:text-xl [&_h3]:font-bold [&_h3]:mt-6 [&_h3]:mb-3
            [&_p]:text-muted-foreground [&_p]:leading-relaxed [&_p]:mb-4
            [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:mb-4
            [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:mb-4
            [&_li]:text-muted-foreground [&_li]:mb-2
            [&_blockquote]:border-l-4 [&_blockquote]:border-primary/50 [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:text-muted-foreground [&_blockquote]:my-4
            [&_a]:text-primary [&_a]:hover:underline
            [&_strong]:font-bold [&_strong]:text-foreground
            [&_em]:italic
            [&_hr]:my-8 [&_hr]:border-border"
          >
            <ReactMarkdown>{post.content}</ReactMarkdown>
          </div>
        </article>
      </div>
    </section>
  );
};

export default BlogDetail;
