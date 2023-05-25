<script setup lang="ts">
  const isLandscape = useMediaQuery("(orientation: landscape)");
</script>

<template>
  <ClientOnly>
    <Teleport to="body">
      <div
        v-if="!isLandscape"
        class="fixed left-0 top-0 grid h-full w-full place-content-center bg-gray-900/80 p-5 text-gray-800 dark:text-gray-100"
      >
        <div
          class="container rounded-lg bg-gray-100 p-5 text-center dark:bg-gray-950"
        >
          <h2
            class="mb-5 text-2xl font-extrabold text-red-500 dark:text-red-300"
          >
            Screen width is too small
          </h2>
          <p>
            Please change the orientation of your device if you are on mobile or
            switch to a device with a wider screen
          </p>
          <div class="mt-5 flex items-center justify-center gap-5">
            <Icon name="bi:phone-landscape" size="10em" class="rot" />
            <Icon name="game-icons:arrow-dunk" size="5em" class="rotate-90" />
          </div>
        </div>
      </div>
    </Teleport>
  </ClientOnly>
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
