const { XPCOMUtils } = ChromeUtils.importESModule(
  "resource://gre/modules/XPCOMUtils.sys.mjs"
);

const lazy = {};

XPCOMUtils.defineLazyModuleGetters(lazy, {
  Sqlite: "resource://gre/modules/Sqlite.jsm",
});

export async function createDBConnection() {
  try {
    let conn = await lazy.Sqlite.openConnection({ path: "snippets.sqlite" });

    if (!(await conn.tableExists("snippets"))) {
      await conn.execute(
        "CREATE TABLE snippets (id TEXT PRIMARY KEY, title TEXT, code TEXT, lang TEXT, tags TEXT)"
      );
    }

    return conn;
  } catch (e) {
    console.error(e);
    return null;
  }
}

export async function getSnippets(conn) {
  if (!conn) {
    return [];
  }

  let snippets = [];

  const result = await conn.executeCached(
    "SELECT * FROM snippets",
    null,
    (row, cancel) => {
      const tags = row.getResultByName("tags");
      snippets.push({
        id: row.getResultByName("id"),
        title: row.getResultByName("title"),
        code: row.getResultByName("code"),
        lang: row.getResultByName("lang"),
        tags: tags != "" ? tags.split(",") : [],
      });
    }
  );

  return snippets;
}

export async function saveSnippet(
  conn: { execute: (arg0: string, arg1: any[]) => any },
  snippet: { id?: any; title?: any; code?: any; lang?: any; tags?: string[] }
) {
  if (!conn) {
    return;
  }

  let { id, title, code, lang, tags } = snippet;
  await conn.execute(
    "INSERT OR REPLACE INTO snippets (id, title, code, lang, tags) VALUES (?, ?, ?, ?, ?)",
    [id, title, code, lang, tags.join(",")]
  );
}

export async function closeDB(conn) {
  if (!conn) {
    return;
  }

  await conn.close();
}
