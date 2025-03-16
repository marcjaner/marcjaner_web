
import React, { useState } from 'react';
import { Mail, Check } from 'lucide-react';
import { toast } from "@/hooks/use-toast";

const NewsletterPage = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await fetch('/.netlify/functions/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email,
          formType: 'newsletter'
        })
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setSubmitted(true);
        setEmail('');
        toast({
          title: "Success!",
          description: data.message || "Thank you for subscribing to the newsletter!",
        });
      } else {
        throw new Error(data.error || 'Something went wrong');
      }
    } catch (error) {
      console.error('Error submitting newsletter form:', error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to subscribe. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <section className="py-32">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12 reveal">
              <h1 className="text-4xl font-bold mb-6 text-foreground/90">Subscribe to my Newsletter</h1>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Stay up to date with my latest projects, blog posts, and insights on data engineering,
                software development, and more.
              </p>
            </div>
            
            <div className="bg-gradient-to-b from-aquamarine-50 to-aquamarine-100 dark:from-aquamarine-900/70 dark:to-aquamarine-950/70 backdrop-blur-sm border border-aquamarine-200 dark:border-aquamarine-800/30 rounded-2xl p-8 shadow-sm accent-glow reveal stagger-1">
              {!submitted ? (
                <form onSubmit={handleSubmit}>
                  <div className="mb-6">
                    <label htmlFor="email" className="block text-sm font-medium mb-2">
                      Email Address
                    </label>
                    <div className="flex">
                      <div className="relative flex-grow">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                          <Mail className="text-aquamarine-600 dark:text-aquamarine-400" size={18} />
                        </div>
                        <input
                          type="email"
                          id="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full bg-white/70 dark:bg-aquamarine-950/30 border border-aquamarine-300 dark:border-aquamarine-700/50 rounded-l-md pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-aquamarine-400/30"
                          placeholder="your@email.com"
                          required
                        />
                      </div>
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="bg-aquamarine-500 text-white px-6 py-3 rounded-r-md font-medium hover:bg-aquamarine-600 transition-colors disabled:opacity-70"
                      >
                        {isSubmitting ? 'Subscribing...' : 'Subscribe'}
                      </button>
                    </div>
                  </div>
                  
                  <div className="text-sm text-muted-foreground">
                    <p>
                      I'll send you occasional updates about:
                    </p>
                    <ul className="mt-2 space-y-2">
                      <li className="flex items-center gap-2">
                        <Check size={16} className="text-aquamarine-600 dark:text-aquamarine-400" />
                        <span>New projects and case studies</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check size={16} className="text-aquamarine-600 dark:text-aquamarine-400" />
                        <span>Data engineering tutorials and guides</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check size={16} className="text-aquamarine-600 dark:text-aquamarine-400" />
                        <span>Software development insights</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check size={16} className="text-aquamarine-600 dark:text-aquamarine-400" />
                        <span>Resources I find useful</span>
                      </li>
                    </ul>
                  </div>
                </form>
              ) : (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-aquamarine-500/10 dark:bg-aquamarine-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Check size={32} className="text-aquamarine-600 dark:text-aquamarine-400" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">Thank you for subscribing!</h3>
                  <p className="text-muted-foreground">
                    You're now on the list. Look out for the next newsletter in your inbox!
                  </p>
                </div>
              )}
            </div>
            
            <div className="mt-12 text-center reveal stagger-2">
              <p className="text-sm text-muted-foreground">
                Your email is safe with me. I respect your privacy and will never share your information.
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
