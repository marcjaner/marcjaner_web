import { existsSync } from "node:fs";

// Dithered versions of featured images, written by scripts/dither.mjs before dev/build.
export function art(collection: "blog" | "projects", id: string) {
  const base = `/dithered/${collection}/${id}`;
  if (!existsSync(`public${base}.png`)) return null;
  return { full: `${base}.png`, thumb: `${base}-thumb.png` };
}
