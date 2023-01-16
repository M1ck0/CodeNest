import { atom } from "recoil";

const filesState = atom({
  key: "filesState",
  default: {
    activeFile: null,
    openedFiles: [],
  },
});

export { filesState };
