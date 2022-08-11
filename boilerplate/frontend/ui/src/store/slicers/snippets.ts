import { createSlice } from "@reduxjs/toolkit";
import { nanoid } from "nanoid";
import { Language, sampleSnippets } from "../sampleData/snippet";

export interface Snippet {
  id: string;
  title: string;
  tags: string[];

  lang: Language;
  code: string;
}

export interface SnippetState {
  snippets: Snippet[];
  /**
   * The id of the selected snippet
   */
  selectedSnippetId?: string;

  languages: string[];
  tags: string[];
}

const initialState: SnippetState = {
  snippets: sampleSnippets,

  languages: [...new Set(sampleSnippets.map((s) => s.lang))],
  tags: [...new Set(sampleSnippets.flatMap((snippet) => snippet.tags))],
};

export const snippetSlice = createSlice({
  name: "snippet",
  initialState,
  reducers: {
    selectSnippet(state, action) {
      state.selectedSnippetId = action.payload;
    },
    clearSnippet(state) {
      state.selectedSnippetId = undefined;
    },
    createSnippet(state) {
      const id = nanoid();

      state.snippets.push({
        id: id,
        title: "Untitled snippet",
        tags: [],
        lang: Language.JSON,
        code: '{ "hello": "world" }',
      });

      state.selectedSnippetId = id;
    },

    // Modifying snippets
    renameSnippet(state, action) {
      const { id, title } = action.payload;
      const snippet = state.snippets.find((snippet) => snippet.id === id);
      if (snippet) {
        snippet.title = title;
      }
    },
    changeSnippetLanguage(state, action) {
      const { id, lang } = action.payload;
      const snippet = state.snippets.find((snippet) => snippet.id === id);
      if (snippet) {
        snippet.lang = lang;
      }
      state.languages = [...new Set(state.snippets.map((s) => s.lang))];
    },
    changeSnippetCode(state, action) {
      const { id, code } = action.payload;
      const snippet = state.snippets.find((snippet) => snippet.id === id);
      if (snippet) {
        snippet.code = code;
      }
    },

    // Working with tags
    removeTag(state, action) {
      const { id, tag } = action.payload;
      const snippet = state.snippets.find((snippet) => snippet.id === id);
      if (snippet) {
        snippet.tags = snippet.tags.filter((t) => t !== tag);
      }
    },
  },
});

export const {
  selectSnippet,
  clearSnippet,
  renameSnippet,
  changeSnippetLanguage,
  changeSnippetCode,
  createSnippet,

  removeTag,
} = snippetSlice.actions;
export const snippetReducer = snippetSlice.reducer;
