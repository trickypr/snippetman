import { DOMAttributes } from "react";

type XULElement = {
  flex?: string | number;
  label?: string;
};

type CustomElement<T> = Partial<
  T &
    DOMAttributes<T> & {
      children: any;
      id: string;
      className: string;
      ref: any;
      key?: string | number;
    } & XULElement
>;

declare global {
  namespace JSX {
    interface IntrinsicElements {
      tree: CustomElement<{
        hideColumnPicker?: boolean;
      }>;

      treecols: CustomElement<{}>;

      treecol: CustomElement<{
        hideHeader?: Boolean;
      }>;

      treechildren: CustomElement<{}>;
      treeitem: CustomElement<{}>;
      treerow: CustomElement<{}>;
      treecell: CustomElement<{}>;
      treeseparator: CustomElement<{}>;

      listbox: CustomElement<{}>;
      listcols: CustomElement<{}>;
      listcol: CustomElement<{}>;
      listitem: CustomElement<{}>;
      listcell: CustomElement<{}>;
      listhead: CustomElement<{}>;
      listheader: CustomElement<{}>;

      richlistbox: CustomElement<{}>;
      richlistitem: CustomElement<{}>;

      vbox: CustomElement<{}>;
      hbox: CustomElement<{}>;
      spacer: CustomElement<{}>;

      description: CustomElement<{
        value: string;
        tooltipText?: string;
      }>;
    }
  }
}
