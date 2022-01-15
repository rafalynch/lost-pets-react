import React from "react";
import { Routes, Route } from "react-router-dom";
import { Layout } from "../components/layout";
import { Home } from "../pages/home";
import { Login } from "../pages/login";
import { MisDatos } from "../pages/mis-datos";
import { MisMascotas } from "../pages/mis-mascotas";
import { Pass } from "../pages/pass";
import { ReportarMascota } from "../pages/reportar-mascota";
import { SignUp } from "../pages/sign-up";
import { EditarMascota } from "../pages/editar-mascota";

function MyRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/mis-datos" element={<MisDatos />} />
        <Route path="/mis-mascotas" element={<MisMascotas />} />
        <Route path="/reportar-mascota" element={<ReportarMascota />} />
        <Route path="/login" element={<Login />} />
        <Route path="/pass" element={<Pass />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/editar-mascota" element={<EditarMascota />} />
      </Route>
    </Routes>
  );
}

export { MyRoutes };
