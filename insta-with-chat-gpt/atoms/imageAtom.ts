import { atom } from "recoil";

export const imageState = atom<string | null>({
  key: "imageState",
  default: null,
});
