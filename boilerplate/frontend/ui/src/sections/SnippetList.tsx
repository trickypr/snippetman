import React, { useRef, useState } from "react";
import { useFilterStore } from "../store/filter";

import { PrimaryFilter, PrimaryFilterType } from "../store/filter";
import { Snippet } from "../store/snippets";
import { useSnippetStore } from "../store/snippets";

import styles from "./SnippetList.module.css";

function SnippetListItem({ snippet }: { snippet: Snippet }) {
  const deleteSnippet = useSnippetStore((state) => state.deleteSnippet);
  const contextMenuId = `${snippet.id}-context-menu`;

  return (
    <richlistitem
      orient="vertical"
      className={styles.listItem}
      context={contextMenuId}
    >
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

      <menupopup id={contextMenuId}>
        <menuitem label="Delete" onClick={() => deleteSnippet(snippet.id)} />
      </menupopup>
    </richlistitem>
  );
}

function primaryFilter(snippet: Snippet, filter: PrimaryFilter): boolean {
  switch (filter.type) {
    case PrimaryFilterType.LANG:
      return snippet.lang === filter.value;

    case PrimaryFilterType.TAG:
      return snippet.tags.includes(filter.value);
  }

  return true;
}

function textSearch(snippet: Snippet, filter: string): boolean {
  if (filter == "") return true;

  return (
    snippet.title.toLowerCase().includes(filter) ||
    snippet.lang.toLowerCase().includes(filter) ||
    snippet.tags.some((tag) => tag.toLowerCase().includes(filter)) ||
    snippet.code.includes(filter)
  );
}

export function SnippetList() {
  const unfilteredSnippets = useSnippetStore((store) => store.snippets);
  const filter = useFilterStore((store) => store.filter);

  const createSnippet = useSnippetStore((store) => store.createSnippet);
  const clearSnippet = useSnippetStore((store) => store.clearSnippet);
  const selectSnippet = useSnippetStore((store) => store.selectSnippet);

  const [search, setSearch] = useState("");

  const snippets = unfilteredSnippets
    .filter((snippet) => primaryFilter(snippet, filter))
    .filter((snippet) => textSearch(snippet, search.toLowerCase()));

  const listBoxRef = useRef();

  return (
    <vbox>
      <hbox className={styles.searchList}>
        <input
          type="text"
          name="Search"
          id="listsearch"
          value={search}
          onKeyUp={(e) => setSearch(e.target.value)}
        />
        <button onClick={() => createSnippet()} id={styles.addButton}></button>
      </hbox>

      <richlistbox
        flex={1}
        className={styles.snippetList}
        onSelect={(event) => {
          if (!listBoxRef.current) return;

          const selectedIndex = (listBoxRef.current as any).selectedIndex;

          if (selectedIndex === -1) return clearSnippet();
          selectSnippet(snippets[selectedIndex].id);
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
