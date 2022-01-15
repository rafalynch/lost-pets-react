import React, { useState } from "react";
import { TextField } from "../../ui/text-field";
import { MainButton } from "../../ui/buttons";
import css from "./index.css";
import { useSetRecoilState } from "recoil";
import { emailSubmitted } from "../../hooks/login";
import { isExistingEmail } from "../../lib/api";
import { useNavigate } from "react-router-dom";

export function LoginForm() {
  const navigate = useNavigate();
  const setEmailSubmitted = useSetRecoilState(emailSubmitted);
  const [showMessage, setShowMessage] = useState(false);

  async function submitEmail(e) {
    e.preventDefault();
    setShowMessage(false);

    if (!e.target.email.value) {
      setShowMessage(true);
      return;
    }

    setEmailSubmitted(e.target.email.value);
    const exists = await isExistingEmail(e.target.email.value);
    if (exists) {
      navigate("/pass");
    } else {
      navigate("/sign-up");
    }
  }

  return (
    <form onSubmit={submitEmail} className={css["login-form"]}>
      <TextField
        autoFocus
        type={"email"}
        name={"email"}
        label={"EMAIL"}
      ></TextField>
      {showMessage ? (
        <p className={css["error-message"]}>Debes ingresar un email</p>
      ) : (
        ""
      )}
      <MainButton color="pink">Siguiente</MainButton>
    </form>
  );
}
