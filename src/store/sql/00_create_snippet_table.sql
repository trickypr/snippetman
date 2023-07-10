CREATE TABLE IF NOT EXISTS snippets (
    id INTEGER PRIMARY KEY,

    title TEXT NOT NULL,
    description TEXT,
    tags TEXT NOT NULL,

    code TEXT NOT NULL,
    language TEXT NOT NULL,
);
