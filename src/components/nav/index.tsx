import React, { useState } from "react";
import css from "./index.css";
import { Link } from "react-router-dom";
import menuImg from "../../static/images/menu.png";
import { useRecoilValue } from "recoil";
import { loginState } from "../../hooks/login";
import { LoginButton } from "../login-btn";
import { LogoutButton } from "../logout-btn";
import { SubtitleBold } from "../../ui/texts";

export function Nav() {
  const [showMenu, setShowMenu] = useState(false);

  function toggleMenu() {
    setShowMenu(!showMenu);
  }

  return (
    <nav>
      <img
        src={menuImg}
        onClick={toggleMenu}
        alt="menu-button"
        className={css.burger}
      />
      {showMenu ? <Menu cb={toggleMenu} /> : ""}
    </nav>
  );
}

function Menu({ cb }) {
  const loginStateValue = useRecoilValue(loginState);

  return (
    <div className={css.menu}>
      <ul>
        <li className={css.home}>
          <Link to={"/"} onClick={cb}>
            <SubtitleBold>Home</SubtitleBold>
          </Link>
        </li>
        <li className={css.datos}>
          <Link to={"/mis-datos"} onClick={cb}>
            <SubtitleBold>Mis datos</SubtitleBold>
          </Link>
        </li>
        <li className={css.mascotas}>
          <Link to={"/mis-mascotas"} onClick={cb}>
            <SubtitleBold>Mis mascotas reportadas</SubtitleBold>
          </Link>
        </li>
        <li className={css.reportar}>
          <Link to={"/reportar-mascota"} onClick={cb}>
            <SubtitleBold>Reportar mascota</SubtitleBold>
          </Link>
        </li>
      </ul>
      <div className={css.session} onClick={cb}>
        {loginStateValue ? <LogoutButton /> : <LoginButton />}
      </div>
    </div>
  );
}
