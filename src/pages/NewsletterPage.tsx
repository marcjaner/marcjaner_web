import React, { useState } from "react";
import { Mail, Check } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { useNewsletter } from "@/hooks/useNewsletter";

const NewsletterPage = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const newsletterMutation = useNewsletter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await newsletterMutation.mutateAsync({ email });
      setSubmitted(true);
      setEmail("");
      toast({
        title: "Success!",
        description: "Thank you for subscribing to the newsletter!",
      });
    } catch (error) {
      console.error("Error submitting newsletter form:", error);
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
    <>
      <section className="py-32">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12 reveal">
              <h1 className="text-4xl font-bold mb-6 text-foreground/90">
                Subscribe to my Newsletter
              </h1>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Stay up to date with my latest projects, blog posts, and
                insights on data engineering, software development, and more.
              </p>
            </div>

            <div className="glass-panel rounded-2xl p-8 shadow-sm accent-glow reveal stagger-1">
              {!submitted ? (
                <form onSubmit={handleSubmit}>
                  <div className="mb-6">
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium mb-2"
                    >
                      Email Address
                    </label>
                    <div className="flex flex-col sm:flex-row gap-2 sm:gap-0">
                      <div className="relative flex-grow">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                          <Mail className="text-aquamarine-400" size={18} />
                        </div>
                        <input
                          type="email"
                          id="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full bg-secondary/50 dark:bg-black/50 border border-aquamarine-700/30 rounded-md sm:rounded-l-md sm:rounded-r-none pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-aquamarine-500/30"
                          placeholder="your@email.com"
                          required
                        />
                      </div>
                      <button
                        type="submit"
                        disabled={newsletterMutation.isPending}
                        className="bg-primary text-background font-medium px-6 py-3 rounded-md sm:rounded-l-none sm:rounded-r-md hover:bg-primary/90 transition-colors disabled:opacity-70"
                      >
                        {newsletterMutation.isPending
                          ? "Subscribing..."
                          : "Subscribe"}
                      </button>
                    </div>
                  </div>

                  <div className="text-sm text-muted-foreground">
                    <p>I'll send you occasional updates about:</p>
                    <ul className="mt-2 space-y-2">
                      <li className="flex items-center gap-2">
                        <Check size={16} className="text-aquamarine-400" />
                        <span>New projects and case studies</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check size={16} className="text-aquamarine-400" />
                        <span>Data engineering tutorials and guides</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check size={16} className="text-aquamarine-400" />
                        <span>Software development insights</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check size={16} className="text-aquamarine-400" />
                        <span>Resources I find useful</span>
                      </li>
                    </ul>
                  </div>
                </form>
              ) : (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-aquamarine-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Check size={32} className="text-aquamarine-400" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">
                    Thank you for subscribing!
                  </h3>
                  <p className="text-muted-foreground">
                    You're now on the list. Look out for the next newsletter in
                    your inbox!
                  </p>
                </div>
              )}
            </div>

            <div className="mt-12 text-center reveal stagger-2">
              <p className="text-sm text-muted-foreground">
                Your email is safe with me. I respect your privacy and will
                never share your information.
                <br />
                You can unsubscribe at any time.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default NewsletterPage;
