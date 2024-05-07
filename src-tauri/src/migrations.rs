use tauri_plugin_sql::{Migration, MigrationKind};

pub fn get_migrations() -> Vec<Migration> {
    vec![
        Migration {
            version: 1,
            description: "create_initial_tables",
            sql: "CREATE TABLE greetings (id INTEGER PRIMARY KEY, name TEXT NOT NULL, created_at TEXT DEFAULT (strftime('%Y-%m-%d %H:%M:%S', 'now')) NOT NULL);",
            kind: MigrationKind::Up,
        }
        // Add more migrations here if needed
    ]
}
