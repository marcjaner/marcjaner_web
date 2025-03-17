
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import BlogPostCard from './BlogPostCard';

const BlogSection = () => {
  return (
    <section className="py-20 bg-secondary/30 dark:bg-secondary/10">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto mb-12 text-center reveal">
          <h2 className="text-3xl font-bold mb-4">Latest Blog Posts</h2>
          <p className="text-muted-foreground">Thoughts, tutorials, and insights</p>
          <div className="h-1 w-20 bg-primary mx-auto mt-4"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {[1, 2].map((item) => (
            <BlogPostCard key={item} id={item} />
          ))}
        </div>
        
        <div className="text-center mt-12 reveal">
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
