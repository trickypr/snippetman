import Editor from "@monaco-editor/react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  changeSnippetCode,
  changeSnippetLanguage,
  renameSnippet,
} from "../store/slicers/snippets";
import { RootState } from "../store/store";

function SnippetInternals() {
  const dispatch = useDispatch();

  const langs = useSelector((state: RootState) => state.snippet.languages);
  const selectedSnippetId = useSelector(
    (state: RootState) => state.snippet.selectedSnippetId
  );
  const selectedSnippet = useSelector((state: RootState) =>
    state.snippet.snippets.find((snippet) => snippet.id === selectedSnippetId)
  );

  if (!selectedSnippetId) {
    return (
      <>
        <h1>No selected snippet</h1>
        <p>Select a snippet to continue</p>
      </>
    );
  }

  if (!selectedSnippet) {
    return (
      <>
        <h1>Selected snippet does not exist</h1>
        <p>This is a bug, report it</p>
      </>
    );
  }

  return (
    <>
      <input
        type="text"
        contentEditable
        value={selectedSnippet.title}
        onKeyUp={(e) => {
          dispatch(
            renameSnippet({
              id: selectedSnippetId,
              title: (e.target as any).value,
            })
          );
        }}
      />

      <hbox>
        <hbox>
          {selectedSnippet.tags.map((tag) => (
            <description key={tag} value={tag} flex={1} />
          ))}
        </hbox>

        <button
          type="menu"
          value={selectedSnippet.lang}
          label={selectedSnippet.lang}
        >
          <menupopup type="arrow" orient="vertical" role="menu">
            {langs.map((lang) => (
              <menuitem
                key={lang}
                label={lang}
                value={lang}
                onClick={(e) =>
                  dispatch(
                    changeSnippetLanguage({
                      id: selectedSnippetId,
                      lang: (e.target as any).value,
                    })
                  )
                }
              />
            ))}
          </menupopup>
        </button>
      </hbox>

      <Editor
        height="70vh"
        language={selectedSnippet.lang}
        value={selectedSnippet.code}
        onChange={(e) => {
          dispatch(changeSnippetCode({ id: selectedSnippetId, code: e }));
        }}
      />
    </>
  );
}

export function Snippet() {
  return (
    <vbox flex={2}>
      <SnippetInternals />
    </vbox>
  );
}
