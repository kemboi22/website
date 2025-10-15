<template>
  <div class="pt-16">
    <!-- Hero Section -->
    <section
      class="min-h-[60vh] flex items-center justify-center px-4 md:px-6 border-b border-border"
    >
      <div
        class="container mx-auto max-w-4xl text-center space-y-6 animate-fade-in"
      >
        <span
          class="text-xs font-mono uppercase tracking-widest text-muted-foreground"
          >About Me</span
        >
        <h1
          class="text-4xl md:text-5xl lg:text-7xl font-serif font-bold tracking-tight"
        >
          Building Software
          <span class="block mt-2 italic">That Matters</span>
        </h1>
      </div>
    </section>

    <!-- Introduction -->
    <section class="py-16 md:py-24 px-4 md:px-6">
      <div class="container mx-auto max-w-4xl">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          <div class="md:col-span-2 space-y-6">
            <p class="text-xl md:text-2xl font-serif leading-relaxed">
              Expert Software developer proficient in building and optimizing
              software solutions. Talented Coder and project manager bringing
              consistent record of producing quality deliverables.
            </p>
            <p class="text-muted-foreground leading-relaxed">
              Successful Software Developer focused on meeting objectives with
              innovative applications and clean code. Knowledgeable about
              feature implementation and debugging. Concise and thoughtful
              communicator who collaborates easily with both technical and
              non-technical personnel.
            </p>
            <p class="text-muted-foreground leading-relaxed">
              Knowledgeable and skilled software development professional
              offering advanced abilities in wide range of programming languages
              including Java, Javascript, PHP, Golang, C# and TypeScript.
              Quickly understand requirements for new systems and creates robust
              code. Familiar with testing, debugging and correcting problems
              found in existing software systems.
            </p>
          </div>
          <div class="space-y-6">
            <Card class="p-6">
              <h3 class="text-sm font-mono uppercase tracking-widest mb-4">
                Quick Facts
              </h3>
              <dl class="space-y-3 text-sm">
                <div>
                  <dt class="text-muted-foreground">Location</dt>
                  <dd class="font-medium">Nairobi, Kenya</dd>
                </div>
                <div>
                  <dt class="text-muted-foreground">Experience</dt>
                  <dd class="font-medium">3+ Years</dd>
                </div>
                <div>
                  <dt class="text-muted-foreground">Focus</dt>
                  <dd class="font-medium">Full Stack Development</dd>
                </div>
                <div>
                  <dt class="text-muted-foreground">Languages</dt>
                  <dd class="font-medium">English, Kiswahili, Kalenjin</dd>
                </div>
              </dl>
            </Card>
          </div>
        </div>
      </div>
    </section>

    <!-- Experience Timeline -->
    <section class="py-16 md:py-24 px-4 md:px-6 bg-muted/30">
      <div class="container mx-auto max-w-4xl">
        <h2 class="text-3xl md:text-4xl font-serif font-bold mb-12 md:mb-16">
          Experience
        </h2>
        <div class="space-y-12">
          <div
            v-for="(exp, index) in experience"
            :key="index"
            class="relative pl-6 md:pl-8 border-l-2 border-border pb-12 last:pb-0"
          >
            <div
              class="absolute left-0 top-0 w-3 h-3 -translate-x-[7px] bg-foreground rounded-full"
            />
            <div class="space-y-2">
              <div
                class="flex flex-col md:flex-row md:items-center md:justify-between gap-2"
              >
                <h3 class="text-lg md:text-xl font-serif font-bold">
                  {{ exp.title }}
                </h3>
                <span
                  class="text-xs font-mono uppercase tracking-widest text-muted-foreground"
                >
                  {{ exp.period }}
                </span>
              </div>
              <p class="text-sm font-medium text-muted-foreground">
                {{ exp.company }} • {{ exp.location }}
              </p>
              <p class="text-sm text-muted-foreground leading-relaxed pt-2">
                {{ exp.description }}
              </p>
              <ul
                class="text-sm text-muted-foreground leading-relaxed pt-2 space-y-1 list-disc list-inside"
              >
                <li v-for="(highlight, i) in exp.highlights" :key="i">
                  {{ highlight }}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Education Section -->
    <section class="py-16 md:py-24 px-4 md:px-6">
      <div class="container mx-auto max-w-4xl">
        <h2 class="text-3xl md:text-4xl font-serif font-bold mb-12 md:mb-16">
          Education
        </h2>
        <div class="space-y-8">
          <Card class="p-6 hover:border-foreground transition-colors">
            <div
              class="flex flex-col md:flex-row md:items-start md:justify-between gap-4"
            >
              <div class="space-y-2">
                <h3 class="text-xl font-serif font-bold">
                  Bachelor's Degree in Software Engineering
                </h3>
                <p class="text-sm font-medium text-muted-foreground">
                  Kisii University
                </p>
                <p class="text-sm text-muted-foreground">
                  Sep 2021 - April 2025
                </p>
              </div>
              <Badge variant="outline" class="self-start">In Progress</Badge>
            </div>
          </Card>

          <Card class="p-6 hover:border-foreground transition-colors">
            <div
              class="flex flex-col md:flex-row md:items-start md:justify-between gap-4"
            >
              <div class="space-y-2">
                <h3 class="text-xl font-serif font-bold">
                  High School Education - KCSE
                </h3>
                <p class="text-sm font-medium text-muted-foreground">
                  Nakuru High School
                </p>
                <p class="text-sm text-muted-foreground">Jan 2017 - Dec 2020</p>
              </div>
              <Badge variant="outline" class="self-start">B+</Badge>
            </div>
          </Card>
        </div>
      </div>
    </section>

    <!-- Skills & Tools -->
    <section class="py-24 px-6">
      <div class="container mx-auto max-w-4xl">
        <h2 class="text-3xl md:text-4xl font-serif font-bold mb-16">
          Skills & Tools
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div
            v-for="category in skillCategories"
            :key="category.name"
            class="space-y-6"
          >
            <h3
              class="text-sm font-mono uppercase tracking-widest text-muted-foreground"
            >
              {{ category.name }}
            </h3>
            <div class="flex flex-wrap gap-3">
              <Badge
                v-for="skill in category.skills"
                :key="skill"
                variant="outline"
                class="px-4 py-2 text-sm font-medium hover:bg-foreground hover:text-background transition-colors"
              >
                {{ skill }}
              </Badge>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Philosophy -->
    <section class="py-24 px-6 border-t border-border">
      <div class="container mx-auto max-w-4xl">
        <h2 class="text-3xl md:text-4xl font-serif font-bold mb-12">
          Design Philosophy
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div
            v-for="principle in principles"
            :key="principle.title"
            class="space-y-4"
          >
            <div
              class="w-12 h-12 border-2 border-foreground flex items-center justify-center"
            >
              <span class="text-xl font-serif font-bold">{{
                principle.number
              }}</span>
            </div>
            <h3 class="text-xl font-serif font-bold">{{ principle.title }}</h3>
            <p class="text-sm text-muted-foreground leading-relaxed">
              {{ principle.description }}
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="py-16 md:py-24 px-4 md:px-6 bg-foreground text-background">
      <div class="container mx-auto max-w-4xl text-center space-y-8">
        <h2 class="text-3xl md:text-4xl lg:text-5xl font-serif font-bold">
          Let's Work Together
        </h2>
        <p
          class="text-base md:text-lg text-background/80 max-w-2xl mx-auto leading-relaxed"
        >
          I'm always interested in hearing about new projects and opportunities.
          Whether you have a question or just want to say hi, feel free to reach
          out.
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
import { useHead } from "#imports";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

const experience = [
  {
    title: "Developer",
    company: "Genius Dynamics",
    location: "Remote",
    period: "Nov 2022 - Present",
    description:
      "Building and maintaining user-centered software applications with focus on open source projects.",
    highlights: [
      "Integrated design feedback to build user-centered software applications",
      "Managed software development life cycle leveraging project management talents",
      "Maintain School systems and develop NethServer modules for easy deployment",
      "Collaborate on open source projects based on Docker/Podman",
    ],
  },
  {
    title: "Developer",
    company: "EMaxy IT",
    location: "Kisii, Kenya",
    period: "Jan 2023 - Present",
    description:
      "Full-stack development with client interaction and software implementation.",
    highlights: [
      "Employed best practices in software development",
      "Analyzed complex software issues and implemented solutions",
      "Interact with clients to find solutions through software implementation",
      "Integrated advanced technologies to improve software performance",
    ],
  },
  {
    title: "Developer",
    company: "Clifford Technologies",
    location: "Nairobi, Kenya",
    period: "June 2022 - July 2022",
    description: "Frontend development and fleet management system creation.",
    highlights: [
      "Worked within Agile frameworks to meet project timelines",
      "Contributed to code reviews, debugging and optimization",
      "Created fleet Management system",
      "Participated in architecture discussions for system enhancements",
    ],
  },
];

const skillCategories = [
  {
    name: "Frontend",
    skills: [
      "Vue.js",
      "Nuxt",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "HTML/CSS",
    ],
  },
  {
    name: "Backend",
    skills: [
      "Node.js",
      "Express",
      "PostgreSQL",
      "MongoDB",
      "REST APIs",
      "GraphQL",
    ],
  },
  {
    name: "Design",
    skills: [
      "Figma",
      "Adobe XD",
      "Photoshop",
      "Illustrator",
      "Prototyping",
      "UI/UX",
    ],
  },
  {
    name: "Tools",
    skills: ["Git", "VS Code", "Docker", "Vercel", "GitHub Actions", "Webpack"],
  },
];

const principles = [
  {
    number: "01",
    title: "Simplicity",
    description:
      "Strip away the unnecessary to reveal the essential. Every element should serve a purpose.",
  },
  {
    number: "02",
    title: "Functionality",
    description:
      "Beautiful design means nothing if it doesn't work. Form follows function, always.",
  },
  {
    number: "03",
    title: "Attention to Detail",
    description:
      "The smallest details make the biggest difference. Perfection is in the nuances.",
  },
];

useHead({
  title: "About - Portfolio",
  meta: [
    {
      name: "description",
      content: "Learn more about my experience, skills, and design philosophy.",
    },
  ],
});
</script>
