// Draws the favicon set from a 16×16 pixel poppy: SVG for modern browsers,
// a PNG touch icon, and a multi-size .ico for everything else.
//
//   node scripts/favicon.mjs

import { writeFileSync } from "node:fs";
import sharp from "sharp";

// . paper   r poppy   k ink   : dithered ground (ink on alternating pixels)
const POPPY = [
  "................",
  ".....rrrrrr.....",
  "...rrrrrrrrrr...",
  "..rrrrrrrrrrrr..",
  ".rrrrrrkkrrrrrr.",
  ".rrrrrkkkkrrrrr.",
  ".rrrrrkkkkrrrrr.",
  ".rrrrrrkkrrrrrr.",
  "..rrrrrrrrrrrr..",
  "...rrrrrrrrrr...",
  ".....rrrrrr.....",
  ".......k........",
  ".......k.kk.....",
  ":::::::kk:::::::",
  "::::::::::::::::",
  "::::::::::::::::",
];

const COLORS = { ".": "#ffffff", r: "#d62828", k: "#111111" };

// Resolve ":" into a Bayer-ish 50% checker so the ground reads as dithered.
const pixel = (x, y) => {
  const c = POPPY[y][x];
  if (c !== ":") return COLORS[c];
  return (x + y) % 2 === 0 ? COLORS.k : COLORS["."];
};

const rects = [];
for (let y = 0; y < 16; y++)
  for (let x = 0; x < 16; x++) {
    const fill = pixel(x, y);
    if (fill !== COLORS["."]) rects.push(`<rect x="${x}" y="${y}" width="1" height="1" fill="${fill}"/>`);
  }

const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" shape-rendering="crispEdges">
<rect width="16" height="16" fill="#ffffff"/>
${rects.join("\n")}
</svg>
`;
writeFileSync("public/favicon.svg", svg);

// Rasterise at 1px per pixel, then scale up with nearest-neighbour so edges stay hard.
const raw = Buffer.alloc(16 * 16 * 4);
for (let y = 0; y < 16; y++)
  for (let x = 0; x < 16; x++) {
    const hex = pixel(x, y);
    raw.set([1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16)).concat(255), (y * 16 + x) * 4);
  }
const png = (size) =>
  sharp(raw, { raw: { width: 16, height: 16, channels: 4 } })
    .resize(size, size, { kernel: "nearest" })
    .png()
    .toBuffer();

writeFileSync("public/apple-touch-icon.png", await png(180));

// .ico = 6-byte header + 16-byte entry per image + the PNGs themselves.
const sizes = [16, 32, 48];
const images = await Promise.all(sizes.map(png));
const header = Buffer.alloc(6 + 16 * sizes.length);
header.writeUInt16LE(1, 2);
header.writeUInt16LE(sizes.length, 4);
let offset = header.length;
sizes.forEach((size, i) => {
  const e = 6 + 16 * i;
  header.writeUInt8(size, e);
  header.writeUInt8(size, e + 1);
  header.writeUInt16LE(1, e + 4);
  header.writeUInt16LE(32, e + 6);
  header.writeUInt32LE(images[i].length, e + 8);
  header.writeUInt32LE(offset, e + 12);
  offset += images[i].length;
});
writeFileSync("public/favicon.ico", Buffer.concat([header, ...images]));

console.log("favicon: wrote favicon.svg, favicon.ico, apple-touch-icon.png");
