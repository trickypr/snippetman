export function Tree() {
  return (
    <tree flex="1" className="plain" hideColumnPicker={true}>
      <treecols>
        <treecol id="nameColumn" label="Name" flex="1" hideHeader={true} />
      </treecols>

      <treechildren flex="1">
        <treeitem>
          <treerow>
            <treecell label="joe@somewhere.com" />
          </treerow>
        </treeitem>
        <treeitem>
          <treerow>
            <treecell label="mel@whereever.com" />
          </treerow>
        </treeitem>
      </treechildren>
    </tree>
  );
}
