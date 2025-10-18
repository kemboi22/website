<script setup lang="ts">
import { ArrowRight } from "lucide-vue-next";

const config = useRuntimeConfig();

const selectedCategory = ref("All");

const { data: allProjects } = await useAsyncData("projects", () =>
  queryCollection("projects").all(),
);

const categories = computed(() => {
  const cats = new Set(["All"]);
  allProjects.value?.forEach((project) =>
    cats.add(project.meta.category as string),
  );
  return Array.from(cats);
});

const filteredProjects = computed(() => {
  if (!allProjects.value) return [];
  if (selectedCategory.value === "All") {
    return allProjects.value;
  }
  return allProjects.value.filter(
    (project) => project.meta.category === selectedCategory.value,
  );
});

useHead({
  title: "Projects - Portfolio",
  meta: [
    {
      name: "description",
      content:
        "Explore my portfolio of web development, design, and branding projects.",
    },
    {
      name: "keywords",
      content:
        "portfolio, projects, web development, design, branding, software engineering",
    },
    {
      property: "og:title",
      content: "Projects - Portfolio",
    },
    {
      property: "og:description",
      content:
        "Explore my portfolio of web development, design, and branding projects.",
    },
    {
      property: "og:type",
      content: "website",
    },
    {
      property: "og:url",
      content: `${config.public.siteUrl}/projects`,
    },
    {
      property: "og:image",
      content: `${config.public.siteUrl}/og-image.jpg`,
    },
    {
      name: "twitter:card",
      content: "summary_large_image",
    },
    {
      name: "twitter:title",
      content: "Projects - Portfolio",
    },
    {
      name: "twitter:description",
      content:
        "Explore my portfolio of web development, design, and branding projects.",
    },
    {
      name: "twitter:image",
      content: `${config.public.siteUrl}/og-image.jpg`,
    },
  ],
  link: [
    {
      rel: "canonical",
      href: `${config.public.siteUrl}/projects`,
    },
  ],
});
</script>
<template>
  <div class="pt-16">
    <!-- Hero Section -->
    <section
      class="min-h-[50vh] flex items-center justify-center px-6 border-b border-border"
    >
      <div class="container mx-auto max-w-6xl">
        <div class="space-y-6">
          <span
            class="text-xs font-mono uppercase tracking-widest text-muted-foreground"
            >Portfolio</span
          >
          <h1
            class="text-5xl md:text-7xl font-serif font-bold tracking-tight max-w-4xl"
          >
            Selected Works
          </h1>
          <p class="text-lg text-muted-foreground max-w-2xl leading-relaxed">
            A curated collection of projects showcasing design thinking,
            technical execution, and creative problem-solving.
          </p>
        </div>
      </div>
    </section>

    <!-- Filter -->
    <section
      class="py-12 px-6 border-b border-border sticky top-16 bg-background/80 backdrop-blur-md z-40"
    >
      <div class="container mx-auto max-w-6xl">
        <div class="flex flex-wrap items-center gap-3">
          <span
            class="text-xs font-mono uppercase tracking-widest text-muted-foreground"
            >Filter:</span
          >
          <button
            v-for="category in categories"
            :key="category"
            @click="selectedCategory = category"
            :class="[
              'px-4 py-2 text-sm font-medium border border-border hover:border-foreground transition-colors',
              selectedCategory === category
                ? 'bg-foreground text-background'
                : '',
            ]"
          >
            {{ category }}
          </button>
        </div>
      </div>
    </section>

    <!-- Projects Grid -->
    <section class="py-24 px-6">
      <div class="container mx-auto max-w-6xl">
        <div class="grid grid-cols-1 gap-24">
          <div
            v-for="(project, index) in filteredProjects"
            :key="project.path"
            class="grid grid-cols-1 md:grid-cols-2 gap-8 items-center"
            :class="index % 2 === 1 ? 'md:grid-flow-dense' : ''"
          >
            <!-- Image -->
            <NuxtLink
              :to="project.path"
              :class="[
                'group relative aspect-[4/3] overflow-hidden border border-border hover:border-foreground',
                index % 2 === 1 ? 'md:col-start-2' : '',
              ]"
            >
              <img
                v-if="!project.meta.liveUrl"
                :src="project.meta.image"
                :alt="project.title"
                class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />

              <!-- Added hover preview iframe -->
              <div
                v-if="project.meta.liveUrl"
                class="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
              >
                <iframe
                  :src="project.meta.liveUrl"
                  class="w-full h-full border-0 scale-50 origin-top-left"
                  style="width: 200%; height: 200%"
                  loading="lazy"
                />
                <div class="absolute inset-0 flex items-center justify-center">
                  <span class="text-xs font-mono uppercase tracking-widest"
                    >Live Preview</span
                  >
                </div>
              </div>
            </NuxtLink>

            <!-- Content -->
            <div class="space-y-6">
              <div
                class="flex items-center gap-4 text-xs font-mono uppercase tracking-widest text-muted-foreground"
              >
                <span>{{ project.meta.category }}</span>
                <span>•</span>
                <span>{{ project.meta.year }}</span>
              </div>
              <div>
                <h2 class="text-3xl md:text-4xl font-serif font-bold mb-4">
                  {{ project.title }}
                </h2>
                <p class="text-muted-foreground leading-relaxed">
                  {{ project.description }}
                </p>
              </div>
              <div class="space-y-3">
                <h3
                  class="text-xs font-mono uppercase tracking-widest text-muted-foreground"
                >
                  Technologies
                </h3>
                <div class="flex flex-wrap gap-2">
                  <span
                    v-for="tech in project.meta.technologies"
                    :key="tech"
                    class="px-3 py-1 border border-border text-xs font-medium"
                  >
                    {{ tech }}
                  </span>
                </div>
              </div>
              <NuxtLink
                :to="project.path"
                class="inline-flex items-center gap-2 text-sm font-medium hover:gap-4 transition-all"
              >
                View Project
                <ArrowRight class="w-4 h-4" />
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="py-24 px-6 border-t border-border">
      <div class="container mx-auto max-w-4xl text-center space-y-8">
        <h2 class="text-4xl md:text-5xl font-serif font-bold">
          Have a Project in Mind?
        </h2>
        <p
          class="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed"
        >
          Let's collaborate to bring your vision to life with thoughtful design
          and expert execution.
        </p>
        <NuxtLink
          to="/contact"
          class="inline-block px-8 py-4 bg-foreground text-background hover:bg-foreground/90 rounded-full font-medium text-sm uppercase tracking-wider"
        >
          Start a Conversation
        </NuxtLink>
      </div>
    </section>
  </div>
</template>
