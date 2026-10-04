// Turns photos into 1-bit "pixel art": ordered (Bayer) dithering, black dots on a
// transparent background, with strong reds kept as a single accent colour.
//
//   node scripts/dither.mjs                 # every featuredImage in src/content (skips up-to-date ones)
//   node scripts/dither.mjs --force         # regenerate everything
//   node scripts/dither.mjs <in> <out.png> [--focus 0.4] [--width 640] [--no-accent]
//
// Per-post knobs, in frontmatter:
//   featuredFocus: 0.4      vertical centre of the 3:2 crop (0 = top, 1 = bottom), default 0.5
//   featuredAccent: true    keep strong reds (off by default; only the header art uses red)

import { existsSync, mkdirSync, readFileSync, readdirSync, statSync } from "node:fs";
import { dirname, join, basename } from "node:path";
import { parseArgs } from "node:util";
import sharp from "sharp";

const INK = [17, 17, 17];
const ACCENT = [214, 40, 40];

// Classic recursive Bayer matrix: n×n thresholds spread evenly over 0..1.
function bayer(n) {
  if (n === 1) return [[0]];
  const b = bayer(n / 2);
  const size = n / 2;
  const m = Array.from({ length: n }, () => new Array(n));
  for (let y = 0; y < size; y++)
    for (let x = 0; x < size; x++) {
      const v = 4 * b[y][x];
      m[y][x] = v;
      m[y][x + size] = v + 2;
      m[y + size][x] = v + 3;
      m[y + size][x + size] = v + 1;
    }
  return m;
}

const MATRIX = bayer(8).map((row) => row.map((v) => (v + 0.5) / 64));

// True red only: hue within ±12° of 0, saturated, not too dark. Oranges and skin stay grey.
function isRed(r, g, b) {
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  if (max !== r || max < 90 || (max - min) / max < 0.55) return false;
  const hue = (60 * (g - b)) / (max - min); // degrees, red sector only
  return hue > -12 && hue < 12;
}

/**
 * @param {string} input   source image path
 * @param {string} output  .png path
 * @param {object} opts
 * @param {number} opts.width     dots across; the PNG is width × scale pixels wide
 * @param {number} opts.scale     pixels per dot (2 = crisp on retina at width css px)
 * @param {number} opts.aspect    crop aspect ratio (w / h)
 * @param {number} opts.focus     vertical centre of the crop, 0..1
 * @param {number} opts.contrast  >1 pushes tones apart before dithering
 * @param {boolean} opts.accent   keep strong reds in the accent colour
 */
export async function dither(
  input,
  output,
  { width = 640, scale = 2, aspect = 3 / 2, focus = 0.5, contrast = 1.35, accent = true } = {},
) {
  const height = Math.round(width / aspect);

  // 1. Orient, crop to the aspect ratio around `focus`, and shrink to one pixel per dot.
  const oriented = await sharp(input).rotate().toBuffer({ resolveWithObject: true });
  const { width: srcW, height: srcH } = oriented.info;
  let cropW = srcW;
  let cropH = Math.round(srcW / aspect);
  if (cropH > srcH) {
    cropH = srcH;
    cropW = Math.round(srcH * aspect);
  }
  const top = Math.round(Math.min(Math.max(focus * srcH - cropH / 2, 0), srcH - cropH));
  const left = Math.round((srcW - cropW) / 2);
  const { data } = await sharp(oriented.data)
    .extract({ left, top, width: cropW, height: cropH })
    .resize(width, height, { kernel: "lanczos3" })
    .removeAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  // 2. Luminance, then contrast around the image's own mean (so dark photos stay readable).
  const n = width * height;
  const lum = new Float32Array(n);
  let mean = 0;
  for (let i = 0; i < n; i++) {
    const [r, g, b] = [data[i * 3], data[i * 3 + 1], data[i * 3 + 2]];
    lum[i] = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    mean += lum[i];
  }
  mean /= n;

  // 3. Threshold every pixel against the tiled Bayer matrix. Below = ink dot, above = paper.
  const dots = Buffer.alloc(n * 4);
  for (let y = 0; y < height; y++)
    for (let x = 0; x < width; x++) {
      const i = y * width + x;
      const tone = mean + (lum[i] - mean) * contrast;
      if (tone > MATRIX[y % 8][x % 8]) continue; // transparent paper
      const [r, g, b] = [data[i * 3], data[i * 3 + 1], data[i * 3 + 2]];
      const red = accent && isRed(r, g, b);
      dots.set([...(red ? ACCENT : INK), 255], i * 4);
    }

  // 4. Blow each dot up to `scale` pixels with nearest-neighbour so edges stay hard.
  mkdirSync(dirname(output), { recursive: true });
  await sharp(dots, { raw: { width, height, channels: 4 } })
    .resize(width * scale, height * scale, { kernel: "nearest" })
    .png({ palette: true, colours: 4, compressionLevel: 9 })
    .toFile(output);
}

// ---------- Featured images from content frontmatter ----------

// Sizes are in dots; at scale 2 a dot is one device pixel pair on retina at that many css px.
const SIZES = { "": 640, "-thumb": 200 };

function frontmatter(file) {
  const match = readFileSync(file, "utf8").match(/^---\n([\s\S]*?)\n---/);
  const fields = {};
  for (const line of match?.[1].split("\n") ?? []) {
    const kv = line.match(/^(\w+):\s*"?([^"]*)"?\s*$/);
    if (kv) fields[kv[1]] = kv[2];
  }
  return fields;
}

const isFresh = (out, ...sources) =>
  existsSync(out) && sources.every((s) => statSync(s).mtimeMs <= statSync(out).mtimeMs);

async function ditherContent({ force }) {
  let made = 0;
  for (const collection of readdirSync("src/content")) {
    const dir = join("src/content", collection);
    if (!statSync(dir).isDirectory()) continue;
    for (const file of readdirSync(dir).filter((f) => f.endsWith(".md"))) {
      const md = join(dir, file);
      const fm = frontmatter(md);
      if (!fm.featuredImage) continue;
      const source = join("public", fm.featuredImage);
      const id = basename(file, ".md");
      for (const [suffix, width] of Object.entries(SIZES)) {
        const out = join("public/dithered", collection, `${id}${suffix}.png`);
        if (!force && isFresh(out, source, md)) continue;
        await dither(source, out, {
          width,
          focus: fm.featuredFocus ? Number(fm.featuredFocus) : 0.5,
          accent: fm.featuredAccent === "true",
        });
        made++;
      }
    }
  }
  console.log(`dither: ${made} image(s) generated`);
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const { values, positionals } = parseArgs({
    allowPositionals: true,
    options: {
      force: { type: "boolean" },
      focus: { type: "string" },
      width: { type: "string" },
      "no-accent": { type: "boolean" },
    },
  });
  if (positionals.length === 2) {
    await dither(positionals[0], positionals[1], {
      focus: values.focus ? Number(values.focus) : undefined,
      width: values.width ? Number(values.width) : undefined,
      accent: !values["no-accent"],
    });
  } else {
    await ditherContent({ force: values.force });
  }
}
