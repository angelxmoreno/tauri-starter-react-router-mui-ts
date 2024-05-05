import { type Kysely, sql } from 'kysely';

export async function up(db: Kysely<any>): Promise<void> {
    await db.schema
        .createTable('greetings')
        .addColumn('id', 'integer', col => col.primaryKey())
        .addColumn('name', 'text', col => col.notNull())
        .addColumn('created_at', 'text', col => col.defaultTo(sql`CURRENT_TIMESTAMP`).notNull())
        .execute();
}

export async function down(db: Kysely<any>): Promise<void> {
    await db.schema.dropTable('greetings').execute();
}
