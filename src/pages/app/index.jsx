import React from "react";

import Editor from "../../common/components/editor/index.jsx";

import Toolbar from "../../common/components/toolbar";
import Tree from "../../common/components/tree";
import Resizable from "../../common/components/resizable";
import Tabs from "../../common/components/tabs";

import "./app.scss";

function App() {
  return (
    <div className="app">
      <div className="top">
        <Toolbar />
      </div>
      <div className="bottom">
        <div className="left" id="resized">
          <Resizable />
          <Tree />
        </div>
        <div className="right">
          <Tabs />
          <div className="editor-wrapper">
            <Editor />
          </div>
        </div>
      </div>
    </div>
  );
}
export default App;
