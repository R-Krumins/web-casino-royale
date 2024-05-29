import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: true,
    port: 5000,
    proxy: {
      "/api": "http://localhost:3000",
    },
  },
  build: {
    outDir: "../server/public",
  },
  plugins: [svgr(), react()],
});
