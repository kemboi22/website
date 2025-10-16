<template>
  <header
    class="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border"
  >
    <nav class="container mx-auto px-4 md:px-6 py-4">
      <div class="flex items-center justify-between">
        <!-- Logo -->
        <NuxtLink
          to="/"
          class="text-xl md:text-2xl font-serif font-bold tracking-tight hover:opacity-70 transition-opacity"
        >
          Kemboi Elvis
        </NuxtLink>

        <!-- Desktop Navigation -->
        <div class="hidden lg:flex items-center gap-6 xl:gap-8">
          <NuxtLink
            v-for="link in navLinks"
            :key="link.path"
            :to="link.path"
            class="text-sm font-medium tracking-wide uppercase hover:text-muted-foreground transition-colors"
            active-class="text-foreground"
            exact-active-class="text-foreground"
          >
            {{ link.name }}
          </NuxtLink>
          <!-- Added theme toggle button to desktop navigation -->
          <ThemeToggle />
        </div>

        <!-- Mobile Menu Button -->
        <div class="lg:hidden flex items-center gap-3">
          <!-- Added theme toggle for mobile -->
          <ThemeToggle />

          <Button
            variant="ghost"
            size="icon"
            @click="mobileMenuOpen = !mobileMenuOpen"
            aria-label="Toggle menu"
          >
            <svg
              v-if="!mobileMenuOpen"
              class="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
            <svg
              v-else
              class="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </Button>
        </div>
      </div>

      <!-- Mobile Navigation -->
      <Transition
        enter-active-class="transition-all duration-300 ease-out"
        enter-from-class="opacity-0 -translate-y-4"
        enter-to-class="opacity-100 translate-y-0"
        leave-active-class="transition-all duration-200 ease-in"
        leave-from-class="opacity-100 translate-y-0"
        leave-to-class="opacity-0 -translate-y-4"
      >
        <div
          v-if="mobileMenuOpen"
          class="lg:hidden pt-4 pb-2 border-t border-border mt-4"
        >
          <div class="flex flex-col gap-3">
            <NuxtLink
              v-for="link in navLinks"
              :key="link.path"
              :to="link.path"
              @click="mobileMenuOpen = false"
              class="text-sm font-medium tracking-wide uppercase hover:text-muted-foreground py-2 transition-colors"
            >
              {{ link.name }}
            </NuxtLink>
          </div>
        </div>
      </Transition>
    </nav>
  </header>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import { useRoute } from "#app";
import { Button } from "@/components/ui/button";
import ThemeToggle from "@/components/ThemeToggle.vue";

const mobileMenuOpen = ref(false);

const navLinks = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Projects", path: "/projects" },
  { name: "Services", path: "/services" },
  { name: "Tech Stack", path: "/tech-stack" },
  { name: "Blog", path: "/blog" },
  { name: "Contact", path: "/contact" },
];

// Close mobile menu on route change
const route = useRoute();
watch(
  () => route.path,
  () => {
    mobileMenuOpen.value = false;
  },
);
</script>
