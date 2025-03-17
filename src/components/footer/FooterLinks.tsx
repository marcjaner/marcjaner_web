
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

interface FooterLink {
  to: string;
  label: string;
}

export const FooterLinks = () => {
  const location = useLocation();
  const links: FooterLink[] = [
    { to: "/", label: "Home" },
    { to: "/projects", label: "Projects" },
    { to: "/blog", label: "Blog" },
    { to: "/contact", label: "Contact" },
  ];

  return (
    <ul className="space-y-2">
      {links.map((link) => (
        <li key={link.label}>
          <Link
            to={link.to}
            className={cn(
              "text-muted-foreground hover:text-foreground transition-colors relative group",
              (location.pathname === link.to || 
               (link.to !== "/" && location.pathname.includes(link.to))) && 
               "text-foreground"
            )}
          >
            {link.label}
            <span className={cn(
              "absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full",
              (location.pathname === link.to || 
               (link.to !== "/" && location.pathname.includes(link.to))) && 
               "w-full"
            )}></span>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default FooterLinks;
