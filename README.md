# marcjaner.com

Astro site with React islands for the three forms (contact, newsletter signup, newsletter rating).
Deployed on Netlify; form handlers live in `netlify/functions`.

```sh
npm install
npm run dev          # site only, http://localhost:4321
npm run netlify:dev  # site + functions, http://localhost:8888
npm run build
```

- Writing: `src/content/blog/*.md`. Projects: `src/content/projects/*.md` (a project with no body links straight to its `liveUrl`).
- Pixel art: `scripts/dither.mjs` turns photos into 1-bit Bayer-dithered PNGs.
  - Every `featuredImage` in `src/content` is dithered automatically before `dev`/`build` into `public/dithered/` (git-ignored). Optional frontmatter: `featuredFocus: 0.4` (vertical crop centre), `featuredAccent: true` (keep reds).
  - Header art: `node scripts/dither.mjs public/images/blog/tornar-a-mallorca/rosella.png public/header.png --focus 0.37`
  - Share image (1200×630): same command with `public/og-image.png --width 600 --aspect 1.905`.
- Favicons: `node scripts/favicon.mjs` draws the pixel poppy into `favicon.svg`, `favicon.ico` and `apple-touch-icon.png`.
- Env (Netlify): `VITE_POSTHOG_KEY`, `VITE_POSTHOG_HOST` (exposed to the client), `VITE_RESEND_API_KEY`, `SUPABASE_URL`, `SUPABASE_ANON_KEY` (functions only).
