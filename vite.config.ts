import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// GitHub Pages serves this repo as a project page at
// https://prathameshberad.github.io/Prathamesh-Berad.github.io/
// so production assets must be prefixed with that base path.
// Dev runs at root. Override with VITE_BASE when deploying elsewhere
// (e.g. a custom domain or a user/org page → set VITE_BASE="/").
export default defineConfig(({ command }) => ({
  base:
    process.env.VITE_BASE ??
    (command === "build" ? "/Prathamesh-Berad.github.io/" : "/"),
  plugins: [react()],
  server: {
    host: true,
    port: Number(process.env.PORT) || 5173,
  },
}));
