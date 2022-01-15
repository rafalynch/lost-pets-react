import React, { useState } from "react";
import css from "./index.css";
import { CustomSubtitle } from "../../ui/texts";
import { TextField, TextArea } from "../../ui/text-field";
import { MainButton } from "../../ui/buttons";
import { postNewReport } from "../../lib/api";
import exitIcon from "../../static/images/exit.svg";

interface Pet {
  name: string;
  id: string;
  contact: string;
  setShow;
}

export function ReportarModal(petData: Pet) {
  const [showErrorMessage, setShowErrorMessage] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setShowErrorMessage(false);

    if (!e.target.phone.value || !e.target.info.value || !e.target.name.value) {
      setShowErrorMessage(true);
      return;
    }

    const newReportData = {
      name: e.target.name.value,
      phoneNumber: e.target.phone.value,
      description: e.target.info.value,
      petId: petData.id,
      contact: petData.contact,
    };

    postNewReport(newReportData).then((res) => {
      petData.setShow(false);
    });
  }

  return (
    <form onSubmit={handleSubmit} className={css["modal-container"]}>
      <img
        onClick={() => {
          petData.setShow(false);
        }}
        src={exitIcon}
        alt="exit"
        className={css.exit}
      />
      <div className={css["title-container"]}>
        <CustomSubtitle>Reportar info de {petData.name}</CustomSubtitle>
      </div>
      <TextField
        autoFocus
        label="TU NOMBRE"
        name="name"
        type="text"
        className={css.name}
      ></TextField>
      <TextField
        className={css.phone}
        label="TU TELEFONO"
        name="phone"
        type="text"
      ></TextField>
      <div className={css.info}>
        <TextArea label="DONDE LO VISTE?" name="info" type="text"></TextArea>
      </div>
      <div className={css["button-container"]}>
        {showErrorMessage && (
          <p className={css.error}>Los campos no pueden quedar vacios</p>
        )}
        <MainButton color="pink">Enviar</MainButton>
      </div>
    </form>
  );
}
