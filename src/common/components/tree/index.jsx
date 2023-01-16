import React, { useState } from "react";

import "./tree.scss";

function TreeNode({ item, onFileClick = (path) => {} }) {
  const [open, setOpen] = useState(false);

  const children = item?.children?.sort((a, b) => {
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
      onFileClick(item?.path);
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
            <TreeNode
              item={child}
              key={child?.name}
              onFileClick={onFileClick}
            />
          ))}
        </ul>
      )}
    </li>
  );
}

const Tree = ({ items, onFileClick = (path) => {} }) => {
  const sortedItems = items?.sort((a, b) => {
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
        <TreeNode item={item} key={item?.name} onFileClick={onFileClick} />
      ))}
    </ul>
  );
};

export default Tree;
