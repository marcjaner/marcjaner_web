
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
          "link-underline font-medium text-foreground/80 hover:text-foreground cursor-pointer relative",
          location.pathname.includes("/projects") && "text-foreground after:bg-primary after:w-full"
        )}
      >
        Projects
      </Link>
      <Link 
        to="/blog" 
        className={cn(
          "link-underline font-medium text-foreground/80 hover:text-foreground cursor-pointer relative",
          location.pathname.includes("/blog") && "text-foreground after:bg-primary after:w-full"
        )}
      >
        Blog
      </Link>
      <Link 
        to="/contact" 
        className={cn(
          "link-underline font-medium text-foreground/80 hover:text-foreground cursor-pointer relative",
          location.pathname === "/contact" && "text-foreground after:bg-primary after:w-full"
        )}
      >
        Contact
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
