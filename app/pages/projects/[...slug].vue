<template>
  <div class="pt-16">
    <div v-if="project">
      <!-- Hero -->
      <section
        class="min-h-[70vh] flex items-end px-6 pb-24 border-b border-border relative overflow-hidden"
      >
        <div class="absolute inset-0 -z-10">
          <img
            :src="project.image"
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
              <span>{{ project.category }}</span>
              <span>•</span>
              <span>{{ project.year }}</span>
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
              <div class="prose prose-lg prose-invert max-w-none">
                <ContentRenderer :value="project" />
              </div>

              <!-- Project Images -->
              <div class="grid grid-cols-1 gap-8 pt-8">
                <div class="aspect-video border border-border overflow-hidden">
                  <img
                    :src="`/placeholder.svg?height=600&width=1200&query=${project.title} detail 1`"
                    :alt="`${project.title} detail`"
                    class="w-full h-full object-cover"
                  />
                </div>
                <div class="grid grid-cols-2 gap-8">
                  <div
                    class="aspect-square border border-border overflow-hidden"
                  >
                    <img
                      :src="`/placeholder.svg?height=600&width=600&query=${project.title} detail 2`"
                      :alt="`${project.title} detail`"
                      class="w-full h-full object-cover"
                    />
                  </div>
                  <div
                    class="aspect-square border border-border overflow-hidden"
                  >
                    <img
                      :src="`/placeholder.svg?height=600&width=600&query=${project.title} detail 3`"
                      :alt="`${project.title} detail`"
                      class="w-full h-full object-cover"
                    />
                  </div>
                </div>
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
                    {{ project.client || "Personal Project" }}
                  </p>
                </div>

                <div>
                  <h3
                    class="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-3"
                  >
                    Year
                  </h3>
                  <p class="font-medium">{{ project.year }}</p>
                </div>

                <div>
                  <h3
                    class="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-3"
                  >
                    Category
                  </h3>
                  <p class="font-medium">{{ project.category }}</p>
                </div>

                <div>
                  <h3
                    class="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-3"
                  >
                    Technologies
                  </h3>
                  <div class="flex flex-wrap gap-2">
                    <span
                      v-for="tech in project.technologies"
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
                    v-if="project.liveUrl"
                    :href="project.liveUrl"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="flex items-center justify-center gap-2 w-full px-6 py-3 bg-foreground text-background hover:bg-foreground/90 text-sm font-medium uppercase tracking-wider"
                  >
                    View Live
                    <svg
                      class="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                      />
                    </svg>
                  </a>
                  <a
                    v-if="project.githubUrl"
                    :href="project.githubUrl"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="flex items-center justify-center gap-2 w-full px-6 py-3 border border-border hover:border-foreground text-sm font-medium uppercase tracking-wider"
                  >
                    View Code
                    <svg
                      class="w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"
                      />
                    </svg>
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
              <svg
                class="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M7 16l-4-4m0 0l4-4m-4 4h18"
                />
              </svg>
              Back to Projects
            </NuxtLink>
            <NuxtLink
              to="/contact"
              class="flex items-center gap-2 text-sm font-medium hover:gap-4 transition-all"
            >
              Start a Project
              <svg
                class="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </NuxtLink>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
const route = useRoute();

const { data: project } = await useAsyncData(`project-${route.path}`, () =>
  queryContent(route.path).findOne(),
);

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
  ],
});
</script>

<style>
/* Added prose styles for markdown content */
/* .prose { */
/*   @apply text-foreground; */
/* } */
/**/
/* .prose h2 { */
/*   @apply text-3xl font-serif font-bold mt-12 mb-6; */
/* } */
/**/
/* .prose h3 { */
/*   @apply text-2xl font-serif font-bold mt-8 mb-4; */
/* } */
/**/
/* .prose p { */
/*   @apply text-muted-foreground leading-relaxed mb-6; */
/* } */
/**/
/* .prose ul, */
/* .prose ol { */
/*   @apply text-muted-foreground leading-relaxed mb-6 pl-6; */
/* } */
/**/
/* .prose li { */
/*   @apply mb-2; */
/* } */
/**/
/* .prose strong { */
/*   @apply text-foreground font-semibold; */
/* } */
/**/
/* .prose code { */
/*   @apply bg-muted px-2 py-1 rounded text-sm font-mono; */
/* } */
/**/
/* .prose pre { */
/*   @apply bg-muted p-4 rounded overflow-x-auto mb-6; */
/* } */
</style>
