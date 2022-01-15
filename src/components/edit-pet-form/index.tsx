import React, { useState } from "react";
import css from "./index.css";
import { TextField } from "../../ui/text-field";
import { DropzoneForm } from "../dropzone";
import { MainButton } from "../../ui/buttons";
import { Map } from "../map";
import { LinkButton } from "../../ui/link";
import {
  fetchDeleteMascota,
  postNuevaMascota,
  updateMascota,
} from "../../lib/api";
import { useRecoilState, useRecoilValue } from "recoil";
import { token } from "../../hooks/login";
import { userData } from "../../hooks/userData";
import { useNavigate } from "react-router-dom";

interface Pet {
  petData: {
    name;
    lat;
    lng;
    imageUrl;
    isFound;
    id;
  };
}

export function EditPetForm(props: Pet) {
  const navigate = useNavigate();
  const tokenValue = useRecoilValue(token);
  const [imageUrl, setImageUrl] = useState(undefined);
  const [locationData, setLocationData] = useState(undefined);

  function preventKeyDown(e) {
    if (e.key == "Enter") {
      e.preventDefault();
      return;
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    let updateData: any = {
      name: e.target.nombre.value,
    };

    if (imageUrl) {
      updateData.imageUrl = imageUrl;
    }

    if (locationData) {
      updateData.lat = locationData.lat;
      updateData.lng = locationData.lng;
      updateData.city = locationData.city;
      updateData.region = locationData.region;
    }
    updateMascota(updateData, props.petData.id, tokenValue).then(() => {
      navigate("/mis-mascotas");
    });
  }

  function deleteMascota() {
    const confirmation = window.confirm("Deseas eliminar esta mascota?");
    if (confirmation) {
      fetchDeleteMascota(props.petData.id, tokenValue).then(() => {
        navigate("/mis-mascotas");
      });
    } else {
      return;
    }
  }

  function toggleFoundState() {
    let updateData;
    if (props.petData.isFound) {
      updateData = {
        isLost: true,
      };
    } else {
      updateData = {
        isFound: true,
      };
    }

    updateMascota(updateData, props.petData.id, tokenValue).then(() => {
      navigate("/mis-mascotas");
    });
  }

  return (
    <form
      onKeyDown={preventKeyDown}
      onSubmit={handleSubmit}
      className={css.container}
    >
      <TextField
        autoComplete="off"
        label="NOMBRE"
        name="nombre"
        type="text"
        defaultValue={props.petData.name}
      ></TextField>
      <DropzoneForm
        defaultImgUrl={props.petData.imageUrl}
        cb={setImageUrl}
      ></DropzoneForm>
      <Map
        cb={setLocationData}
        defaultCoords={[props.petData.lng, props.petData.lat]}
      />
      <MainButton type="submit" color="pink">
        Guardar
      </MainButton>
      {props.petData.isFound ? (
        <LostButton onClick={toggleFoundState} />
      ) : (
        <FoundButton onClick={toggleFoundState} />
      )}
      <LinkButton onClick={deleteMascota}>DESPUBLICAR</LinkButton>
    </form>
  );
}

function FoundButton(props) {
  return (
    <MainButton onClick={props.onClick} type={"button"} color="green">
      Reportar como encontrado
    </MainButton>
  );
}

function LostButton(props) {
  return (
    <MainButton onClick={props.onClick} type={"button"} color="green">
      Reportar como perdido
    </MainButton>
  );
}
