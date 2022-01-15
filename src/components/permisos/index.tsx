import React from "react";
import { useSetRecoilState } from "recoil";
import { permisosDeUbicacion } from "../../hooks/permisos";
import { MainButton } from "../../ui/buttons";
import { CustomLongText } from "../../ui/texts";
import css from "./index.css";

export function Permisos() {
  const setPermisosDeUbicacion = useSetRecoilState(permisosDeUbicacion);

  function permitirUbicacion() {
    setPermisosDeUbicacion(true);
    navigator.geolocation.getCurrentPosition(() => {});
  }

  return (
    <div className={css["permisos-container"]}>
      <CustomLongText>
        Para ver las mascotas reportadas cerca tuyo necesitamos permiso para
        conocer tu ubicación.
      </CustomLongText>
      <MainButton color="pink" onClick={permitirUbicacion}>
        Dar mi ubicacion
      </MainButton>
    </div>
  );
}
