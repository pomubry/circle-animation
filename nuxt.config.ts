// https://nuxt.com/docs/api/configuration/nuxt-config

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
    },
  },
  runtimeConfig: {
    public: {
      TW_KEY: "tw-theme",
      CANI_BE_URL: "http://localhost:5000",
      AUTH_TOKEN: "cani-auth",
    },
  },
  routeRules: {
    "/beatmaps": {
      ssr: false,
    },
    "/game": {
      ssr: false,
    },
  },
});
