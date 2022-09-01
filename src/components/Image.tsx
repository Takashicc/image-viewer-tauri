import { listen } from "@tauri-apps/api/event";
import { convertFileSrc } from "@tauri-apps/api/tauri";
import React, { ImgHTMLAttributes, useEffect, useRef, useState } from "react";
import { FilePath } from "../FilePath";
import "../styles/Image.css";
import ImageToolBar from "./ImageToolBar";

interface ImageProps {
  currentFilePath: FilePath;
  setCurrentFilePath: React.Dispatch<React.SetStateAction<FilePath | null>>;
}

const Image: React.FC<ImageProps> = ({
  currentFilePath,
  setCurrentFilePath,
}) => {
  const [imageElement, setImageElement] = useState<JSX.Element | null>(null);
  const [imageElementClassName, setImageElementClassName] = useState<
    "img-width-max" | "img-height-max"
  >("img-height-max");
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    listen<{ width: number; height: number }>("tauri://resize", (event) => {
      if (imgRef.current === null) {
        return;
      }
      const { width, height } = event.payload;
      const imgWidth = imgRef.current.clientWidth;
      const imgHeight = imgRef.current.clientHeight;
      if (imgWidth < width) {
        setImageElementClassName("img-height-max");
      } else if (imgHeight < height) {
        setImageElementClassName("img-width-max");
      }
    });
  }, []);

  useEffect(() => {
    const fileSrc = convertFileSrc(currentFilePath.value);
    const element = (
      <img ref={imgRef} className={imageElementClassName} src={fileSrc} />
    );
    setImageElement(element);
  }, [currentFilePath, imageElementClassName]);

  return (
    <>
      <div id="background"></div>
      <div id="container">
        {imageElement || <></>}
        <div id="toolbar">
          <ImageToolBar
            currentFilePath={currentFilePath}
            onPrevious={() => {
              if (!currentFilePath.hasPrevious()) {
                // TODO alert?
                return;
              }
              setCurrentFilePath(currentFilePath.prev);
            }}
            onNext={() => {
              if (!currentFilePath.hasNext()) {
                // TODO alert?
                return;
              }
              setCurrentFilePath(currentFilePath.next);
            }}
          />
        </div>
      </div>
    </>
  );
};

export default Image;
