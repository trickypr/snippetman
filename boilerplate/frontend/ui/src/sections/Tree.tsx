import React, { useEffect, useRef } from "react";

import { useFilterStore } from "../store/filter";
import { PrimaryFilter, PrimaryFilterType } from "../store/filter";
import { useSnippetStore } from "../store/snippets";
import { toTitleCase } from "../utils/primitives";

import styles from "./Tree.module.css";

export function Tree() {
  const treeRef = useRef(null);

  const languages = useSnippetStore((state) => [
    ...new Set(state.snippets.map((snippet) => snippet.lang)),
  ]);
  const tags = useSnippetStore((state) => [
    ...new Set(state.snippets.flatMap((snippet) => snippet.tags)),
  ]);

  const currentFilter = useFilterStore((state) => state.filter);
  const setFilter = useFilterStore((state) => state.setFilter);

  // We want to make sure the tree is always in sync with what is in the current
  // store
  useEffect(() => {
    if (treeRef.current) {
      const index = treeValues.findIndex(
        (item) =>
          item.type === currentFilter.type && item.value === currentFilter.value
      );

      if (index !== -1) {
        (treeRef.current as any).currentIndex = index;
      }
    }
  }, [currentFilter]);

  const treeValues: PrimaryFilter[] = [
    {
      type: PrimaryFilterType.ALL,
    },
    {
      type: PrimaryFilterType.HEADER,
    },
    ...languages.map((language) => ({
      type: PrimaryFilterType.LANG,
      value: language,
    })),
    {
      type: PrimaryFilterType.HEADER,
    },
    ...tags.map((tag) => ({
      type: PrimaryFilterType.TAG,
      value: tag,
    })),
  ];

  return (
    <tree
      flex="1"
      className={`${styles.sidebar}`}
      hideColumnPicker={true}
      ref={treeRef}
      onSelect={(event) =>
        setFilter(treeValues[(treeRef.current as any).currentIndex])
      }
      seltype="single"
      persist="width"
    >
      <treecols>
        <treecol id="nameColumn" flex="1" primary={true} hideHeader={true} />
      </treecols>

      <treechildren flex="1">
        <treeitem>
          <treerow>
            <treecell label="All" />
          </treerow>
        </treeitem>

        <treeitem container="true" open="true">
          <treerow>
            <treecell label="Languages" />
          </treerow>

          <treechildren>
            {languages
              .map((language) => ({
                label: toTitleCase(language),
                key: `lang-${language}`,
                value: {
                  type: PrimaryFilterType.LANG,
                  value: language,
                },
              }))
              .map((item) => (
                <treeitem key={item.key}>
                  <treerow>
                    <treecell label={item.label} />
                  </treerow>
                </treeitem>
              ))}
          </treechildren>
        </treeitem>

        <treeitem container="true" open="true">
          <treerow>
            <treecell label="Tags" />
          </treerow>

          <treechildren>
            {tags
              .map((tag) => ({
                label: toTitleCase(tag),
                key: `tag-${tag}`,
                value: {
                  type: PrimaryFilterType.TAG,
                  value: tag,
                },
              }))
              .map((item) => (
                <treeitem key={item.key}>
                  <treerow>
                    <treecell label={item.label} />
                  </treerow>
                </treeitem>
              ))}
          </treechildren>
        </treeitem>
      </treechildren>
    </tree>
  );
}
