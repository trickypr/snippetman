import { snippets } from './appState'
import { snippetsStore } from './sqlite'
import { getSnippetTags, type Tag } from './tags'

export const languages = ['json', 'js', 'ts', 'html', 'cpp', 'md'] as const
export type Languages = (typeof languages)[number]

export interface Snippet {
  id: number

  title: string
  description?: string
  code: string
  language: Languages
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

export function longLanguage(language: Languages): string {
  switch (language) {
    case 'json':
      return 'JSON'
    case 'js':
      return 'JavaScript'
    case 'ts':
      return 'TypeScript'
    case 'html':
      return 'HTML'
    case 'cpp':
      return 'C++'
    case 'md':
      return 'Markdown'
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

  snippets.update((snippets) => [...snippets, snippetFromRow(lastSnippet[0])])
  return snippetFromRow(lastSnippet[0])
}

export async function getSnippets(): Promise<Snippet[]> {
  return (await snippetsStore.execute('SELECT * FROM snippets')).map(
    snippetFromRow
  )
}

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

export async function updateSnippet<T extends Snippet>(snippet: T): Promise<T> {
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
