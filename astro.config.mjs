// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  site: "https://conradwilson.dev", // update to your real domain
  vite: {
    // @ts-ignore
    plugins: [tailwindcss()],
  },
  markdown: {
    shikiConfig: { theme: "github-dark", wrap: true },
  },
});
