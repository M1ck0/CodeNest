import React, { useEffect } from "react";

import { useRecoilState, useSetRecoilState } from "recoil";
import { readTextFile, writeFile, readDir } from "@tauri-apps/api/fs";
import { open, save } from "@tauri-apps/api/dialog";

import { filesState } from "../../state/files";
import { directoryState } from "../../state/directory";
import { codeState } from "../../state/code";

import "./toolbar.scss";

// TODO: Functions for opening directories/files have some delay when clicking on item. Probably problem with open() from @tauri-apps. Investigate this

const Toolbar = () => {
  const [files, setFiles] = useRecoilState(filesState);
  const [code, setCode] = useRecoilState(codeState);

  const setDirectory = useSetRecoilState(directoryState);

  const { activeFile, openedFiles } = files;

  const onSave = async () => {
    if (activeFile) {
      await writeFile(activeFile, code);
    } else {
      const file = await save();
      await writeFile(file, code);

      setFiles((prevState) => ({
        openedFiles: prevState.openedFiles,
        activeFile: file,
      }));
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
      setFiles((prevState) => ({
        openedFiles: prevState.openedFiles,
        activeFile: activeFile,
      }));
    } else {
      setFiles((prevState) => ({
        openedFiles: [...prevState.openedFiles, activeFile],
        activeFile: prevState.activeFile,
      }));
    }

    setCode(contents);
  };

  const onOpenProject = async () => {
    const selected = await open({
      directory: true,
      multiple: false,
    });

    const directory = await readDir(selected, { recursive: true });

    setFiles({
      openedFiles: [],
      activeFile: null,
    });

    setDirectory(directory);
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
