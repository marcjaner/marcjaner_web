import { readdirSync, writeFileSync } from "fs";
import { join } from "path";
import { fileURLToPath } from "url";

const __dirname = fileURLToPath(new URL(".", import.meta.url));
const projectRoot = join(__dirname, "..");

// Get all markdown files from the public/content/blog directory
const blogDir = join(projectRoot, "public/content/blog");
const files = readdirSync(blogDir).filter((file) => file.endsWith(".md"));

// Create the manifest
const manifest = {
  files,
  generated: new Date().toISOString(),
};

// Write the manifest to public/content/blog-manifest.json
writeFileSync(
  join(projectRoot, "public/content/blog-manifest.json"),
  JSON.stringify(manifest, null, 2)
);

console.log("Blog manifest generated with", files.length, "files");
