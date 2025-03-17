
import React from "react";
import { useLocation } from "react-router-dom";
import MenuItem from "../navbar/MenuItem";

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
          <MenuItem
            to={link.to}
            label={link.label}
            isActive={
              location.pathname === link.to ||
              (link.to !== "/" && location.pathname.includes(link.to))
            }
            textColor="text-muted-foreground"
          />
        </li>
      ))}
    </ul>
  );
};

export default FooterLinks;
