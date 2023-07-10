import { createTheme } from 'thememirror'
import { tags as t } from '@lezer/highlight'

export default createTheme({
  variant: 'dark',
  settings: {
    background: '#0e162a',
    foreground: '#edf5fb',
    caret: '#cdb3fd',
    selection: '#6924a9',
    lineHighlight: '#1d293c',
    gutterBackground: '#1d293c',
    gutterForeground: '#92a1b7',
  },
  styles: [
    {
      tag: t.comment,
      color: '#92a1b7',
    },
    {
      tag: t.variableName,
      color: '#dbe4ef',
    },
    {
      tag: [t.string, t.special(t.brace)],
      color: '#b3f3d1',
    },
    {
      tag: t.number,
      color: '#fcd5a9',
    },
    {
      tag: t.bool,
      color: '#daeffd',
    },
    {
      tag: t.null,
      color: '#dbe4ef',
    },
    {
      tag: t.keyword,
      color: '#f6a4a6',
    },
    {
      tag: t.operator,
      color: '#7bd1fb',
    },
    {
      tag: t.className,
      color: '#edb97e',
    },
    {
      tag: t.definition(t.typeName),
      color: '#edb97e',
    },
    {
      tag: t.typeName,
      color: '#edb97e',
    },
    {
      tag: t.angleBracket,
      color: '#687282',
    },
    {
      tag: t.tagName,
      color: '#d4d3fd',
    },
    {
      tag: t.attributeName,
      color: '#bbd9fd',
    },
  ],
})
