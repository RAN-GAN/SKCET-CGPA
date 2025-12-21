import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), ""); // load all env vars
  return {
    base: "/SKCET-CGPA/",
    plugins: [react()],
    build: {
      minify: "terser",
      terserOptions: {
        compress: {
          drop_console: true, 
          drop_debugger: true, 
        },
      },
      assetsInlineLimit: 0,
      rollupOptions: {
        input: {
          main: "./index.html",
        },
      },
    },
    assetsInclude: ["assets/**"],
  };
});
