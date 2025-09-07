import { createClient } from "@supabase/supabase-js";

// Check for environment variables
const supabaseUrl = process.env.SUPABASE_URL || process.env.SUAPBASE_URL; // Handle typo in .env
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;

if (!supabaseUrl) {
  console.error("Missing SUPABASE_URL environment variable");
  throw new Error("Supabase URL is not configured");
}

if (!supabaseAnonKey) {
  console.error("Missing SUPABASE_ANON_KEY environment variable");
  throw new Error("Supabase anonymous key is not configured");
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

interface NewsletterRatingData {
  postId: string;
  name?: string;
  rating: number;
  comments?: string;
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
    const body = JSON.parse(event.body) as NewsletterRatingData;
    const { postId, name, rating, comments } = body;

    // Validate required fields
    if (!postId || rating === undefined || rating < 0 || rating > 10) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({
          error: "Please provide a valid postId and rating (0-10)",
        }),
      };
    }

    // Insert the rating into Supabase
    const { data, error } = await supabase
      .from("newsletter_ratings")
      .insert([
        {
          post_id: postId,
          name: name || null,
          rating: rating,
          comment: comments || null,
          created_at: new Date().toISOString(),
        },
      ])
      .select();

    if (error) {
      console.error("Supabase error:", error);
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({
          error: "Failed to save rating: " + error.message,
        }),
      };
    }

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        message: "Rating submitted successfully!",
        data: data[0],
      }),
    };
  } catch (error: any) {
    console.error("Error processing newsletter rating:", error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        error: "Internal Server Error: " + error.message,
      }),
    };
  }
};
