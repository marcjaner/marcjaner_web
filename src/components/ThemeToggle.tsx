
import React, { useState, useEffect } from 'react';
import { Moon, Sun } from 'lucide-react';
import { cn } from '@/lib/utils';

export const ThemeToggle = ({ className }: { className?: string }) => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Check if user preference is set
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      document.documentElement.classList.add('dark');
      setIsDark(true);
    }
  }, []);

  const toggleTheme = () => {
    if (isDark) {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
      setIsDark(false);
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      setIsDark(true);
    }
  };

  return (
    <button 
      onClick={toggleTheme}
      className={cn(
        "p-2 rounded-full transition-colors duration-200",
        "hover:bg-secondary text-foreground",
        "focus:outline-none focus:ring-2 focus:ring-primary/20",
        className
      )}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
    >
      {isDark ? (
        <Sun size={20} className="transition-transform duration-200" />
      ) : (
        <Moon size={20} className="transition-transform duration-200" />
      )}
    </button>
  );
};

export default ThemeToggle;
