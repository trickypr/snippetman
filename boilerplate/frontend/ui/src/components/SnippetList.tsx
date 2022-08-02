import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Snippet } from "../store/slicers/snippets";
import { RootState } from "../store/store";

import styles from "./SnippetList.module.css";

function SnippetListItem({ snippet }: { snippet: Snippet }) {
  return (
    <vbox className={styles.listItem}>
      <hbox flex={1}>
        <div>{snippet.title}</div>
        <spacer flex={8} />
        <div>{snippet.lang}</div>
      </hbox>

      <div>{snippet.tags.join(", ")}</div>
    </vbox>
  );
}

export function SnippetList() {
  const snippets = useSelector((state: RootState) => state.snippet.snippets);

  return (
    <vbox>
      <input type="text" name="Search" id="listsearch" />

      {snippets.map((snippet) => (
        <SnippetListItem key={snippet.id} snippet={snippet} />
      ))}
    </vbox>
  );
}
