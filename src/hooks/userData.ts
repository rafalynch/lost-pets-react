import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export const userData = atom({
  key: "userData",
  default: undefined,
  effects_UNSTABLE: [persistAtom],
});
