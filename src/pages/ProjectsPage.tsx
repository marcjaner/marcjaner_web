import React, { useState, useEffect } from "react";
import ProjectCard from "@/components/home/ProjectCard";
import { useProjects } from "@/hooks/useProjects";
import MetaTags from "@/components/MetaTags";

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

const ProjectsPage = () => {
  const { data: projects, isLoading, error, refetch } = useProjects();
  const [isHeaderVisible, setIsHeaderVisible] = useState(false);

  // Ensure animations work on both initial load and page reload
  useEffect(() => {
    // Small delay to ensure DOM is ready
    const headerTimer = setTimeout(() => {
      setIsHeaderVisible(true);
    }, 100);

    return () => clearTimeout(headerTimer);
  }, []);

  // Always show the header section, even during loading
  const headerSection = (
    <div
      className={`max-w-4xl mx-auto mb-16 text-center transition-all duration-700 ${
        isHeaderVisible
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-10"
      }`}
    >
      <h1 className="text-4xl font-bold mb-6">My Projects</h1>
      <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
        A collection of my work, side projects, and experiments in data
        engineering, software development, and more.
      </p>
      <div className="h-1 w-20 bg-primary mx-auto mt-4"></div>
    </div>
  );

  if (isLoading) {
    return (
      <>
        <MetaTags
          title="Projects | Marc Janer"
          description="A collection of my work, side projects, and experiments in data engineering, software development, and more."
          image="/images/home/marc_janer.jpg"
        />
        <section className="py-20">
          <div className="container mx-auto px-6">
            {headerSection}
            <div className="text-center">
              <p className="text-muted-foreground">Loading projects...</p>
            </div>
          </div>
        </section>
      </>
    );
  }

  if (error) {
    return (
      <>
        <MetaTags
          title="Projects | Marc Janer"
          description="A collection of my work, side projects, and experiments in data engineering, software development, and more."
          image="/images/home/marc_janer.jpg"
        />
        <section className="py-20">
          <div className="container mx-auto px-6">
            {headerSection}
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-4">
                Error Loading Projects
              </h2>
              <p className="text-muted-foreground mb-4">
                {error instanceof Error
                  ? error.message
                  : "Failed to fetch projects"}
              </p>
              <button
                onClick={() => refetch()}
                className="text-primary hover:underline"
              >
                Try Again
              </button>
            </div>
          </div>
        </section>
      </>
    );
  }

  // Ensure projects is a valid array
  const validProjects = projects && projects.length > 0 ? [...projects] : [];

  return (
    <>
      <MetaTags
        title="Projects | Marc Janer"
        description="A collection of my work, side projects, and experiments in data engineering, software development, and more."
        image="/images/home/marc_janer.jpg"
      />
      <section className="py-20">
        <div className="container mx-auto px-6">
          {headerSection}

          {validProjects.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No projects found.</p>
              <button
                onClick={() => refetch()}
                className="text-primary hover:underline mt-4"
              >
                Refresh
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {validProjects.map((project, index) => (
                <ProjectCard
                  key={project.id || index}
                  project={project}
                  index={index}
                />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default ProjectsPage;
