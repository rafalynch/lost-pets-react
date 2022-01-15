import React, { useEffect } from "react";
import { CustomTitle } from "../../ui/texts";
import { SignupForm } from "../../components/signup-form";
import css from "./index.css";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { emailSubmitted, loginState } from "../../hooks/login";

export function SignUp() {
  const navigate = useNavigate();
  const emailSubmittedValue = useRecoilValue(emailSubmitted);
  const loginStateValue = useRecoilValue(loginState);

  useEffect(() => {
    if (!emailSubmittedValue) {
      navigate("/");
    }
  }, [emailSubmittedValue]);

  useEffect(() => {
    if (loginStateValue) {
      navigate("/");
    }
  }, [loginStateValue]);

  return (
    <div className={css["signup-container"]}>
      <CustomTitle>Registrarse</CustomTitle>
      <SignupForm></SignupForm>
    </div>
  );
}
