import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { MisMascotasCards } from "../../components/mis-mascotas-cards";
import { loginState } from "../../hooks/login";
import { CustomTitle } from "../../ui/texts";
import css from "./index.css";

export function MisMascotas() {
  const navigate = useNavigate();
  const loginStateValue = useRecoilValue(loginState);

  useEffect(() => {
    if (!loginStateValue) {
      navigate("/login");
    }
  }, [loginStateValue]);

  if (!loginStateValue) {
    return <div></div>;
  }

  return (
    <div className={css.container}>
      <CustomTitle>Mis mascotas reportadas</CustomTitle>
      <MisMascotasCards></MisMascotasCards>
    </div>
  );
}
