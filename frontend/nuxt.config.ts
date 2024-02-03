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
  runtimeConfig: {
    public: {
      REST_HOST: "",
    },
  },
  "graphql-client": {
    clients: {
      default: {
        host: `${process.env.GQL_HOST}`,
        clientHost: `${process.env.GQL_CLIENT_HOST}`,
      },
    },
  },
  formkit: {
    // Experimental support for auto loading (see note):
    autoImport: true,
    configFile: "./formkit.config.ts",
  },
  devServer: {
    port: +(process.env.PORT || 3001),
  },
  imports: {
    dirs: ["stores"],
  },
  css: ["~/assets/style/main.scss"],
  tailwindcss: {
    cssPath: "~/assets/style/theme.scss",
  },
});
