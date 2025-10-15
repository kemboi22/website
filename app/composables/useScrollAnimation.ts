export const useScrollAnimation = () => {
  let observer: IntersectionObserver | null = null;

  const initScrollAnimation = () => {
    if (typeof window === "undefined") return;

    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-in");
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -100px 0px",
      },
    );

    // Observe all elements with data-animate attribute
    const elements = document.querySelectorAll("[data-animate]");
    elements.forEach((el) => observer?.observe(el));
  };

  onMounted(() => {
    initScrollAnimation();
  });

  onUnmounted(() => {
    observer?.disconnect();
  });

  return {
    initScrollAnimation,
  };
};
