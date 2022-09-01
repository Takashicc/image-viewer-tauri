#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

mod cmd;
mod menu;

fn main() {
    tauri::Builder::default()
        .menu(menu::create_menu())
        .on_menu_event(|event| match event.menu_item_id() {
            "open" => menu::open(event),
            "quit" => menu::quit(),
            _ => {
                panic!()
            }
        })
        .invoke_handler(tauri::generate_handler![cmd::read_entries])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
