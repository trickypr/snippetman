import { writable } from 'svelte/store'

import { getTaggedSnippets, type Snippet } from './snippets'
import {
  clearPersist,
  getPersistInt,
  getPersistString,
  setPersist,
} from './xulstore'
import type { Tag } from './tags'
import { themeImports, type Theme } from '~/themes'
import { hexToRgbArray } from '~/utils/tailwind-shades'

export const settingsOpen = writable(false)

export const currentTheme = writable<Theme>(
  await themeImports[
    Services.prefs.getStringPref('snippetman.theme', 'Snippetman Dark')
  ]()
)

export const tagFilters = writable<Tag[]>([])
export const languageFilter = writable<string | null>(null)

export const snippets = writable<(Snippet & { tags: Tag[] })[]>(
  await getTaggedSnippets()
)

export const openSnippetId = writable<number | null>(
  getPersistInt('appState', 'openSnippetId')
)
openSnippetId.subscribe((id) => {
  if (id === null) return clearPersist('appState', 'openSnippetId')
  setPersist('appState', 'openSnippetId', id.toString())
})

export const updateSnippets = async () =>
  snippets.set(await getTaggedSnippets())
export const updateTags = async () => console.log('todo')

currentTheme.subscribe((theme) => {
  if (!theme) return

  for (const [key, value] of Object.entries(theme.background)) {
    document.documentElement.style.setProperty(
      `--slate-${key}`,
      hexToRgbArray(value).join(', ')
    )
  }

  for (const [key, value] of Object.entries(theme.primary)) {
    document.documentElement.style.setProperty(
      `--cyan-${key}`,
      hexToRgbArray(value).join(', ')
    )
  }

  Services.prefs.setStringPref('snippetman.theme', theme.id)
})
