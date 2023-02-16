import { atom } from "recoil";

export const imageToTextModalState = atom<boolean>({
  key: "imageToTextModalState",
  default: false,
});
