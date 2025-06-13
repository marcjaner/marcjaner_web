import React from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Github, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import ReactMarkdown from "react-markdown";
import { useProject } from "@/hooks/useProjects";
import MetaTags from "@/components/MetaTags";

const ProjectDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const { data: project, isLoading, error } = useProject(slug);

  if (isLoading) {
    return (
      <>
        <MetaTags
          title="Loading Project | Marc Janer"
          description="Loading project details..."
          image="/og-image.png"
        />
        <div className="container mx-auto px-6 py-20">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-muted-foreground">Loading project details...</p>
          </div>
        </div>
      </>
    );
  }

  if (error || !project) {
    return (
      <>
        <MetaTags
          title="Project Not Found | Marc Janer"
          description="The project you're looking for doesn't exist or has been removed."
          image="/og-image.png"
        />
        <div className="container mx-auto px-6 py-20">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl font-bold mb-6">Project Not Found</h1>
            <p className="text-muted-foreground mb-8">
              The project you're looking for doesn't exist or has been removed.
            </p>
            <Link to="/projects">
              <Button>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Projects
              </Button>
            </Link>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <MetaTags
        title={`${project.title} | Marc Janer`}
        description={project.description}
        image={project.featuredImage}
        type="article"
      />
      <div className="container mx-auto px-6 py-12 md:py-20">
        <Link
          to="/projects"
          className="inline-flex items-center text-sm text-primary hover:underline mb-8"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Projects
        </Link>

        <div className="max-w-4xl mx-auto">
          <div className="bg-card rounded-xl overflow-hidden shadow-md mb-10">
            <img
              src={project.featuredImage}
              alt={project.title}
              className="w-full aspect-video object-cover"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = "/placeholder.svg";
              }}
            />
          </div>

          <div className="mb-6">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              {project.title}
            </h1>
            <p className="text-muted-foreground">{project.description}</p>
          </div>

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
            <div className="flex flex-wrap gap-2">
              {project.technologies &&
                project.technologies.map((tech, index) => (
                  <span
                    key={index}
                    className="bg-secondary text-secondary-foreground text-xs font-medium px-3 py-1 rounded-full"
                  >
                    {tech}
                  </span>
                ))}
            </div>
            <div className="flex flex-wrap gap-4">
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm bg-secondary hover:bg-secondary/80 px-4 py-2 rounded-md transition-colors"
                >
                  <Github size={16} /> View on GitHub
                </a>
              )}
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm bg-primary text-background hover:bg-primary/90 px-4 py-2 rounded-md transition-colors"
                >
                  <ExternalLink size={16} /> Live Demo
                </a>
              )}
            </div>
          </div>

          <div
            className="prose dark:prose-invert max-w-none mb-16 
            [&_pre]:bg-secondary/50 [&_pre]:p-6 [&_pre]:rounded-lg [&_pre]:overflow-x-auto 
            [&_code]:text-sm [&_code]:font-mono [&_code:not(pre_code)]:bg-secondary/50 [&_code:not(pre_code)]:px-1.5 [&_code:not(pre_code)]:py-0.5 [&_code:not(pre_code)]:rounded
            [&_h1]:text-3xl [&_h1]:font-bold [&_h1]:mt-8 [&_h1]:mb-4
            [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:mt-8 [&_h2]:mb-4
            [&_h3]:text-xl [&_h3]:font-bold [&_h3]:mt-6 [&_h3]:mb-3
            [&_p]:text-muted-foreground [&_p]:leading-relaxed [&_p]:mb-4
            [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:mb-4
            [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:mb-4
            [&_li]:text-muted-foreground [&_li]:mb-2
            [&_blockquote]:border-l-4 [&_blockquote]:border-primary/50 [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:text-muted-foreground [&_blockquote]:my-4
            [&_a]:text-primary [&_a]:hover:underline
            [&_strong]:font-bold [&_strong]:text-foreground
            [&_em]:italic
            [&_hr]:my-8 [&_hr]:border-border"
          >
            <ReactMarkdown>{project.content}</ReactMarkdown>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProjectDetail;
