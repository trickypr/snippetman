import React from "react";
import { useSelector } from "react-redux";
import { Snippet } from "../store/slicers/snippets";
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

  return (
    <vbox>
      <input type="text" name="Search" id="listsearch" />

      <richlistbox>
        {snippets.map((snippet) => (
          <SnippetListItem key={snippet.id} snippet={snippet} />
        ))}
      </richlistbox>
    </vbox>
  );
}
