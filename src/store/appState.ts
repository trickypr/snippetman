import { writable } from 'svelte/store'
// import { type Option, none } from 'fp-ts/Option'

export type Filter =
  | { type: 'language'; value: string }
  | { type: 'tag'; value: string }
  | { type: 'none' }

export const currentTag = writable<Filter>({ type: 'none' })

export const search = writable<string>('')
