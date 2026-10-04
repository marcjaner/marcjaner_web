import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: "https://marcjaner.com",
  integrations: [react(), sitemap()],
  markdown: {
    shikiConfig: { theme: "github-light" },
  },
  vite: {
    // Netlify already holds VITE_POSTHOG_* — expose only those, never the Resend key.
    envPrefix: ["PUBLIC_", "VITE_POSTHOG_"],
  },
});
