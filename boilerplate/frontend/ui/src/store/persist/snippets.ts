import { closeDB, createDBConnection, saveSnippet } from ".";
import { Snippet } from "../snippets";

let lock = false;

async function getDBLock() {
  while (lock) {
    await new Promise((resolve) => setTimeout(resolve, 100));
  }
  lock = true;

  return () => {
    lock = false;
  };
}

export async function createDBSnippet(snippet: Snippet): Promise<void> {
  const unlock = await getDBLock();

  const connection = await createDBConnection();
  await saveSnippet(connection, snippet);
  await closeDB(connection);

  unlock();
}

export async function deleteDBSnippet(id: string): Promise<void> {
  const unlock = await getDBLock();

  const connection = await createDBConnection();
  await connection.execute("DELETE FROM snippets WHERE id = ?", [id]);
  await closeDB(connection);

  unlock();
}

export async function modifyDBSnippet(snippet: Snippet): Promise<void> {
  return await createDBSnippet(snippet);
}
