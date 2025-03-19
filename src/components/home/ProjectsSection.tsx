import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import ProjectCard from "./ProjectCard";
import { useProjects } from "@/hooks/useProjects";

const ProjectsSection = () => {
  const { data: projects, isLoading } = useProjects();
  const [isHeaderVisible, setIsHeaderVisible] = useState(false);
  const [isButtonVisible, setIsButtonVisible] = useState(false);

  // Ensure animations work on both initial load and page reload
  useEffect(() => {
    // Small delay to ensure DOM is ready
    const headerTimer = setTimeout(() => {
      setIsHeaderVisible(true);
    }, 100);

    const buttonTimer = setTimeout(() => {
      setIsButtonVisible(true);
    }, 800);

    return () => {
      clearTimeout(headerTimer);
      clearTimeout(buttonTimer);
    };
  }, []);

  // Get the featured projects, ensuring we have a valid array
  const featuredProjects =
    projects && projects.length > 0
      ? projects
          .filter((project) => project.featured)
          .slice(0, 3)
          .map((project) => ({
            id: project.id,
            slug: project.slug,
            title: project.title,
            description: project.description,
            featuredImage: project.featuredImage,
            technologies: project.technologies || [],
            githubUrl: project.githubUrl,
            liveUrl: project.liveUrl,
          }))
      : [];

  return (
    <section className="py-20">
      <div className="container mx-auto px-6 md:px-12">
        <div
          className={`max-w-4xl mx-auto mb-12 text-center transition-all duration-700 ${
            isHeaderVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-10"
          }`}
        >
          <h2 className="text-3xl font-bold mb-4">Featured Projects</h2>
          <p className="text-muted-foreground">
            A selection of my latest work and side projects
          </p>
          <div className="h-1 w-20 bg-primary mx-auto mt-4"></div>
        </div>

        {isLoading ? (
          <div className="text-center mb-8">
            <p className="text-muted-foreground">Loading projects...</p>
          </div>
        ) : !featuredProjects || featuredProjects.length === 0 ? (
          <div className="text-center mb-8">
            <p className="text-muted-foreground">No projects found.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProjects.map((project, idx) => (
              <ProjectCard key={project.id} project={project} index={idx + 1} />
            ))}
          </div>
        )}

        <div
          className={`text-center mt-12 transition-all duration-700 ${
            isButtonVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-10"
          }`}
        >
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 bg-secondary px-6 py-3 rounded-md hover:bg-secondary/80 transition-colors"
          >
            View All Projects <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
