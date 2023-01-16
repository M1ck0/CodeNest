import React, { useEffect } from "react";

import { readTextFile, writeFile, readDir } from "@tauri-apps/api/fs";
import { open, save } from "@tauri-apps/api/dialog";

import "./toolbar.scss";

const Toolbar = ({
  code,
  setCode,
  activeFile,
  setActiveFile,
  setActiveDir,
  openedFiles,
  setOpenedFiles,
}) => {
  const onSave = async () => {
    if (activeFile) {
      await writeFile(activeFile, code);

      setActiveFile(activeFile);
    } else {
      const file = await save();
      await writeFile(file, code);

      setActiveFile(file);
    }
  };

  const onOpenFile = async () => {
    const selected = await open({
      directory: false,
      multiple: false,
    });

    const contents = await readTextFile(selected);

    setCode(contents);
  };

  // TODO: It can't open files that start with .
  const openProjectFile = async () => {
    const contents = await readTextFile(activeFile);

    if (openedFiles?.includes(activeFile)) {
      setActiveFile(activeFile);
    } else {
      setOpenedFiles((prevState) => [...prevState, activeFile]);
    }

    setCode(contents);
  };

  const onOpenProject = async () => {
    const selected = await open({
      directory: true,
      multiple: false,
    });

    const directory = await readDir(selected, { recursive: true });

    setOpenedFiles([]);
    setActiveDir(directory);
  };

  useEffect(() => {
    if (typeof activeFile === "string") {
      openProjectFile();
    }
  }, [activeFile]);

  useEffect(() => {
    document.onkeydown = function (e) {
      if ((e.ctrlKey || e.metaKey) && e.key === "s") {
        e.stopPropagation();
        e.preventDefault();
        onSave();
      }
    };
  }, [code]);

  return (
    <div className="toolbar">
      <div className="menu">
        <div className="key">File</div>
        <div className="value">
          <button onClick={onSave}>Save</button>
          <button onClick={onOpenFile}>Open File</button>
          <button onClick={onOpenProject}>Open Project</button>
        </div>
      </div>
    </div>
  );
};

export default Toolbar;
