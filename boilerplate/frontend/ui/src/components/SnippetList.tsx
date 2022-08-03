import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  clearSnippet,
  selectSnippet,
  Snippet,
} from "../store/slicers/snippets";
import { RootState } from "../store/store";

import styles from "./SnippetList.module.css";

function SnippetListItem({ snippet }: { snippet: Snippet }) {
  return (
    <richlistitem>
      <vbox className={styles.listItem} flex={1}>
        <hbox flex={1}>
          <description className={styles.listItemTitle} value={snippet.title} />
          <spacer flex={8} />
          <description
            className={styles.listItemLanguages}
            value={snippet.lang}
          />
        </hbox>

        <description
          className={styles.listItemTags}
          value={snippet.tags.join(", ")}
        />
      </vbox>
    </richlistitem>
  );
}

export function SnippetList() {
  const snippets = useSelector((state: RootState) => state.snippet.snippets);
  const dispatch = useDispatch();

  const listBoxRef = useRef();

  return (
    <vbox>
      <input type="text" name="Search" id="listsearch" />

      <richlistbox
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
