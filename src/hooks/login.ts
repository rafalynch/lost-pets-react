import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export const loginState = atom({
  key: "loginState",
  default: false,
  effects_UNSTABLE: [persistAtom],
});

export const emailSubmitted = atom({
  key: "emailSubmited",
  default: undefined,
});

export const token = atom({
  key: "token",
  default: undefined,
  effects_UNSTABLE: [persistAtom],
});
