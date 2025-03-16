
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Github, ExternalLink } from 'lucide-react';
import { Project } from '@/types/collections';
import { Button } from '@/components/ui/button';
import { initScrollReveal } from '@/lib/utils';

const ProjectDetail = () => {
  const { id } = useParams<{ id: string }>();
  
  // This would eventually pull from your collection, but for now we'll use dummy data
  const projects: Project[] = [
    {
      id: '1',
      title: 'Data Visualization Dashboard',
      description: 'An interactive dashboard for visualizing complex datasets using D3.js and React.',
      content: 'Detailed description of the data visualization dashboard project with in-depth information about the project goals, implementation details, challenges overcome, and results achieved. This dashboard enables users to explore complex datasets through interactive visualizations, filters, and data transformations.',
      featuredImage: '/placeholder.svg',
      technologies: ['React', 'D3.js', 'Data Visualization', 'TypeScript', 'Tailwind CSS'],
      githubUrl: 'https://github.com',
      liveUrl: 'https://demo.com',
      featured: true,
      date: '2023-05-15'
    },
    {
      id: '2',
      title: 'ETL Pipeline Framework',
      description: 'A modular framework for building efficient ETL pipelines with Python and Apache Airflow.',
      content: 'This ETL Pipeline Framework provides a modular and configurable system for building data pipelines. It leverages Apache Airflow for orchestration and Python for transformation logic, making it easy to create, monitor, and maintain complex data workflows. The framework includes built-in error handling, logging, and performance monitoring.',
      featuredImage: '/placeholder.svg',
      technologies: ['Python', 'Airflow', 'ETL', 'SQL', 'Docker'],
      githubUrl: 'https://github.com',
      featured: true,
      date: '2023-03-10'
    },
    // ... additional projects with the same structure
  ];

  React.useEffect(() => {
    const cleanup = initScrollReveal();
    return cleanup;
  }, []);

  const project = projects.find(p => p.id === id);

  if (!project) {
    return (
      <div className="container mx-auto px-6 py-20">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-6">Project Not Found</h1>
          <p className="text-muted-foreground mb-8">The project you're looking for doesn't exist or has been removed.</p>
          <Link to="/projects">
            <Button>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Projects
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-6 py-12 md:py-20">
      <Link 
        to="/projects" 
        className="inline-flex items-center text-sm text-primary hover:underline mb-8 reveal"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Projects
      </Link>

      <div className="max-w-4xl mx-auto">
        <div className="bg-card rounded-xl overflow-hidden shadow-md mb-10 reveal">
          <img 
            src={project.featuredImage} 
            alt={project.title} 
            className="w-full aspect-video object-cover"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = '/placeholder.svg';
            }}
          />
        </div>

        <div className="mb-6 reveal stagger-1">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">{project.title}</h1>
          <p className="text-muted-foreground">{project.description}</p>
        </div>

        <div className="flex flex-wrap gap-2 mb-8 reveal stagger-2">
          {project.technologies.map((tech, index) => (
            <span 
              key={index} 
              className="bg-secondary text-secondary-foreground text-xs font-medium px-3 py-1 rounded-full"
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="flex flex-wrap gap-4 mb-10 reveal stagger-3">
          {project.githubUrl && (
            <a 
              href={project.githubUrl} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="inline-flex items-center gap-2 text-sm bg-secondary hover:bg-secondary/80 px-4 py-2 rounded-md transition-colors"
            >
              <Github size={16} /> View on GitHub
            </a>
          )}
          {project.liveUrl && (
            <a 
              href={project.liveUrl} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="inline-flex items-center gap-2 text-sm bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2 rounded-md transition-colors"
            >
              <ExternalLink size={16} /> Live Demo
            </a>
          )}
        </div>

        <div className="prose dark:prose-invert max-w-none mb-16 reveal stagger-4">
          <div className="whitespace-pre-line">
            {project.content}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;
