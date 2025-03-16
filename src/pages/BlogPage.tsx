import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, Calendar, Clock, Tag } from 'lucide-react';
import { BlogPost } from '@/types/collections';
import { parseBlogMarkdown } from '@/lib/markdown';

// Import blog markdown files
import airflowPost from '@/content/blog/airflow-etl-pipelines.md?raw';

const BlogPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    try {
      console.log("Loading blog markdown files...");
      
      // Parse the markdown files to get the blog data
      const markdownContents = [airflowPost];
      const parsedPosts: BlogPost[] = [];
      
      for (const content of markdownContents) {
        try {
          const post = parseBlogMarkdown(content);
          console.log("Parsed blog post:", post);
          parsedPosts.push(post);
        } catch (err) {
          console.error("Error parsing individual blog post:", err);
        }
      }
      
      if (parsedPosts.length === 0) {
        setError("No blog posts could be loaded");
      } else {
        // Sort posts by date (most recent first)
        parsedPosts.sort((a, b) => {
          const dateA = new Date(a.date).getTime();
          const dateB = new Date(b.date).getTime();
          return dateB - dateA;
        });
        setPosts(parsedPosts);
        setError(null);
      }
    } catch (error) {
      console.error("Error parsing blog markdown:", error);
      setError("Failed to load blog posts");
      setPosts([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const filteredPosts = posts.filter(post => 
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (post.tags && post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())))
  );

  const allTags = Array.from(new Set(posts.flatMap(post => post.tags || [])));

  if (loading) {
    return (
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl font-bold mb-6">Loading Posts...</h1>
            <div className="space-y-12">
              {[1, 2, 3].map((n) => (
                <div key={n} className="flex flex-col md:flex-row gap-8 animate-pulse">
                  <div className="md:w-1/3">
                    <div className="aspect-[4/3] bg-muted rounded-xl"></div>
                  </div>
                  <div className="md:w-2/3">
                    <div className="h-6 bg-muted rounded w-3/4 mb-4"></div>
                    <div className="h-4 bg-muted rounded mb-2"></div>
                    <div className="h-4 bg-muted rounded w-3/4 mb-2"></div>
                    <div className="h-4 bg-muted rounded w-1/2"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl font-bold mb-6">Something went wrong</h1>
            <p className="text-muted-foreground mb-8">{error}</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
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
          
          <div className="max-w-4xl mx-auto mb-12 reveal stagger-1">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Search className="text-muted-foreground" size={20} />
              </div>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-secondary/50 border border-border rounded-md pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/20"
                placeholder="Search posts by title or tag..."
              />
            </div>
          </div>
          
          <div className="max-w-4xl mx-auto mb-12 flex flex-wrap gap-2 justify-center reveal stagger-2">
            <button
              onClick={() => setSearchTerm('')}
              className={`px-3 py-1 rounded-full text-sm ${
                searchTerm === '' 
                  ? 'bg-primary text-primary-foreground' 
                  : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
              } transition-colors`}
            >
              All
            </button>
            {allTags.map((tag, index) => (
              <button
                key={index}
                onClick={() => setSearchTerm(tag)}
                className={`px-3 py-1 rounded-full text-sm ${
                  searchTerm === tag 
                    ? 'bg-primary text-primary-foreground' 
                    : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                } transition-colors`}
              >
                {tag}
              </button>
            ))}
          </div>
          
          <div className="max-w-4xl mx-auto">
            {filteredPosts.length > 0 ? (
              <div className="space-y-12">
                {filteredPosts.map((post, index) => (
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
                        {post.tags && post.tags.map((tag, i) => (
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
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground">
                  No posts found matching "{searchTerm}".
                </p>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default BlogPage;
