
import React from 'react';
import { Link } from 'react-router-dom';

export const Logo = () => {
  return (
    <Link 
      to="/"
      className="text-xl font-semibold tracking-tight cursor-pointer"
    >
      Marc Janer
    </Link>
  );
};

export default Logo;
