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
            >Open Source</span
          >
          <h1
            class="text-5xl md:text-7xl font-serif font-bold tracking-tight max-w-4xl"
          >
            GitHub Activity
          </h1>
          <p class="text-lg text-muted-foreground max-w-2xl leading-relaxed">
            My contributions to open source, personal projects, and
            collaborative development.
          </p>
          <a
            href="https://github.com/yourusername"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center gap-2 text-sm font-medium hover:gap-4 transition-all"
          >
            View Full Profile
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
          </a>
        </div>
      </div>
    </section>

    <!-- Stats -->
    <section class="py-12 px-6 border-b border-border">
      <div class="container mx-auto max-w-6xl">
        <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div
            v-for="stat in stats"
            :key="stat.label"
            class="text-center space-y-2 p-6 border border-border hover:border-foreground transition-colors"
          >
            <div class="text-4xl font-serif font-bold">{{ stat.value }}</div>
            <div
              class="text-xs font-mono uppercase tracking-widest text-muted-foreground"
            >
              {{ stat.label }}
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Recent Pull Requests -->
    <section class="py-24 px-6">
      <div class="container mx-auto max-w-6xl space-y-12">
        <div class="flex items-center justify-between">
          <h2 class="text-3xl font-serif font-bold">Recent Pull Requests</h2>
          <span
            class="text-xs font-mono uppercase tracking-widest text-muted-foreground"
          >
            Last 30 Days
          </span>
        </div>

        <div class="space-y-4">
          <div
            v-for="pr in pullRequests"
            :key="pr.id"
            class="group border border-border hover:border-foreground p-6 transition-all"
          >
            <div class="flex items-start gap-4">
              <div
                class="w-8 h-8 border border-border flex items-center justify-center flex-shrink-0"
                :class="
                  pr.status === 'merged' ? 'bg-foreground text-background' : ''
                "
              >
                <svg
                  v-if="pr.status === 'merged'"
                  class="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                </svg>
                <svg
                  v-else
                  class="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 4v16m8-8H4"
                  />
                </svg>
              </div>

              <div class="flex-1 space-y-3">
                <div>
                  <a
                    :href="pr.url"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="text-lg font-bold hover:text-muted-foreground transition-colors"
                  >
                    {{ pr.title }}
                  </a>
                  <div
                    class="flex items-center gap-3 mt-2 text-xs font-mono text-muted-foreground"
                  >
                    <span>{{ pr.repo }}</span>
                    <span>•</span>
                    <span>#{{ pr.number }}</span>
                    <span>•</span>
                    <span>{{ pr.date }}</span>
                  </div>
                </div>

                <p class="text-sm text-muted-foreground leading-relaxed">
                  {{ pr.description }}
                </p>

                <div class="flex flex-wrap gap-2">
                  <span
                    v-for="label in pr.labels"
                    :key="label"
                    class="px-2 py-1 text-xs border border-border font-mono"
                  >
                    {{ label }}
                  </span>
                </div>
              </div>

              <div class="text-right space-y-2 flex-shrink-0">
                <div class="text-sm font-mono">
                  <span class="text-green-600">+{{ pr.additions }}</span>
                  <span class="mx-1">/</span>
                  <span class="text-red-600">-{{ pr.deletions }}</span>
                </div>
                <div class="text-xs text-muted-foreground">
                  {{ pr.files }} files
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Popular Repositories -->
    <section class="py-24 px-6 border-t border-border">
      <div class="container mx-auto max-w-6xl space-y-12">
        <h2 class="text-3xl font-serif font-bold">Popular Repositories</h2>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <a
            v-for="repo in repositories"
            :key="repo.name"
            :href="repo.url"
            target="_blank"
            rel="noopener noreferrer"
            class="group border border-border hover:border-foreground p-6 space-y-4 transition-all"
          >
            <div class="flex items-start justify-between">
              <div class="space-y-2 flex-1">
                <h3
                  class="text-xl font-bold group-hover:text-muted-foreground transition-colors"
                >
                  {{ repo.name }}
                </h3>
                <p class="text-sm text-muted-foreground leading-relaxed">
                  {{ repo.description }}
                </p>
              </div>
            </div>

            <div
              class="flex items-center gap-6 text-xs font-mono text-muted-foreground"
            >
              <div class="flex items-center gap-2">
                <div
                  class="w-3 h-3 rounded-full"
                  :style="{ backgroundColor: repo.languageColor }"
                />
                <span>{{ repo.language }}</span>
              </div>
              <div class="flex items-center gap-1">
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path
                    d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z"
                  />
                </svg>
                <span>{{ repo.stars }}</span>
              </div>
              <div class="flex items-center gap-1">
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
                    d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                  />
                </svg>
                <span>{{ repo.forks }}</span>
              </div>
            </div>

            <div class="flex flex-wrap gap-2">
              <span
                v-for="topic in repo.topics"
                :key="topic"
                class="px-2 py-1 text-xs border border-border font-mono"
              >
                {{ topic }}
              </span>
            </div>
          </a>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { useHead } from "#imports";

const stats = [
  { label: "Repositories", value: "47" },
  { label: "Contributions", value: "1.2k" },
  { label: "Pull Requests", value: "156" },
  { label: "Stars Earned", value: "892" },
];

const pullRequests = [
  {
    id: 1,
    title: "Add dark mode support to dashboard components",
    repo: "company/dashboard",
    number: 234,
    status: "merged",
    date: "2 days ago",
    description:
      "Implemented comprehensive dark mode theming across all dashboard components with proper color contrast and accessibility considerations.",
    labels: ["enhancement", "ui", "accessibility"],
    additions: 342,
    deletions: 89,
    files: 12,
    url: "https://github.com",
  },
  {
    id: 2,
    title: "Fix memory leak in WebSocket connection handler",
    repo: "opensource/realtime-lib",
    number: 89,
    status: "merged",
    date: "5 days ago",
    description:
      "Resolved memory leak caused by improper cleanup of WebSocket event listeners. Added proper disposal pattern and unit tests.",
    labels: ["bug", "performance", "websocket"],
    additions: 156,
    deletions: 43,
    files: 5,
    url: "https://github.com",
  },
  {
    id: 3,
    title: "Implement server-side pagination for large datasets",
    repo: "client/data-platform",
    number: 445,
    status: "open",
    date: "1 week ago",
    description:
      "Added cursor-based pagination to handle large datasets efficiently. Includes API changes and frontend integration.",
    labels: ["feature", "backend", "api"],
    additions: 523,
    deletions: 167,
    files: 18,
    url: "https://github.com",
  },
  {
    id: 4,
    title: "Update TypeScript to v5.3 and fix type errors",
    repo: "company/monorepo",
    number: 678,
    status: "merged",
    date: "2 weeks ago",
    description:
      "Upgraded TypeScript to latest version and resolved all type errors across the monorepo. Improved type safety and developer experience.",
    labels: ["maintenance", "typescript", "dependencies"],
    additions: 89,
    deletions: 234,
    files: 45,
    url: "https://github.com",
  },
];

const repositories = [
  {
    name: "vue-component-library",
    description:
      "A comprehensive collection of reusable Vue 3 components with TypeScript support and full documentation.",
    language: "TypeScript",
    languageColor: "#3178c6",
    stars: 234,
    forks: 45,
    topics: ["vue", "components", "typescript", "ui-library"],
    url: "https://github.com",
  },
  {
    name: "nuxt-portfolio-template",
    description:
      "Modern portfolio template built with Nuxt 3, featuring blog, projects showcase, and contact form.",
    language: "Vue",
    languageColor: "#42b883",
    stars: 189,
    forks: 67,
    topics: ["nuxt", "portfolio", "template", "tailwind"],
    url: "https://github.com",
  },
  {
    name: "api-rate-limiter",
    description:
      "Flexible rate limiting middleware for Node.js APIs with Redis support and multiple strategies.",
    language: "JavaScript",
    languageColor: "#f1e05a",
    stars: 156,
    forks: 23,
    topics: ["nodejs", "api", "rate-limiting", "redis"],
    url: "https://github.com",
  },
  {
    name: "design-system-tokens",
    description:
      "Design tokens for consistent styling across web and mobile applications. Supports multiple platforms.",
    language: "CSS",
    languageColor: "#563d7c",
    stars: 98,
    forks: 12,
    topics: ["design-system", "tokens", "css", "theming"],
    url: "https://github.com",
  },
];

useHead({
  title: "GitHub Activity - Portfolio",
  meta: [
    {
      name: "description",
      content:
        "My open source contributions, pull requests, and GitHub repositories.",
    },
  ],
});
</script>
