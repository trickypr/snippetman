import { writable } from 'svelte/store'
import { getTaggedSnippets, type Snippet } from './snippets'
import { clearPersist, getPersist, setPersist } from './xulstore'
import type { Tag } from './tags'

export type Filter =
  | { type: 'language'; value: string }
  | { type: 'tag'; value: string }
  | { type: 'none' }

export const tagFilters = writable<Tag[]>([])
export const languageFilter = writable<string | null>(null)

export const filter = writable<Filter>({ type: 'none' })
export const search = writable<string>('')
export const snippets = writable<(Snippet & { tags: Tag[] })[]>(
  await getTaggedSnippets()
)

export const openSnippetId = writable<number | null>(
  getPersist('appState', 'openSnippetId')
)
openSnippetId.subscribe((id) => {
  if (id === null) return clearPersist('appState', 'openSnippetId')
  setPersist('appState', 'openSnippetId', id.toString())
})

export const updateSnippets = async () =>
  snippets.set(await getTaggedSnippets())
export const updateTags = async () => console.log('todo')
