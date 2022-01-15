import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { emailSubmitted, loginState } from "../../hooks/login";
import css from "./index.css";
import { CustomTitle } from "../../ui/texts";
import { PasswordForm } from "../../components/password-form";

export function Pass() {
  const navigate = useNavigate();
  const loggedIn = useRecoilValue(loginState);
  const emailSubmittedValue = useRecoilValue(emailSubmitted);

  useEffect(() => {
    if (loggedIn || !emailSubmittedValue) {
      navigate("/");
    }
  }, [loggedIn, emailSubmittedValue]);

  return (
    <div className={css["password-container"]}>
      <CustomTitle>Ingresar</CustomTitle>
      <PasswordForm />
    </div>
  );
}
