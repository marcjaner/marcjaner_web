
import React from "react";
import { Link } from "react-router-dom";
import { Home } from "lucide-react";

const NotFound = () => {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center px-6">
      <div className="text-center max-w-md mx-auto">
        <h1 className="text-8xl font-bold text-primary mb-6 reveal">404</h1>
        <h2 className="text-2xl font-bold mb-4 reveal stagger-1">Page Not Found</h2>
        <p className="text-muted-foreground mb-8 reveal stagger-2">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-md hover:bg-primary/90 transition-colors reveal stagger-3"
        >
          <Home size={18} /> Back to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
