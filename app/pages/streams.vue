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
            >Live Content</span
          >
          <h1
            class="text-5xl md:text-7xl font-serif font-bold tracking-tight max-w-4xl"
          >
            Twitch Streams
          </h1>
          <p class="text-lg text-muted-foreground max-w-2xl leading-relaxed">
            Watch me code, design, and build projects live. Join the community
            and learn together.
          </p>
          <div class="flex items-center gap-4">
            <a
              href="https://twitch.tv/yourusername"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center gap-2 px-6 py-3 bg-foreground text-background hover:bg-foreground/90 font-medium text-sm uppercase tracking-wider"
            >
              Follow on Twitch
              <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path
                  d="M11.571 4.714h1.715v5.143H11.57zm4.715 0H18v5.143h-1.714zM6 0L1.714 4.286v15.428h5.143V24l4.286-4.286h3.428L22.286 12V0zm14.571 11.143l-3.428 3.428h-3.429l-3 3v-3H6.857V1.714h13.714Z"
                />
              </svg>
            </a>
            <div
              v-if="isLive"
              class="flex items-center gap-2 px-4 py-2 border border-red-500 text-red-500 animate-pulse"
            >
              <div class="w-2 h-2 bg-red-500 rounded-full" />
              <span class="text-sm font-mono uppercase tracking-widest"
                >Live Now</span
              >
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Live Stream Embed -->
    <section v-if="isLive" class="py-12 px-6 border-b border-border bg-black">
      <div class="container mx-auto max-w-6xl">
        <div class="aspect-video w-full">
          <iframe
            src="https://player.twitch.tv/?channel=yourusername&parent=localhost&parent=yourdomain.com"
            class="w-full h-full"
            allowfullscreen
          />
        </div>
      </div>
    </section>

    <!-- Stream Stats -->
    <section class="py-12 px-6 border-b border-border">
      <div class="container mx-auto max-w-6xl">
        <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div
            v-for="stat in streamStats"
            :key="stat.label"
            class="text-center space-y-2 p-6 border border-border"
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

    <!-- Recent Streams -->
    <section class="py-24 px-6">
      <div class="container mx-auto max-w-6xl space-y-12">
        <div class="flex items-center justify-between">
          <h2 class="text-3xl font-serif font-bold">Recent Streams</h2>
          <span
            class="text-xs font-mono uppercase tracking-widest text-muted-foreground"
          >
            Past Broadcasts
          </span>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div
            v-for="stream in recentStreams"
            :key="stream.id"
            class="group space-y-4"
          >
            <a
              :href="stream.url"
              target="_blank"
              rel="noopener noreferrer"
              class="block aspect-video overflow-hidden border border-border hover:border-foreground relative"
            >
              <img
                :src="stream.thumbnail"
                :alt="stream.title"
                class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div
                class="absolute bottom-2 right-2 bg-black/80 text-white px-2 py-1 text-xs font-mono"
              >
                {{ stream.duration }}
              </div>
            </a>

            <div class="space-y-2">
              <a
                :href="stream.url"
                target="_blank"
                rel="noopener noreferrer"
                class="text-xl font-bold hover:text-muted-foreground transition-colors"
              >
                {{ stream.title }}
              </a>
              <div
                class="flex items-center gap-3 text-xs font-mono text-muted-foreground"
              >
                <span>{{ stream.date }}</span>
                <span>•</span>
                <span>{{ stream.viewers }} viewers</span>
              </div>
              <p class="text-sm text-muted-foreground leading-relaxed">
                {{ stream.description }}
              </p>
              <div class="flex flex-wrap gap-2">
                <span
                  v-for="tag in stream.tags"
                  :key="tag"
                  class="px-2 py-1 text-xs border border-border font-mono"
                >
                  {{ tag }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Stream Schedule -->
    <section class="py-24 px-6 border-t border-border">
      <div class="container mx-auto max-w-4xl space-y-12">
        <div class="text-center space-y-4">
          <h2 class="text-3xl font-serif font-bold">Stream Schedule</h2>
          <p class="text-muted-foreground">
            Join me live for coding sessions, design reviews, and tech
            discussions
          </p>
        </div>

        <div class="space-y-4">
          <div
            v-for="schedule in streamSchedule"
            :key="schedule.day"
            class="flex items-center justify-between p-6 border border-border hover:border-foreground transition-colors"
          >
            <div class="space-y-1">
              <div class="font-bold">{{ schedule.day }}</div>
              <div class="text-sm text-muted-foreground">
                {{ schedule.topic }}
              </div>
            </div>
            <div class="text-right space-y-1">
              <div class="font-mono text-sm">{{ schedule.time }}</div>
              <div class="text-xs text-muted-foreground">
                {{ schedule.timezone }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from "#imports";
import { useHead } from "#imports";

const isLive = ref(false); // Set to true when streaming

const streamStats = [
  { label: "Followers", value: "2.4k" },
  { label: "Total Streams", value: "127" },
  { label: "Hours Streamed", value: "340" },
  { label: "Avg Viewers", value: "156" },
];

const recentStreams = [
  {
    id: 1,
    title: "Building a Real-time Chat App with Vue 3 & WebSockets",
    date: "3 days ago",
    duration: "3:24:15",
    viewers: 234,
    description:
      "Creating a full-featured chat application with real-time messaging, user presence, and typing indicators.",
    thumbnail: "/placeholder.svg?height=360&width=640",
    tags: ["vue", "websockets", "real-time"],
    url: "https://twitch.tv",
  },
  {
    id: 2,
    title: "Design System Deep Dive: Building Reusable Components",
    date: "1 week ago",
    duration: "2:45:30",
    viewers: 189,
    description:
      "Exploring design system architecture and creating a library of reusable UI components with proper documentation.",
    thumbnail: "/placeholder.svg?height=360&width=640",
    tags: ["design-system", "components", "ui"],
    url: "https://twitch.tv",
  },
  {
    id: 3,
    title: "Optimizing Performance: From 3s to 300ms Load Time",
    date: "2 weeks ago",
    duration: "4:12:45",
    viewers: 312,
    description:
      "Performance optimization techniques including code splitting, lazy loading, and caching strategies.",
    thumbnail: "/placeholder.svg?height=360&width=640",
    tags: ["performance", "optimization", "web-vitals"],
    url: "https://twitch.tv",
  },
  {
    id: 4,
    title: "Live Coding: E-commerce Checkout Flow",
    date: "3 weeks ago",
    duration: "3:56:20",
    viewers: 267,
    description:
      "Building a complete checkout flow with payment integration, form validation, and order confirmation.",
    thumbnail: "/placeholder.svg?height=360&width=640",
    tags: ["ecommerce", "stripe", "forms"],
    url: "https://twitch.tv",
  },
];

const streamSchedule = [
  {
    day: "Monday",
    topic: "Frontend Development",
    time: "7:00 PM - 10:00 PM",
    timezone: "EST",
  },
  {
    day: "Wednesday",
    topic: "Design & UI/UX",
    time: "7:00 PM - 9:00 PM",
    timezone: "EST",
  },
  {
    day: "Friday",
    topic: "Open Source Contributions",
    time: "8:00 PM - 11:00 PM",
    timezone: "EST",
  },
  {
    day: "Sunday",
    topic: "Q&A and Code Reviews",
    time: "3:00 PM - 6:00 PM",
    timezone: "EST",
  },
];

useHead({
  title: "Twitch Streams - Portfolio",
  meta: [
    {
      name: "description",
      content:
        "Watch live coding sessions, design reviews, and tech discussions on Twitch.",
    },
  ],
});
</script>
