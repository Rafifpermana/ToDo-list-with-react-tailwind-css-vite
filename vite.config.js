import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { ghPages } from "vite-plugin-gh-pages"; // Perhatikan cara impor yang benar

export default defineConfig({
  plugins: [react(), ghPages()],
  base: "/todo-list-with-react/", // Ganti dengan nama repositori Anda
});
