import type { Extension } from '@codemirror/state'

export const themeNames = [
  'Snippetman Dark',
  'Nord',
  'Tokyo Night',
  'Tokyo Day',
] as const
export type ThemeName = (typeof themeNames)[number]

export interface Theme {
  id: ThemeName

  primary: Record<number, string>
  background: Record<number, string>

  code: Extension
}

export const themeImports: Record<ThemeName, () => Promise<Theme>> =
  Object.freeze({
    'Snippetman Dark': async () =>
      (await import('./snippetmanDark')).snippetmanDarkTheme,
    Nord: async () => (await import('./nord')).nordTheme,
    'Tokyo Night': async () => (await import('./tokyoNight')).tokyoNightTheme,
    'Tokyo Day': async () => (await import('./tokyoDay')).tokyoDayTheme,
  })
