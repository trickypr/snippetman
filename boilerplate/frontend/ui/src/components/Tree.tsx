import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  PrimaryFilter,
  PrimaryFilterType,
  setPrimaryFilter,
} from "../store/slicers/filter";
import { RootState } from "../store/store";

export function Tree() {
  const treeRef = useRef(null);
  const dispatch = useDispatch();
  const currentFilter = useSelector(
    (state: RootState) => state.filter.primaryFilter
  );

  let tree: { label: string; value: PrimaryFilter }[] = [
    {
      label: "All",
      value: {
        type: PrimaryFilterType.ALL,
      },
    },
    {
      label: "Lang: TS",
      value: {
        type: PrimaryFilterType.LANG,
        value: "ts",
      },
    },
    {
      label: "Lang: JS",
      value: {
        type: PrimaryFilterType.LANG,
        value: "js",
      },
    },
    {
      label: "Tag: abcd",
      value: {
        type: PrimaryFilterType.TAG,
        value: "abcd",
      },
    },
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
      className="plain"
      hideColumnPicker={true}
      ref={treeRef}
      onSelect={(event) => {
        dispatch(
          setPrimaryFilter(tree[(treeRef.current as any).currentIndex].value)
        );
      }}
    >
      <treecols>
        <treecol id="nameColumn" label="Name" flex="1" hideHeader={true} />
      </treecols>

      <treechildren flex="1">
        {tree.map((item) => (
          <treeitem key={item.label + item.value}>
            <treerow>
              <treecell label={item.label} />
            </treerow>
          </treeitem>
        ))}
      </treechildren>
    </tree>
  );
}
