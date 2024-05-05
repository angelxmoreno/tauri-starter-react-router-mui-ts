import type { ColumnType } from 'kysely';

export type Generated<T> =
    T extends ColumnType<infer S, infer I, infer U> ? ColumnType<S, I | undefined, U> : ColumnType<T, T | undefined, T>;

export interface Greetings {
    created_at: Generated<string>;
    id: number | null;
    name: string;
}

export interface DB {
    greetings: Greetings;
}
