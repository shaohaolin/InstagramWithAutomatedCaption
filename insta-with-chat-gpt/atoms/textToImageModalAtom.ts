import { atom } from "recoil";

export const textToImageModalState = atom<boolean>({
  key: "textToImageModalState",
  default: false,
});
