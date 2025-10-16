<template>
  <NuxtLink
    :to="project._path"
    class="group block overflow-hidden border border-border hover:border-foreground relative"
    @mouseenter="showPreview = true"
    @mouseleave="showPreview = false"
  >
    <!-- Added hover preview overlay with iframe -->
    <div
      v-if="project.liveUrl && showPreview"
      class="absolute inset-0 z-10 bg-background border-2 border-foreground p-2"
    >
      <div class="w-full h-full relative overflow-hidden">
        <iframe
          :src="project.liveUrl"
          class="w-full h-full scale-50 origin-top-left"
          style="width: 200%; height: 200%"
          sandbox="allow-scripts allow-same-origin"
        />
        <div
          class="absolute top-2 right-2 bg-foreground text-background px-3 py-1 text-xs font-mono"
        >
          LIVE PREVIEW
        </div>
      </div>
    </div>

    <div class="aspect-[3/2] overflow-hidden bg-muted">
      <img
        :src="project.image"
        :alt="project.title"
        class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
      />
    </div>
    <div class="p-6 space-y-3">
      <div
        class="flex items-center justify-between text-xs font-mono uppercase tracking-widest text-muted-foreground"
      >
        <span>{{ project.category }}</span>
        <span>{{ project.year }}</span>
      </div>
      <h3
        class="text-2xl font-serif font-bold group-hover:text-muted-foreground transition-colors"
      >
        {{ project.title }}
      </h3>
      <p class="text-sm text-muted-foreground leading-relaxed">
        {{ project.description }}
      </p>
      <!-- Added tech stack badges -->
      <div class="flex flex-wrap gap-2 pt-2">
        <span
          v-for="tech in project.technologies?.slice(0, 3)"
          :key="tech"
          class="px-2 py-1 border border-border text-xs font-mono"
        >
          {{ tech }}
        </span>
        <span
          v-if="project.technologies && project.technologies.length > 3"
          class="px-2 py-1 text-xs font-mono text-muted-foreground"
        >
          +{{ project.technologies.length - 3 }}
        </span>
      </div>
    </div>
  </NuxtLink>
</template>

<script setup lang="ts">
defineProps<{
  project: {
    _path: string;
    title: string;
    category: string;
    description: string;
    image: string;
    year: string;
    technologies?: string[];
    liveUrl?: string;
  };
}>();

const showPreview = ref(false);
</script>
