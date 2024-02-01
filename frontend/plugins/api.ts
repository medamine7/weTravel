import { defineNuxtPlugin } from "#app";
import { createRepository } from "~/repository/factory";

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig();

  return {
    provide: {
      api: createRepository(config),
    },
  };
});
