
import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import { initScrollReveal } from '@/lib/utils';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  
  useEffect(() => {
    // Implement scroll reveal animation using the utility function
    const cleanup = initScrollReveal();
    return cleanup;
  }, [location.pathname]); // Re-initialize scroll reveal when route changes

  // Add effect to scroll to top when route changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-20" key={location.pathname}>
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
