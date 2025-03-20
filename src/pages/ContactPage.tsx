import React, { useState } from "react";
import { Mail, Send } from "lucide-react";
import { useContactForm } from "../hooks/useContactForm";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const contactMutation = useContactForm();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await contactMutation.mutateAsync({
        ...formData,
        formType: "contact",
      });

      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <>
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12 reveal">
              <h1 className="text-4xl font-bold mb-4">Get In Touch</h1>
              <p className="text-muted-foreground">
                Have a question or want to work together? Send me a message!
              </p>
              <div className="h-1 w-20 bg-primary mx-auto mt-4"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="md:col-span-1 reveal">
                <div className="bg-card border border-border rounded-xl p-6">
                  <div className="mb-6">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                      <Mail size={24} className="text-primary" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">Email</h3>
                    <p className="text-muted-foreground mb-2">
                      Feel free to email me directly
                    </p>
                    <a
                      href="mailto:marcjanerferrer@gmail.com"
                      className="text-primary hover:underline"
                    >
                      marcjanerferrer@gmail.com
                    </a>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold mb-4">Connect</h3>
                    <div className="flex space-x-4">
                      <a
                        href="https://github.com/marcjaner"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 border border-border rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary transition-colors"
                        aria-label="GitHub"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path>
                          <path d="M9 18c-4.51 2-5-2-7-2"></path>
                        </svg>
                      </a>
                      <a
                        href="https://www.linkedin.com/in/marc-janer"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 border border-border rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary transition-colors"
                        aria-label="LinkedIn"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                          <rect width="4" height="12" x="2" y="9"></rect>
                          <circle cx="4" cy="4" r="2"></circle>
                        </svg>
                      </a>
                      <a
                        href="https://x.com/marcjaner"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 border border-border rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary transition-colors"
                        aria-label="Twitter"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <div className="md:col-span-2 reveal stagger-1">
                <div className="bg-card border border-border rounded-xl p-6">
                  <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                      <div>
                        <label
                          htmlFor="name"
                          className="block text-sm font-medium mb-2"
                        >
                          Name
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          className="w-full bg-secondary/50 border border-border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary/20"
                          required
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="email"
                          className="block text-sm font-medium mb-2"
                        >
                          Email
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          className="w-full bg-secondary/50 border border-border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary/20"
                          required
                        />
                      </div>
                    </div>

                    <div className="mb-6">
                      <label
                        htmlFor="subject"
                        className="block text-sm font-medium mb-2"
                      >
                        Subject
                      </label>
                      <input
                        type="text"
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        className="w-full bg-secondary/50 border border-border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary/20"
                        required
                      />
                    </div>

                    <div className="mb-6">
                      <label
                        htmlFor="message"
                        className="block text-sm font-medium mb-2"
                      >
                        Message
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows={6}
                        className="w-full bg-secondary/50 border border-border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary/20"
                        required
                      ></textarea>
                    </div>

                    <button
                      type="submit"
                      disabled={contactMutation.isPending}
                      className="bg-primary text-primary-foreground px-6 py-3 rounded-md font-medium hover:bg-primary/90 transition-colors inline-flex items-center gap-2 disabled:opacity-70"
                    >
                      {contactMutation.isPending ? (
                        "Sending..."
                      ) : (
                        <>
                          Send Message <Send size={16} />
                        </>
                      )}
                    </button>

                    {contactMutation.isError && (
                      <div className="mt-4 p-3 rounded-md bg-destructive/10 text-destructive">
                        {contactMutation.error instanceof Error
                          ? contactMutation.error.message
                          : "Something went wrong. Please try again later."}
                      </div>
                    )}

                    {contactMutation.isSuccess && (
                      <div className="mt-4 p-3 rounded-md bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400">
                        Message sent successfully!
                      </div>
                    )}
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ContactPage;
