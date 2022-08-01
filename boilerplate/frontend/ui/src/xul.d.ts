import { DOMAttributes } from "react";

type XULElement = {
  flex?: "1";
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
        flex?: "1";
        hideHeader?: Boolean;
      }>;

      treechildren: CustomElement<{ flex?: "1" }>;
      treeitem: CustomElement<{}>;
      treerow: CustomElement<{}>;
      treecell: CustomElement<{}>;
    }
  }
}
