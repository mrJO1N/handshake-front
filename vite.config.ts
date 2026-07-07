import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import path, { resolve } from "path";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/handshake-front/",
  // tsconfigPaths reads @comp/@const/@assets/@/ from tsconfig.path.json,
  plugins: [react()],

  resolve: {
    tsconfigPaths: true,
    alias: {
      '@': resolve(__dirname, 'src'),
      "@assets": resolve(__dirname, "assets")
    },
  },
  css: {
    preprocessorOptions: {
      sass: {
        loadPaths: [
          resolve(__dirname, 'src'),
        ],
      },
    },
  },

  build: {
    outDir: "dist",
    sourcemap: true,
  },

  preview: {
    host: "0.0.0.0",
    port: 8080
  },

  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./src/setupTests.ts"],
  },
});
