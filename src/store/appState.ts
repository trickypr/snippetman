import { writable } from 'svelte/store'
import { getSnippets, type Snippet } from './snippets'
import { clearPersist, getPersist, setPersist } from './xulstore'

export type Filter =
  | { type: 'language'; value: string }
  | { type: 'tag'; value: string }
  | { type: 'none' }

export const filter = writable<Filter>({ type: 'none' })
export const search = writable<string>('')
export const snippets = writable<Snippet[]>(await getSnippets())

export const openSnippetId = writable<number | null>(
  getPersist('appState', 'openSnippetId')
)
openSnippetId.subscribe((id) => {
  if (id === null) {
    clearPersist('appState', 'openSnippetId')
    return
  }

  setPersist('appState', 'openSnippetId', id.toString())
})

export const updateSnippets = async () => snippets.set(await getSnippets())
export const updateTags = async () => console.log('todo')
