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
      <NuxtPage />
    </NuxtLayout>
  </div>
  <GenericOrientationModal />
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
