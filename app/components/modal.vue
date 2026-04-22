<script setup lang="ts">
defineProps<{
  open: boolean;
}>();

defineEmits<{
  (e: "close"): void;
}>();
</script>

<template>
  <Transition name="modal">
    <div v-if="open" class="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div class="absolute inset-0 bg-background/80 backdrop-blur-sm" @click="$emit('close')"></div>
      <div class="relative bg-background border border-border p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto">
        <slot></slot>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.2s ease;
}
.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}
</style>