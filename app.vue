<template>
  <div
    class="flex min-h-screen flex-col justify-between bg-gray-300 text-gray-800 transition duration-300 dark:bg-gray-800 dark:text-gray-100"
  >
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
  <GenericOrientationModal v-if="$route.path !== '/game'" />
  <NuxtLoadingIndicator />
</template>

<style>
  .page-enter-active,
  .page-leave-active {
    transition: all 0.1s;
  }
  .page-enter-from,
  .page-leave-to {
    opacity: 0;
  }
</style>
