import React, { useCallback } from "react";

import { useRecoilState, useRecoilValue } from "recoil";
import { basicSetup } from "codemirror";
import { indentationMarkers } from "@replit/codemirror-indentation-markers";
import {
  abbreviationTracker,
  expandAbbreviation,
} from "@emmetio/codemirror6-plugin";

import { keymap } from "@codemirror/view";
import { indentWithTab } from "@codemirror/commands";

import { okaidia } from "@uiw/codemirror-theme-okaidia";
import CodeMirror from "@uiw/react-codemirror";

import { html } from "@codemirror/lang-html";
import { javascript } from "@codemirror/lang-javascript";
import { css } from "@codemirror/lang-css";
import { rust } from "@codemirror/lang-rust";
import { json } from "@codemirror/lang-json";
import { markdown } from "@codemirror/lang-markdown";

import { codeState } from "../../state/code";
import { filesState } from "../../state/files";

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

const Editor = () => {
  const [code, setCode] = useRecoilState(codeState);

  const { activeFile } = useRecoilValue(filesState);

  const onEditorChange = useCallback((value) => {
    setCode(value);
  }, []);

  return (
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
  );
};

export default Editor;
