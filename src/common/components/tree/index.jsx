import React, { useState } from "react";

import { useRecoilValue, useSetRecoilState } from "recoil";

import { filesState } from "../../state/files";
import { directoryState } from "../../state/directory";

import "./tree.scss";

function TreeNode({ item }) {
  const [open, setOpen] = useState(false);

  const setFiles = useSetRecoilState(filesState);

  const children = [...(item?.children || [])]?.sort((a, b) => {
    if (a.name.startsWith(".") && !b.name.startsWith(".")) {
      if (!a.children && b.children) return 1;
      return -1;
    }
    if (!a.name.startsWith(".") && b.name.startsWith(".")) {
      if (a.children && !b.children) return -1;
      return 1;
    }
    if (a.children && !b.children) {
      return -1;
    }
    if (!a.children && b.children) {
      return 1;
    }
    if (a.name < b.name) {
      return -1;
    }
    if (a.name > b.name) {
      return 1;
    }
    return 0;
  });

  const onClick = () => {
    if (item?.children) {
      setOpen(!open);
    } else {
      setFiles((prevState) => ({
        openedFiles: prevState.openedFiles,
        activeFile: item?.path,
      }));
    }
  };

  return (
    <li>
      <span onClick={onClick} className={item?.children ? "directory" : "file"}>
        {item?.name}
      </span>
      {open && children && (
        <ul style={{ marginLeft: "-15px" }}>
          {children?.map((child) => (
            <TreeNode item={child} key={child?.path} />
          ))}
        </ul>
      )}
    </li>
  );
}

const Tree = () => {
  const items = useRecoilValue(directoryState);

  const sortedItems = [...(items || [])]?.sort((a, b) => {
    if (a.name.startsWith(".") && !b.name.startsWith(".")) {
      if (!a.children && b.children) return 1;
      return -1;
    }
    if (!a.name.startsWith(".") && b.name.startsWith(".")) {
      if (a.children && !b.children) return -1;
      return 1;
    }
    if (a.children && !b.children) {
      return -1;
    }
    if (!a.children && b.children) {
      return 1;
    }
    if (a.name < b.name) {
      return -1;
    }
    if (a.name > b.name) {
      return 1;
    }
    return 0;
  });

  return (
    <ul className="tree">
      {sortedItems?.map((item) => (
        <TreeNode item={item} key={item?.path} />
      ))}
    </ul>
  );
};

export default Tree;
