import React, { useEffect, useState } from "react";
import { TextField } from "../../ui/text-field";
import { MainButton } from "../../ui/buttons";
import css from "./index.css";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { emailSubmitted, loginState, token } from "../../hooks/login";
import { fetchLogin, fetchSignup } from "../../lib/api";
import { useNavigate } from "react-router-dom";
import { userData } from "../../hooks/userData";

export function SignupForm() {
  const navigate = useNavigate();
  const emailSubmittedValue = useRecoilValue(emailSubmitted);
  const [showMessage, setShowMessage] = useState(false);
  const [showMessagePassword, setShowMessagePassword] = useState(false);
  const setToken = useSetRecoilState(token);
  const setLoginState = useSetRecoilState(loginState);
  const setuserData = useSetRecoilState(userData);

  async function signupHandler(e) {
    e.preventDefault();
    setShowMessage(false);
    setShowMessagePassword(false);

    const formData = new FormData(e.target);

    const name = formData.get("name");
    const password = formData.get("password");
    const confirmation = formData.get("confirmation");

    if (!name || !password || !confirmation) {
      setShowMessage(true);
      return;
    }

    if (password != confirmation) {
      setShowMessagePassword(true);
      return;
    }

    const signedup = await fetchSignup(emailSubmittedValue, name, password);

    if (signedup) {
      const token = await fetchLogin(
        emailSubmittedValue,
        e.target.password.value
      );

      if (token) {
        setToken(token);
        setLoginState(true);
        setuserData({
          email: emailSubmittedValue,
        });
        navigate("/");
      }
    }
  }

  return (
    <form onSubmit={signupHandler} className={css["signup-container"]}>
      <TextField
        label={"EMAIL"}
        name={"email"}
        type={"text"}
        disabled={true}
        value={emailSubmittedValue}
      ></TextField>
      <TextField
        autoComplete="off"
        label={"NOMBRE"}
        name={"name"}
        type={"text"}
      ></TextField>
      <TextField
        label={"CONTRASEÑA"}
        name={"password"}
        type={"password"}
      ></TextField>
      <TextField
        label={"REPETIR CONTRASEÑA"}
        name={"confirmation"}
        type={"password"}
      ></TextField>
      {showMessage ? (
        <p className={css["error-message"]}>
          Los campos no pueden quedar vacios
        </p>
      ) : (
        ""
      )}
      {showMessagePassword ? (
        <p className={css["error-message"]}>Las contraseñas no coinciden</p>
      ) : (
        ""
      )}
      <div className={css["button-container"]}>
        <MainButton color="pink">REGISTRARSE</MainButton>
      </div>
    </form>
  );
}
