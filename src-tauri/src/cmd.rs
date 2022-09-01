use std::path::PathBuf;
use tauri::api::dir::{self, DiskEntry};

fn is_dir(children: &Option<Vec<DiskEntry>>) -> bool {
    children.is_some()
}

fn is_img(path: &PathBuf) -> bool {
    match infer::get_from_path(path) {
        Ok(v) => match v {
            Some(filetype) => match filetype.mime_type() {
                "image/jpeg" | "image/png" => true,
                _ => false,
            },
            None => false,
        },
        Err(e) => {
            println!("Cannot read file: {:?}", e);
            false
        }
    }
}

#[tauri::command]
pub fn read_entries(dir: &str) -> Result<Vec<PathBuf>, String> {
    let files = match dir::read_dir(dir, false) {
        Ok(v) => v,
        Err(e) => return Err(format!("Cannot read directory: {:?}", e)),
    };

    let mut paths = files
        .iter()
        .filter(|entry| !is_dir(&entry.children) && is_img(&entry.path))
        .map(|entry| entry.path.to_path_buf())
        .collect::<Vec<PathBuf>>();

    paths.sort(); // TODO sort with number(atoi)

    Ok(paths)
}
