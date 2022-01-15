import React, { useEffect, useState } from "react";
import { TextField } from "../../ui/text-field";
import { MainButton } from "../../ui/buttons";
import css from "./index.css";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { emailSubmitted, loginState, token } from "../../hooks/login";
import {
  fetchLogin,
  fetchSignup,
  fetchUpdateUser,
  fetchUserData,
} from "../../lib/api";
import { useNavigate } from "react-router-dom";

export function MisDatosForm() {
  const navigate = useNavigate();
  const [showMessage, setShowMessage] = useState(false);
  const [showMessagePassword, setShowMessagePassword] = useState(false);
  const setToken = useSetRecoilState(token);
  const tokenValue = useRecoilValue(token);
  const [userFullName, setUserFullName] = useState("");
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    fetchUserData(tokenValue).then((user) => {
      setUserEmail(user.email);
      setUserFullName(user.fullName);
    });
  }, []);

  async function uptadeUserHandler(e) {
    e.preventDefault();
    setShowMessagePassword(false);
    setShowMessage(false);

    const formData = new FormData(e.target);

    const name = formData.get("name");
    const password = formData.get("password");
    const confirmation = formData.get("confirmation");

    if (!name) {
      setShowMessage(true);
      return;
    }

    if (password != confirmation) {
      setShowMessagePassword(true);
      return;
    }

    const updated = await fetchUpdateUser(userEmail, name, password);

    if (updated && password != "") {
      const token = await fetchLogin(userEmail, password);

      if (token) {
        setToken(token);
        navigate("/");
      }
    }

    if (updated && password == "") {
      navigate("/");
    }
  }

  return (
    <form
      onSubmit={uptadeUserHandler}
      className={css["mis-datos-form-container"]}
    >
      <TextField
        label={"EMAIL"}
        name={"email"}
        type={"text"}
        disabled={true}
        defaultValue={userEmail}
      ></TextField>
      <TextField
        label={"NOMBRE"}
        name={"name"}
        type={"text"}
        defaultValue={userFullName}
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
          El campo del nombre no puede quedar vacio
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
        <MainButton color="pink">GUARDAR</MainButton>
      </div>
    </form>
  );
}
