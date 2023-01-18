import React, { useState } from "react";

import { useRecoilValue, useSetRecoilState } from "recoil";

import Loader from "../loader/index.jsx";

import { filesState } from "../../state/files";
import { directoryState } from "../../state/directory";

import "./tree.scss";

function TreeNode({ item }) {
  const [open, setOpen] = useState(false);

  const setFiles = useSetRecoilState(filesState);

  const onClick = async () => {
    if (item?.children) {
      setOpen((prevState) => !prevState);
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
      {open && item?.children && (
        <ul style={{ marginLeft: "-15px" }}>
          {item?.children?.map((child) => (
            <TreeNode item={child} key={child?.path} />
          ))}
        </ul>
      )}
    </li>
  );
}

const Tree = () => {
  const items = useRecoilValue(directoryState);

  return !items?.length ? (
    <Loader />
  ) : (
    <ul className="tree">
      {items?.map((item) => (
        <TreeNode item={item} key={item?.path} />
      ))}
    </ul>
  );
};

export default Tree;
