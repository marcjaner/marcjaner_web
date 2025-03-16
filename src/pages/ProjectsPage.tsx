
import React from 'react';
import { Link } from 'react-router-dom';
import { ExternalLink, Github } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { useProjects } from '@/hooks/useProjects';

const ProjectsPage = () => {
  const { data: projects, isLoading, error } = useProjects();

  console.log("Projects data:", projects);

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
        
        {isLoading ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Loading projects...</p>
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Error loading projects. Please try again later.</p>
            <pre className="mt-4 text-xs text-red-500 bg-red-50 p-4 rounded-md overflow-auto max-w-2xl mx-auto">
              {String(error)}
            </pre>
          </div>
        ) : !projects || projects.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No projects found.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <Card 
                key={project.id || index} 
                className={`overflow-hidden hover:shadow-lg transition-shadow reveal ${index < 3 ? `stagger-${index + 1}` : ''}`}
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
                <CardHeader className="p-6 pb-2">
                  <div className="mb-2 flex flex-wrap gap-2">
                    {project.technologies && project.technologies.map((tech, i) => (
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
                    to={`/projects/${project.slug || project.id}`} 
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
        )}
      </div>
    </section>
  );
};

export default ProjectsPage;
