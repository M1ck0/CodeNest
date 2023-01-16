import { atom } from "recoil";

const codeState = atom({
  key: "codeState",
  default: "",
});

export { codeState };
