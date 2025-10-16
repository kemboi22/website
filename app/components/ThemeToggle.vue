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
      <Sun :size="20" class="text-foreground" />
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
      <Moon :size="20" class="text-foreground" />
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
import { Sun, Moon } from "lucide-vue-next"; // Import Lucide icons

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
