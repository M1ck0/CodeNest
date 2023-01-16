import { atom } from "recoil";

const directoryState = atom({
  key: "directoryState",
  default: [],
});

export { directoryState };
