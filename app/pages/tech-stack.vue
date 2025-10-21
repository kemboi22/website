<script setup lang="ts">
import { useHead } from "#imports";

const techStack = [
  {
    name: "Frontend Development",
    icon: "⚡",
    description: "Building responsive, performant user interfaces",
    technologies: [
      {
        name: "JavaScript",
        proficiency: 5,
        years: 3,
        description:
          "Core language for building interactive web applications and dynamic user experiences.",
        usedFor: ["Web Apps", "SPAs", "APIs"],
      },
      {
        name: "TypeScript",
        proficiency: 5,
        years: 3,
        description:
          "Typed superset of JavaScript for building scalable, maintainable applications.",
        usedFor: ["Type Safety", "Large Projects", "Teams"],
      },
      {
        name: "Vue.js",
        proficiency: 5,
        years: 3,
        description:
          "Progressive framework for building modern web applications with reactive components.",
        usedFor: ["SPAs", "Web Apps", "Dashboards"],
      },
      {
        name: "Nuxt.js",
        proficiency: 5,
        years: 3,
        description:
          "Full-stack framework for Vue.js with SSR, SSG, and excellent developer experience.",
        usedFor: ["SSR", "Static Sites", "Full-stack"],
      },
      {
        name: "Tailwind CSS",
        proficiency: 5,
        years: 3,
        description:
          "Utility-first CSS framework for rapid UI development and consistent styling.",
        usedFor: ["Styling", "Responsive", "Prototyping"],
      },
      {
        name: "CSS",
        proficiency: 5,
        years: 4,
        description:
          "Styling language for creating beautiful, responsive web interfaces.",
        usedFor: ["Styling", "Animations", "Layouts"],
      },
    ],
  },
  {
    name: "Backend Development",
    icon: "🔧",
    description: "Server-side logic and API development",
    technologies: [
      {
        name: "Node.js",
        proficiency: 5,
        years: 3,
        description:
          "JavaScript runtime for building scalable server-side applications and APIs.",
        usedFor: ["APIs", "Microservices", "Real-time"],
      },
      {
        name: "AdonisJS",
        proficiency: 4,
        years: 2,
        description:
          "Full-featured Node.js framework for building robust web applications.",
        usedFor: ["Web Apps", "APIs", "Full-stack"],
      },
      {
        name: "Prisma",
        proficiency: 4,
        years: 2,
        description:
          "Next-generation ORM for Node.js and TypeScript with type safety.",
        usedFor: ["Database", "ORM", "Type Safety"],
      },
      {
        name: "PHP",
        proficiency: 4,
        years: 3,
        description:
          "Server-side scripting language for web development and backend systems.",
        usedFor: ["Web Apps", "APIs", "CMS"],
      },
      {
        name: "Laravel",
        proficiency: 4,
        years: 3,
        description:
          "Elegant PHP framework for building modern web applications.",
        usedFor: ["Web Apps", "APIs", "Full-stack"],
      },
      {
        name: "C#",
        proficiency: 4,
        years: 2,
        description:
          "Object-oriented language for building enterprise applications with .NET.",
        usedFor: [".NET", "ASP.NET", "Enterprise"],
      },
      {
        name: "Golang",
        proficiency: 4,
        years: 2,
        description:
          "Fast, statically typed language for building efficient backend services.",
        usedFor: ["Microservices", "APIs", "Performance"],
      },
    ],
  },
  {
    name: "DevOps & Tools",
    icon: "🚀",
    description: "Deployment, version control, and development tools",
    technologies: [
      {
        name: "Git",
        proficiency: 5,
        years: 4,
        description:
          "Distributed version control system for tracking code changes and collaboration.",
        usedFor: ["Version Control", "Collaboration", "CI/CD"],
      },
      {
        name: "Docker",
        proficiency: 4,
        years: 2,
        description:
          "Containerization platform for consistent development and deployment environments.",
        usedFor: ["Containers", "Deployment", "Microservices"],
      },
      {
        name: "Podman",
        proficiency: 4,
        years: 2,
        description:
          "Daemonless container engine for developing, managing, and running OCI Containers.",
        usedFor: ["Containers", "Security", "Rootless"],
      },
      {
        name: "GitHub",
        proficiency: 5,
        years: 4,
        description:
          "Platform for version control, collaboration, and CI/CD workflows.",
        usedFor: ["Git Hosting", "Collaboration", "CI/CD"],
      },
      {
        name: "NethServer",
        proficiency: 4,
        years: 2,
        description:
          "Open-source server operating system for building and deploying applications.",
        usedFor: ["Server", "Deployment", "Modules"],
      },
    ],
  },
];

const currentlyLearning = ["Rust", "Zig", "Kubernetes", "WebAssembly"];

useHead({
  title: "Tech Stack - Portfolio",
  meta: [
    {
      name: "description",
      content:
        "Technologies and tools I use to build exceptional digital experiences.",
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
            >Technologies</span
          >
          <h1
            class="text-5xl md:text-7xl font-serif font-bold tracking-tight max-w-4xl"
          >
            Tech Stack
          </h1>
          <p class="text-lg text-muted-foreground max-w-2xl leading-relaxed">
            The tools, frameworks, and technologies I use to craft exceptional
            digital experiences.
          </p>
        </div>
      </div>
    </section>

    <!-- Tech Categories -->
    <section class="py-16 md:py-24 px-4 md:px-6">
      <div class="container mx-auto max-w-6xl space-y-16 md:space-y-24">
        <div
          v-for="category in techStack"
          :key="category.name"
          class="space-y-8"
        >
          <div class="flex flex-col sm:flex-row sm:items-center gap-4">
            <div
              class="w-12 h-12 border border-border flex items-center justify-center flex-shrink-0"
            >
              <span class="text-2xl">{{ category.icon }}</span>
            </div>
            <div>
              <h2 class="text-2xl md:text-3xl font-serif font-bold">
                {{ category.name }}
              </h2>
              <p class="text-sm text-muted-foreground">
                {{ category.description }}
              </p>
            </div>
          </div>

          <div
            class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6"
          >
            <div
              v-for="tech in category.technologies"
              :key="tech.name"
              class="group border border-border hover:border-foreground p-4 md:p-6 space-y-4 transition-all hover:shadow-lg"
            >
              <div class="flex items-start justify-between">
                <div class="space-y-2">
                  <h3 class="text-lg md:text-xl font-bold">{{ tech.name }}</h3>
                  <div class="flex items-center gap-2">
                    <div class="flex">
                      <div
                        v-for="i in 5"
                        :key="i"
                        class="w-2 h-2 border border-border"
                        :class="i <= tech.proficiency ? 'bg-foreground' : ''"
                      />
                    </div>
                    <span class="text-xs font-mono text-muted-foreground">
                      {{ tech.proficiency }}/5
                    </span>
                  </div>
                </div>
                <span class="text-xs font-mono text-muted-foreground">
                  {{ tech.years }}y
                </span>
              </div>
              <p class="text-sm text-muted-foreground leading-relaxed">
                {{ tech.description }}
              </p>
              <div class="flex flex-wrap gap-2">
                <span
                  v-for="use in tech.usedFor"
                  :key="use"
                  class="px-2 py-1 text-xs border border-border font-mono"
                >
                  {{ use }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Learning Section -->
    <section
      class="py-16 md:py-24 px-4 md:px-6 border-t border-border bg-muted/20"
    >
      <div class="container mx-auto max-w-4xl text-center space-y-8">
        <h2 class="text-3xl md:text-4xl lg:text-5xl font-serif font-bold">
          Currently Learning
        </h2>
        <div class="flex flex-wrap justify-center gap-4">
          <div
            v-for="tech in currentlyLearning"
            :key="tech"
            class="px-4 md:px-6 py-3 border border-border bg-background hover:border-foreground transition-colors"
          >
            <span class="font-medium text-sm md:text-base">{{ tech }}</span>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
