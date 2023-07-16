import type { Language } from '~/components/editor/languages'
import { snippets } from './appState'
import { snippetsStore } from './sqlite'
import { getSnippetTags, type Tag } from './tags'
import { get } from 'svelte/store'

export interface Snippet {
  id: number

  title: string
  description?: string
  code: string
  language: Language
}

function snippetFromRow(row: mozIStorageRowType): Snippet {
  const id = row.getResultByName('id')
  const title = row.getResultByName('title')
  const description = row.getResultByName('description')
  const code = row.getResultByName('code')
  const language = row.getResultByName('language')

  return {
    id,
    title,
    description,
    code,
    language,
  }
}

export async function createSnippet() {
  await snippetsStore.execute(
    'INSERT INTO snippets (title, language, code) VALUES (?, ?, ?)',
    ['Untitled', 'js', 'console.log("Hello, world!")']
  )

  const lastSnippet = await snippetsStore.execute(
    'SELECT * FROM snippets ORDER BY id DESC LIMIT 1'
  )

  snippets.set([
    ...get(snippets),
    await getTagSnippet(snippetFromRow(lastSnippet[0])),
  ])
  return snippetFromRow(lastSnippet[0])
}

export async function getSnippets(): Promise<Snippet[]> {
  return (await snippetsStore.execute('SELECT * FROM snippets')).map(
    snippetFromRow
  )
}

export type TaggedSnippet = Snippet & { tags: Tag[] }
export const getTagSnippet = async (
  snippet: Snippet
): Promise<TaggedSnippet> => ({
  ...snippet,
  tags: await getSnippetTags(snippet.id),
})

export const getTaggedSnippets = async (): Promise<TaggedSnippet[]> =>
  await Promise.all((await getSnippets()).map(getTagSnippet))

export async function getSnippet(
  id: number
): Promise<Snippet & { tags: Tag[] }> {
  const result = await snippetsStore.execute(
    'SELECT * FROM snippets WHERE id = ?',
    [id]
  )
  const tags = await getSnippetTags(id)

  return { ...snippetFromRow(result[0]), tags }
}

export async function updateSnippet(
  snippet: TaggedSnippet
): Promise<TaggedSnippet> {
  await snippetsStore.execute(
    'UPDATE snippets SET title = ?, description = ?, code = ?, language = ? WHERE id = ?',
    [
      snippet.title,
      snippet.description,
      snippet.code,
      snippet.language,
      snippet.id,
    ]
  )

  snippets.update((snippets) =>
    snippets.map((s) => (s.id === snippet.id ? snippet : s))
  )

  return snippet
}
