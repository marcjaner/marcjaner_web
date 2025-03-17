
import React from 'react';
import ProjectCard from '@/components/home/ProjectCard';

const ProjectsPage = () => {
  // Hardcoded projects
  const projects = [
    {
      id: "1",
      slug: "data-visualization-dashboard",
      title: "Data Visualization Dashboard",
      description: "An interactive dashboard for visualizing complex datasets with customizable charts and filters.",
      featuredImage: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6",
      technologies: ["React", "D3.js", "TypeScript"],
      githubUrl: "https://github.com/username/data-viz-dashboard",
      liveUrl: "https://data-viz-dashboard.example.com"
    },
    {
      id: "2",
      slug: "etl-pipeline-framework",
      title: "ETL Pipeline Framework",
      description: "A scalable framework for building and managing ETL workflows with monitoring and error handling.",
      featuredImage: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d",
      technologies: ["Python", "Apache Airflow", "Docker"],
      githubUrl: "https://github.com/username/etl-framework"
    },
    {
      id: "3",
      slug: "automated-ml-pipeline",
      title: "Automated ML Pipeline",
      description: "End-to-end machine learning pipeline with automated feature engineering and model selection.",
      featuredImage: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7",
      technologies: ["Python", "scikit-learn", "MLflow"],
      githubUrl: "https://github.com/username/auto-ml-pipeline",
      liveUrl: "https://auto-ml.example.com"
    },
    {
      id: "4",
      slug: "streaming-data-processor",
      title: "Real-time Data Streaming Processor",
      description: "A system for processing and analyzing high-volume data streams in real-time.",
      featuredImage: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
      technologies: ["Kafka", "Spark Streaming", "Java"],
      githubUrl: "https://github.com/username/streaming-processor"
    },
    {
      id: "5",
      slug: "nlp-document-analyzer",
      title: "NLP Document Analysis Tool",
      description: "A tool that uses natural language processing to extract insights from unstructured documents.",
      featuredImage: "https://images.unsplash.com/photo-1518770660439-4636190af475",
      technologies: ["Python", "spaCy", "BERT"],
      githubUrl: "https://github.com/username/nlp-document-analyzer",
      liveUrl: "https://nlp-analyzer.example.com"
    },
    {
      id: "6",
      slug: "data-quality-framework",
      title: "Data Quality Testing Framework",
      description: "An automated framework for testing and validating data quality in data pipelines.",
      featuredImage: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d",
      technologies: ["Python", "Great Expectations", "dbt"],
      githubUrl: "https://github.com/username/data-quality-framework"
    }
  ];

  return (
    <section className="py-20">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto mb-16 text-center reveal">
          <h1 className="text-4xl font-bold mb-6">My Projects</h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            A collection of my work, side projects, and experiments in data engineering,
            software development, and more.
          </p>
          <div className="h-1 w-20 bg-primary mx-auto mt-4"></div>
        </div>
        
        {projects.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No projects found.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <ProjectCard 
                key={project.id || index} 
                project={project}
                index={index < 6 ? index + 1 : 0}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default ProjectsPage;
