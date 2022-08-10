import React, { useRef, useState } from "react";
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

function fastSnippetFilter(snippet: Snippet, filter: string): boolean {
  if (filter == "") return true;

  return (
    snippet.title.toLowerCase().includes(filter) ||
    snippet.lang.toLowerCase().includes(filter) ||
    snippet.tags.some((tag) => tag.toLowerCase().includes(filter)) ||
    snippet.code.includes(filter)
  );
}

export function SnippetList() {
  const unfilteredSnippets = useSelector(
    (state: RootState) => state.snippet.snippets
  );
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();
  const snippets = unfilteredSnippets.filter((snippet) =>
    fastSnippetFilter(snippet, search.toLowerCase())
  );

  const listBoxRef = useRef();

  return (
    <vbox>
      <hbox>
        <input
          type="text"
          name="Search"
          id="listsearch"
          value={search}
          onKeyUp={(e) => setSearch(e.target.value)}
        />
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
