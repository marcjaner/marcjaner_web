import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ExternalLink, Github } from "lucide-react";
import { cn } from "@/lib/utils";

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

const getImageUrl = (path: string) => {
  // If the path is already a full URL, return it as is
  if (path.startsWith("http")) {
    return path;
  }
  // In development, use the Netlify Dev server URL
  if (import.meta.env.DEV) {
    return `http://localhost:8888${path}`;
  }
  // In production, use relative path (it will be relative to the deployed domain)
  return path;
};

const ProjectCard = ({ project, className, index = 0 }: ProjectCardProps) => {
  const [isVisible, setIsVisible] = useState(false);

  // Ensure animations work on both initial load and page reload
  useEffect(() => {
    // Small delay to ensure DOM is ready
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100 + index * 150);

    return () => clearTimeout(timer);
  }, [index]);

  return (
    <div
      className={cn(
        "bg-card border border-border rounded-xl overflow-hidden transition-all duration-500 hover:shadow-md hover:-translate-y-0.5 hover:scale-[0.98]",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10",
        className
      )}
    >
      <div className="aspect-video bg-muted">
        <img
          src={getImageUrl(project.featuredImage)}
          alt={project.title}
          className="w-full h-full object-cover"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = "/placeholder.svg";
          }}
        />
      </div>
      <div className="p-6">
        <div className="mb-4 flex gap-2">
          {project.technologies?.slice(0, 3).map((tech, i) => (
            <span
              key={i}
              className="text-xs dark:text-muted-foreground text-stone-600 font-medium bg-secondary px-2 py-1 rounded"
            >
              {tech}
            </span>
          ))}
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
