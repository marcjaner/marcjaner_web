
import React from 'react';
import { Link } from 'react-router-dom';
import { ExternalLink, Github } from 'lucide-react';
import { Project } from '@/types/collections';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';

const ProjectsPage = () => {
  // This would eventually pull from your collection, but for now we'll use dummy data
  const projects: Project[] = [
    {
      id: '1',
      title: 'Data Visualization Dashboard',
      description: 'An interactive dashboard for visualizing complex datasets using D3.js and React.',
      content: 'Detailed description of the data visualization dashboard project...',
      featuredImage: '/placeholder.svg',
      technologies: ['React', 'D3.js', 'Data Visualization'],
      githubUrl: 'https://github.com',
      liveUrl: 'https://demo.com',
      featured: true,
      date: '2023-05-15'
    },
    {
      id: '2',
      title: 'ETL Pipeline Framework',
      description: 'A modular framework for building efficient ETL pipelines with Python and Apache Airflow.',
      content: 'Detailed description of the ETL pipeline framework project...',
      featuredImage: '/placeholder.svg',
      technologies: ['Python', 'Airflow', 'ETL'],
      githubUrl: 'https://github.com',
      featured: true,
      date: '2023-03-10'
    },
    {
      id: '3',
      title: 'Real-time Analytics API',
      description: 'A high-performance API for real-time analytics built with Node.js and WebSockets.',
      content: 'Detailed description of the real-time analytics API project...',
      featuredImage: '/placeholder.svg',
      technologies: ['Node.js', 'WebSockets', 'Real-time'],
      githubUrl: 'https://github.com',
      liveUrl: 'https://demo.com',
      featured: false,
      date: '2023-01-20'
    },
    {
      id: '4',
      title: 'Machine Learning Model Deployment',
      description: 'A system for deploying machine learning models to production with monitoring and A/B testing.',
      content: 'Detailed description of the machine learning model deployment project...',
      featuredImage: '/placeholder.svg',
      technologies: ['Python', 'ML', 'DevOps'],
      githubUrl: 'https://github.com',
      liveUrl: 'https://demo.com',
      featured: false,
      date: '2022-11-05'
    },
    {
      id: '5',
      title: 'Data Lake Architecture',
      description: 'A scalable data lake architecture using AWS S3, Glue, and Athena for cost-effective analytics.',
      content: 'Detailed description of the data lake architecture project...',
      featuredImage: '/placeholder.svg',
      technologies: ['AWS', 'Data Lake', 'Cloud'],
      githubUrl: 'https://github.com',
      featured: false,
      date: '2022-09-18'
    },
    {
      id: '6',
      title: 'IoT Data Collection Platform',
      description: 'A platform for collecting, processing, and analyzing data from IoT devices in real-time.',
      content: 'Detailed description of the IoT data collection platform project...',
      featuredImage: '/placeholder.svg',
      technologies: ['IoT', 'MQTT', 'Time-series DB'],
      githubUrl: 'https://github.com',
      liveUrl: 'https://demo.com',
      featured: false,
      date: '2022-07-30'
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
              <Card 
                key={project.id} 
                className={`overflow-hidden hover:shadow-lg transition-shadow reveal ${index < 3 ? `stagger-${index + 1}` : ''}`}
              >
                <div className="aspect-video bg-muted">
                  {/* Project image */}
                  <img 
                    src={project.featuredImage || '/placeholder.svg'} 
                    alt={project.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = '/placeholder.svg';
                    }}
                  />
                </div>
                <CardHeader className="p-6 pb-2">
                  <div className="mb-2 flex flex-wrap gap-2">
                    {project.technologies.map((tech, i) => (
                      <span 
                        key={i} 
                        className="text-xs font-medium bg-secondary px-2 py-1 rounded"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <h3 className="text-xl font-bold">{project.title}</h3>
                </CardHeader>
                <CardContent className="p-6 pt-2">
                  <p className="text-muted-foreground text-sm mb-4">
                    {project.description}
                  </p>
                </CardContent>
                <CardFooter className="p-6 pt-0 flex justify-between items-center">
                  <Link 
                    to={`/projects/${project.id}`} 
                    className="text-primary hover:underline text-sm font-medium"
                  >
                    View Details
                  </Link>
                  <div className="flex items-center gap-3">
                    {project.githubUrl && (
                      <a 
                        href={project.githubUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-foreground"
                        aria-label="GitHub"
                      >
                        <Github size={16} />
                      </a>
                    )}
                    {project.liveUrl && (
                      <a 
                        href={project.liveUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-foreground"
                        aria-label="Live Demo"
                      >
                        <ExternalLink size={16} />
                      </a>
                    )}
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default ProjectsPage;
