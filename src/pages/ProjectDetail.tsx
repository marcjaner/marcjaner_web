
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Github, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ReactMarkdown from 'react-markdown';
import { useProject } from '@/hooks/useProjects';

const ProjectDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const { data: project, isLoading, error } = useProject(slug);

  if (isLoading) {
    return (
      <div className="container mx-auto px-6 py-20">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-muted-foreground">Loading project details...</p>
        </div>
      </div>
    );
  }

  if (error || !project) {
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
          {project.technologies && project.technologies.map((tech, index) => (
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
          <ReactMarkdown>
            {project.content}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;
