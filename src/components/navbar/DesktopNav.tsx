
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import ThemeToggle from '../ThemeToggle';

export const DesktopNav = () => {
  const location = useLocation();
  
  return (
    <div className="hidden md:flex items-center gap-8">
      <Link 
        to="/projects" 
        className={cn(
          "link-underline font-medium text-foreground/80 hover:text-foreground cursor-pointer relative group",
          location.pathname.includes("/projects") && "text-foreground"
        )}
      >
        Projects
        <span className={cn(
          "absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-0.5 bg-primary transition-all duration-300 group-hover:w-1/2 group-hover:opacity-100 opacity-0",
          location.pathname.includes("/projects") && "opacity-100 h-1"
        )}></span>
      </Link>
      <Link 
        to="/blog" 
        className={cn(
          "link-underline font-medium text-foreground/80 hover:text-foreground cursor-pointer relative group",
          location.pathname.includes("/blog") && "text-foreground"
        )}
      >
        Blog
        <span className={cn(
          "absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-0.5 bg-primary transition-all duration-300 group-hover:w-1/2 group-hover:opacity-100 opacity-0",
          location.pathname.includes("/blog") && "opacity-100 h-1"
        )}></span>
      </Link>
      <Link 
        to="/contact" 
        className={cn(
          "link-underline font-medium text-foreground/80 hover:text-foreground cursor-pointer relative group",
          location.pathname === "/contact" && "text-foreground"
        )}
      >
        Contact
        <span className={cn(
          "absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-0.5 bg-primary transition-all duration-300 group-hover:w-1/2 group-hover:opacity-100 opacity-0",
          location.pathname === "/contact" && "opacity-100 h-1"
        )}></span>
      </Link>
      <Link 
        to="/newsletter" 
        className="bg-primary text-primary-foreground py-2 px-4 rounded-md transition-colors hover:bg-primary/90 cursor-pointer"
      >
        Newsletter
      </Link>
      <ThemeToggle />
    </div>
  );
};

export default DesktopNav;
