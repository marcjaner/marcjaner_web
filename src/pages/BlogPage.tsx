
import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, Tag } from 'lucide-react';

const BlogPage = () => {
  // Hardcoded blog posts
  const posts = [
    {
      id: '1',
      slug: 'airflow-etl-pipelines',
      title: 'Building ETL Pipelines with Apache Airflow',
      excerpt: 'Learn how to create robust ETL pipelines using Apache Airflow, with examples and best practices.',
      featuredImage: '/placeholder.svg',
      author: 'Marc Janer',
      date: 'May 15, 2023',
      readTime: '8 min read',
      tags: ['Data Engineering', 'ETL', 'Apache Airflow']
    },
    {
      id: '2',
      slug: 'data-modeling-best-practices',
      title: 'Data Modeling Best Practices for Analytics',
      excerpt: 'Explore the best approaches to data modeling for analytics workloads, focusing on dimensional modeling.',
      featuredImage: '/placeholder.svg',
      author: 'Marc Janer',
      date: 'June 22, 2023',
      readTime: '6 min read',
      tags: ['Data Modeling', 'Analytics', 'Best Practices']
    },
    {
      id: '3',
      slug: 'spark-vs-dask',
      title: 'Apache Spark vs Dask: Choosing the Right Framework',
      excerpt: 'A detailed comparison between Apache Spark and Dask for large-scale data processing.',
      featuredImage: '/placeholder.svg',
      author: 'Marc Janer',
      date: 'July 10, 2023',
      readTime: '10 min read',
      tags: ['Data Processing', 'Apache Spark', 'Dask']
    }
  ];

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
          
          <div className="max-w-4xl mx-auto">
            <div className="space-y-12">
              {posts.map((post, index) => (
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
                        />
                      </Link>
                    </div>
                  </div>
                  <div className="md:w-2/3">
                    <div className="flex flex-wrap gap-2 mb-3">
                      {post.tags.map((tag, i) => (
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
          </div>
        </div>
      </section>
    </>
  );
};

export default BlogPage;
