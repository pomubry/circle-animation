// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    "@pinia/nuxt",
    "@pinia-plugin-persistedstate/nuxt",
    "@vueuse/nuxt",
    "nuxt-icon",
  ],
  // *workaround* https://github.com/prazdevs/pinia-plugin-persistedstate/issues/236
  build: {
    transpile: ["pinia-plugin-persistedstate"],
  },
  css: ["~/assets/css/main.css"],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  app: {
    // disabled because of a bug where it shifts <footer/> up
    // pageTransition: { name: "page", mode: "out-in" },
    head: {
      htmlAttrs: {
        lang: "en",
      },
      meta: [
        {
          name: "author",
          content: "pomubry",
        },
      ],
      script: [
        {
          innerHTML: `
      if (
    localStorage.getItem("${process.env.TW_KEY}") === "dark" ||
    (!("${process.env.TW_KEY}" in localStorage) &&
      window.matchMedia("(prefers-color-scheme: dark)").matches)
  ) {
    localStorage.setItem("${process.env.TW_KEY}", "dark");
    document.documentElement.classList.add("dark");
  } else {
    localStorage.setItem("${process.env.TW_KEY}", "light");
    document.documentElement.classList.remove("dark");
  }`,
        },
      ],
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
