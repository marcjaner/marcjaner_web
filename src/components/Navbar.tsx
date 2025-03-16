
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const isMobile = useIsMobile();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleNav = () => {
    setIsOpen(!isOpen);
    // Prevent scrolling when menu is open
    document.body.style.overflow = isOpen ? 'auto' : 'hidden';
  };

  const handleNavigation = (path: string) => {
    navigate(path);
    if (isOpen) toggleNav();
  };

  return (
    <header 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled ? "py-3 glass-panel" : "py-5 bg-transparent"
      )}
    >
      <div className="container mx-auto px-6">
        <nav className="flex items-center justify-between">
          <button 
            onClick={() => handleNavigation('/')}
            className="text-xl font-semibold tracking-tight cursor-pointer"
          >
            Marc Janer
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <button 
              onClick={() => handleNavigation('/')} 
              className="link-underline font-medium text-foreground/80 hover:text-foreground cursor-pointer"
            >
              Home
            </button>
            <button 
              onClick={() => handleNavigation('/projects')} 
              className="link-underline font-medium text-foreground/80 hover:text-foreground cursor-pointer"
            >
              Projects
            </button>
            <button 
              onClick={() => handleNavigation('/blog')} 
              className="link-underline font-medium text-foreground/80 hover:text-foreground cursor-pointer"
            >
              Blog
            </button>
            <button 
              onClick={() => handleNavigation('/contact')} 
              className="link-underline font-medium text-foreground/80 hover:text-foreground cursor-pointer"
            >
              Contact
            </button>
            <button 
              onClick={() => handleNavigation('/newsletter')} 
              className="bg-primary text-primary-foreground py-2 px-4 rounded-md transition-colors hover:bg-primary/90 cursor-pointer"
            >
              Newsletter
            </button>
            <ThemeToggle />
          </div>

          {/* Mobile Navigation Toggle */}
          <div className="flex items-center gap-4 md:hidden">
            <ThemeToggle />
            <button 
              onClick={toggleNav}
              className="p-2 focus:outline-none"
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile Menu */}
      {isMobile && (
        <div 
          className={cn(
            "fixed inset-0 bg-background glass-panel transition-all duration-300 transform pt-20",
            isOpen ? "translate-x-0" : "translate-x-full"
          )}
        >
          <div className="flex flex-col items-center gap-8 p-8">
            <button 
              onClick={() => handleNavigation('/')} 
              className="text-2xl font-medium cursor-pointer"
            >
              Home
            </button>
            <button 
              onClick={() => handleNavigation('/projects')} 
              className="text-2xl font-medium cursor-pointer"
            >
              Projects
            </button>
            <button 
              onClick={() => handleNavigation('/blog')} 
              className="text-2xl font-medium cursor-pointer"
            >
              Blog
            </button>
            <button 
              onClick={() => handleNavigation('/contact')} 
              className="text-2xl font-medium cursor-pointer"
            >
              Contact
            </button>
            <button 
              onClick={() => handleNavigation('/newsletter')} 
              className="bg-primary text-primary-foreground py-3 px-6 rounded-md w-full text-center text-xl cursor-pointer"
            >
              Newsletter
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
