<template>
  <NuxtLink
    :to="`/blogs/${post.id}`"
    class="group block p-6 border border-border hover:border-foreground hover:bg-muted/30"
  >
    <div class="space-y-4">
      <div
        class="flex items-center gap-3 text-xs font-mono uppercase tracking-widest text-muted-foreground"
      >
        <time>{{ formatDate(post.date) }}</time>
        <span>•</span>
        <span>{{ post.readTime }}</span>
      </div>
      <h3
        class="text-xl font-serif font-bold group-hover:text-muted-foreground transition-colors"
      >
        {{ post.title }}
      </h3>
      <p class="text-sm text-muted-foreground leading-relaxed">
        {{ post.excerpt }}
      </p>
      <div class="flex items-center gap-2 text-sm font-medium pt-2">
        Read More
        <svg
          class="w-4 h-4 group-hover:translate-x-1 transition-transform"
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
      </div>
    </div>
  </NuxtLink>
</template>

<script setup lang="ts">
defineProps<{
  post: {
    id: number;
    title: string;
    excerpt: string;
    date: string;
    readTime: string;
  };
}>();

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};
</script>
