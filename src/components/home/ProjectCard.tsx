
import React from 'react';
import { Link } from 'react-router-dom';
import { ExternalLink, Github } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Project {
  id: string;
  slug: string;
  title: string;
  description: string;
  featuredImage: string;
  technologies?: string[];
  githubUrl?: string;
  liveUrl?: string;
}

interface ProjectCardProps {
  project: Project;
  className?: string;
  index?: number;
}

const ProjectCard = ({ project, className, index = 0 }: ProjectCardProps) => {
  return (
    <div 
      className={cn(
        "bg-card border border-border rounded-xl overflow-hidden reveal transition-all duration-300 hover:shadow-md hover:-translate-y-0.5",
        index > 0 ? `stagger-${index}` : '',
        className
      )}
    >
      <div className="aspect-video bg-muted">
        <img 
          src={project.featuredImage} 
          alt={project.title}
          className="w-full h-full object-cover"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = '/placeholder.svg';
          }}
        />
      </div>
      <div className="p-6">
        <div className="mb-4">
          {project.technologies && project.technologies.length > 0 && (
            <span className="text-xs font-medium bg-secondary px-2 py-1 rounded">
              {project.technologies[0]}
            </span>
          )}
        </div>
        <h3 className="text-xl font-bold mb-2">{project.title}</h3>
        <p className="text-muted-foreground text-sm mb-4">
          {project.description}
        </p>
        <div className="flex justify-between items-center">
          <Link 
            to={`/projects/${project.slug}`} 
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
                aria-label="External Link"
              >
                <ExternalLink size={16} />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
