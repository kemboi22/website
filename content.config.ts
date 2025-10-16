import { defineContentConfig, defineCollection } from "@nuxt/content";

export default defineContentConfig({
  collections: {
    projects: defineCollection({
      type: "page",
      source: "projects/*.md",
    }),
    blogs: defineCollection({
      type: "page",
      source: "blogs/*.md",
    }),
  },
});
