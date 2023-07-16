import { updateSnippets, updateTags } from './appState'
import { snippetsStore } from './sqlite'

export interface Tag {
  id: number
  name: string
}

function tagFromRow(row: mozIStorageRowType): Tag {
  const id = row.getResultByName('id')
  const name = row.getResultByName('name')

  return {
    id,
    name,
  }
}

export async function getSnippetTags(snippetId: number): Promise<Tag[]> {
  return (
    await snippetsStore.execute(
      'SELECT tags.id, tags.name FROM tags JOIN snippet_tags ON tags.id = snippet_tags.tag_id WHERE snippet_tags.snippet_id = ?',
      [snippetId]
    )
  ).map(tagFromRow)
}

export async function getTags(): Promise<Tag[]> {
  const tags = await snippetsStore.execute('SELECT * FROM tags')
  return tags.map(tagFromRow)
}

export async function removeTag(
  snippetId: number,
  tagId: number
): Promise<void> {
  await snippetsStore.execute(
    'DELETE FROM snippet_tags WHERE tag_id = ? AND snippet_id = ?',
    [tagId, snippetId]
  )
  await updateSnippets()
}

export async function addTag(snippetId: number, tagId: number): Promise<void> {
  await snippetsStore.execute(
    'INSERT INTO snippet_tags (snippet_id, tag_id) VALUES (?, ?)',
    [snippetId, tagId]
  )
  await updateSnippets()
}

export async function createTag(name: string): Promise<Tag> {
  await snippetsStore.execute('INSERT INTO tags (name) VALUES (?)', [name])

  const lastTag = await snippetsStore.execute(
    'SELECT * FROM tags ORDER BY id DESC LIMIT 1'
  )

  await updateTags()
  return tagFromRow(lastTag[0])
}
