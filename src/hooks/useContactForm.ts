import { useMutation } from "@tanstack/react-query";

const NETLIFY_DEV_URL = "http://localhost:8888";
const getBaseUrl = () => (import.meta.env.DEV ? NETLIFY_DEV_URL : "");

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
  formType: "contact";
}

export function useContactForm() {
  return useMutation({
    mutationFn: async (formData: ContactFormData) => {
      const baseUrl = getBaseUrl();
      console.log(
        "Sending contact form to:",
        `${baseUrl}/.netlify/functions/contact`
      );

      const response = await fetch(`${baseUrl}/.netlify/functions/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`Failed to submit form: ${response.statusText}`);
      }

      return response.json();
    },
  });
}
