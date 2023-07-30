import { tags as t } from '@lezer/highlight'
import { createTheme } from 'thememirror'
import type { Theme } from '.'

export const code = createTheme({
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

export const snippetmanDarkTheme: Theme = {
  id: 'Snippetman Dark',

  primary: {
    50: '#ecfeff',
    100: '#cffafe',
    200: '#a5f3fc',
    300: '#67e8f9',
    400: '#22d3ee',
    500: '#06b6d4',
    600: '#0891b2',
    700: '#0e7490',
    800: '#155e75',
    900: '#164e63',
  },
  background: {
    50: '#f8fafc',
    100: '#f1f5f9',
    200: '#e2e8f0',
    300: '#cbd5e1',
    400: '#94a3b8',
    500: '#64748b',
    600: '#475569',
    700: '#334155',
    800: '#1e293b',
    900: '#0f172a',
  },

  code,
}
