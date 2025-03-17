
import React from "react";
import { Link } from "react-router-dom";
import { Separator } from "@/components/ui/separator";

export const FooterCopyright = () => {
  const currentYear = new Date().getFullYear();

  return (
    <>
      <Separator className="my-6" />
      <div className="flex flex-col md:flex-row justify-between items-center">
        <p className="text-sm text-muted-foreground">
          © {currentYear} Marc Janer. All rights reserved.
        </p>
        <div className="mt-4 md:mt-0">
          <Link
            to="/newsletter"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Subscribe to Newsletter
          </Link>
        </div>
      </div>
    </>
  );
};

export default FooterCopyright;
