// vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "/SKCET-CGPA/", // Specify your GitHub Pages URL path
  plugins: [react()],
  build: {
    assetsInlineLimit: 0,
    rollupOptions: {
      input: {
        main: "./index.html",
      },
    },
  },
  optimizeDeps: {
    include: ["react", "react-dom"],
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  assetsInclude: ["assets/**"], // Include assets directory
});
