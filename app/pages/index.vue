<template>
  <div class="pt-16">
    <!-- Hero Section with Animated Grid -->
    <section
      class="min-h-screen flex items-center justify-center px-6 relative overflow-hidden"
    >
      <!-- Animated Grid Background -->
      <div class="absolute inset-0 -z-10 opacity-20">
        <div class="grid-pattern"></div>
      </div>

      <div class="container mx-auto max-w-6xl">
        <div class="grid md:grid-cols-2 gap-12 items-center">
          <!-- Left: Text Content -->
          <div class="space-y-6" data-animate="slide-left">
            <div class="space-y-2">
              <Badge
                variant="outline"
                class="text-xs font-mono uppercase tracking-widest"
              >
                Full Stack Developer
              </Badge>
              <h1
                class="text-5xl md:text-7xl font-serif font-bold tracking-tight leading-none"
              >
                Kemboi Elvis
              </h1>
              <p class="text-xl md:text-2xl text-muted-foreground font-light">
                Building scalable solutions across the stack
              </p>
            </div>

            <p class="text-base text-muted-foreground leading-relaxed max-w-lg">
              Expert software developer proficient in building and optimizing
              software solutions. Talented coder bringing consistent record of
              producing quality deliverables across JavaScript, TypeScript, Vue,
              C#, Golang, and PHP ecosystems.
            </p>

            <!-- Quick Stats -->
            <div class="grid grid-cols-3 gap-4 pt-4">
              <div class="space-y-1">
                <div class="text-3xl font-serif font-bold">8+</div>
                <div
                  class="text-xs text-muted-foreground uppercase tracking-wider"
                >
                  Languages
                </div>
              </div>
              <div class="space-y-1">
                <div class="text-3xl font-serif font-bold">15+</div>
                <div
                  class="text-xs text-muted-foreground uppercase tracking-wider"
                >
                  Projects
                </div>
              </div>
              <div class="space-y-1">
                <div class="text-3xl font-serif font-bold">3+</div>
                <div
                  class="text-xs text-muted-foreground uppercase tracking-wider"
                >
                  Years Exp
                </div>
              </div>
            </div>

            <!-- CTA Buttons -->
            <div class="flex flex-wrap items-center gap-4 pt-4">
              <Button as-child size="lg" class="rounded-full px-8">
                <NuxtLink to="/projects">View Projects</NuxtLink>
              </Button>
              <Button
                as-child
                variant="outline"
                size="lg"
                class="rounded-full px-8"
              >
                <NuxtLink to="/contact">Get in Touch</NuxtLink>
              </Button>
              <Button
                as-child
                variant="ghost"
                size="lg"
                class="rounded-full px-8"
              >
                <a href="mailto:kemboielvis22@gmail.com">
                  <svg
                    class="w-4 h-4 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  Email Me
                </a>
              </Button>
            </div>
          </div>

          <!-- Right: Visual Element -->
          <div
            class="relative"
            data-animate="slide-right"
            data-animate-delay="200"
          >
            <Card
              class="p-8 border-2 hover:border-foreground transition-all duration-300 group"
            >
              <div class="space-y-6">
                <!-- Location & Contact -->
                <div class="space-y-3">
                  <div class="flex items-center gap-3 text-sm">
                    <svg
                      class="w-4 h-4 text-muted-foreground"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    <span>Nairobi, Kenya</span>
                  </div>
                  <div class="flex items-center gap-3 text-sm">
                    <svg
                      class="w-4 h-4 text-muted-foreground"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                    <span>+254 718 240 819</span>
                  </div>
                </div>

                <Separator />

                <!-- Tech Stack Preview -->
                <div class="space-y-3">
                  <div
                    class="text-xs font-mono uppercase tracking-widest text-muted-foreground"
                  >
                    Primary Stack
                  </div>
                  <div class="flex flex-wrap gap-2">
                    <Badge
                      v-for="tech in primaryStack"
                      :key="tech"
                      variant="secondary"
                      class="font-mono text-xs"
                    >
                      {{ tech }}
                    </Badge>
                  </div>
                </div>

                <Separator />

                <!-- Languages -->
                <div class="space-y-3">
                  <div
                    class="text-xs font-mono uppercase tracking-widest text-muted-foreground"
                  >
                    Languages
                  </div>
                  <div class="flex gap-4 text-sm">
                    <span>English</span>
                    <span class="text-muted-foreground">•</span>
                    <span>Kiswahili</span>
                    <span class="text-muted-foreground">•</span>
                    <span>Kalenjin</span>
                  </div>
                </div>

                <!-- Social Links -->
                <div class="flex gap-3 pt-4">
                  <Button
                    as-child
                    variant="outline"
                    size="icon"
                    class="rounded-full"
                  >
                    <a
                      href="https://github.com/kemboi22"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
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
                  </Button>
                  <Button
                    as-child
                    variant="outline"
                    size="icon"
                    class="rounded-full"
                  >
                    <a
                      href="https://linkedin.com/in/kemboi-elvis-ab7a431b2"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <svg
                        class="w-4 h-4"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
                        />
                      </svg>
                    </a>
                  </Button>
                  <Button
                    as-child
                    variant="outline"
                    size="icon"
                    class="rounded-full"
                  >
                    <a
                      href="https://twitter.com/kemboielvis22"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <svg
                        class="w-4 h-4"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"
                        />
                      </svg>
                    </a>
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>

    <!-- Featured Projects Section -->
    <section class="py-24 px-6 border-t border-border">
      <div class="container mx-auto max-w-6xl">
        <div class="flex items-end justify-between mb-16" data-animate="fade">
          <div>
            <span
              class="text-xs font-mono uppercase tracking-widest text-muted-foreground"
              >Portfolio</span
            >
            <h2 class="text-4xl md:text-5xl font-serif font-bold mt-2">
              Featured Projects
            </h2>
          </div>
          <Button
            as-child
            variant="ghost"
            class="hidden md:flex items-center gap-2"
          >
            <NuxtLink to="/projects">
              View All
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
          </Button>
        </div>

        <!-- Highlight Projects -->
        <div class="space-y-8 mb-12">
          <Card
            v-for="(project, index) in highlightProjects"
            :key="project.title"
            class="group overflow-hidden hover:border-foreground transition-all duration-300"
            data-animate="scale"
            :data-animate-delay="index * 100"
          >
            <div class="grid md:grid-cols-2 gap-0">
              <div class="p-8 md:p-12 flex flex-col justify-center">
                <Badge variant="secondary" class="w-fit mb-4 font-mono text-xs">
                  {{ project.category }}
                </Badge>
                <h3 class="text-3xl font-serif font-bold mb-4">
                  {{ project.title }}
                </h3>
                <p class="text-muted-foreground mb-6 leading-relaxed">
                  {{ project.description }}
                </p>
                <div class="flex flex-wrap gap-2 mb-6">
                  <Badge
                    v-for="tech in project.tech"
                    :key="tech"
                    variant="outline"
                    class="font-mono text-xs"
                  >
                    {{ tech }}
                  </Badge>
                </div>
                <div class="flex gap-3">
                  <Button as-child size="sm" class="rounded-full">
                    <a
                      :href="project.link"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View Project
                      <svg
                        class="w-4 h-4 ml-2"
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
                  </Button>
                </div>
              </div>
              <div
                class="bg-muted/30 p-8 md:p-12 flex items-center justify-center border-l border-border"
              >
                <div class="text-center space-y-4">
                  <div class="text-6xl font-serif font-bold opacity-20">
                    {{ project.icon }}
                  </div>
                  <div class="text-sm text-muted-foreground font-mono">
                    {{ project.year }}
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>

        <!-- More Projects Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div
            v-for="(project, index) in featuredProjects"
            :key="project._path"
            data-animate
            :data-animate-delay="index * 100"
          >
            <ProjectCard :project="project" />
          </div>
        </div>
      </div>
    </section>

    <!-- Tech Stack Section -->
    <section class="py-24 px-6 bg-muted/30">
      <div class="container mx-auto max-w-6xl">
        <div class="text-center mb-16" data-animate="fade">
          <span
            class="text-xs font-mono uppercase tracking-widest text-muted-foreground"
            >Technologies</span
          >
          <h2 class="text-4xl md:text-5xl font-serif font-bold mt-2">
            Tech Stack
          </h2>
          <p class="text-muted-foreground mt-4 max-w-2xl mx-auto">
            Proficient across multiple languages and frameworks, delivering
            scalable solutions
          </p>
        </div>

        <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div
            v-for="(tech, index) in techStack"
            :key="tech.name"
            data-animate="scale"
            :data-animate-delay="index * 50"
          >
            <Card
              class="p-6 text-center hover:border-foreground group transition-all duration-300 hover:scale-105"
            >
              <div class="text-4xl mb-3">{{ tech.icon }}</div>
              <div class="font-mono text-sm font-semibold">{{ tech.name }}</div>
              <div class="text-xs text-muted-foreground mt-1">
                {{ tech.category }}
              </div>
            </Card>
          </div>
        </div>

        <div
          class="text-center mt-12"
          data-animate="fade"
          data-animate-delay="400"
        >
          <Button
            as-child
            variant="outline"
            size="lg"
            class="rounded-full px-8"
          >
            <NuxtLink to="/tech-stack">View Full Stack</NuxtLink>
          </Button>
        </div>
      </div>
    </section>

    <!-- Experience Timeline -->
    <section class="py-24 px-6 border-t border-border">
      <div class="container mx-auto max-w-4xl">
        <div class="text-center mb-16" data-animate="fade">
          <span
            class="text-xs font-mono uppercase tracking-widest text-muted-foreground"
            >Journey</span
          >
          <h2 class="text-4xl md:text-5xl font-serif font-bold mt-2">
            Experience
          </h2>
        </div>

        <div class="space-y-8">
          <Card
            v-for="(exp, index) in experience"
            :key="index"
            class="p-8 hover:border-foreground transition-colors group"
            data-animate
            :data-animate-delay="index * 100"
          >
            <div
              class="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4"
            >
              <div>
                <h3 class="text-xl font-serif font-bold">{{ exp.role }}</h3>
                <div class="text-muted-foreground mt-1">{{ exp.company }}</div>
              </div>
              <Badge variant="outline" class="w-fit font-mono text-xs">
                {{ exp.period }}
              </Badge>
            </div>
            <p class="text-sm text-muted-foreground leading-relaxed">
              {{ exp.description }}
            </p>
          </Card>
        </div>

        <div
          class="text-center mt-12"
          data-animate="fade"
          data-animate-delay="300"
        >
          <Button
            as-child
            variant="outline"
            size="lg"
            class="rounded-full px-8"
          >
            <NuxtLink to="/about">Full Background</NuxtLink>
          </Button>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="py-24 px-6 bg-foreground text-background">
      <div class="container mx-auto max-w-4xl text-center" data-animate="fade">
        <h2 class="text-4xl md:text-6xl font-serif font-bold mb-6">
          Let's Build Something Amazing
        </h2>
        <p class="text-lg md:text-xl opacity-80 mb-8 max-w-2xl mx-auto">
          Available for freelance projects, collaborations, and full-time
          opportunities. Let's discuss how we can work together.
        </p>
        <div
          class="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Button
            as-child
            size="lg"
            variant="secondary"
            class="rounded-full px-8"
          >
            <NuxtLink to="/contact">Start a Project</NuxtLink>
          </Button>
          <Button
            as-child
            size="lg"
            variant="outline"
            class="rounded-full px-8 border-background text-background hover:bg-background hover:text-foreground"
          >
            <a href="mailto:kemboielvis22@gmail.com">Email Me</a>
          </Button>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
const primaryStack = [
  "Vue.js",
  "Nuxt",
  "TypeScript",
  "Node.js",
  "C#",
  "Golang",
];

const highlightProjects = [
  {
    title: "Hospital Management System",
    description:
      "Comprehensive healthcare platform with patient management, EHR, billing, pharmacy inventory, and laboratory integration. Features smart dashboards and compliance with HIPAA and GDPR.",
    category: "Healthcare",
    tech: ["Vue.js", "Node.js", "PostgreSQL", "Docker"],
    link: "https://demo.sm.smarthos.co.ke",
    icon: "🏥",
    year: "2024",
  },
  {
    title: "Safaricom Distribution Management",
    description:
      "Enterprise telecom sales platform managing airtime distribution, SIM operations, and phone inventory across multiple branches with automated payroll and commission structures.",
    category: "Enterprise",
    tech: ["Laravel", "Vue.js", "MySQL", "Redis"],
    link: "https://citytel.m-fugo.com",
    icon: "📱",
    year: "2024",
  },
];

const techStack = [
  { name: "JavaScript", icon: "JS", category: "Language" },
  { name: "TypeScript", icon: "TS", category: "Language" },
  { name: "Vue.js", icon: "🖼️", category: "Framework" },
  { name: "Nuxt", icon: "⚡", category: "Framework" },
  { name: "C#", icon: "C#", category: "Language" },
  { name: "Golang", icon: "Go", category: "Language" },
  { name: "Node.js", icon: "🟢", category: "Runtime" },
  { name: "PHP", icon: "PHP", category: "Language" },
];

const experience = [
  {
    role: "Developer",
    company: "Genius Dynamics",
    period: "Nov 2022 - Present",
    description:
      "Building NethServer modules for easy deployment of open-source applications. Managing school systems and collaborating on Docker/Podman-based projects.",
  },
  {
    role: "Developer",
    company: "EMaxy IT",
    period: "Jan 2023 - Present",
    description:
      "Developing high-quality software solutions using modern programming languages. Interacting with clients to implement software solutions for their business problems.",
  },
  {
    role: "Developer",
    company: "Clifford Technologies",
    period: "June 2022 - July 2022",
    description:
      "Built fleet management system. Worked within Agile frameworks and contributed to code reviews, debugging, and optimization.",
  },
];

const { data: featuredProjects } = await useAsyncData("featured-projects", () =>
  queryContent("projects").where({ featured: true }).limit(4).find(),
);

useHead({
  title: " Kemboi Elvis - Full Stack Developer",
  meta: [
    {
      name: "description",
      content:
        "Expert software developer proficient in JavaScript, TypeScript, Vue, C#, Golang, and PHP. Building scalable solutions across the stack.",
    },
  ],
});

useScrollAnimation();
</script>

<style scoped>
.grid-pattern {
  background-image:
    linear-gradient(to right, hsl(var(--border)) 1px, transparent 1px),
    linear-gradient(to bottom, hsl(var(--border)) 1px, transparent 1px);
  background-size: 40px 40px;
  width: 100%;
  height: 100%;
  animation: grid-move 20s linear infinite;
}

@keyframes grid-move {
  0% {
    transform: translate(0, 0);
  }
  100% {
    transform: translate(40px, 40px);
  }
}
</style>
