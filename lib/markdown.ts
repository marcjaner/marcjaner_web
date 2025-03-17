import fs from "fs";
import path from "path";
import matter from "gray-matter";

type ContentType = "blog" | "projects";

interface MarkdownMeta {
  title: string;
  date: string;
  description: string;
  slug: string;
  [key: string]: any;
}

interface MarkdownContent {
  meta: MarkdownMeta;
  content: string;
}

// Get all markdown files metadata from a specific content type
export function getAllContentMeta(type: ContentType): MarkdownMeta[] {
  const files = fs.readdirSync(path.join(process.cwd(), "content", type));

  const posts = files
    .filter((filename) => filename.endsWith(".md"))
    .map((filename) => {
      const fileContent = fs.readFileSync(
        path.join(process.cwd(), "content", type, filename),
        "utf-8"
      );

      const { data: meta } = matter(fileContent);

      return {
        ...meta,
        slug: filename.replace(".md", ""),
      } as MarkdownMeta;
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return posts;
}

// Get a specific markdown content by slug
export function getContentBySlug(
  type: ContentType,
  slug: string
): MarkdownContent {
  const filePath = path.join(process.cwd(), "content", type, `${slug}.md`);
  const fileContent = fs.readFileSync(filePath, "utf-8");
  const { data: meta, content } = matter(fileContent);

  return {
    meta: {
      ...(meta as MarkdownMeta),
      slug,
    },
    content,
  };
}
