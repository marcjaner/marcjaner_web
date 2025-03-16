
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Code, Database, ExternalLink } from 'lucide-react';
import { cn } from '@/lib/utils';

const HomePage = () => {
  return (
    <>
      {/* Hero Section */}
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center">
            <div className="mb-6 reveal">
              <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
                Data Engineer & Developer
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 reveal stagger-1">
              Building bridges between <span className="text-primary">data</span> and <span className="text-primary">code</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 reveal stagger-2">
              I'm Marc, a data engineer student and software developer passionate about creating 
              meaningful projects that solve real problems.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center reveal stagger-3">
              <Link 
                to="/projects" 
                className="bg-primary text-primary-foreground px-6 py-3 rounded-md font-medium hover:bg-primary/90 transition-colors"
              >
                View My Projects
              </Link>
              <Link 
                to="/contact" 
                className="bg-secondary text-secondary-foreground px-6 py-3 rounded-md font-medium hover:bg-secondary/80 transition-colors"
              >
                Get In Touch
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-secondary/30 dark:bg-secondary/10">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="mb-12 text-center reveal">
              <h2 className="text-3xl font-bold mb-4">About Me</h2>
              <div className="h-1 w-20 bg-primary mx-auto"></div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="reveal">
                <div className="aspect-square rounded-2xl overflow-hidden bg-muted/50">
                  {/* Placeholder for profile image */}
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/5 to-primary/10">
                    <span className="text-center text-muted-foreground">Profile Image</span>
                  </div>
                </div>
              </div>
              
              <div className="reveal stagger-1">
                <h3 className="text-2xl font-bold mb-4">
                  Hi there! <span className="inline-block animate-wave origin-bottom-right">👋</span>
                </h3>
                <p className="text-muted-foreground mb-4">
                  I'm a data engineering student with a passion for building software solutions. 
                  I love working at the intersection of data and software development, creating 
                  tools that make data more accessible and useful.
                </p>
                <p className="text-muted-foreground mb-6">
                  When I'm not coding or studying, you'll find me working on side projects, 
                  exploring new technologies, or sharing my knowledge through blog posts.
                </p>
                
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="flex items-center gap-2">
                    <Database size={20} className="text-primary" />
                    <span>Data Engineering</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Code size={20} className="text-primary" />
                    <span>Software Development</span>
                  </div>
                </div>
                
                <Link 
                  to="/contact" 
                  className="inline-flex items-center gap-2 text-primary hover:underline"
                >
                  Let's connect <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Projects Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto mb-12 text-center reveal">
            <h2 className="text-3xl font-bold mb-4">Featured Projects</h2>
            <p className="text-muted-foreground">A selection of my latest work and side projects</p>
            <div className="h-1 w-20 bg-primary mx-auto mt-4"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((item) => (
              <div 
                key={item} 
                className={cn(
                  "bg-card border border-border rounded-xl overflow-hidden hover-card reveal",
                  `stagger-${item}`
                )}
              >
                <div className="aspect-video bg-muted">
                  {/* Project image placeholder */}
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/5 to-primary/10">
                    <span className="text-muted-foreground">Project Image</span>
                  </div>
                </div>
                <div className="p-6">
                  <div className="mb-4">
                    <span className="text-xs font-medium bg-secondary px-2 py-1 rounded">
                      Data Visualization
                    </span>
                  </div>
                  <h3 className="text-xl font-bold mb-2">Project Name {item}</h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    A brief description of the project, what technologies were used,
                    and what problems it solves.
                  </p>
                  <div className="flex justify-between items-center">
                    <Link 
                      to={`/projects/project-${item}`} 
                      className="text-primary hover:underline text-sm font-medium"
                    >
                      View Details
                    </Link>
                    <a 
                      href="#" 
                      className="text-muted-foreground hover:text-foreground"
                      aria-label="External Link"
                    >
                      <ExternalLink size={16} />
                    </a>
                  </div>
                </div>
              </div>
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

      {/* Latest Blog Posts Section */}
      <section className="py-20 bg-secondary/30 dark:bg-secondary/10">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto mb-12 text-center reveal">
            <h2 className="text-3xl font-bold mb-4">Latest Blog Posts</h2>
            <p className="text-muted-foreground">Thoughts, tutorials, and insights</p>
            <div className="h-1 w-20 bg-primary mx-auto mt-4"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {[1, 2].map((item) => (
              <div 
                key={item} 
                className={cn(
                  "bg-card border border-border rounded-xl overflow-hidden hover-card reveal",
                  `stagger-${item}`
                )}
              >
                <div className="p-6">
                  <div className="mb-4 flex justify-between items-center">
                    <span className="text-xs font-medium bg-secondary px-2 py-1 rounded">
                      Data Engineering
                    </span>
                    <span className="text-xs text-muted-foreground">
                      May {item + 10}, 2023
                    </span>
                  </div>
                  <h3 className="text-xl font-bold mb-2">Blog Post Title {item}</h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    A short excerpt from the blog post that gives readers a preview 
                    of what they can expect from the full article.
                  </p>
                  <Link 
                    to={`/blog/post-${item}`} 
                    className="text-primary hover:underline text-sm font-medium"
                  >
                    Read More
                  </Link>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12 reveal">
            <Link 
              to="/blog" 
              className="inline-flex items-center gap-2 bg-secondary px-6 py-3 rounded-md hover:bg-secondary/80 transition-colors"
            >
              Read All Posts <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto bg-card border border-border rounded-2xl p-8 md:p-12 reveal">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
              <p className="text-muted-foreground">
                Subscribe to my newsletter for the latest updates on projects, blog posts, and more.
              </p>
            </div>
            
            <form className="flex flex-col sm:flex-row gap-4">
              <input 
                type="email" 
                placeholder="Your email address" 
                className="flex-grow bg-secondary/50 border border-border rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/20"
                required
              />
              <button 
                type="submit" 
                className="bg-primary text-primary-foreground px-6 py-3 rounded-md font-medium hover:bg-primary/90 transition-colors"
              >
                Subscribe
              </button>
            </form>
            
            <p className="text-xs text-muted-foreground mt-4 text-center">
              I respect your privacy. Unsubscribe at any time.
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default HomePage;
