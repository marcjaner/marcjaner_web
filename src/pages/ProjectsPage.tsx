
import React from 'react';
import { Link } from 'react-router-dom';
import { ExternalLink, Github } from 'lucide-react';

const ProjectsPage = () => {
  // This would eventually pull from your collection, but for now we'll use dummy data
  const projects = [
    {
      id: 1,
      title: 'Data Visualization Dashboard',
      description: 'An interactive dashboard for visualizing complex datasets using D3.js and React.',
      tags: ['React', 'D3.js', 'Data Visualization'],
      image: 'project1.jpg',
      githubUrl: 'https://github.com',
      demoUrl: 'https://demo.com',
      featured: true
    },
    {
      id: 2,
      title: 'ETL Pipeline Framework',
      description: 'A modular framework for building efficient ETL pipelines with Python and Apache Airflow.',
      tags: ['Python', 'Airflow', 'ETL'],
      image: 'project2.jpg',
      githubUrl: 'https://github.com',
      demoUrl: null,
      featured: true
    },
    {
      id: 3,
      title: 'Real-time Analytics API',
      description: 'A high-performance API for real-time analytics built with Node.js and WebSockets.',
      tags: ['Node.js', 'WebSockets', 'Real-time'],
      image: 'project3.jpg',
      githubUrl: 'https://github.com',
      demoUrl: 'https://demo.com',
      featured: false
    },
    {
      id: 4,
      title: 'Machine Learning Model Deployment',
      description: 'A system for deploying machine learning models to production with monitoring and A/B testing.',
      tags: ['Python', 'ML', 'DevOps'],
      image: 'project4.jpg',
      githubUrl: 'https://github.com',
      demoUrl: 'https://demo.com',
      featured: false
    },
    {
      id: 5,
      title: 'Data Lake Architecture',
      description: 'A scalable data lake architecture using AWS S3, Glue, and Athena for cost-effective analytics.',
      tags: ['AWS', 'Data Lake', 'Cloud'],
      image: 'project5.jpg',
      githubUrl: 'https://github.com',
      demoUrl: null,
      featured: false
    },
    {
      id: 6,
      title: 'IoT Data Collection Platform',
      description: 'A platform for collecting, processing, and analyzing data from IoT devices in real-time.',
      tags: ['IoT', 'MQTT', 'Time-series DB'],
      image: 'project6.jpg',
      githubUrl: 'https://github.com',
      demoUrl: 'https://demo.com',
      featured: false
    }
  ];

  return (
    <>
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
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <div 
                key={project.id} 
                className={`bg-card border border-border rounded-xl overflow-hidden hover-card reveal ${index < 3 ? `stagger-${index + 1}` : ''}`}
              >
                <div className="aspect-video bg-muted">
                  {/* Project image placeholder */}
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/5 to-primary/10">
                    <span className="text-muted-foreground">Project Image</span>
                  </div>
                </div>
                <div className="p-6">
                  <div className="mb-4 flex flex-wrap gap-2">
                    {project.tags.map((tag, i) => (
                      <span 
                        key={i} 
                        className="text-xs font-medium bg-secondary px-2 py-1 rounded"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    {project.description}
                  </p>
                  <div className="flex justify-between items-center">
                    <Link 
                      to={`/projects/${project.id}`} 
                      className="text-primary hover:underline text-sm font-medium"
                    >
                      View Details
                    </Link>
                    <div className="flex items-center gap-3">
                      <a 
                        href={project.githubUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-foreground"
                        aria-label="GitHub"
                      >
                        <Github size={16} />
                      </a>
                      {project.demoUrl && (
                        <a 
                          href={project.demoUrl} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-muted-foreground hover:text-foreground"
                          aria-label="Live Demo"
                        >
                          <ExternalLink size={16} />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default ProjectsPage;
