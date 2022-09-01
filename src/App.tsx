import { useEffect, useState } from "react";
import Image from "./components/Image";
import { listen } from "@tauri-apps/api/event";
import { invoke } from "@tauri-apps/api";
import { dirname } from "@tauri-apps/api/path";
import { List, Item } from "linked-list";
import { FilePath, FilePaths } from "./FilePath";

function App() {
  const [currentFilePath, setCurrentFilePath] = useState<FilePath | null>(null);
  const [filepaths, setFilePaths] = useState<List<FilePath> | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  interface Payload {
    message: string | null;
  }

  /**
   * Get directory name from the given path
   * and list all the images in the directory.
   *
   * @param path filepath to the image
   */
  const read_entries = (path: string) => {
    (async () => {
      const dir = await dirname(path);

      try {
        const entries = await invoke<string[]>("read_entries", { dir });
        setErrorMessage(null);
        const filepath_items: FilePath[] = [];
        for (let i = 0; i < entries.length; i++) {
          const entry = entries[i];
          const filepath_item = new FilePath(entry);
          filepath_items.push(filepath_item);
          if (entry === path) {
            setCurrentFilePath(filepath_item);
          }
        }
        const filepaths = FilePaths.from(filepath_items);
        setFilePaths(filepaths);
      } catch (err) {
        setErrorMessage(err as string);
      }
    })();
  };

  /**
   * File drop event
   */
  useEffect(() => {
    listen<string[]>("tauri://file-drop", (event) => {
      const poppedPath = event.payload.pop();
      if (poppedPath === undefined) {
        return;
      }
      read_entries(poppedPath);
    });
  }, []);

  /**
   * Menu file open event
   */
  useEffect(() => {
    listen<Payload>("open", (event) => {
      if (event.payload.message === null) {
        return;
      }
      const path = event.payload.message;
      read_entries(path);
    });
  }, []);

  return (
    <>
      {errorMessage}
      {currentFilePath && (
        <Image
          currentFilePath={currentFilePath}
          setCurrentFilePath={setCurrentFilePath}
        />
      )}
    </>
  );
}

export default App;
