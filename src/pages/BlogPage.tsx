
import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, Tag } from 'lucide-react';
import BlogPostCard from '@/components/home/BlogPostCard';

const BlogPage = () => {
  // Hardcoded blog posts
  const posts = [
    {
      id: "1",
      slug: "airflow-etl-pipelines",
      title: "Building Robust ETL Pipelines with Apache Airflow",
      excerpt: "Learn how to design and implement scalable data pipelines using Apache Airflow for complex ETL workflows.",
      featuredImage: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
      date: "April 15, 2023",
      readTime: "8 min read",
      author: "Jane Doe",
      tags: ["Data Engineering", "ETL", "Apache Airflow"]
    },
    {
      id: "2",
      slug: "spark-data-processing",
      title: "Optimizing Big Data Processing with Apache Spark",
      excerpt: "Explore techniques to improve performance and efficiency when working with large-scale data using Spark.",
      featuredImage: "https://images.unsplash.com/photo-1518770660439-4636190af475",
      date: "March 22, 2023",
      readTime: "10 min read",
      author: "John Smith",
      tags: ["Big Data", "Apache Spark", "Performance"]
    },
    {
      id: "3",
      slug: "ml-model-deployment",
      title: "Best Practices for Machine Learning Model Deployment",
      excerpt: "Learn about the challenges and solutions for deploying ML models to production environments.",
      featuredImage: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7",
      date: "February 10, 2023",
      readTime: "12 min read",
      author: "Jane Doe",
      tags: ["Machine Learning", "MLOps", "Deployment"]
    },
    {
      id: "4",
      slug: "data-lake-architecture",
      title: "Modern Data Lake Architecture Design Patterns",
      excerpt: "An overview of architectural patterns for building efficient and scalable data lakes.",
      featuredImage: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6",
      date: "January 5, 2023",
      readTime: "9 min read",
      author: "Alex Chen",
      tags: ["Data Architecture", "Data Lakes", "Big Data"]
    }
  ];

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
        
        {posts.length === 0 ? (
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
