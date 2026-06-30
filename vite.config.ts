import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  // tsconfigPaths reads @comp/@const/@assets/@/ from tsconfig.path.json,
  // mirroring the old CracoAlias({ source: "tsconfig" }) setup.
  plugins: [react(), tsconfigPaths()],

  css: {
    preprocessorOptions: {
      sass: {
        additionalData: `@import "${path
          .resolve(__dirname, "src/constants/style-constants.sass")
          .replace(/\\/g, "/")}"\n`,
      },
    },
  },

  build: {
    outDir: "build",
    sourcemap: true,
  },

  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./src/setupTests.ts"],
  },
});
