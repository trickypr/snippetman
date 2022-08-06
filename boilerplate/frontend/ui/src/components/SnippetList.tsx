import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  clearSnippet,
  createSnippet,
  selectSnippet,
  Snippet,
} from "../store/slicers/snippets";
import { RootState } from "../store/store";

import styles from "./SnippetList.module.css";

function SnippetListItem({ snippet }: { snippet: Snippet }) {
  return (
    <richlistitem orient="vertical" className={styles.listItem}>
      <hbox>
        <description
          className={styles.listItemTitle}
          value={snippet.title}
          crop="end"
          flex={1}
        />
        <spacer flex={8} />
        <description
          className={styles.listItemLanguages}
          value={snippet.lang}
          flex={1}
        />
      </hbox>

      <description
        className={styles.listItemTags}
        value={snippet.tags.join(", ")}
        crop="end"
        flex={1}
      />
    </richlistitem>
  );
}

export function SnippetList() {
  const snippets = useSelector((state: RootState) => state.snippet.snippets);
  const dispatch = useDispatch();

  const listBoxRef = useRef();

  return (
    <vbox>
      <hbox>
        <input type="text" name="Search" id="listsearch" />
        <button
          style={{ minWidth: "0" }}
          onClick={() => {
            dispatch(createSnippet());
          }}
        >
          +
        </button>
      </hbox>

      <richlistbox
        flex={1}
        className={styles.snippetList}
        onSelect={(event) => {
          if (!listBoxRef.current) return;

          const selectedIndex = (listBoxRef.current as any).selectedIndex;

          if (selectedIndex === -1) return dispatch(clearSnippet());
          dispatch(selectSnippet(snippets[selectedIndex].id));
        }}
        ref={listBoxRef}
      >
        {snippets.map((snippet) => (
          <SnippetListItem key={snippet.id} snippet={snippet} />
        ))}
      </richlistbox>
    </vbox>
  );
}
