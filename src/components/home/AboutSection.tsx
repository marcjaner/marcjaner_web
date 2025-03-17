
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Database, Code } from 'lucide-react';

const AboutSection = () => {
  return (
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
  );
};

export default AboutSection;
