<script setup lang="ts">
  import { DialogPanel, DialogTitle, DialogDescription } from "@headlessui/vue";

  interface Props {
    isOverlap?: boolean;
  }

  defineProps<Props>();
  const isLandscape = useMediaQuery("(orientation: landscape)");
</script>

<template>
  <GenericBaseModal :show="!isLandscape || !!isOverlap">
    <DialogPanel
      class="container rounded-lg bg-gray-100 p-5 text-center text-gray-900 dark:bg-gray-900 dark:text-gray-100"
    >
      <DialogTitle
        class="mb-5 text-2xl font-extrabold text-red-500 dark:text-red-300"
      >
        Screen width is too small
      </DialogTitle>
      <DialogDescription>
        Please change the orientation of your device if you are on mobile or
        switch to a device with a wider screen
      </DialogDescription>
      <div class="mt-5 flex items-center justify-center gap-5">
        <Icon name="bi:phone-landscape" size="10em" class="rot" />
        <Icon name="game-icons:arrow-dunk" size="5em" class="rotate-90" />
      </div>
    </DialogPanel>
  </GenericBaseModal>
</template>

<style scoped>
  .rot {
    animation: toLandscape 4s infinite;
  }

  @keyframes toLandscape {
    from {
      transform: rotate(-90deg);
    }
    50% {
      transform: rotate(0deg);
    }
  }
</style>
