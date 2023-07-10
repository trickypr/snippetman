let lazy: any = {}
;(ChromeUtils as any).defineESModuleGetters(lazy, {
  Sqlite: 'resource://gre/modules/Sqlite.sys.mjs',
})

let locked: Record<string, boolean> = {}

export async function openDb(
  databaseName: string
): Promise<{ unlock: () => void; db: any }> {
  if (!(databaseName in locked)) locked[databaseName] = false
  while (locked[databaseName]) await new Promise((r) => setTimeout(r, 100))
  locked[databaseName] = true

  const db = await lazy.Sqlite.openConnection({ path: databaseName })

  return {
    unlock: () => {
      db.close()
      locked[databaseName] = false
    },
    db,
  }
}
