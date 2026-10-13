import { defineCollection, reference } from "astro:content";
import { z } from "astro/zod";
import { glob } from "astro/loaders";

const blog = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/blog" }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    description: z.string(),
    featuredImage: z.string().optional(),
    readTime: z.string().optional(),
    tags: z.array(z.string()).default([]),
  }),
});

const projects = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/projects" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    featuredImage: z.string().optional(),
    technologies: z.array(z.string()).default([]),
    liveUrl: z.url().optional(),
    githubUrl: z.url().optional(),
    date: z.string().optional(),
    status: z.enum(["active", "paused", "finished"]).default("active"),
    started: z.coerce.date().optional(),
    draft: z.boolean().default(false),
  }),
});

const projectUpdates = defineCollection({
  loader: glob({ pattern: "*.md", base: "./src/content/project-updates" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    project: reference("projects"),
    showInBlog: z.boolean().default(false),
    draft: z.boolean().default(false),
    featuredImage: z.string().optional(),
    readTime: z.string().optional(),
    tags: z.array(z.string()).default([]),
  }),
});

export const collections = { blog, projects, projectUpdates };
