import { snippets } from './appState'
import { snippetsStore } from './sqlite'

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
  console.log(lastSnippet, lastSnippet[0].getResultByName('id'))

  snippets.update((snippets) => [...snippets, snippetFromRow(lastSnippet)])

  return lastSnippet
}

export async function getSnippets(): Promise<Snippet[]> {
  return (await snippetsStore.execute('SELECT * FROM snippets')).map(
    snippetFromRow
  )
}
