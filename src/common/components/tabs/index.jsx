import React from "react";

import "./tabs.scss";

const Tabs = ({
  openedFiles,
  activeFile,
  setActiveFile,
  setCode,
  setOpenedFiles,
  onTabClick,
}) => {
  const closeFile = (file) => {
    const newFiles = openedFiles?.filter((item) => item !== file);

    if (activeFile === file) {
      if (!newFiles?.length) {
        setCode("");
      }
    }

    setActiveFile(newFiles[0]);
    setOpenedFiles(newFiles);
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
