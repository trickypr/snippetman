import { tokyoNight } from '@uiw/codemirror-theme-tokyo-night'
import type { Theme } from '.'

export const tokyoNightTheme: Theme = {
  id: 'Tokyo Night',

  primary: {
    50: '#f7f9f9',
    100: '#e8eff9',
    200: '#cfdbf2',
    300: '#a6b8e1',
    400: '#7c91cb',
    500: '#626fb6',
    600: '#50549d',
    700: '#3e3f7a',
    800: '#2b2b56',
    900: '#1a1b35',
  },
  background: {
    50: '#f8faf9',
    100: '#ecf1f6',
    200: '#d5deec',
    300: '#acbcd4',
    400: '#7d94b3',
    500: '#607194',
    600: '#4d5676',
    700: '#3b4058',
    800: '#292b3d',
    900: '#181a26',
  },

  code: tokyoNight,
}
