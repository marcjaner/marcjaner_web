
import React from "react";
import FooterContent from "./footer/FooterContent";
import FooterCopyright from "./footer/FooterCopyright";

export const Footer = () => {
  return (
    <footer className="py-16 bg-secondary/30 dark:bg-secondary/10">
      <div className="container mx-auto px-6">
        <FooterContent />
        <FooterCopyright />
      </div>
    </footer>
  );
};

export default Footer;
