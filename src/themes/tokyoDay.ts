import { tokyoNightDay } from '@uiw/codemirror-theme-tokyo-night-day'
import type { Theme } from '.'

export const tokyoDayTheme: Theme = {
  id: 'Tokyo Day',

  primary: {
    900: '#e8eff9',
    800: '#cfdbf2',
    700: '#a6b8e1',
    600: '#7c91cb',
    500: '#626fb6',
    400: '#50549d',
    300: '#3e3f7a',
    200: '#2b2b56',
    100: '#1a1b35',
  },
  background: {
    900: '#ecf1f6',
    800: '#d5deec',
    700: '#acbcd4',
    600: '#7d94b3',
    500: '#607194',
    400: '#4d5676',
    300: '#3b4058',
    200: '#292b3d',
    100: '#181a26',
  },

  code: tokyoNightDay,
}
