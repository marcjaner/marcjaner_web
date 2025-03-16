
import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, Clock, Tag } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

const BlogDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  // Hardcoded blog posts
  const posts = [
    {
      id: '1',
      slug: 'airflow-etl-pipelines',
      title: 'Building ETL Pipelines with Apache Airflow',
      excerpt: 'Learn how to create robust ETL pipelines using Apache Airflow, with examples and best practices.',
      content: `
# Building ETL Pipelines with Apache Airflow

Apache Airflow is an open-source platform to programmatically author, schedule, and monitor workflows. It's designed for data pipelines, but can be used for general workflow orchestration.

## Why Use Airflow?

- **Dynamically Generated Workflows**: Airflow allows you to generate workflows dynamically.
- **Extensible**: Easily define your own operators and extend libraries.
- **Elegant User Interface**: Monitor, schedule, and manage workflows via a robust UI.
- **Scalable**: Airflow has a modular architecture and uses message queues for orchestration.

## Setting Up Your First DAG

Here's how to set up a simple ETL pipeline in Airflow:

\`\`\`python
from datetime import datetime, timedelta
from airflow import DAG
from airflow.operators.python_operator import PythonOperator

default_args = {
    'owner': 'airflow',
    'depends_on_past': False,
    'start_date': datetime(2023, 1, 1),
    'email_on_failure': False,
    'email_on_retry': False,
    'retries': 1,
    'retry_delay': timedelta(minutes=5),
}

dag = DAG(
    'sample_etl_pipeline',
    default_args=default_args,
    description='A simple ETL pipeline',
    schedule_interval=timedelta(days=1),
)

def extract():
    # Extract data from source
    data = {'user_id': 1, 'name': 'John Doe'}
    return data

def transform(extracted_data):
    # Transform the data
    transformed_data = {
        'user_id': extracted_data['user_id'],
        'name': extracted_data['name'].upper()
    }
    return transformed_data

def load(transformed_data):
    # Load data to destination
    print(f"Loading data: {transformed_data}")
    # In a real scenario, you would write to a database or file

extract_task = PythonOperator(
    task_id='extract',
    python_callable=extract,
    dag=dag,
)

transform_task = PythonOperator(
    task_id='transform',
    python_callable=transform,
    op_kwargs={'extracted_data': "{{ task_instance.xcom_pull(task_ids='extract') }}"},
    dag=dag,
)

load_task = PythonOperator(
    task_id='load',
    python_callable=load,
    op_kwargs={'transformed_data': "{{ task_instance.xcom_pull(task_ids='transform') }}"},
    dag=dag,
)

extract_task >> transform_task >> load_task
\`\`\`

## Best Practices for Airflow ETL Pipelines

1. **Keep DAGs Idempotent**: Ensure your DAGs can be run multiple times without causing issues.
2. **Use Templating**: Leverage Airflow's templating capabilities for dynamic task generation.
3. **Backfill Strategically**: Be careful when backfilling historical data to avoid overloading your system.
4. **Monitor Execution**: Set up alerts and monitoring for your workflows.
5. **Version Control Your DAGs**: Store your DAG definitions in a version control system like Git.
      `,
      featuredImage: '/placeholder.svg',
      author: 'Marc Janer',
      date: 'May 15, 2023',
      readTime: '8 min read',
      tags: ['Data Engineering', 'ETL', 'Apache Airflow']
    }
  ];
  
  // Find the post
  const post = posts.find(p => p.slug === slug);

  if (!post) {
    return (
      <div className="container mx-auto px-6 py-20">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-3xl font-bold mb-4">Post Not Found</h1>
          <p className="text-muted-foreground mb-6">
            The blog post you're looking for doesn't exist or has been moved.
          </p>
          <p className="text-sm">Redirecting to blog page...</p>
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
              {post.tags.map((tag, i) => (
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
