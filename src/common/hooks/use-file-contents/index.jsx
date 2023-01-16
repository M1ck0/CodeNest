import React, { useEffect, useState } from "react";
import { open } from "@tauri-apps/api/dialog";
import { readTextFile } from "@tauri-apps/api/fs";

const useFileContents = (path) => {
  const [content, setContent] = useState("");
  const getFile = async () => {
    const fileContents = await readTextFile(path);

    setContent(fileContents);
  };

  useEffect(() => {
    if (path) {
      getFile();
    }
  }, [path]);

  return content;
};
