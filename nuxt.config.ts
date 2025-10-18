// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },

  runtimeConfig: {
    public: {
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL || 'https://yourdomain.com'
    }
  },

  modules: [
    "@nuxt/content",
    "@nuxt/fonts",
    "@nuxt/icon",
    "@nuxt/image",
    "@nuxt/scripts",
    "shadcn-nuxt",
    "@nuxtjs/color-mode",
    "@nuxtjs/sitemap",
    "@nuxtjs/robots",
  ],

  css: ["~/assets/css/tailwind.css", "~/assets/css/animations.css"],

  vite: {
    plugins: [tailwindcss()],
    build: {
      cssCodeSplit: true,
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ["vue", "vue-router"],
          },
        },
      },
    },
  },

  shadcn: {
    prefix: "",
    componentDir: "./app/components/ui",
  },

  content: {
    build: {
      markdown: {
        toc: {
          depth: 3,
          searchDepth: 3,
        },
        highlight: {
          theme: "one-dark-pro",
          langs: [
            "vue",
            "css",
            "typescript",
            "bash",
            "html",
            "php",
            "go",
            "docker",
            "yaml",
          ],
        },
      },
    },
    renderer: {
      anchorLinks: true,
    },
  },

  image: {
    format: ["webp", "avif", "png", "jpg", "jpeg"],
    quality: 80,
    screens: {
      xs: 320,
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
      xxl: 1536,
    },
    densities: [1, 2],
    providers: {
      ipx: {
        modifiers: {
          format: "webp",
          quality: 80,
        },
      },
    },
    domains: [],
    alias: {},
  },

  nitro: {
    compressPublicAssets: {
      gzip: true,
      brotli: true,
    },
    minify: true,
    experimental: {
      wasm: true,
    },
  },

  // Optimized Route Rules
  routeRules: {
    "/": {
      prerender: true,
      swr: 60 * 60 * 24, // Cache for 24 hours
    },
    "/blogs/**": {
      prerender: true,
    },
    "/projects/**": {
      prerender: true,
    },
    "/api/**": {
      cors: true,
      cache: { maxAge: 60 * 60 }, // 1 hour cache
    },
    "/_nuxt/**": {
      headers: {
        "cache-control": "public, max-age=31536000, immutable",
      },
    },
    "/images/**": {
      headers: {
        "cache-control": "public, max-age=31536000, immutable",
      },
    },
  },

  app: {
    head: {
      title: " Kemboi Elvis - Full Stack Developer",
      htmlAttrs: {
        lang: "en",
      },
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        {
          name: "description",
          content:
            "Full Stack Developer specializing in Vue.js, Nuxt, Node.js, and modern web technologies. Building innovative software solutions.",
        },
        {
          name: "keywords",
          content:
            "full stack developer, vue.js, nuxt, node.js, web development, software engineer",
        },
        {
          property: "og:title",
          content: " Kemboi Elvis - Full Stack Developer",
        },
        {
          property: "og:description",
          content:
            "Full Stack Developer specializing in Vue.js, Nuxt, Node.js, and modern web technologies.",
        },
        { property: "og:type", content: "website" },
        { property: "og:url", content: "https://yourdomain.com" },
        { property: "og:image", content: "/og-image.jpg" },
        { name: "twitter:card", content: "summary_large_image" },
        {
          name: "twitter:title",
          content: "Elvis Kemboi - Full Stack Developer",
        },
        {
          name: "twitter:description",
          content:
            "Full Stack Developer specializing in Vue.js, Nuxt, Node.js, and modern web technologies.",
        },
        { name: "twitter:image", content: "/og-image.jpg" },
        // Performance hints
        { name: "theme-color", content: "#ffffff" },
      ],
      link: [
        { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
        { rel: "preconnect", href: "https://fonts.googleapis.com" },
        { rel: "dns-prefetch", href: "https://fonts.googleapis.com" },
      ],
    },
    pageTransition: { name: "page", mode: "out-in" },
  },

  colorMode: {
    classSuffix: "",
    preference: "system",
    fallback: "light",
    storageKey: "nuxt-color-mode",
  },

  experimental: {
    payloadExtraction: true,
    renderJsonPayloads: true,
    componentIslands: true,
    viewTransition: true,
  },
});
