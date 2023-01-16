import React, { useCallback, useEffect, useState } from "react";

import { basicSetup } from "codemirror";
import { indentWithTab } from "@codemirror/commands";
import CodeMirror from "@uiw/react-codemirror";
import { keymap } from "@codemirror/view";
import { indentationMarkers } from "@replit/codemirror-indentation-markers";
import {
  expandAbbreviation,
  abbreviationTracker,
} from "@emmetio/codemirror6-plugin";
import { resourceDir } from "@tauri-apps/api/path";

import { okaidia } from "@uiw/codemirror-theme-okaidia";

import { html } from "@codemirror/lang-html";
import { javascript } from "@codemirror/lang-javascript";
import { css } from "@codemirror/lang-css";
import { rust } from "@codemirror/lang-rust";
import { json } from "@codemirror/lang-json";
import { markdown } from "@codemirror/lang-markdown";

import Toolbar from "../../common/components/toolbar";
import Tree from "../../common/components/tree";
import Resizable from "../../common/components/resizable";
import Tabs from "../../common/components/tabs";

import "./app.scss";

const getPlugins = (activeFile) => {
  const extension = activeFile?.split(".").pop();

  switch (extension) {
    case "html":
      return html();
    case "js":
      return javascript();
    case "jsx":
      return javascript({ jsx: true });
    case "css":
      return css();
    case "scss":
      return css();
    case "rs":
      return rust();
    case "json":
      return json();
    case "markdown":
      return markdown();
    default:
      return html();
  }
};

function App() {
  const [code, setCode] = useState("");
  const [activeFile, setActiveFile] = useState(null);
  const [activeDir, setActiveDir] = useState(null);
  const [openedFiles, setOpenedFiles] = useState([]);

  const onEditorChange = useCallback((value) => {
    setCode(value);
  }, []);

  const onFileClick = useCallback((path) => {
    setActiveFile(path);
  }, []);

  const getPath = async () => {
    console.log("here");
    const resourceDirPath = await resourceDir();

    console.log(resourceDirPath);
  };

  useEffect(() => {
    getPath();
  }, []);

  return (
    <div className="app">
      <div className="top">
        <Toolbar
          code={code}
          setCode={setCode}
          activeFile={activeFile}
          setActiveFile={setActiveFile}
          setActiveDir={setActiveDir}
          openedFiles={openedFiles}
          setOpenedFiles={setOpenedFiles}
        />
      </div>
      <div className="bottom">
        <div className="left" id="resized">
          <Resizable />
          <Tree items={activeDir} onFileClick={onFileClick} />
        </div>
        <div className="right">
          <Tabs
            openedFiles={openedFiles}
            activeFile={activeFile}
            setActiveFile={setActiveFile}
            setOpenedFiles={setOpenedFiles}
            setCode={setCode}
            onTabClick={onFileClick}
          />
          <div className="editor-wrapper">
            <CodeMirror
              value={code}
              width="100vw"
              extensions={[
                basicSetup,
                getPlugins(activeFile),
                indentationMarkers(),
                abbreviationTracker(),
                keymap.of([
                  indentWithTab,
                  {
                    key: "Cmd-e",
                    run: expandAbbreviation,
                  },
                ]),
              ]}
              onChange={onEditorChange}
              theme={okaidia}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
export default App;
