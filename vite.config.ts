import { defineConfig } from "vite";

import terser from "@rollup/plugin-terser";
import react from "@vitejs/plugin-react-swc";
import tsconfigPaths from "vite-tsconfig-paths";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [
    react(),
    tsconfigPaths(),
    terser(),
  ],
  build: {
    minify: mode == "production",
    rollupOptions: {
      output: {
        manualChunks: {
          antd: ["antd"],
          react: ["react"],
        },
      },
    },
  },
}));
