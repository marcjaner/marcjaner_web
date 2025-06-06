import React, { useState, useEffect } from "react";
import { useNewsletter } from "@/hooks/useNewsletter";
import { toast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

const NewsletterSection = () => {
  const [email, setEmail] = useState("");
  const newsletterMutation = useNewsletter();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await newsletterMutation.mutateAsync({ email });
      setEmail("");
      toast({
        title: "Success!",
        description: "Thank you for subscribing to the newsletter!",
      });
    } catch (error) {
      toast({
        title: "Error",
        description:
          error instanceof Error
            ? error.message
            : "Failed to subscribe. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <section className="py-20">
      <div className="container mx-auto px-6">
        <div
          className={cn(
            "max-w-3xl mx-auto bg-card border border-border rounded-2xl p-8 md:p-12 reveal",
            isVisible ? "active" : ""
          )}
        >
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
            <p className="text-muted-foreground">
              Subscribe to my newsletter for the latest updates on projects,
              blog posts, and more.
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-4"
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email address"
              className="flex-grow bg-secondary/50 border border-border rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/20"
              required
            />
            <button
              type="submit"
              disabled={newsletterMutation.isPending}
              className="bg-primary text-primary-foreground px-6 py-3 rounded-md font-medium hover:bg-primary/90 transition-colors disabled:opacity-70"
            >
              {newsletterMutation.isPending ? "Subscribing..." : "Subscribe"}
            </button>
          </form>

          <p className="text-xs text-muted-foreground mt-4 text-center">
            I respect your privacy. Unsubscribe at any time.
          </p>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSection;
