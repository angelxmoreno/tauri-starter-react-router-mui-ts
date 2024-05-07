import { appDataDir } from '@tauri-apps/api/path';
import { Kysely } from 'kysely';
import { TauriSqlDialect } from 'kysely-dialect-tauri';
import Database from 'tauri-plugin-sql-api';

import { DB } from './dbTypes.ts';

const dialect = new TauriSqlDialect({
    type: 'sqlite',
    // @ts-ignore
    database: async () => {
        const dbName = 'tauriAppDB.db';
        const appDataDirPath = await appDataDir();

        const dbPath = `${appDataDirPath}/${dbName}`;
        console.info(`Using db located at ${dbPath}`);
        return Database.load(`sqlite:${dbName}`);
    },
});

export const kysely = new Kysely<DB>({
    dialect,
});
