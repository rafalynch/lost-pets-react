import React from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { loginState, token } from "../../hooks/login";
import { LinkButton } from "../../ui/link";
import { userData } from "../../hooks/userData";
import { useNavigate } from "react-router-dom";

export function LogoutButton() {
  const navigate = useNavigate();
  const setLoginState = useSetRecoilState(loginState);
  const setUserData = useSetRecoilState(userData);
  const setToken = useSetRecoilState(token);
  const userDataValue = useRecoilValue(userData);

  function logout() {
    setLoginState(false);
    setUserData("");
    setToken("");
    navigate("/");
  }

  return (
    <div onClick={logout}>
      {userDataValue ? <p>{userDataValue.email}</p> : ""}
      <LinkButton>CERRAR SESION</LinkButton>
    </div>
  );
}
