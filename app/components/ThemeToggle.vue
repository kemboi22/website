<template>
  <button
    @click="handleToggle"
    class="relative w-14 h-14 rounded-full border-2 border-foreground/10 hover:border-foreground/30 transition-all duration-300 hover:scale-110 active:scale-95 group overflow-hidden"
    :aria-label="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
  >
    <!-- Background circle animation -->
    <div
      class="absolute inset-0 bg-foreground/5 group-hover:bg-foreground/10 transition-all duration-300"
    />

    <!-- Sun icon -->
    <div
      class="absolute inset-0 flex items-center justify-center transition-all duration-500"
      :class="[
        isDark
          ? 'opacity-0 rotate-90 scale-0'
          : 'opacity-100 rotate-0 scale-100',
      ]"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="text-foreground"
      >
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2" />
        <path d="M12 20v2" />
        <path d="m4.93 4.93 1.41 1.41" />
        <path d="m17.66 17.66 1.41 1.41" />
        <path d="M2 12h2" />
        <path d="M20 12h2" />
        <path d="m6.34 17.66-1.41 1.41" />
        <path d="m19.07 4.93-1.41 1.41" />
      </svg>
    </div>

    <!-- Moon icon -->
    <div
      class="absolute inset-0 flex items-center justify-center transition-all duration-500"
      :class="[
        isDark
          ? 'opacity-100 rotate-0 scale-100'
          : 'opacity-0 -rotate-90 scale-0',
      ]"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="text-foreground"
      >
        <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
      </svg>
    </div>

    <!-- Ripple effect on click -->
    <div
      v-if="showRipple"
      class="absolute inset-0 rounded-full bg-foreground/20 animate-ping"
    />
  </button>
</template>

<script setup lang="ts">
import { useTheme } from "@/composables/useTheme"; // Import useTheme hook
import { ref } from "vue"; // Import ref function

const { isDark, toggleTheme } = useTheme(); // Declare useTheme hook at the top level
const showRipple = ref(false); // Declare ref variable at the top level

const handleToggle = async (event: MouseEvent) => {
  showRipple.value = true;
  setTimeout(() => {
    showRipple.value = false;
  }, 600);

  await toggleTheme(event);
};
</script>
