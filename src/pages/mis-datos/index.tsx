import React, { useEffect } from "react";
import { CustomTitle } from "../../ui/texts";
import css from "./index.css";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { loginState } from "../../hooks/login";
import { MisDatosForm } from "../../components/mis-datos-form";

export function MisDatos() {
  const navigate = useNavigate();
  const loginStateValue = useRecoilValue(loginState);

  useEffect(() => {
    if (!loginStateValue) {
      navigate("/login");
      return;
    }
  }, [loginStateValue]);

  return (
    <div className={css["mis-datos-container"]}>
      <CustomTitle>Mis Datos</CustomTitle>
      {loginStateValue ? <MisDatosForm /> : ""}
    </div>
  );
}
