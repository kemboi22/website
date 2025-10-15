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
            >Insights & Ideas</span
          >
          <h1
            class="text-5xl md:text-7xl font-serif font-bold tracking-tight max-w-4xl"
          >
            Blog
          </h1>
          <p class="text-lg text-muted-foreground max-w-2xl leading-relaxed">
            Thoughts on design, development, and the creative process. Exploring
            ideas that shape how we build for the web.
          </p>
        </div>
      </div>
    </section>

    <!-- Featured Post -->
    <section v-if="featuredPost" class="py-24 px-6 border-b border-border">
      <div class="container mx-auto max-w-6xl">
        <span
          class="text-xs font-mono uppercase tracking-widest text-muted-foreground"
          >Featured</span
        >
        <NuxtLink
          :to="featuredPost._path"
          class="group grid grid-cols-1 md:grid-cols-2 gap-12 mt-8"
        >
          <div
            class="aspect-[4/3] overflow-hidden border border-border group-hover:border-foreground"
          >
            <img
              :src="
                featuredPost.image || '/placeholder.svg?height=600&width=800'
              "
              :alt="featuredPost.title"
              class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>
          <div class="flex flex-col justify-center space-y-6">
            <div
              class="flex items-center gap-3 text-xs font-mono uppercase tracking-widest text-muted-foreground"
            >
              <time>{{ formatDate(featuredPost.date) }}</time>
              <span>•</span>
              <span>{{ featuredPost.readTime }}</span>
            </div>
            <h2
              class="text-4xl md:text-5xl font-serif font-bold group-hover:text-muted-foreground transition-colors"
            >
              {{ featuredPost.title }}
            </h2>
            <p class="text-lg text-muted-foreground leading-relaxed">
              {{ featuredPost.description }}
            </p>
            <div class="flex items-center gap-2 text-sm font-medium">
              Read Article
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
      </div>
    </section>

    <!-- All Posts -->
    <section class="py-24 px-6">
      <div class="container mx-auto max-w-6xl">
        <h2 class="text-3xl font-serif font-bold mb-12">All Articles</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <NuxtLink
            v-for="post in posts"
            :key="post._path"
            :to="post._path"
            class="group block border border-border hover:border-foreground"
          >
            <div class="aspect-[4/3] overflow-hidden bg-muted">
              <img
                :src="post.image || '/placeholder.svg?height=400&width=600'"
                :alt="post.title"
                class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div class="p-6 space-y-4">
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
              <p
                class="text-sm text-muted-foreground leading-relaxed line-clamp-3"
              >
                {{ post.description }}
              </p>
            </div>
          </NuxtLink>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
const { data: allPosts } = await useAsyncData("blog-posts", () =>
  queryContent("/blog").sort({ date: -1 }).find(),
);

const featuredPost = computed(() => allPosts.value?.[0]);
const posts = computed(() => allPosts.value?.slice(1) || []);

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

useHead({
  title: "Blog - Portfolio",
  meta: [
    {
      name: "description",
      content:
        "Read articles about design, development, and the creative process.",
    },
  ],
});
</script>
