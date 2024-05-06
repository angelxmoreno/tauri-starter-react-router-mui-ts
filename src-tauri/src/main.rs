// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}


mod migrations;

use migrations::get_migrations;
fn main() {
    let migrations = get_migrations();
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![greet])
        .plugin(
            tauri_plugin_sql::Builder::default()
                .add_migrations("sqlite:tauriAppDB.db", migrations)
                .build()
        )
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
