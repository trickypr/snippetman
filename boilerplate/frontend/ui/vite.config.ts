import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { copyFile } from "fs/promises";
import glob from "tiny-glob";

function indexRenamePlugin() {
  return {
    name: "rename-index",
    closeBundle: async () => {
      for (const indexJs of await glob("./dist/assets/index.*.js")) {
        await copyFile(indexJs, "./dist/assets/index.js");
      }

      for (const indexJs of await glob("./dist/assets/index.*.css")) {
        await copyFile(indexJs, "./dist/assets/index.css");
      }
    },
  };
}

// https://vitejs.dev/config/
const config = defineConfig({
  base: "./",
  plugins: [react(), indexRenamePlugin()],
});

console.log(config);

export default config;
