import { Resend } from "resend";

const resend = new Resend(process.env.VITE_RESEND_API_KEY);

interface NewsletterData {
  email: string;
}

export const handler = async (event: any, context: any) => {
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Content-Type": "application/json",
  };

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
    const { email } = JSON.parse(event.body) as NewsletterData;

    if (!email) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: "Please provide an email address" }),
      };
    }

    await resend.emails.send({
      from: "Newsletter Subscription <onboarding@resend.dev>",
      to: "marcjanerferrer@gmail.com",
      subject: "New subscriber to the newsletter",
      html: `
        <h2>New Newsletter Subscription</h2>
        <p>Please add the following email to the newsletter:</p>
        <p><strong>${email}</strong></p>
      `,
    });

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        message: "Thank you for subscribing to the newsletter!",
      }),
    };
  } catch (error: any) {
    console.error("Error processing newsletter subscription:", error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        error: "Internal Server Error: " + error.message,
      }),
    };
  }
};
