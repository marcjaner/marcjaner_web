
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import ThemeToggle from '../ThemeToggle';
import MenuItem from './MenuItem';

export const DesktopNav = () => {
  const location = useLocation();
  
  return (
    <div className="hidden md:flex items-center gap-8">
      <MenuItem 
        to="/projects"
        label="Projects"
        isActive={location.pathname.includes("/projects")}
        fontSize="font-medium"
      />
      <MenuItem 
        to="/blog"
        label="Blog"
        isActive={location.pathname.includes("/blog")}
        fontSize="font-medium"
      />
      <MenuItem 
        to="/contact"
        label="Contact"
        isActive={location.pathname === "/contact"}
        fontSize="font-medium"
      />
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
