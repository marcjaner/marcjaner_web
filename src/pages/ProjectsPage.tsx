
import React from 'react';
import { useProjects } from '@/hooks/useProjects';
import ProjectCard from '@/components/home/ProjectCard';

const ProjectsPage = () => {
  const { data: projects, isLoading, error } = useProjects();

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
