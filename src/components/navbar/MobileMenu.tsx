
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MobileMenuProps {
  isOpen: boolean;
  toggleNav: () => void;
}

export const MobileMenu = ({ isOpen, toggleNav }: MobileMenuProps) => {
  const location = useLocation();

  return (
    <div 
      className={cn(
        "fixed inset-0 z-[100] transition-all duration-300 transform",
        isOpen ? "translate-y-0 opacity-100" : "translate-y-full opacity-0 pointer-events-none"
      )}
    >
      {/* Dark overlay with blur effect */}
      <div className="absolute inset-0 mobile-menu"></div>
      
      <div className="relative z-[101] container mx-auto px-6 py-6 flex justify-end">
        <button 
          onClick={toggleNav}
          className="p-2 focus:outline-none text-primary"
          aria-label="Close menu"
        >
          <X size={28} />
        </button>
      </div>
      
      <div className="relative z-[101] flex-1 flex flex-col items-center justify-center gap-10 p-8">
        <Link 
          to="/projects" 
          className={cn(
            "text-3xl font-medium cursor-pointer hover:text-primary transition-colors relative group",
            location.pathname.includes("/projects") && "text-primary"
          )}
          onClick={toggleNav}
        >
          Projects
          <span className={cn(
            "absolute bottom-0 left-1/2 -translate-x-1/2 w-1/3 h-0.5 bg-primary transition-all duration-300 group-hover:opacity-100 opacity-0",
            location.pathname.includes("/projects") && "opacity-100 h-1"
          )}></span>
        </Link>
        <Link 
          to="/blog" 
          className={cn(
            "text-3xl font-medium cursor-pointer hover:text-primary transition-colors relative group",
            location.pathname.includes("/blog") && "text-primary"
          )}
          onClick={toggleNav}
        >
          Blog
          <span className={cn(
            "absolute bottom-0 left-1/2 -translate-x-1/2 w-1/3 h-0.5 bg-primary transition-all duration-300 group-hover:opacity-100 opacity-0",
            location.pathname.includes("/blog") && "opacity-100 h-1"
          )}></span>
        </Link>
        <Link 
          to="/contact" 
          className={cn(
            "text-3xl font-medium cursor-pointer hover:text-primary transition-colors relative group",
            location.pathname === "/contact" && "text-primary"
          )}
          onClick={toggleNav}
        >
          Contact
          <span className={cn(
            "absolute bottom-0 left-1/2 -translate-x-1/2 w-1/3 h-0.5 bg-primary transition-all duration-300 group-hover:opacity-100 opacity-0",
            location.pathname === "/contact" && "opacity-100 h-1"
          )}></span>
        </Link>
        <Link 
          to="/newsletter" 
          className="mt-6 bg-primary text-primary-foreground py-3 px-8 rounded-md w-full max-w-xs text-center text-xl cursor-pointer transition-colors hover:bg-primary/90"
          onClick={toggleNav}
        >
          Newsletter
        </Link>
      </div>
    </div>
  );
};

export default MobileMenu;
