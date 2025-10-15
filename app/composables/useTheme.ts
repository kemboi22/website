import { useColorMode } from "@vueuse/core";
import { computed } from "vue";

export const useTheme = () => {
  const colorMode = useColorMode();

  const isDark = computed(() => colorMode.value === "dark");

  const toggleTheme = async (event?: MouseEvent) => {
    // Check if View Transitions API is supported
    if (!document.startViewTransition || !event) {
      colorMode.preference = isDark.value ? "light" : "dark";
      return;
    }

    // Get the click position for the circular reveal animation
    const x = event.clientX;
    const y = event.clientY;
    const endRadius = Math.hypot(
      Math.max(x, innerWidth - x),
      Math.max(y, innerHeight - y),
    );

    // Start view transition with circular reveal
    const transition = document.startViewTransition(async () => {
      colorMode.preference = isDark.value ? "light" : "dark";
    });

    await transition.ready;

    // Animate the circular reveal
    const clipPath = [
      `circle(0px at ${x}px ${y}px)`,
      `circle(${endRadius}px at ${x}px ${y}px)`,
    ];

    document.documentElement.animate(
      {
        clipPath,
      },
      {
        duration: 500,
        easing: "ease-in-out",
        pseudoElement: "::view-transition-new(root)",
      },
    );
  };

  return {
    isDark,
    toggleTheme,
    colorMode,
  };
};
