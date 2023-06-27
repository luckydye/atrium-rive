import { HstVue } from "@histoire/plugin-vue";
import { defineConfig } from "histoire";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
  plugins: [HstVue()],
  vite: {
    plugins: [vue()],
  },
});
