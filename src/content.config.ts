import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const diary = defineCollection({
  // Astro 5 loader API. Every .md file in src/content/diary becomes an entry,
  // and its filename (minus the extension) becomes the entry id / URL slug.
  loader: glob({ pattern: "**/*.md", base: "./src/content/diary" }),
  schema: z.object({
    title: z.string(),
    // z.coerce.date() turns the YAML `date: 2026-09-14` string into a real Date,
    // so you can sort and format it in the templates.
    date: z.coerce.date(),
    summary: z.string().optional(),
  }),
});

export const collections = { diary };
