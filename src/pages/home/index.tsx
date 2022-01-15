import React from "react";
import { CustomTitle } from "../../ui/texts";
import { Permisos } from "../../components/permisos";
import { permisosDeUbicacion } from "../../hooks/permisos";
import { useRecoilValue } from "recoil";
import css from "./index.css";
import { MascotasCercanas } from "../../components/mascotas-cercanas";

function Home() {
  const permisos = useRecoilValue(permisosDeUbicacion);

  return (
    <div className={css["home-container"]}>
      <CustomTitle>Mascotas perdidas cerca tuyo</CustomTitle>
      {permisos ? <MascotasCercanas /> : <Permisos />}
    </div>
  );
}

export { Home };
