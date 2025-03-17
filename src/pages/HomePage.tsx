
import React from 'react';
import HeroSection from '@/components/home/HeroSection';
import AboutSection from '@/components/home/AboutSection';
import ProjectsSection from '@/components/home/ProjectsSection';
import BlogSection from '@/components/home/BlogSection';
import NewsletterSection from '@/components/home/NewsletterSection';

const HomePage = () => {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <ProjectsSection />
      <BlogSection />
      <NewsletterSection />
    </>
  );
};

export default HomePage;
