
import React from 'react';
import { Link } from 'react-router-dom';
import { ExternalLink, Github } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';

const ProjectsPage = () => {
  // Hardcoded projects
  const projects = [
    {
      id: '1',
      slug: 'data-visualization-dashboard',
      title: 'Data Visualization Dashboard',
      description: 'An interactive dashboard for visualizing complex datasets using React and D3.js.',
      featuredImage: '/placeholder.svg',
      technologies: ['React', 'D3.js', 'TypeScript', 'Tailwind CSS'],
      githubUrl: 'https://github.com/marcjaner/data-viz-dashboard',
      liveUrl: 'https://data-viz.marcjaner.com',
      featured: true,
      date: '2023-04-15'
    },
    {
      id: '2',
      slug: 'etl-pipeline-framework',
      title: 'ETL Pipeline Framework',
      description: 'A scalable ETL framework built with Python, Apache Airflow, and Spark for large-scale data processing.',
      featuredImage: '/placeholder.svg',
      technologies: ['Python', 'Apache Airflow', 'Apache Spark', 'AWS'],
      githubUrl: 'https://github.com/marcjaner/etl-pipeline-framework',
      liveUrl: null,
      featured: true,
      date: '2023-02-20'
    },
    {
      id: '3',
      slug: 'automated-ml-pipeline',
      title: 'Automated ML Pipeline',
      description: 'An end-to-end machine learning pipeline with automated feature engineering and model selection.',
      featuredImage: '/placeholder.svg',
      technologies: ['Python', 'Scikit-learn', 'MLflow', 'FastAPI'],
      githubUrl: 'https://github.com/marcjaner/automated-ml-pipeline',
      liveUrl: 'https://ml-demo.marcjaner.com',
      featured: false,
      date: '2022-11-05'
    }
  ];

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
                  <img 
                    src={project.featuredImage} 
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardHeader className="p-6 pb-2">
                  <div className="mb-2 flex flex-wrap gap-2">
                    {project.technologies.map((tech, i) => (
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
