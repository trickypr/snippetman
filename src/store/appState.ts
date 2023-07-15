import { readable, writable } from 'svelte/store'
import { getSnippets, type Snippet } from './snippets'

export type Filter =
  | { type: 'language'; value: string }
  | { type: 'tag'; value: string }
  | { type: 'none' }

export const filter = writable<Filter>({ type: 'none' })

export const search = writable<string>('')

export const snippets = writable<Snippet[]>(await getSnippets())

export const openSnippetId = writable<number | null>(null)
