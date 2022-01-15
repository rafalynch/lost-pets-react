import React, { useEffect, useState } from "react";
import { Header } from "../../components/header";
import { Outlet, useNavigate } from "react-router-dom";
import css from "./index.css";

function Layout() {
  return (
    <div>
      <Header></Header>
      <div className={css.outlet}>
        <Outlet></Outlet>
      </div>
    </div>
  );
}

export { Layout };
