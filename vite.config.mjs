import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { fileURLToPath, URL } from "node:url";

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  server: {
    host: true, // lets you open on your phone
    proxy: {
      // so frontend can call /api/... without CORS pain in dev
      "/api": "http://127.0.0.1:8000",
    },
  },
});
