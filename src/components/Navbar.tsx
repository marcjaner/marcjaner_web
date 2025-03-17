
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';
import Logo from './navbar/Logo';
import DesktopNav from './navbar/DesktopNav';
import MobileNavToggle from './navbar/MobileNavToggle';
import MobileMenu from './navbar/MobileMenu';

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const isMobile = useIsMobile();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    if (isOpen) {
      setIsOpen(false);
      document.body.style.overflow = 'auto';
    }
  }, [location.pathname]);

  const toggleNav = () => {
    setIsOpen(!isOpen);
    // Prevent scrolling when menu is open
    document.body.style.overflow = isOpen ? 'auto' : 'hidden';
  };

  return (
    <>
      <header 
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          scrolled ? "py-3 glass-panel accent-glow" : "py-5 bg-transparent"
        )}
      >
        <div className="container mx-auto px-6">
          <nav className="flex items-center justify-between">
            <Logo />
            <DesktopNav />
            <MobileNavToggle isOpen={isOpen} toggleNav={toggleNav} />
          </nav>
        </div>
      </header>

      {/* Moved the MobileMenu outside of the header to ensure it can have a proper z-index */}
      <MobileMenu isOpen={isOpen} toggleNav={toggleNav} />
    </>
  );
};

export default Navbar;
