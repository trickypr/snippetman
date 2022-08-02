import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { writeFile, readFile, cp, access, mkdir } from "fs/promises";
import { dirname, join, relative } from "path";
import glob from "tiny-glob";

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
