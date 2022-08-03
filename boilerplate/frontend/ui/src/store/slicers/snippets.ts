import { createSlice } from "@reduxjs/toolkit";
import { sampleSnippets } from "../sampleData/snippet";

export interface Snippet {
  id: string;
  title: string;
  tags: string[];

  lang: string;
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

  languages: [...new Set(sampleSnippets.map((snippet) => snippet.lang))],
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
  },
});

export const { selectSnippet, clearSnippet } = snippetSlice.actions;
export const snippetReducer = snippetSlice.reducer;
