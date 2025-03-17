
import React from "react";
import { Link } from "react-router-dom";

interface FooterLink {
  to: string;
  label: string;
}

export const FooterLinks = () => {
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
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default FooterLinks;
