use std::path::PathBuf;

use serde::Serialize;
use tauri::api::dialog;
use tauri::{CustomMenuItem, Menu, MenuItem, Submenu, WindowMenuEvent};

pub fn create_menu() -> Menu {
    let file_menu = Submenu::new(
        "File",
        Menu::new()
            .add_item(CustomMenuItem::new("open", "Open"))
            .add_native_item(MenuItem::Separator)
            .add_item(CustomMenuItem::new("quit", "Quit")),
    );
    let menu = Menu::new().add_submenu(file_menu);

    menu
}

#[derive(Clone, Serialize)]
struct Payload {
    message: Option<PathBuf>,
}

pub fn open(event: WindowMenuEvent) {
    dialog::FileDialogBuilder::new()
        .add_filter("Image File", &["jpg", "png"])
        .pick_file(move |f| {
            event
                .window()
                .emit("open", Payload { message: f })
                .expect("Error while open event");
        })
}

pub fn quit() {
    std::process::exit(0);
}
