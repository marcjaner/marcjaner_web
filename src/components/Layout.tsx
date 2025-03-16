
import React, { useEffect } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { initScrollReveal } from '@/lib/utils';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  useEffect(() => {
    // Implement scroll reveal animation using the utility function
    const cleanup = initScrollReveal();
    return cleanup;
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-20">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
