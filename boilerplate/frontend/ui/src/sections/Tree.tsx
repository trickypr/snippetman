import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  PrimaryFilter,
  PrimaryFilterType,
  setPrimaryFilter,
} from "../store/slicers/filter";
import { useSnippetStore } from "../store/snippets";
import { RootState } from "../store/store";
import { toTitleCase } from "../utils/primitives";

import styles from "./Tree.module.css";

export function Tree() {
  const treeRef = useRef(null);
  const dispatch = useDispatch();

  const languages = useSnippetStore((state) => [
    ...new Set(state.snippets.map((snippet) => snippet.lang)),
  ]);
  const tags = useSnippetStore((state) => [
    ...new Set(state.snippets.flatMap((snippet) => snippet.tags)),
  ]);

  const currentFilter = useSelector(
    (state: RootState) => state.filter.primaryFilter
  );

  let tree: { label: string; key: string; value: PrimaryFilter }[] = [
    {
      label: "All",
      key: "all",
      value: {
        type: PrimaryFilterType.ALL,
      },
    },
    {
      label: "Languages",
      key: "languages",
      value: {
        type: PrimaryFilterType.HEADER,
      },
    },
    ...languages.map((language) => ({
      label: toTitleCase(language),
      key: `lang-${language}`,
      value: {
        type: PrimaryFilterType.LANG,
        value: language,
      },
    })),
    {
      label: "Tags",
      key: "tags",
      value: {
        type: PrimaryFilterType.HEADER,
      },
    },
    ...tags.map((tag) => ({
      label: toTitleCase(tag),
      key: `tag-${tag}`,
      value: {
        type: PrimaryFilterType.TAG,
        value: tag,
      },
    })),
  ];

  // We want to make sure the tree is always in sync with what is in the current
  // store
  useEffect(() => {
    if (treeRef.current) {
      const index = tree.findIndex(
        (item) =>
          item.value.type === currentFilter.type &&
          item.value.value === currentFilter.value
      );

      if (index !== -1) {
        (treeRef.current as any).currentIndex = index;
      }
    }
  }, [currentFilter]);

  return (
    <tree
      flex="1"
      className={`plain ${styles.sidebar}`}
      hideColumnPicker={true}
      ref={treeRef}
      onSelect={(event) => {
        dispatch(
          setPrimaryFilter(tree[(treeRef.current as any).currentIndex].value)
        );
      }}
    >
      <treecols>
        <treecol id="nameColumn" flex="1" hideHeader={true} />
      </treecols>

      <treechildren flex="1">
        {tree.map((item) => {
          if (item.value.type == PrimaryFilterType.HEADER) {
            // TODO: show heading text here
            return <treeseparator key={item.key} />;
          }

          return (
            <treeitem key={item.key}>
              <treerow>
                <treecell label={item.label} />
              </treerow>
            </treeitem>
          );
        })}
      </treechildren>
    </tree>
  );
}
