// Netlify function to serve project data from markdown files
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
  const response = await fetch(`${baseUrl}/content/projects/${slug}.md`);
  if (!response.ok) {
    throw new Error(`Failed to fetch ${slug}.md`);
  }
  return response.text();
};

// Helper to get list of project files
const getProjectFiles = async () => {
  const baseUrl = getBaseUrl();
  const response = await fetch(`${baseUrl}/content/project-manifest.json`);
  if (!response.ok) {
    throw new Error("Failed to fetch project manifest");
  }
  const manifest = await response.json();
  return manifest.files.map((file) => file.replace(".md", ""));
};

// Parse markdown content
const parseProjectContent = (content, slug) => {
  const { data: meta, content: markdownContent } = matter(content);
  return {
    id: meta.id || slug,
    slug,
    title: meta.title || "",
    description: meta.description || "",
    featuredImage: meta.featuredImage || "/placeholder.svg",
    technologies: Array.isArray(meta.technologies) ? meta.technologies : [],
    githubUrl: meta.githubUrl || undefined,
    liveUrl: meta.liveUrl || undefined,
    featured: Boolean(meta.featured),
    date: meta.date || new Date().toISOString(),
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
    const slugs = await getProjectFiles();

    if (slug) {
      if (!slugs.includes(slug)) {
        return {
          statusCode: 404,
          headers,
          body: JSON.stringify({ error: "Project not found" }),
        };
      }

      const content = await fetchMarkdownContent(slug);
      const project = parseProjectContent(content, slug);

      return {
        statusCode: 200,
        headers,
        body: JSON.stringify(project),
      };
    }

    // Get all projects metadata
    const projects = await Promise.all(
      slugs.map(async (slug) => {
        const content = await fetchMarkdownContent(slug);
        const { content: _, ...meta } = parseProjectContent(content, slug);
        return meta;
      })
    );

    // Sort by date (newest first)
    projects.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(projects),
    };
  } catch (error) {
    console.error("Error processing projects:", error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: error.message }),
    };
  }
};
