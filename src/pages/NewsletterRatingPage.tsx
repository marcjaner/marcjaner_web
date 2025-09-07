import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Star, Send } from "lucide-react";
import { useNewsletterRating } from "../hooks/useNewsletterRating";

const NewsletterRatingPage = () => {
  const { postId } = useParams<{ postId: string }>();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    rating: 0,
    comments: "",
  });

  const ratingMutation = useNewsletterRating();

  // Redirect to home if no postId
  useEffect(() => {
    if (!postId) {
      navigate("/");
    }
  }, [postId, navigate]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "rating" ? parseInt(value) || 0 : value,
    });
  };

  const handleRatingChange = (rating: number) => {
    setFormData({
      ...formData,
      rating,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!postId) return;

    try {
      await ratingMutation.mutateAsync({
        postId,
        ...formData,
      });

      setFormData({
        name: "",
        rating: 0,
        comments: "",
      });
    } catch (error) {
      console.error("Error submitting rating:", error);
    }
  };

  if (!postId) {
    return null; // Will redirect in useEffect
  }

  return (
    <>
      <section className="py-20">
        <div className="container mx-auto px-3 sm:px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12 reveal">
              <h1 className="text-4xl font-bold mb-4">Rate Newsletter</h1>
              <p className="text-muted-foreground">
                Help me improve by rating this newsletter post!
              </p>
              <div className="h-1 w-20 bg-primary mx-auto mt-4"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
              <div className="md:col-span-1 reveal">
                <div className="bg-card border border-border rounded-xl p-4 md:p-6">
                  <div className="mb-6">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                      <Star size={24} className="text-primary" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">Your Feedback</h3>
                    <p className="text-muted-foreground mb-2">
                      Your rating helps me create better content
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Post ID: <span className="font-italic">{postId}</span>
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold mb-4">Rating Scale</h3>
                    <div className="space-y-2 text-sm text-muted-foreground">
                      <div className="flex justify-between">
                        <span>0-2:</span>
                        <span>Poor</span>
                      </div>
                      <div className="flex justify-between">
                        <span>3-4:</span>
                        <span>Fair</span>
                      </div>
                      <div className="flex justify-between">
                        <span>5-6:</span>
                        <span>Good</span>
                      </div>
                      <div className="flex justify-between">
                        <span>7-8:</span>
                        <span>Very Good</span>
                      </div>
                      <div className="flex justify-between">
                        <span>9-10:</span>
                        <span>Excellent</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="md:col-span-2 reveal stagger-1">
                <div className="bg-card border border-border rounded-xl p-4 md:p-6">
                  <form onSubmit={handleSubmit}>
                    <div className="mb-6">
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium mb-2"
                      >
                        Name (Optional)
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full bg-secondary/50 border border-border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary/20"
                        placeholder="Your name"
                      />
                    </div>

                    <div className="mb-6">
                      <label className="block text-sm font-medium mb-2">
                        Rating (Required)
                      </label>
                      <div className="flex items-center space-x-1 md:space-x-2 mb-2">
                        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((value) => (
                          <button
                            key={value}
                            type="button"
                            onClick={() => handleRatingChange(value)}
                            className={`w-8 h-8 rounded-full border-2 flex items-center justify-center text-sm font-medium transition-colors ${
                              formData.rating >= value
                                ? "bg-primary border-primary text-background"
                                : "border-border hover:border-primary/50"
                            }`}
                          >
                            {value}
                          </button>
                        ))}
                      </div>
                      <input
                        type="hidden"
                        name="rating"
                        value={formData.rating}
                      />
                      <p className="text-sm text-muted-foreground">
                        Selected: {formData.rating}/10
                      </p>
                    </div>

                    <div className="mb-6">
                      <label
                        htmlFor="comments"
                        className="block text-sm font-medium mb-2"
                      >
                        Comments (Optional)
                      </label>
                      <textarea
                        id="comments"
                        name="comments"
                        value={formData.comments}
                        onChange={handleChange}
                        rows={4}
                        className="w-full bg-secondary/50 border border-border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary/20"
                        placeholder="Share your thoughts about this newsletter post..."
                      ></textarea>
                    </div>

                    <button
                      type="submit"
                      disabled={ratingMutation.isPending || formData.rating === 0}
                      className="bg-primary text-background px-6 py-3 rounded-md font-medium hover:bg-primary/90 transition-colors inline-flex items-center gap-2 disabled:opacity-70"
                    >
                      {ratingMutation.isPending ? (
                        "Submitting..."
                      ) : (
                        <>
                          Submit Rating <Send size={16} />
                        </>
                      )}
                    </button>

                    {ratingMutation.isError && (
                      <div className="mt-4 p-3 rounded-md bg-destructive/10 text-destructive">
                        {ratingMutation.error instanceof Error
                          ? ratingMutation.error.message
                          : "Something went wrong. Please try again later."}
                      </div>
                    )}

                    {ratingMutation.isSuccess && (
                      <div className="mt-4 p-3 rounded-md bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400">
                        Thank you for your feedback! Your rating has been submitted.
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

export default NewsletterRatingPage;
