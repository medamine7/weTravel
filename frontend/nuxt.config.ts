// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    "nuxt-graphql-client",
    "@nuxtjs/tailwindcss",
    "@formkit/nuxt",
    "@pinia/nuxt",
    "@pinia-plugin-persistedstate/nuxt",
    "nuxt-icon",
  ],
  formkit: {
    // Experimental support for auto loading (see note):
    autoImport: true,
    configFile: "./formkit.config.ts",
  },
  runtimeConfig: {
    public: {
      GQL_HOST: "",
    },
  },
  devServer: {
    port: 3001,
  },
  imports: {
    dirs: ["stores"],
  },
  css: ["~/assets/style/main.scss"],
  tailwindcss: {
    cssPath: "~/assets/style/theme.scss",
  },
});
