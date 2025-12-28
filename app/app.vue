<script setup lang="ts">
const route = useRoute();
const config = useRuntimeConfig();

const siteUrl = config.public.siteUrl;

useHead({
  htmlAttrs: {
    lang: "en",
  },
  meta: [
    { name: "author", content: "Kemboi Elvis" },
    { name: "robots", content: "index, follow" },
    { name: "googlebot", content: "index, follow" },
    {
      name: "theme-color",
      content: "#ffffff",
      media: "(prefers-color-scheme: light)",
    },
    {
      name: "theme-color",
      content: "#0a0a0a",
      media: "(prefers-color-scheme: dark)",
    },
  ],
  link: [
    { rel: "canonical", href: `${siteUrl}${route.path}` },
    { rel: "preconnect", href: "https://fonts.googleapis.com" },
    { rel: "dns-prefetch", href: "https://fonts.googleapis.com" },
  ],
})

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Kemboi Elvis",
  url: siteUrl,
  image: `${siteUrl}/og-image.jpg`,
  sameAs: [
    "https://github.com/kemboi22",
    "https://linkedin.com/in/kemboi-elvis-ab7a431b2",
    "https://twitter.com/kemboielvis22",
  ],
  jobTitle: "Full Stack Developer",
  description: "Expert software developer proficient in JavaScript, TypeScript, Vue, C#, Golang, and PHP. Building scalable solutions across the stack.",
  worksFor: [
    {
      "@type": "Organization",
      name: "Genius Dynamics",
    },
    {
      "@type": "Organization",
      name: "EMaxy IT",
    },
  ],
  knowsAbout: [
    "JavaScript",
    "TypeScript",
    "Vue.js",
    "Nuxt.js",
    "Node.js",
    "C#",
    "Golang",
    "PHP",
    "PostgreSQL",
    "MySQL",
    "Docker",
    "Web Development",
    "Software Engineering",
  ],
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Kemboi Elvis - Full Stack Developer",
  url: siteUrl,
  description: "Full Stack Developer specializing in Vue.js, Nuxt, Node.js, and modern web technologies. Building innovative software solutions.",
  potentialAction: {
    "@type": "SearchAction",
    target: `${siteUrl}/search?q={search_term_string}`,
    "query-input": "required name=search_term_string",
  },
};

useHead({
  script: [
    {
      type: "application/ld+json",
      children: JSON.stringify(organizationSchema),
    },
    {
      type: "application/ld+json",
      children: JSON.stringify(websiteSchema),
    },
  ],
});
</script>

<template>
  <div class="min-h-screen flex flex-col">
    <AppHeader />
    <main class="flex-1">
      <NuxtPage />
    </main>
    <AppFooter />
  </div>
</template>
