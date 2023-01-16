import React, { useState } from "react";

import "./resizable.scss";

const Resizable = ({ children }) => {
  const [initialPos, setInitialPos] = useState(null);
  const [initialSize, setInitialSize] = useState(null);

  const initial = (e) => {
    let resizable = document.getElementById("resized");

    setInitialPos(e.clientX);
    setInitialSize(resizable.offsetWidth);
  };

  const resize = (e) => {
    let resizable = document.getElementById("resized");

    resizable.style.width = `${
      parseInt(initialSize) + parseInt(e.clientX - initialPos - 20)
    }px`;

    setTimeout(function () {
      e.target.style.visibility = "hidden";
    }, 1);
  };

  const onDragEnd = (e) => {
    e.target.style.visibility = "visible";
  };

  return (
    <div
      id="resizable"
      draggable="true"
      onDragStart={initial}
      onDrag={resize}
      onDragEnd={onDragEnd}
    >
      {children}
    </div>
  );
};

export default Resizable;
