import { atom, useRecoilValue, useSetRecoilState } from "recoil";
import { recoilPersist } from "recoil-persist";
import { useEffect } from "react";

const { persistAtom } = recoilPersist();

export const permisosDeUbicacion = atom({
  key: "permisos",
  default: false,
  effects_UNSTABLE: [persistAtom],
});
