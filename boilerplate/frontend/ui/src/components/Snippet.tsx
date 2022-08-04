import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

function SnippetInternals() {
  const selectedSnippetId = useSelector(
    (state: RootState) => state.snippet.selectedSnippetId
  );
  const selectedSnippet = useSelector((state: RootState) =>
    state.snippet.snippets.find((snippet) => snippet.id === selectedSnippetId)
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

export function Snippet() {
  return (
    <vbox flex={2}>
      <SnippetInternals />
    </vbox>
  );
}
