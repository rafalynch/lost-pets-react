import React from "react";
import css from "./index.css";
import { useNavigate } from "react-router-dom";
import logoImg from "../../static/images/logo_header.png";
import { Nav } from "../nav";

export function Header() {
  const navigate = useNavigate();

  function goHome() {
    navigate("/");
  }

  return (
    <div>
      <div className={css.header}>
        <img
          src={logoImg}
          alt="logo-header"
          className={css.logo}
          onClick={goHome}
        />
        <Nav></Nav>
      </div>
    </div>
  );
}
