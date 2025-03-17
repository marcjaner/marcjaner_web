
import React from 'react';
import { Menu, X } from 'lucide-react';
import ThemeToggle from '../ThemeToggle';

interface MobileNavToggleProps {
  isOpen: boolean;
  toggleNav: () => void;
}

export const MobileNavToggle = ({ isOpen, toggleNav }: MobileNavToggleProps) => {
  return (
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
  );
};

export default MobileNavToggle;
