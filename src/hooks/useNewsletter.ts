import { useMutation } from "@tanstack/react-query";

const NETLIFY_DEV_URL = "http://localhost:8888";
const getBaseUrl = () => (import.meta.env.DEV ? NETLIFY_DEV_URL : "");

interface NewsletterData {
  email: string;
}

export function useNewsletter() {
  return useMutation({
    mutationFn: async (data: NewsletterData) => {
      const baseUrl = getBaseUrl();
      console.log(
        "Sending newsletter subscription to:",
        `${baseUrl}/.netlify/functions/newsletter`
      );

      const response = await fetch(`${baseUrl}/.netlify/functions/newsletter`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`Failed to subscribe: ${response.statusText}`);
      }

      return response.json();
    },
  });
}
