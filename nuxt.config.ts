// https://nuxt.com/docs/api/configuration/nuxt-config

import { appThemeKey } from "./utils/theme";

export default defineNuxtConfig({
  modules: [
    "@pinia/nuxt",
    "@pinia-plugin-persistedstate/nuxt",
    "@vueuse/nuxt",
    "nuxt-icon",
  ],
  css: ["~/assets/css/main.css"],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  app: {
    head: {
      title: "CAni",
      script: [
        {
          innerHTML: `
      if (
    localStorage.getItem("${appThemeKey}") === "dark" ||
    (!("${appThemeKey}" in localStorage) &&
      window.matchMedia("(prefers-color-scheme: dark)").matches)
  ) {
    localStorage.setItem("${appThemeKey}", "dark");
    document.documentElement.classList.add("dark");
  } else {
    localStorage.setItem("${appThemeKey}", "light");
    document.documentElement.classList.remove("dark");
  }`,
        },
      ],
    },
  },
});
