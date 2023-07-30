import { nordInit } from '@uiw/codemirror-theme-nord'
import type { Theme } from '.'

export const nordTheme: Theme = {
  id: 'Nord',

  primary: {
    50: '#f5f9f9',
    100: '#e1f0fa',
    200: '#bfdef4',
    300: '#8fbee5',
    400: '#5d99d1',
    500: '#4776bd',
    600: '#3a5ba5',
    700: '#2f4482',
    800: '#212e5c',
    900: '#131d3b',
  },
  background: {
    50: '#f8faf9',
    100: '#edf1f5',
    200: '#d5dfe9',
    300: '#acbdce',
    400: '#7c95aa',
    500: '#5f7388',
    600: '#4c586a',
    700: '#3b4150',
    800: '#282c37',
    900: '#181a23',
  },

  code: nordInit({
    settings: {
      // Handle issues with comments & line highlights
      lineHighlight: '#3b4150',
    },
  }),
}
