<script setup lang="ts">
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  GithubIcon,
} from "lucide-vue-next";

const route = useRoute();
const { isDark } = useTheme();
const config = useRuntimeConfig();

const { data: project } = await useAsyncData(`project-${route.path}`, () =>
  queryCollection("projects").path(route.path).first(),
);
console.log(project.value);
useHead({
  title: computed(() =>
    project.value
      ? `${project.value.title} - Portfolio`
      : "Project - Portfolio",
  ),
  meta: [
    {
      name: "description",
      content: computed(() => project.value?.description || ""),
    },
    {
      property: "og:title",
      content: computed(() => project.value?.title || "Project - Portfolio"),
    },
    {
      property: "og:description",
      content: computed(() => project.value?.description || ""),
    },
    {
      property: "og:image",
      content: computed(() => project.value?.meta?.image || ""),
    },
    {
      property: "og:url",
      content: computed(() => `${config.public.siteUrl}${route.path}`),
    },
    {
      name: "twitter:card",
      content: "summary_large_image",
    },
    {
      name: "twitter:title",
      content: computed(() => project.value?.title || "Project - Portfolio"),
    },
    {
      name: "twitter:description",
      content: computed(() => project.value?.description || ""),
    },
    {
      name: "twitter:image",
      content: computed(() => project.value?.meta?.image || ""),
    },
  ],

  link: [
    {
      rel: "canonical",
      href: computed(() => `${config.public.siteUrl}${route.path}`),
    },
  ],
});
</script>
<template>
  <div class="pt-16">
    <div v-if="project">
      <!-- Hero -->
      <section
        class="min-h-[70vh] flex items-end px-6 pb-24 border-b border-border relative overflow-hidden"
      >
        <div class="absolute inset-0 -z-10">
          <img
            :src="project.meta.image"
            :alt="project.title"
            class="w-full h-full object-cover opacity-20"
          />
          <div
            class="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent"
          />
        </div>

        <div class="container mx-auto max-w-6xl">
          <div class="space-y-6">
            <div
              class="flex items-center gap-4 text-xs font-mono uppercase tracking-widest text-muted-foreground"
            >
              <span>{{ project.meta.category }}</span>
              <span>•</span>
              <span>{{ project.meta.year }}</span>
            </div>
            <h1
              class="text-5xl md:text-7xl font-serif font-bold tracking-tight max-w-4xl"
            >
              {{ project.title }}
            </h1>
          </div>
        </div>
      </section>

      <!-- Project Details -->
      <section class="py-24 px-6">
        <div class="container mx-auto max-w-6xl">
          <div class="grid grid-cols-1 md:grid-cols-3 gap-12">
            <!-- Main Content -->
            <div class="md:col-span-2 space-y-12">
              <!-- Render markdown content from Nuxt Content -->
              <div
                :class="[
                  'prose',
                  'prose-lg',
                  'max-w-none',
                  isDark ? 'prose-invert' : 'prose-stone',
                ]"
              >
                <ContentRenderer :value="project" />
              </div>
            </div>

            <!-- Sidebar -->
            <div class="space-y-8">
              <div class="border border-border p-6 space-y-6 sticky top-24">
                <div>
                  <h3
                    class="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-3"
                  >
                    Client
                  </h3>
                  <p class="font-medium">
                    {{ project.meta.client || "Personal Project" }}
                  </p>
                </div>

                <div>
                  <h3
                    class="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-3"
                  >
                    Year
                  </h3>
                  <p class="font-medium">{{ project.meta.year }}</p>
                </div>

                <div>
                  <h3
                    class="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-3"
                  >
                    Category
                  </h3>
                  <p class="font-medium">{{ project.meta.category }}</p>
                </div>

                <div>
                  <h3
                    class="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-3"
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

                <!-- Added links for live URL and GitHub -->
                <div class="pt-4 space-y-3">
                  <a
                    v-if="project.meta.liveUrl"
                    :href="project.meta.liveUrl"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="flex items-center justify-center gap-2 w-full px-6 py-3 bg-foreground text-background hover:bg-foreground/90 text-sm font-medium uppercase tracking-wider"
                  >
                    View Live
                    <ArrowUpRight class="w-4 h-4" />
                  </a>
                  <a
                    v-if="project.meta.githubUrl"
                    :href="project.meta.githubUrl"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="flex items-center justify-center gap-2 w-full px-6 py-3 border border-border hover:border-foreground text-sm font-medium uppercase tracking-wider"
                  >
                    View Code
                    <GithubIcon class="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Navigation -->
      <section class="py-12 px-6 border-t border-border">
        <div class="container mx-auto max-w-6xl">
          <div class="flex items-center justify-between">
            <NuxtLink
              to="/projects"
              class="flex items-center gap-2 text-sm font-medium hover:gap-4 transition-all"
            >
              <ArrowLeft />
              Back to Projects
            </NuxtLink>
            <NuxtLink
              to="/contact"
              class="flex items-center gap-2 text-sm font-medium hover:gap-4 transition-all"
            >
              Start a Project
              <ArrowRight />
            </NuxtLink>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>
<style scoped></style>
