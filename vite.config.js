import { defineConfig } from "vite";

// base: "./" — относительные пути, чтобы сборка работала и на GitHub Pages, и на адресе Figma
export default defineConfig({
  base: "./",
  server: { host: true, allowedHosts: true },
  preview: { host: true, allowedHosts: true }
});
