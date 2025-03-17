
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import ProjectCard from './ProjectCard';

const ProjectsSection = () => {
  return (
    <section className="py-20">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto mb-12 text-center reveal">
          <h2 className="text-3xl font-bold mb-4">Featured Projects</h2>
          <p className="text-muted-foreground">A selection of my latest work and side projects</p>
          <div className="h-1 w-20 bg-primary mx-auto mt-4"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3].map((item) => (
            <ProjectCard key={item} id={item} />
          ))}
        </div>
        
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
