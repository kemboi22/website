<script setup lang="ts">
import { onMounted } from "vue";

const route = useRoute();

const { data: post } = await useAsyncData(`blog-${route.path}`, () =>
  queryCollection("blogs").path(route.path).first(),
);

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
};

useHead({
  title: computed(() =>
    post.value ? `${post.value.title} - Blog` : "Blog Post",
  ),
  meta: [
    {
      name: "description",
      content: computed(() => post.value?.description || ""),
    },
  ],
});
</script>
<template>
  <div class="pt-16">
    <article v-if="post">
      <!-- Hero -->
      <header class="py-24 px-6 border-b border-border">
        <div class="container mx-auto max-w-4xl space-y-8">
          <div
            class="flex items-center gap-3 text-xs font-mono uppercase tracking-widest text-muted-foreground"
          >
            <time>{{ formatDate(post.date) }}</time>
            <span>•</span>
            <span>{{ post.meta.readTime }}</span>
          </div>
          <h1
            class="text-5xl md:text-6xl lg:text-7xl font-serif font-bold tracking-tight"
          >
            {{ post.title }}
          </h1>
          <p class="text-xl text-muted-foreground leading-relaxed">
            {{ post.description }}
          </p>
        </div>
      </header>

      <!-- Featured Image -->
      <div v-if="post.meta.image" class="px-6 py-12">
        <div class="container mx-auto max-w-5xl">
          <div class="aspect-[21/9] overflow-hidden border border-border">
            <img
              :src="post.meta.image"
              :alt="post.title"
              class="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

      <!-- Content -->
      <div class="py-12 px-6">
        <div class="container mx-auto max-w-6xl">
          <div
            class="prose prose-lg prose-neutral dark:prose-invert max-w-none"
          >
            <ContentRenderer :value="post" class="blog-content" />
          </div>
        </div>
      </div>

      <!-- Author & Share -->
      <footer class="py-12 px-6 border-t border-border">
        <div class="container mx-auto max-w-3xl">
          <div
            class="flex flex-col md:flex-row items-start md:items-center justify-between gap-8"
          >
            <div class="flex items-center gap-4">
              <div
                class="w-16 h-16 rounded-full border-2 border-foreground overflow-hidden"
              >
                <!-- <img -->
                <!--   src="placeholder.svg?height=64&width=64" -->
                <!--   alt="Author" -->
                <!--   class="w-full h-full object-cover" -->
                <!-- /> -->
              </div>
              <div>
                <p class="font-serif font-bold text-lg">Kemboi Elvis</p>
                <p class="text-sm text-muted-foreground">Software Engineer</p>
              </div>
            </div>
            <div class="flex items-center gap-4">
              <span class="text-sm text-muted-foreground">Share:</span>
              <div class="flex gap-3">
                <a
                  href="#"
                  class="w-10 h-10 flex items-center justify-center border border-border hover:bg-foreground hover:text-background rounded-full"
                  aria-label="Share on Twitter"
                >
                  <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path
                      d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"
                    />
                  </svg>
                </a>
                <a
                  href="#"
                  class="w-10 h-10 flex items-center justify-center border border-border hover:bg-foreground hover:text-background rounded-full"
                  aria-label="Share on LinkedIn"
                >
                  <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path
                      d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
                    />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>

      <!-- Navigation -->
      <nav class="py-12 px-6 border-t border-border">
        <div class="container mx-auto max-w-3xl">
          <NuxtLink
            to="/blogs"
            class="flex items-center gap-2 text-sm font-medium hover:gap-4 transition-all"
          >
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
                d="M7 16l-4-4m0 0l4-4m-4 4h18"
              />
            </svg>
            Back to Blog
          </NuxtLink>
        </div>
      </nav>
    </article>
  </div>
</template>

<style>
.copy-button {
  position: absolute;
  top: 10px;
  right: 10px;
  background: #333;
  color: white;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
  border-radius: 4px;
  font-size: 12px;
}

.copy-button:hover {
  background: #555;
}
</style>
