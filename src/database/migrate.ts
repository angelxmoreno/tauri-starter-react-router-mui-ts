import { Database } from 'bun:sqlite';
import { FileMigrationProvider, Kysely, Migrator } from 'kysely';
import { BunSqliteDialect } from 'kysely-bun-sqlite';
import { run } from 'kysely-migration-cli';
import fs from 'node:fs/promises';
import path from 'node:path';

import { DB } from './dbTypes.ts';

const migrationFolder = path.join(__dirname, './migrations');
const dbPath = import.meta.env.DATABASE_URL;

const dialect = new BunSqliteDialect({
    database: new Database(dbPath),
});

const db = new Kysely<DB>({
    dialect,
});

const migrator = new Migrator({
    db,
    provider: new FileMigrationProvider({
        fs,
        path,
        migrationFolder,
    }),
});

run(db, migrator, migrationFolder);
