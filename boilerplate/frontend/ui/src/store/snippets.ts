import { nanoid } from "nanoid";
import create from "zustand";
import { persist } from "zustand/middleware";

import { kvStore } from "./persist/keyValue";

export const enum Language {
  JSON = "json",
  JavaScript = "javascript",
  TypeScript = "typescript",
  HTML = "html",
  CPP = "cpp",
  Markdown = "markdown",
}

export const supportedLanguages: Language[] = [
  Language.JSON,
  Language.JavaScript,
  Language.TypeScript,
  Language.HTML,
  Language.CPP,
  Language.Markdown,
];

export interface Snippet {
  id: string;
  title: string;
  tags: string[];

  lang: Language;
  code: string;
}

interface SnippetState {
  snippets: Snippet[];
  selectedSnippetId?: string;

  selectSnippet: (id: string) => void;
  clearSnippet: () => void;

  createSnippet: () => void;
  deleteSnippet: (id: string) => void;

  modifySnippet: (snippet: Snippet) => void;
}

export const useSnippetStore = create<SnippetState>()(
  persist(
    (set, get) => ({
      snippets: [],
      selectedSnippetId: null,

      selectSnippet: (id) => {
        set({ selectedSnippetId: id });
      },
      clearSnippet: () => {
        set({ selectedSnippetId: null });
      },

      createSnippet: () => {
        const id = nanoid();
        const snippet: Snippet = {
          id: id,
          title: "Untitled snippet",
          tags: [],
          lang: Language.JSON,
          code: '{ "hello": "world" }',
        };

        set({ snippets: [...get().snippets, snippet] });
      },
      deleteSnippet: (id) => {
        const oldState = get();

        const newSnippets = oldState.snippets.filter(
          (snippet) => snippet.id !== id
        );
        const newSelectedSnippet =
          oldState.selectedSnippetId === id
            ? undefined
            : oldState.selectedSnippetId;

        set({
          snippets: newSnippets,
          selectedSnippetId: newSelectedSnippet,
        });
      },

      modifySnippet: (snippet) =>
        set({
          snippets: get().snippets.map((s) =>
            s.id === snippet.id ? snippet : s
          ),
        }),
    }),
    {
      name: "snippet-storage",
      getStorage: () => kvStore,
    }
  )
);
