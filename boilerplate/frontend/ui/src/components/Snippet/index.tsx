import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CodeMirror from "@uiw/react-codemirror";
import { darcula } from "@uiw/codemirror-theme-darcula";

import {
  changeSnippetCode,
  changeSnippetLanguage,
  removeTag,
  renameSnippet,
} from "../../store/slicers/snippets";
import { RootState } from "../../store/store";
import { getLanguageExtension } from "./languages";

import styles from "./Snippet.module.css";
import { supportedLanguages } from "../../store/sampleData/snippet";

function SnippetInternals() {
  const dispatch = useDispatch();

  const langs = useSelector((state: RootState) => state.snippet.languages);
  const selectedSnippetId = useSelector(
    (state: RootState) => state.snippet.selectedSnippetId
  );
  const selectedSnippet = useSelector((state: RootState) =>
    state.snippet.snippets.find(
      (snippet) => snippet.id === state.snippet.selectedSnippetId
    )
  );
  const onChange = React.useCallback(
    (value, viewUpdate) => {
      dispatch(changeSnippetCode({ id: selectedSnippetId, code: value }));
    },
    [selectedSnippetId]
  );

  const [languageExtension, setLanguageExtension] = useState(null);

  useEffect(() => {
    (async () => {
      if (selectedSnippet) {
        setLanguageExtension(await getLanguageExtension(selectedSnippet.lang));
      }
    })();
  }, [selectedSnippet]);

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

      <box>
        <hbox>
          {selectedSnippet.tags.map((tag) => (
            <hbox key={tag} className={styles.tagContainer}>
              <description value={tag} flex={1} />
              <box
                style={{
                  background:
                    "url(chrome://global/skin/icons/close.svg) no-repeat center",
                  width: "8px",
                  height: "8px",
                }}
                onClick={() =>
                  dispatch(removeTag({ id: selectedSnippetId, tag }))
                }
              />
            </hbox>
          ))}
        </hbox>

        <spacer flex={1} />

        <button
          type="menu"
          value={selectedSnippet.lang}
          label={selectedSnippet.lang}
        >
          <menupopup>
            {supportedLanguages.map((lang) => (
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
      </box>

      <CodeMirror
        value={selectedSnippet.code}
        onChange={onChange}
        theme={darcula}
        extensions={[languageExtension].filter(Boolean)}
      />
    </>
  );
}

export function Snippet() {
  return (
    <vbox flex={1} className={styles.snippetView}>
      <SnippetInternals />
    </vbox>
  );
}
