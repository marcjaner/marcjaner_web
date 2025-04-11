import React from "react";
import HeroSection from "@/components/home/HeroSection";
import AboutSection from "@/components/home/AboutSection";
import ProjectsSection from "@/components/home/ProjectsSection";
import BlogSection from "@/components/home/BlogSection";
import NewsletterSection from "@/components/home/NewsletterSection";
import MetaTags from "@/components/MetaTags";

const HomePage = () => {
  return (
    <>
      <MetaTags
        title="Marc Janer | Data Engineer & Software Developer"
        description="Personal website of Marc Janer, a data engineer and software developer building tools and exploring data."
        image="/images/home/marc_janer.jpg"
      />
      <HeroSection />
      <AboutSection />
      <ProjectsSection />
      <BlogSection />
      <NewsletterSection />
    </>
  );
};

export default HomePage;
