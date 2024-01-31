import { en } from "@formkit/i18n";
import { defineFormKitConfig } from "@formkit/vue";
import { rootClasses } from "./formkit.theme";

export default defineFormKitConfig({
  locales: { en },
  locale: "en",
  config: {
    rootClasses,
  },
});
