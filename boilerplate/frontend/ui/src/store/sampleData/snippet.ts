import { nanoid } from "@reduxjs/toolkit";
import { Snippet } from "../slicers/snippets";

// _slicers_snippets__WEBPACK_IMPORTED_MODULE_1__

export enum Language {
  JSON = "json",
  JavaScript = "javascript",
  TypeScript = "typescript",
}

export const supportedLanguages: Language[] = [
  Language.JSON,
  Language.JavaScript,
  Language.TypeScript,
];

export const sampleSnippets: Snippet[] = [
  {
    id: nanoid(),
    title: ".prettierrc",
    tags: ["prettier", "webdev", "tooling"],

    lang: Language.JSON,
    code: JSON.stringify(
      {
        semi: false,
        singleQuotes: true,
      },
      null,
      2
    ),
  },
  {
    id: nanoid(),
    title: "Gecko Vite Config",
    tags: ["gecko", "tooling"],

    lang: Language.TypeScript,
    code: `import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { copyFile, writeFile, readFile } from "fs/promises";
import glob from "tiny-glob";

const headers = [];

function prependXMLHeaders() {
  return {
    name: "prepend-xml-headers",
    closeBundle: async () => {
      for (const file of await glob("./dist/*.html")) {
        await writeFile(
          file,
          \`<?xml version="1.0"?>\\n\${headers.join("\\n")}\\n\${await readFile(
            file
          )}\`
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

export default config;`,
  },
];
