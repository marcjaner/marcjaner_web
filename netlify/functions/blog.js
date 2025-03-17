// Netlify function to serve blog post data from markdown files
import matter from "gray-matter";

const getBaseUrl = () => {
  if (process.env.NETLIFY_DEV) {
    return "http://localhost:8888";
  }
  return process.env.URL || "";
};

// Helper to fetch markdown content
const fetchMarkdownContent = async (slug) => {
  const baseUrl = getBaseUrl();
  const response = await fetch(`${baseUrl}/content/blog/${slug}.md`);
  if (!response.ok) {
    throw new Error(`Failed to fetch ${slug}.md`);
  }
  return response.text();
};

// Helper to get list of blog files
const getBlogFiles = async () => {
  const baseUrl = getBaseUrl();
  const response = await fetch(`${baseUrl}/content/blog-manifest.json`);
  if (!response.ok) {
    throw new Error("Failed to fetch blog manifest");
  }
  const manifest = await response.json();
  return manifest.files.map((file) => file.replace(".md", ""));
};

// Parse markdown content
const parseBlogContent = (content, slug) => {
  const { data: meta, content: markdownContent } = matter(content);
  return {
    title: meta.title,
    date: meta.date,
    description: meta.description,
    slug,
    featuredImage: meta.featuredImage,
    author: meta.author,
    readTime: meta.readTime,
    tags: Array.isArray(meta.tags) ? meta.tags : [],
    content: markdownContent,
  };
};

export const handler = async (event) => {
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "GET, OPTIONS",
    "Content-Type": "application/json",
  };

  if (event.httpMethod === "OPTIONS") {
    return {
      statusCode: 204,
      headers,
      body: "",
    };
  }

  try {
    const { slug } = event.queryStringParameters || {};
    const slugs = await getBlogFiles();

    if (slug) {
      if (!slugs.includes(slug)) {
        return {
          statusCode: 404,
          headers,
          body: JSON.stringify({ error: "Blog post not found" }),
        };
      }

      const content = await fetchMarkdownContent(slug);
      const post = parseBlogContent(content, slug);

      return {
        statusCode: 200,
        headers,
        body: JSON.stringify(post),
      };
    }

    // Get all blog posts metadata
    const posts = await Promise.all(
      slugs.map(async (slug) => {
        const content = await fetchMarkdownContent(slug);
        const { content: _, ...meta } = parseBlogContent(content, slug);
        return meta;
      })
    );

    // Sort by date
    posts.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(posts),
    };
  } catch (error) {
    console.error("Error processing blog posts:", error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: error.message }),
    };
  }
};
