import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), ""); // load all env vars

  // console.log("VITE_BASE_API:", env.VITE_BASE_API); // optional debug

  return {
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
    assetsInclude: ["assets/**"],
  };
});
