import React from "react";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <section className="py-20 md:py-32">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto text-center">
          <div className="mb-6 reveal">
            <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
              Data Engineer & Developer
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 reveal stagger-1">
            Building bridges between <span className="text-primary">data</span>{" "}
            and <span className="text-primary">code</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 reveal stagger-2">
            I'm Marc, a data engineer student and software developer passionate
            about creating meaningful projects that solve real problems.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center reveal stagger-3">
            <Link
              to="/projects"
              className="bg-primary text-transparent bg-clip-text px-6 py-3 rounded-md font-medium hover:bg-primary/90 transition-colors"
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
  );
};

export default HeroSection;
