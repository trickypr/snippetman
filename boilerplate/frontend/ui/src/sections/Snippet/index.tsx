import React, { useEffect, useState } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { darcula } from "@uiw/codemirror-theme-darcula";

import { getLanguageExtension } from "./languages";

import styles from "./Snippet.module.css";
import { supportedLanguages } from "../../store/sampleData/snippet";
import { useSnippetStore } from "../../store/snippets";
import { Hint } from "react-autocomplete-hint";

function SnippetInternals() {
  const tags = useSnippetStore((state) => [
    ...new Set(state.snippets.flatMap((snippet) => snippet.tags)),
  ]);
  const selectedSnippet = useSnippetStore((state) =>
    state.snippets.find((snippet) => snippet.id === state.selectedSnippetId)
  );

  const modifySnippet = useSnippetStore((state) => state.modifySnippet);

  const onChange = React.useCallback(
    (value: string, _viewUpdate: never) =>
      modifySnippet({
        ...selectedSnippet,
        code: value,
      }),
    [selectedSnippet]
  );

  const [languageExtension, setLanguageExtension] = useState(null);
  const [addNewTag, setAddNewTag] = useState(null);

  useEffect(() => {
    (async () => {
      if (selectedSnippet) {
        setLanguageExtension(await getLanguageExtension(selectedSnippet.lang));
      }
    })();
  }, [selectedSnippet]);

  if (!selectedSnippet) {
    return (
      <>
        <h1>No selected snippet</h1>
        <p>Select a snippet to continue</p>
      </>
    );
  }

  return (
    <>
      <input
        type="text"
        contentEditable
        value={selectedSnippet.title}
        onKeyUp={(e) =>
          modifySnippet({ ...selectedSnippet, title: (e.target as any).value })
        }
      />

      <box>
        <hbox>
          {selectedSnippet.tags.map((tag) => (
            <hbox key={tag} className={styles.tagContainer}>
              <description value={tag} flex={1} />
              <box
                className={`${styles.iconButton} ${styles.icon}`}
                style={{
                  background:
                    "url(chrome://global/skin/icons/close.svg) no-repeat center",
                }}
                onClick={() =>
                  modifySnippet({
                    ...selectedSnippet,
                    tags: selectedSnippet.tags.filter((t) => t !== tag),
                  })
                }
              />
            </hbox>
          ))}

          {typeof addNewTag === "string" && (
            <Hint options={tags} onHint={(h) => console.log(h)} allowTabFill>
              <input
                type="text"
                name="New Tag"
                placeholder="New Tag"
                onChange={(e) => console.log("Client change", e)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    modifySnippet({
                      ...selectedSnippet,
                      tags: [...selectedSnippet.tags, e.target.value],
                    });
                    setAddNewTag(null);
                  }
                }}
              />
            </Hint>
          )}

          <div
            className={`${styles.tagContainer} ${styles.icon}`}
            style={{
              background:
                typeof addNewTag === "string"
                  ? "url(chrome://global/skin/icons/close.svg) no-repeat center"
                  : "url(chrome://global/skin/icons/plus.svg) no-repeat center",
              width: "32px",
            }}
            onClick={() =>
              setAddNewTag(typeof addNewTag === "string" ? null : "")
            }
          />
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
                  modifySnippet({
                    ...selectedSnippet,
                    lang: (e.target as any).value,
                  })
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
