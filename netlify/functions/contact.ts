import { Resend } from "resend";

const resend = new Resend(process.env.VITE_RESEND_API_KEY);

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
  formType: "contact" | "newsletter";
}

export const handler = async (event: any, context: any) => {
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Content-Type": "application/json",
  };

  // Handle preflight requests
  if (event.httpMethod === "OPTIONS") {
    return {
      statusCode: 204,
      headers,
      body: "",
    };
  }

  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: "Method Not Allowed" }),
    };
  }

  try {
    const body = JSON.parse(event.body) as ContactFormData;
    const { name, email, subject, message, formType } = body;

    if (formType === "contact" && (!name || !email || !message)) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({
          error: "Please provide name, email, and message",
        }),
      };
    } else if (formType === "newsletter" && !email) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: "Please provide email" }),
      };
    }

    if (formType === "contact") {
      await resend.emails.send({
        from: `${name} <onboarding@resend.dev>`,
        to: "marcjanerferrer@gmail.com",
        replyTo: email,
        subject: `New Contact Form Submission: ${subject || "No Subject"}`,
        html: `
          <h2>New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Message:</strong> ${message}</p>
        `,
      });
    } else if (formType === "newsletter") {
      console.log("Newsletter subscription:", { email });
    }

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        message:
          formType === "contact"
            ? "Your message has been sent successfully!"
            : "Thank you for subscribing to the newsletter!",
      }),
    };
  } catch (error: any) {
    console.error("Error processing form:", error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        error: "Internal Server Error: " + error.message,
      }),
    };
  }
};
