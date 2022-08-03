import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

export function Snippet() {
  const selectedSnippetId = useSelector(
    (state: RootState) => state.snippet.selectedSnippetId
  );

  if (!selectedSnippetId) {
    return (
      <vbox flex={2}>
        <h1>No selected snippet</h1>
        <p>Select a snippet to continue</p>
      </vbox>
    );
  }

  return (
    <vbox>
      <h1>Snippet</h1>
      <p>{selectedSnippetId}</p>
    </vbox>
  );
}
