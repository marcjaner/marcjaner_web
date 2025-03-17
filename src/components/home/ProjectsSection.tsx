
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import ProjectCard from './ProjectCard';

const ProjectsSection = () => {
  // Hardcoded projects
  const featuredProjects = [
    {
      id: "1",
      slug: "data-visualization-dashboard",
      title: "Data Visualization Dashboard",
      description: "An interactive dashboard for visualizing complex datasets with customizable charts and filters.",
      featuredImage: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6",
      technologies: ["React", "D3.js", "TypeScript"],
      githubUrl: "https://github.com/username/data-viz-dashboard",
      liveUrl: "https://data-viz-dashboard.example.com"
    },
    {
      id: "2",
      slug: "etl-pipeline-framework",
      title: "ETL Pipeline Framework",
      description: "A scalable framework for building and managing ETL workflows with monitoring and error handling.",
      featuredImage: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d",
      technologies: ["Python", "Apache Airflow", "Docker"],
      githubUrl: "https://github.com/username/etl-framework"
    },
    {
      id: "3",
      slug: "automated-ml-pipeline",
      title: "Automated ML Pipeline",
      description: "End-to-end machine learning pipeline with automated feature engineering and model selection.",
      featuredImage: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7",
      technologies: ["Python", "scikit-learn", "MLflow"],
      githubUrl: "https://github.com/username/auto-ml-pipeline",
      liveUrl: "https://auto-ml.example.com"
    }
  ];

  return (
    <section className="py-20">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto mb-12 text-center reveal">
          <h2 className="text-3xl font-bold mb-4">Featured Projects</h2>
          <p className="text-muted-foreground">A selection of my latest work and side projects</p>
          <div className="h-1 w-20 bg-primary mx-auto mt-4"></div>
        </div>
        
        {featuredProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProjects.map((project, idx) => (
              <ProjectCard key={project.id} project={project} index={idx + 1} />
            ))}
          </div>
        ) : (
          <div className="text-center mb-8">
            <p className="text-muted-foreground">No projects found.</p>
          </div>
        )}
        
        <div className="text-center mt-12 reveal">
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
