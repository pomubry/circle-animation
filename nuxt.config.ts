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
      TW_KEY: process.env.TW_KEY,
      COOKIE_NAME: process.env.COOKIE_NAME,
      CANI_BE_URL: process.env.CANI_BE_URL,
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
