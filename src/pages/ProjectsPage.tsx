
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ExternalLink, Github } from 'lucide-react';
import { Project } from '@/types/collections';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';

// Import project markdown files
import data1 from '@/content/projects/data-visualization-dashboard.md?raw';
import data2 from '@/content/projects/etl-pipeline-framework.md?raw';
import { parseProjectMarkdown } from '@/lib/markdown';

const ProjectsPage = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const loadProjects = () => {
      try {
        console.log("Loading project markdown files...");
        
        // Parse the markdown files to get the project data
        const markdownContents = [data1, data2];
        const parsedProjects: Project[] = [];
        
        for (const content of markdownContents) {
          try {
            const project = parseProjectMarkdown(content);
            console.log("Parsed project:", project);
            if (project && project.id) {
              parsedProjects.push(project);
            }
          } catch (err) {
            console.error("Error parsing individual project:", err);
          }
        }
        
        if (parsedProjects.length === 0) {
          console.error("No projects could be loaded");
          setError("No projects could be loaded");
        } else {
          // Sort projects by date (most recent first)
          parsedProjects.sort((a, b) => {
            if (!a.date || !b.date) return 0;
            return new Date(b.date).getTime() - new Date(a.date).getTime();
          });
          console.log("Final parsed projects:", parsedProjects);
          setProjects(parsedProjects);
          setError(null);
        }
      } catch (error) {
        console.error("Error loading projects:", error);
        setError("Failed to load projects");
        setProjects([]);
      } finally {
        setLoading(false);
      }
    };
    
    loadProjects();
  }, []);

  if (loading) {
    return (
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl font-bold mb-6">Loading Projects...</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((n) => (
                <Card key={n} className="overflow-hidden animate-pulse">
                  <div className="aspect-video bg-muted"></div>
                  <CardHeader className="p-6">
                    <div className="h-6 bg-muted rounded w-3/4"></div>
                  </CardHeader>
                  <CardContent className="p-6 pt-2">
                    <div className="h-4 bg-muted rounded mb-2"></div>
                    <div className="h-4 bg-muted rounded w-3/4"></div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl font-bold mb-6">Something went wrong</h1>
            <p className="text-muted-foreground mb-8">{error}</p>
          </div>
        </div>
      </section>
    );
  }

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
