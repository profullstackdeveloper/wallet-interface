// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
use magic_crypt::{new_magic_crypt, MagicCryptTrait};

#[tauri::command]
fn encrypt_mnemonic(mnemonic: String, password: String) -> String {

    let mc = new_magic_crypt!(password, 256);
    let base64 = mc.encrypt_str_to_base64(mnemonic);

    return base64
}

#[tauri::command]
fn decrypt_mnemonic(encrypted: String, password: String) -> String {
    let mc = new_magic_crypt!(password, 256);
    let decryped = mc.decrypt_base64_to_string(encrypted).unwrap();

    return decryped
}

fn main() {
    tauri::Builder::default()
        .plugin(tauri_plugin_store::Builder::default().build())
        .invoke_handler(tauri::generate_handler![encrypt_mnemonic, decrypt_mnemonic])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
