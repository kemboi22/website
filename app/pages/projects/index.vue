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
            :key="project._path"
            class="grid grid-cols-1 md:grid-cols-2 gap-8 items-center"
            :class="index % 2 === 1 ? 'md:grid-flow-dense' : ''"
          >
            <!-- Image -->
            <NuxtLink
              :to="project._path"
              :class="[
                'group relative aspect-[4/3] overflow-hidden border border-border hover:border-foreground',
                index % 2 === 1 ? 'md:col-start-2' : '',
              ]"
            >
              <img
                :src="project.image"
                :alt="project.title"
                class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div
                class="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/10 transition-colors"
              />

              <!-- Added hover preview iframe -->
              <div
                v-if="project.liveUrl"
                class="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
              >
                <iframe
                  :src="project.liveUrl"
                  class="w-full h-full border-0 scale-50 origin-top-left"
                  style="width: 200%; height: 200%"
                  loading="lazy"
                />
                <div
                  class="absolute inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center"
                >
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
                <span>{{ project.category }}</span>
                <span>•</span>
                <span>{{ project.year }}</span>
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
                    v-for="tech in project.technologies"
                    :key="tech"
                    class="px-3 py-1 border border-border text-xs font-medium"
                  >
                    {{ tech }}
                  </span>
                </div>
              </div>
              <NuxtLink
                :to="project._path"
                class="inline-flex items-center gap-2 text-sm font-medium hover:gap-4 transition-all"
              >
                View Project
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

<script setup lang="ts">
const selectedCategory = ref("All");

const { data: allProjects } = await useAsyncData("projects", () =>
  queryContent("projects").sort({ year: -1, id: -1 }).find(),
);

const categories = computed(() => {
  const cats = new Set(["All"]);
  allProjects.value?.forEach((project) => cats.add(project.category));
  return Array.from(cats);
});

const filteredProjects = computed(() => {
  if (!allProjects.value) return [];
  if (selectedCategory.value === "All") {
    return allProjects.value;
  }
  return allProjects.value.filter(
    (project) => project.category === selectedCategory.value,
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
  ],
});
</script>
