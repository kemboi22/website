<template>
  <footer class="border-t border-border bg-muted/30">
    <div class="container mx-auto px-6 py-12">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-12">
        <!-- Brand -->
        <div class="space-y-4">
          <h3 class="text-xl font-serif font-bold">Kemboi Elvis</h3>
          <p class="text-sm text-muted-foreground leading-relaxed">
            Crafting digital experiences with precision and creativity.
          </p>
        </div>

        <!-- Quick Links -->
        <div class="space-y-4">
          <h4 class="text-sm font-semibold uppercase tracking-wider">
            Navigate
          </h4>
          <nav class="flex flex-col gap-2">
            <NuxtLink
              v-for="link in footerLinks"
              :key="link.path"
              :to="link.path"
              class="text-sm text-muted-foreground hover:text-foreground w-fit"
            >
              {{ link.name }}
            </NuxtLink>
          </nav>
        </div>

        <!-- Social -->
        <div class="space-y-4">
          <h4 class="text-sm font-semibold uppercase tracking-wider">
            Connect
          </h4>
          <div class="flex gap-4">
            <a
              v-for="social in socials"
              :key="social.name"
              :href="social.url"
              target="_blank"
              rel="noopener noreferrer"
              class="w-10 h-10 flex items-center justify-center border border-border hover:bg-foreground hover:text-background rounded-xl"
              :aria-label="social.name"
            >
              <LazyIcon :name="social.icon" class="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>

      <div
        class="mt-12 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4"
      >
        <p class="text-sm text-muted-foreground">
          © {{ new Date().getFullYear() }} Kemboi Elvis. All rights reserved.
        </p>
        <p class="text-xs text-muted-foreground font-mono">
          Designed & Built with Nuxt 4
        </p>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
const footerLinks = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Projects", path: "/projects" },
  { name: "Blogs", path: "/blogs" },
  { name: "Contact", path: "/contact" },
];

const socials = [
  {
    name: "GitHub",
    url: "https://github.com/kemboi22",
    icon: "mdi:github",
  },
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/elvis-kemboi-18a55924b/",
    icon: "mdi:linkedin",
  },
  {
    name: "Twitter",
    url: "https://twitter.com/kemboielvis22",
    icon: "mdi:twitter",
  },
  {
    name: "Twitch",
    url: "https://www.twitch.tv/kemboielvis",
    icon: "mdi:twitch",
  },
  {
    name: "Youtube",
    url: "https://www.youtube.com/@kemboielvis22",
    icon: "mdi:youtube",
  },
];
</script>
