import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    watch: {
      usePolling: true,
      interval: 300,
      awaitWriteFinish: {
        stabilityThreshold: 100,
        pollInterval: 100,
      },
    },
  },
});
