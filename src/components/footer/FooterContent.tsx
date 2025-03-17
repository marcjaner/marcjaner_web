
import React from "react";
import FooterLinks from "./FooterLinks";
import SocialLinks from "./SocialLinks";

export const FooterContent = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
      <div className="col-span-1 md:col-span-2">
        <h3 className="text-xl font-semibold mb-4">Marc Janer</h3>
        <p className="text-muted-foreground max-w-md">
          Data engineer student and software developer building tools and
          exploring data. Let's connect and create something amazing
          together.
        </p>
      </div>

      <div>
        <h4 className="font-medium mb-4">Quick Links</h4>
        <FooterLinks />
      </div>

      <div>
        <h4 className="font-medium mb-4">Connect</h4>
        <SocialLinks />
      </div>
    </div>
  );
};

export default FooterContent;
