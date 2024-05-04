import { appDataDir } from '@tauri-apps/api/path';
import Database from '@tauri-apps/plugin-sql';
import { Kysely } from 'kysely';
import { TauriSqlDialect } from 'kysely-dialect-tauri';

import { DB } from './dbTypes.ts';

const dialect = new TauriSqlDialect({
    type: 'sqlite',
    // @ts-ignore
    database: async prefix => {
        const appDataDirPath = await appDataDir();

        const dbPath = import.meta.env.DEV ? import.meta.env.VITE_DATABASE_URL : `${appDataDirPath}/appProdDb.sqlite3`;
        console.info(`Using db located at ${dbPath}`);
        return Database.load(`sqlite:${dbPath}`);
    },
});

export const kysely = new Kysely<DB>({
    dialect,
});
