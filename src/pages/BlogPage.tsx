
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Calendar, Clock, Tag } from 'lucide-react';

const BlogPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  // This would eventually pull from your collection, but for now we'll use dummy data
  const posts = [
    {
      id: 1,
      title: 'Setting Up Efficient ETL Pipelines with Apache Airflow',
      excerpt: 'Learn how to design and implement efficient ETL pipelines using Apache Airflow for data orchestration.',
      date: 'May 15, 2023',
      readTime: '8 min read',
      tags: ['ETL', 'Airflow', 'Data Engineering'],
      image: 'blog1.jpg'
    },
    {
      id: 2,
      title: 'Real-time Data Processing with Kafka and Spark',
      excerpt: 'A comprehensive guide to building real-time data processing systems using Kafka and Spark Streaming.',
      date: 'Apr 22, 2023',
      readTime: '12 min read',
      tags: ['Kafka', 'Spark', 'Streaming'],
      image: 'blog2.jpg'
    },
    {
      id: 3,
      title: 'Building Interactive Dashboards with React and D3.js',
      excerpt: 'Step-by-step tutorial for creating beautiful, interactive data visualizations with React and D3.js.',
      date: 'Mar 10, 2023',
      readTime: '10 min read',
      tags: ['React', 'D3.js', 'Visualization'],
      image: 'blog3.jpg'
    },
    {
      id: 4,
      title: 'Cloud Data Warehousing: Snowflake vs. BigQuery',
      excerpt: 'A detailed comparison of two popular cloud data warehousing solutions: Snowflake and BigQuery.',
      date: 'Feb 28, 2023',
      readTime: '15 min read',
      tags: ['Data Warehouse', 'Snowflake', 'BigQuery'],
      image: 'blog4.jpg'
    },
    {
      id: 5,
      title: 'Best Practices for Data Quality Monitoring',
      excerpt: 'Learn how to implement robust data quality monitoring to ensure reliable and trustworthy analytics.',
      date: 'Jan 15, 2023',
      readTime: '7 min read',
      tags: ['Data Quality', 'Monitoring', 'Best Practices'],
      image: 'blog5.jpg'
    },
    {
      id: 6,
      title: 'Introduction to dbt for Analytics Engineering',
      excerpt: 'Discover how dbt (data build tool) can transform your analytics workflows and improve collaboration.',
      date: 'Dec 5, 2022',
      readTime: '9 min read',
      tags: ['dbt', 'Analytics Engineering', 'SQL'],
      image: 'blog6.jpg'
    }
  ];

  const filteredPosts = posts.filter(post => 
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const allTags = Array.from(new Set(posts.flatMap(post => post.tags)));

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
                        {/* Blog post image placeholder */}
                        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/5 to-primary/10">
                          <span className="text-muted-foreground">Post Image</span>
                        </div>
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
                          to={`/blog/${post.id}`} 
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
