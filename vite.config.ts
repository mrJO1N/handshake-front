import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import path, { resolve } from "path";

// https://vitejs.dev/config/
export default defineConfig({
  // tsconfigPaths reads @comp/@const/@assets/@/ from tsconfig.path.json,
  // mirroring the old CracoAlias({ source: "tsconfig" }) setup.
  plugins: [react(), tsconfigPaths()],

  resolve: {
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
    outDir: "build",
    sourcemap: true,
  },

  preview: {
    host: "0.0.0.0",
    port: 80
  },

  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./src/setupTests.ts"],
  },
});
