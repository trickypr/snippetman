import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { copyFile, writeFile, readFile } from "fs/promises";
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

const headers = [];

function prependXMLHeaders() {
  return {
    name: "prepend-xml-headers",
    closeBundle: async () => {
      for (const file of await glob("./dist/*.html")) {
        await writeFile(
          file,
          `<?xml version="1.0"?>\n${headers.join("\n")}\n${await readFile(
            file
          )}`
        );
      }
    },
  };
}

// https://vitejs.dev/config/
const config = defineConfig({
  base: "./",
  plugins: [react(), prependXMLHeaders()],
  build: {
    sourcemap: "inline",
    minify: false,
  },
});

export default config;
