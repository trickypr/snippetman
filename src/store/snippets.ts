import { get } from 'svelte/store'

import { currentTag, search, type Filter } from './appState'
import snippetSQL from './sql/00_create_snippet_table.sql'
import { openDb } from './sqlite'

export const languages = ['json', 'js', 'ts', 'html', 'cpp', 'md'] as const
export type Languages = (typeof languages)[number]

export interface Sippet {
  id: string

  title: string
  description?: string
  tags: string[]

  language: Languages
  code: string
}

function sqlQueryFromFilter(filter: Filter): [string, string[]] {
  switch (filter.type) {
    case 'language':
      return [' AND language = ?', [filter.value]]
    case 'tag':
      return [' AND tags LIKE ?', [filter.value]]
    case 'none':
      return ['', []]
  }
}

function sqlSearchFromSearch(search: string): [string, string[]] {
  return [
    '(title LIKE ? OR description LIKE ? OR code LIKE ? OR tags LIKE ?)',
    [search, search, search, search],
  ]
}

async function getSnippetDb() {
  const { db, unlock } = await openDb('snippets')
  await db.exec(snippetSQL)
  return { db, unlock }
}

async function getStateSnippets() {
  const { db, unlock } = await getSnippetDb()

  const [searchQuery, searchOptions] = sqlSearchFromSearch(get(search))
  const [tagQuery, tagOptions] = sqlQueryFromFilter(get(currentTag))
  const snippets = await db.query(
    `SELECT * FROM snippets WHERE ${searchQuery}${tagQuery}`,
    [...searchOptions, ...tagOptions]
  )
  unlock()

  console.log(snippets)
  return snippets
}

async function getTags() {
  const { db, unlock } = await getSnippetDb()

  const snippets = await db.query(`SELECT DISTINCT tags FROM snippets`)
}
