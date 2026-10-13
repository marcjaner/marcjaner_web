import { getCollection, type CollectionEntry } from "astro:content";

export interface ProjectContent {
  projects: CollectionEntry<"projects">[];
  updates: CollectionEntry<"projectUpdates">[];
}

export async function getProjectContent(): Promise<ProjectContent> {
  const [allProjects, allUpdates] = await Promise.all([
    getCollection("projects"),
    getCollection("projectUpdates"),
  ]);

  const projectIds = new Set(allProjects.map((project) => project.id));
  for (const update of allUpdates) {
    if (!projectIds.has(update.data.project.id)) {
      throw new Error(
        `Project update "${update.id}" references missing project "${update.data.project.id}". ` +
          `Create src/content/projects/${update.data.project.id}.md or fix the "project" field.`,
      );
    }
  }

  const dev = import.meta.env.DEV;
  const projects = allProjects.filter((project) => dev || !project.data.draft);
  const visible = new Set(projects.map((project) => project.id));
  const updates = allUpdates
    .filter((update) => (dev || !update.data.draft) && visible.has(update.data.project.id))
    .sort((a, b) => +b.data.date - +a.data.date || a.id.localeCompare(b.id));

  return { projects, updates };
}

export const projectUpdateHref = (update: CollectionEntry<"projectUpdates">) =>
  `/projects/${update.data.project.id}/updates/${update.id}`;

export interface WritingPost {
  entry: CollectionEntry<"blog"> | CollectionEntry<"projectUpdates">;
  href: string;
  project?: { title: string; href: string; draft: boolean };
}

export async function getWritingPosts(): Promise<WritingPost[]> {
  const [posts, { projects, updates }] = await Promise.all([
    getCollection("blog"),
    getProjectContent(),
  ]);
  const byId = new Map(projects.map((project) => [project.id, project]));

  return [
    ...posts.map((entry) => ({ entry, href: `/blog/${entry.id}` })),
    ...updates
      .filter((update) => update.data.showInBlog)
      .map((entry) => {
        const project = byId.get(entry.data.project.id);
        return {
          entry,
          href: projectUpdateHref(entry),
          project: project && {
            title: project.data.title,
            href: `/projects/${project.id}`,
            draft: project.data.draft,
          },
        };
      }),
  ];
}
