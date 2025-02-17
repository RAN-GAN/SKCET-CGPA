import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "/SKCET-CGPA/", 
  plugins: [react()],
  build: {
    assetsInlineLimit: 0,
    rollupOptions: {
      input: {
        main: "./index.html",
      },
    },
  },
  assetsInclude: ["assets/**"], // Include assets directory
});
