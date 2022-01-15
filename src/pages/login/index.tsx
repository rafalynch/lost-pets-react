import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { emailSubmitted, loginState } from "../../hooks/login";
import css from "./index.css";
import { LoginForm } from "../../components/login-form";
import { CustomTitle } from "../../ui/texts";

export function Login() {
  const navigate = useNavigate();
  const loginStateValue = useRecoilValue(loginState);

  useEffect(() => {
    if (loginStateValue) {
      navigate("/");
    }
  }, [loginStateValue]);

  return (
    <div className={css["login-container"]}>
      <CustomTitle>Ingresar</CustomTitle>
      <LoginForm />
    </div>
  );
}
