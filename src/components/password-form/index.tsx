import React, { useEffect, useState } from "react";
import { TextField } from "../../ui/text-field";
import { MainButton } from "../../ui/buttons";
import css from "./index.css";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { emailSubmitted, loginState, token } from "../../hooks/login";
import { fetchLogin } from "../../lib/api";
import { useNavigate } from "react-router-dom";
import { userData } from "../../hooks/userData";

export function PasswordForm() {
  // Wrong password message
  const [wrongPasswordMessage, setWrongPasswordMessage] = useState(false);

  // Hooks needed
  const navigate = useNavigate();
  const emailSubmittedValue = useRecoilValue(emailSubmitted);
  const setToken = useSetRecoilState(token);
  const setLoginState = useSetRecoilState(loginState);
  const setUserData = useSetRecoilState(userData);

  // Use effect
  useEffect(() => {
    if (loginState) {
      // fetch data
      setUserData({
        email: emailSubmittedValue,
      });
    }
  }, [loginState]);

  // Login function (submit handler)
  async function login(e) {
    setWrongPasswordMessage(false);
    e.preventDefault();

    const token = await fetchLogin(
      emailSubmittedValue,
      e.target.password.value
    );

    if (token) {
      setToken(token);
      setLoginState(true);
      navigate("/");
    } else {
      setWrongPasswordMessage(true);
    }
  }

  return (
    <form onSubmit={login} className={css["password-form"]}>
      <TextField
        autoFocus
        type={"password"}
        name={"password"}
        label={"PASSWORD"}
      ></TextField>
      {wrongPasswordMessage ? (
        <p className={css["error-message"]}>La contraseña es incorrecta</p>
      ) : (
        ""
      )}
      <MainButton color="pink">Ingresar</MainButton>
    </form>
  );
}
