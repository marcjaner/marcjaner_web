
import React from 'react';
import { Link } from 'react-router-dom';
import { ExternalLink } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ProjectCardProps {
  id: number;
  className?: string;
}

const ProjectCard = ({ id, className }: ProjectCardProps) => {
  return (
    <div 
      className={cn(
        "bg-card border border-border rounded-xl overflow-hidden hover-card reveal",
        `stagger-${id}`,
        className
      )}
    >
      <div className="aspect-video bg-muted">
        {/* Project image placeholder */}
        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/5 to-primary/10">
          <span className="text-muted-foreground">Project Image</span>
        </div>
      </div>
      <div className="p-6">
        <div className="mb-4">
          <span className="text-xs font-medium bg-secondary px-2 py-1 rounded">
            Data Visualization
          </span>
        </div>
        <h3 className="text-xl font-bold mb-2">Project Name {id}</h3>
        <p className="text-muted-foreground text-sm mb-4">
          A brief description of the project, what technologies were used,
          and what problems it solves.
        </p>
        <div className="flex justify-between items-center">
          <Link 
            to={`/projects/project-${id}`} 
            className="text-primary hover:underline text-sm font-medium"
          >
            View Details
          </Link>
          <a 
            href="#" 
            className="text-muted-foreground hover:text-foreground"
            aria-label="External Link"
          >
            <ExternalLink size={16} />
          </a>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
