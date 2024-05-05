import { appDataDir } from '@tauri-apps/api/path';
import { Kysely } from 'kysely';
import { TauriSqlDialect } from 'kysely-dialect-tauri';
import Database from 'tauri-plugin-sql-api';

import { DB } from './dbTypes.ts';

const dialect = new TauriSqlDialect({
    type: 'sqlite',
    // @ts-ignore
    database: async () => {
        const appDataDirPath = await appDataDir();

        const dbPath = import.meta.env.DEV ? import.meta.env.VITE_DATABASE_URL : `${appDataDirPath}/appProdDb.db`;
        console.info(`Using db located at ${dbPath}`);
        return Database.load(`sqlite:${dbPath}`);
    },
});

export const kysely = new Kysely<DB>({
    dialect,
});
