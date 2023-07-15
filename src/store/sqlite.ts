let lazy: any = {}
;(ChromeUtils as any).defineESModuleGetters(lazy, {
  Sqlite: 'resource://gre/modules/Sqlite.sys.mjs',
})

export const snippetsStore = await lazy.Sqlite.openConnection({
  path: 'snippets.sqlite',
})

await snippetsStore.executeTransaction(async () => {
  const createTable = await import('./sql/00_create_snippet_table.sql')
  for (const statement of createTable.default.split(';')) {
    if (statement.trim() === '') continue
    await snippetsStore.execute(statement)
  }
})
