import React, { useEffect } from "react";
import { CustomTitle } from "../../ui/texts";
import css from "./index.css";
import { ReportarForm } from "../../components/reportar-form";
import { useRecoilValue } from "recoil";
import { loginState } from "../../hooks/login";
import { useNavigate } from "react-router-dom";

export function ReportarMascota() {
  const navigate = useNavigate();
  const loginStateValue = useRecoilValue(loginState);

  useEffect(() => {
    if (!loginStateValue) {
      navigate("/login");
      return;
    }
  }, [loginStateValue]);

  if (!loginStateValue) {
    return <div></div>;
  }

  return (
    <div className={css.container}>
      <CustomTitle>Reportar mascota perdida</CustomTitle>
      <ReportarForm></ReportarForm>
    </div>
  );
}
