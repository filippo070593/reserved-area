import "@mdi/font/css/materialdesignicons.css";

import "vuetify/styles";
import { createVuetify } from "vuetify";
import { VDateInput } from "vuetify/labs/VDateInput";

export default defineNuxtPlugin((app) => {
  const vuetify = createVuetify({
    ssr: true,
    components: {
      VDateInput,
    },
    date: {
      locale: {
        en: "it-IT",
      },
    },
  });
  app.vueApp.use(vuetify);
});
