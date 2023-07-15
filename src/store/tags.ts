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

export async function getTags() {
  const tags = await snippetsStore.execute('SELECT * FROM tags')
  console.log(tags)
  return tags
}
