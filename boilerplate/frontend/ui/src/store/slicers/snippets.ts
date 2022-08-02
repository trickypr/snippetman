import { createSlice } from "@reduxjs/toolkit";
import { sampleSnippets } from "../sampleData/snippet";

export interface Snippet {
  title: string;
  tags: string[];

  lang: string;
  code: string;
}

export interface SnippetState {
  snippets: Snippet[];
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
  reducers: {},
});

export const {} = snippetSlice.actions;
export const snippetReducer = snippetSlice.reducer;
