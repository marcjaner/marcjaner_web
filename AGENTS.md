# Working notes

## Environment

- Node >= 22.12 required (Netlify runs Node 24); use `npm install`, then the scripts below.
- The remote default branch is `main` (origin/main). There is no `development` branch here.

## Verification

- `npm run check` — `astro check` types/diagnostics over all `.astro`/`.ts` files.
- `npm run test:journal` — project-journal regression suite (`scripts/test-project-journal.mjs`).
  It writes its own `zz-jrnl-*` fixture files under `src/content/` (cleaned up in `finally`),
  builds the site several times including one intentionally failing build for a missing
  project reference, spins a temporary `astro dev` on a free port to assert draft
  visibility, then finishes with a clean production build so `dist/` matches committed
  content. Do not run it concurrently with another build or dev server that watches
  `src/content/` — fixtures could leak into that session's output.
