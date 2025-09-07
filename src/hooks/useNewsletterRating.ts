import { useMutation } from "@tanstack/react-query";

const NETLIFY_DEV_URL = "http://localhost:8888";
const getBaseUrl = () => (import.meta.env.DEV ? NETLIFY_DEV_URL : "");

interface NewsletterRatingData {
  postId: string;
  name?: string;
  rating: number;
  comments?: string;
}

const submitNewsletterRating = async (data: NewsletterRatingData) => {
  const baseUrl = getBaseUrl();
  console.log(
    "Sending newsletter rating to:",
    `${baseUrl}/.netlify/functions/newsletter-rating`
  );

  const response = await fetch(`${baseUrl}/.netlify/functions/newsletter-rating`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || "Failed to submit rating");
  }

  return response.json();
};

export const useNewsletterRating = () => {
  return useMutation({
    mutationFn: submitNewsletterRating,
  });
};
