<script setup lang="ts">
  import { getThemeKey } from "~/utils/theme";

  useHead({
    htmlAttrs: {
      lang: "en",
    },
    script: [
      {
        innerHTML: `
      if (
    localStorage.getItem("${getThemeKey()}") === "dark" ||
    (!("${getThemeKey()}" in localStorage) &&
      window.matchMedia("(prefers-color-scheme: dark)").matches)
  ) {
    localStorage.setItem("${getThemeKey()}", "dark");
    document.documentElement.classList.add("dark");
  } else {
    localStorage.setItem("${getThemeKey()}", "light");
    document.documentElement.classList.remove("dark");
  }`,
      },
    ],
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
        <p>Page not Found</p>
        <button
          class="rounded-lg bg-gray-200 p-3 duration-300 hover:bg-gray-300 dark:bg-gray-800 hover:dark:bg-gray-700"
          @click="() => clearError({ redirect: '/' })"
        >
          Go back to homepage
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
