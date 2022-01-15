import React from "react";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { loginState } from "../../hooks/login";
import { LinkButton } from "../../ui/link";
import css from "./index.css";

export function LoginButton() {
  const navigate = useNavigate();

  function goToLogin() {
    navigate("/login");
  }

  return (
    <div onClick={goToLogin}>
      <LinkButton>INICIAR SESION</LinkButton>
    </div>
  );
}
