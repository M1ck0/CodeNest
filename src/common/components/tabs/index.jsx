import React from "react";

import { useRecoilState, useSetRecoilState } from "recoil";

import { filesState } from "../../state/files";
import { codeState } from "../../state/code";

import "./tabs.scss";

const Tabs = () => {
  const [files, setFiles] = useRecoilState(filesState);

  const setCode = useSetRecoilState(codeState);

  const { activeFile, openedFiles } = files;

  const closeFile = (file) => {
    const newFiles = openedFiles?.filter((item) => item !== file);

    if (activeFile === file) {
      if (!newFiles?.length) {
        setCode("");
      }
    }

    setFiles({ openedFiles: newFiles, activeFile: newFiles[0] });
  };

  const onTabClick = (file) => {
    setFiles((prevState) => ({
      openedFiles: prevState.openedFiles,
      activeFile: file,
    }));
  };

  return (
    <div className={`tabs ${openedFiles?.length ? "active" : ""}`}>
      {openedFiles?.map((item) => {
        const file = item?.split("/").pop();

        return (
          <div className={`tab ${item === activeFile ? "active" : ""}`}>
            <button onClick={() => onTabClick(item)}>{file}</button>
            <button className="close-tab" onClick={() => closeFile(item)}>
              <span>x</span>
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default Tabs;
