import React, { useState } from "react";
import css from "./index.css";
import { TextField } from "../../ui/text-field";
import { DropzoneForm } from "../dropzone";
import { MainButton } from "../../ui/buttons";
import { Map } from "../map";
import { postNuevaMascota } from "../../lib/api";
import { useRecoilValue } from "recoil";
import { token } from "../../hooks/login";
import { userData } from "../../hooks/userData";
import { useNavigate } from "react-router-dom";
import { Spinner } from "@chakra-ui/react";

export function ReportarForm() {
  const [imageUrl, setImageUrl] = useState(undefined);
  const [locationData, setLocationData] = useState(undefined);
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [showLoadingSubmit, setShowLoadingSubmit] = useState(false);
  const tokenValue = useRecoilValue(token);
  const userDataValue = useRecoilValue(userData);
  const navigate = useNavigate();

  function preventKeyDown(e) {
    if (e.key == "Enter") {
      e.preventDefault();
      return;
    }
  }

  function formHandler(e) {
    e.preventDefault();
    setShowErrorMessage(false);
    setShowLoadingSubmit(true);

    const allData = {
      imageUrl,
      locationData,
      nombre: e.target.nombre.value,
    };

    for (const property in allData) {
      if (!allData[property]) {
        setShowErrorMessage(true);
        setShowLoadingSubmit(false);
        return;
      }
    }

    const petData = {
      imageUrl: allData.imageUrl,
      lat: allData.locationData.lat,
      lng: allData.locationData.lng,
      city: allData.locationData.city,
      region: allData.locationData.region,
      name: allData.nombre,
      contact: userDataValue.email,
    };

    postNuevaMascota(petData, tokenValue).then((res) => {
      setShowLoadingSubmit(false);
      navigate("/mis-mascotas");
    });
  }

  return (
    <form
      onKeyDown={preventKeyDown}
      onSubmit={formHandler}
      className={css.container}
    >
      {showLoadingSubmit && (
        <div className={css["loading-submit"]}>
          <Spinner size="xl" zIndex="5" />
        </div>
      )}
      <TextField
        maxLength={11}
        autoFocus
        autoComplete="off"
        label="NOMBRE"
        name="nombre"
        type="text"
      ></TextField>
      <DropzoneForm cb={setImageUrl}></DropzoneForm>
      <Map cb={setLocationData} />
      {showErrorMessage && (
        <p className={css["error-message"]}>
          Los campos no pueden quedar vacios
        </p>
      )}
      <MainButton type="submit" color="pink">
        Reportar como perdido
      </MainButton>
      <MainButton color="gray">Cancelar</MainButton>
    </form>
  );
}
