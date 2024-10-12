import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@assets": path.resolve(__dirname, "./assets"), // Алиас к папке assets
      "@components": path.resolve(__dirname, "src/components"), // Общие компоненты
      "@ui": path.resolve(__dirname, "src/components/ui"), // UI компоненты
      "@pages": path.resolve(__dirname, "src/pages"), // Страницы приложения
    },
  },
});
