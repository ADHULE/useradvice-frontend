import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: "0.0.0.0",
    open: true,
    port: 3001,
    proxy: { "/api": { target: "http://localhost:9191", changeOrigin: true } },
  },
});
