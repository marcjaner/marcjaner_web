import { readdirSync, writeFileSync } from "fs";
import { join } from "path";
import { fileURLToPath } from "url";

const __dirname = fileURLToPath(new URL(".", import.meta.url));
const projectRoot = join(__dirname, "..");

// Get all markdown files from the public/content/projects directory
const projectsDir = join(projectRoot, "public/content/projects");
const files = readdirSync(projectsDir).filter((file) => file.endsWith(".md"));

// Create the manifest
const manifest = {
  files,
  generated: new Date().toISOString(),
};

// Write the manifest to public/content/project-manifest.json
writeFileSync(
  join(projectRoot, "public/content/project-manifest.json"),
  JSON.stringify(manifest, null, 2)
);

console.log("Project manifest generated with", files.length, "files");
