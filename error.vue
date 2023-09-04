<script setup lang="ts">
  useHead({
    title: "Page not found",
    meta: [{ name: "description", content: "This page does not exist!" }],
  });
</script>

<template>
  <div
    class="flex min-h-screen flex-col justify-between bg-gray-300 text-gray-800 transition duration-300 dark:bg-gray-800 dark:text-gray-100"
  >
    <NuxtLayout>
      <div
        class="flex flex-col items-center gap-5 rounded-lg bg-gray-100 p-5 duration-300 dark:bg-gray-900"
      >
        <h1 class="text-center text-9xl font-extrabold">404</h1>
        <p class="font-semibold">Page not Found!</p>
        <button
          class="flex items-center gap-2 rounded-lg bg-gray-200 p-3 duration-300 hover:bg-gray-300 dark:bg-gray-800 hover:dark:bg-gray-700"
          @click="() => clearError({ redirect: '/' })"
        >
          <Icon name="ion:home" /> Go back to homepage
        </button>
      </div>
    </NuxtLayout>
    <GenericOrientationModal />
    <NuxtLoadingIndicator />
  </div>
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
