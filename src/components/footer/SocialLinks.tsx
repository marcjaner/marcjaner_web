
import React from "react";
import { Github, Linkedin, Twitter, Mail } from "lucide-react";

interface SocialLink {
  href: string;
  icon: React.ReactNode;
  label: string;
}

export const SocialLinks = () => {
  const socialLinks: SocialLink[] = [
    {
      href: "https://github.com/marcjaner",
      icon: <Github size={20} />,
      label: "GitHub",
    },
    {
      href: "https://www.linkedin.com/in/marc-janer",
      icon: <Linkedin size={20} />,
      label: "LinkedIn",
    },
    {
      href: "https://x.com/marcjaner",
      icon: <Twitter size={20} />,
      label: "Twitter",
    },
    {
      href: "mailto:marcjanerferrer@gmail.com",
      icon: <Mail size={20} />,
      label: "Email",
    },
  ];

  return (
    <div className="flex space-x-4">
      {socialLinks.map((link) => (
        <a
          key={link.label}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-muted-foreground hover:text-foreground transition-colors"
          aria-label={link.label}
        >
          {link.icon}
        </a>
      ))}
    </div>
  );
};

export default SocialLinks;
