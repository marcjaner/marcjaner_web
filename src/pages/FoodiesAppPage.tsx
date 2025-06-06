import React from "react";
import MetaTags from "@/components/MetaTags";
import { Link } from "react-router-dom";

const FoodiesAppPage = () => {
  return (
    <>
      <MetaTags
        title="Foodies App - Support"
        description="Need help or have any questions about Foodies? Contact our support team for assistance."
      />
      <section className="py-20">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl font-bold mb-4">
            Welcome to Foodies Support
          </h1>
          <p className="mb-6">
            Foodies is the perfect place to share your dining adventures. If you
            need help or have any questions, we're here to support you.
          </p>
          <Link
            to="/contact"
            className="bg-primary text-primary-foreground px-6 py-3 rounded-md font-medium hover:bg-primary/90 transition-colors"
          >
            Contact Support
          </Link>
        </div>
      </section>
    </>
  );
};

export default FoodiesAppPage;
