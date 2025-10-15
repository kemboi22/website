<template>
  <div class="pt-16">
    <section
      class="min-h-[60vh] flex items-center justify-center px-4 md:px-6 border-b border-border"
    >
      <div
        class="container mx-auto max-w-4xl text-center space-y-6"
        data-animate="fade"
      >
        <span
          class="text-xs font-mono uppercase tracking-widest text-muted-foreground"
          >What I Offer</span
        >
        <h1
          class="text-4xl md:text-5xl lg:text-7xl font-serif font-bold tracking-tight"
        >
          Services &
          <span class="block mt-2 italic">Solutions</span>
        </h1>
        <p
          class="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed"
        >
          From concept to deployment, I provide comprehensive software
          development services tailored to your needs.
        </p>
      </div>
    </section>

    <section class="py-16 md:py-24 px-4 md:px-6">
      <div class="container mx-auto max-w-6xl">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          <Card
            v-for="(service, index) in mainServices"
            :key="service.title"
            class="p-6 md:p-8 hover:border-foreground transition-all hover:shadow-lg hover-lift"
            :data-animate="index % 2 === 0 ? 'slide-left' : 'slide-right'"
            :data-animate-delay="index * 100"
          >
            <div class="space-y-6">
              <div
                class="w-16 h-16 border-2 border-foreground flex items-center justify-center"
              >
                <span class="text-3xl">{{ service.icon }}</span>
              </div>
              <div>
                <h3 class="text-2xl md:text-3xl font-serif font-bold mb-3">
                  {{ service.title }}
                </h3>
                <p class="text-muted-foreground leading-relaxed mb-4">
                  {{ service.description }}
                </p>
              </div>
              <div class="space-y-3">
                <h4
                  class="text-sm font-mono uppercase tracking-widest text-muted-foreground"
                >
                  Includes
                </h4>
                <ul class="space-y-2">
                  <li
                    v-for="item in service.includes"
                    :key="item"
                    class="flex items-start gap-3 text-sm"
                  >
                    <svg
                      class="w-5 h-5 flex-shrink-0 mt-0.5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span>{{ item }}</span>
                  </li>
                </ul>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>

    <section class="py-16 md:py-24 px-4 md:px-6 bg-muted/30">
      <div class="container mx-auto max-w-6xl">
        <div class="text-center mb-12 md:mb-16" data-animate="fade">
          <h2 class="text-3xl md:text-4xl font-serif font-bold mb-4">
            Additional Services
          </h2>
          <p class="text-muted-foreground max-w-2xl mx-auto">
            Specialized services to support your project at every stage
          </p>
        </div>

        <div
          class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
        >
          <Card
            v-for="(service, index) in additionalServices"
            :key="service.title"
            class="p-6 hover:border-foreground transition-all hover-lift"
            data-animate="scale"
            :data-animate-delay="index * 100"
          >
            <div class="space-y-4">
              <div
                class="w-12 h-12 border border-foreground flex items-center justify-center"
              >
                <span class="text-2xl">{{ service.icon }}</span>
              </div>
              <h3 class="text-xl font-serif font-bold">{{ service.title }}</h3>
              <p class="text-sm text-muted-foreground leading-relaxed">
                {{ service.description }}
              </p>
            </div>
          </Card>
        </div>
      </div>
    </section>

    <section class="py-16 md:py-24 px-4 md:px-6">
      <div class="container mx-auto max-w-6xl">
        <div class="text-center mb-12 md:mb-16" data-animate="fade">
          <h2 class="text-3xl md:text-4xl font-serif font-bold mb-4">
            My Process
          </h2>
          <p class="text-muted-foreground max-w-2xl mx-auto">
            A structured approach to delivering quality software solutions
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div
            v-for="(step, index) in process"
            :key="step.title"
            class="space-y-4"
            data-animate
            :data-animate-delay="index * 100"
          >
            <div class="flex items-center gap-4">
              <div
                class="w-12 h-12 border-2 border-foreground flex items-center justify-center flex-shrink-0"
              >
                <span class="text-xl font-serif font-bold">{{
                  index + 1
                }}</span>
              </div>
              <h3 class="text-xl font-serif font-bold">{{ step.title }}</h3>
            </div>
            <p class="text-sm text-muted-foreground leading-relaxed pl-16">
              {{ step.description }}
            </p>
          </div>
        </div>
      </div>
    </section>

    <section class="py-16 md:py-24 px-4 md:px-6 border-t border-border">
      <div class="container mx-auto max-w-4xl text-center space-y-8">
        <div data-animate="fade">
          <h2 class="text-3xl md:text-4xl font-serif font-bold mb-4">
            Technologies I Work With
          </h2>
          <p class="text-muted-foreground">
            Modern tools and frameworks for building robust applications
          </p>
        </div>

        <div
          class="flex flex-wrap justify-center gap-4"
          data-animate="fade"
          data-animate-delay="200"
        >
          <Badge
            v-for="tech in technologies"
            :key="tech"
            variant="outline"
            class="px-4 py-2 text-sm font-medium hover:bg-foreground hover:text-background transition-colors"
          >
            {{ tech }}
          </Badge>
        </div>
      </div>
    </section>

    <section class="py-16 md:py-24 px-4 md:px-6 bg-foreground text-background">
      <div
        class="container mx-auto max-w-4xl text-center space-y-8"
        data-animate="fade"
      >
        <h2 class="text-3xl md:text-4xl lg:text-5xl font-serif font-bold">
          Ready to Start Your Project?
        </h2>
        <p
          class="text-base md:text-lg text-background/80 max-w-2xl mx-auto leading-relaxed"
        >
          Let's discuss how I can help bring your ideas to life with quality
          software solutions.
        </p>
        <Button
          as-child
          size="lg"
          variant="secondary"
          class="rounded-full px-8 uppercase tracking-wider"
        >
          <NuxtLink to="/contact">Get in Touch</NuxtLink>
        </Button>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
const mainServices = [
  {
    icon: "💻",
    title: "Full Stack Development",
    description:
      "End-to-end web application development using modern frameworks and best practices. From database design to responsive frontends.",
    includes: [
      "Custom web application development",
      "RESTful API design and implementation",
      "Database architecture and optimization",
      "Responsive UI/UX implementation",
      "Third-party integrations",
      "Performance optimization",
    ],
  },
  {
    icon: "🎨",
    title: "Frontend Development",
    description:
      "Creating beautiful, performant user interfaces with Vue.js, Nuxt, and modern CSS frameworks.",
    includes: [
      "Vue.js & Nuxt.js applications",
      "Component-based architecture",
      "State management solutions",
      "Responsive design implementation",
      "Animation and interactions",
      "Progressive Web Apps (PWA)",
    ],
  },
  {
    icon: "⚙️",
    title: "Backend Development",
    description:
      "Robust server-side solutions with Node.js, PHP, and other modern backend technologies.",
    includes: [
      "RESTful API development",
      "Database design (SQL & NoSQL)",
      "Authentication & authorization",
      "Server optimization",
      "Microservices architecture",
      "API documentation",
    ],
  },
  {
    icon: "🚀",
    title: "DevOps & Deployment",
    description:
      "Streamlined deployment processes and infrastructure management for reliable application delivery.",
    includes: [
      "Docker containerization",
      "CI/CD pipeline setup",
      "Server configuration",
      "Monitoring and logging",
      "Backup and recovery",
      "Performance monitoring",
    ],
  },
];

const additionalServices = [
  {
    icon: "🔧",
    title: "Maintenance & Support",
    description:
      "Ongoing support, bug fixes, and feature updates to keep your application running smoothly.",
  },
  {
    icon: "📊",
    title: "Code Review",
    description:
      "Expert code review and optimization suggestions to improve code quality and performance.",
  },
  {
    icon: "🎓",
    title: "Technical Consulting",
    description:
      "Strategic guidance on technology choices, architecture decisions, and best practices.",
  },
  {
    icon: "🔄",
    title: "Legacy Migration",
    description:
      "Modernize legacy applications with updated technologies and improved architecture.",
  },
  {
    icon: "🔐",
    title: "Security Audit",
    description:
      "Comprehensive security assessment and implementation of security best practices.",
  },
  {
    icon: "📱",
    title: "API Development",
    description:
      "Design and build scalable APIs for web and mobile applications.",
  },
];

const process = [
  {
    title: "Discovery",
    description:
      "Understanding your requirements, goals, and constraints through detailed discussions.",
  },
  {
    title: "Planning",
    description:
      "Creating a detailed project plan with timelines, milestones, and technical specifications.",
  },
  {
    title: "Development",
    description:
      "Building your solution with regular updates and opportunities for feedback.",
  },
  {
    title: "Delivery",
    description:
      "Testing, deployment, and handover with documentation and training.",
  },
];

const technologies = [
  "JavaScript",
  "TypeScript",
  "Vue.js",
  "Nuxt.js",
  "Node.js",
  "PHP",
  "Laravel",
  "C#",
  "Golang",
  "PostgreSQL",
  "MongoDB",
  "Docker",
  "Git",
  "Tailwind CSS",
];

useHead({
  title: "Services - Elvis Kemboi",
  meta: [
    {
      name: "description",
      content:
        "Professional software development services including full-stack development, frontend, backend, and DevOps solutions.",
    },
  ],
});

useScrollAnimation();
</script>
