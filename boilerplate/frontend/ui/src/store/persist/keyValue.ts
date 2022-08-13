const { XPCOMUtils } = ChromeUtils.importESModule(
  "resource://gre/modules/XPCOMUtils.sys.mjs"
);

const lazy = {};

XPCOMUtils.defineLazyModuleGetters(lazy, {
  Sqlite: "resource://gre/modules/Sqlite.jsm",
});

let locked = false;

async function getDBLock() {
  while (locked) {
    await new Promise((resolve) => setTimeout(resolve, 100));
  }
  locked = true;

  return () => (locked = false);
}

export async function createDBConnection(): Promise<[() => boolean, any]> {
  try {
    const unlock = await getDBLock();
    let conn = await lazy.Sqlite.openConnection({ path: "keyValue.sqlite" });

    if (!(await conn.tableExists("keyValue"))) {
      await conn.execute(
        "CREATE TABLE keyValue (key TEXT PRIMARY KEY, value TEXT)"
      );
    }

    return [unlock, conn];
  } catch (e) {
    console.error(e);
    return null;
  }
}

export async function getKeyValue(conn, key) {
  if (!conn) {
    return null;
  }

  let value = null;

  const result = await conn.executeCached(
    "SELECT * FROM keyValue WHERE key = ?",
    [key],
    (row, cancel) => {
      value = row.getResultByName("value");
    }
  );
  return value;
}

export async function saveKeyValue(conn, key, value) {
  if (!conn) {
    return;
  }

  const result = await conn.executeCached(
    "INSERT OR REPLACE INTO keyValue (key, value) VALUES (?, ?)",
    [key, value]
  );
}

export async function deleteKeyValue(conn, key) {
  if (!conn) {
    return;
  }

  const result = await conn.executeCached(
    "DELETE FROM keyValue WHERE key = ?",
    [key]
  );
}

export const kvStore = {
  getItem: async (name: string) => {
    const [unlock, connection] = await createDBConnection();
    const value = await getKeyValue(connection, name);
    connection.close();
    unlock();

    return value;
  },
  setItem: async (name: string, value: string) => {
    const [unlock, connection] = await createDBConnection();
    await saveKeyValue(connection, name, value);
    await connection.close();
    unlock();
  },
  removeItem: async (name: string) => {
    const [unlock, connection] = await createDBConnection();
    await deleteKeyValue(connection, name);
    await connection.close();
    unlock();
  },
};
