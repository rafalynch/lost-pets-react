import React, { useEffect, useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { editPetId } from "../../hooks/editPet";
import css from "./index.css";
import { CustomTitle } from "../../ui/texts";
import { Spinner } from "@chakra-ui/react";
import { EditPetForm } from "../../components/edit-pet-form";
import { fetchMiMascotaById } from "../../lib/api";
import { loginState, token } from "../../hooks/login";
import { useNavigate } from "react-router-dom";

interface PetData {
  name;
  lat;
  lng;
  imageUrl;
  isFound;
  id;
}

export function EditarMascota() {
  const editPetIdValue = useRecoilValue(editPetId);
  const setEditPetId = useSetRecoilState(editPetId);
  const tokenValue = useRecoilValue(token);
  const loginStateValue = useRecoilValue(loginState);
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [petData, setPetData] = useState<PetData>();

  useEffect(() => {
    if (!loginStateValue) {
      navigate("/");
    }

    if (editPetIdValue) {
      fetchMiMascotaById(editPetIdValue, tokenValue).then((mascota) => {
        const { name, lat, lng, imageUrl, isFound, id } = mascota;
        setPetData({
          name,
          lat,
          lng,
          imageUrl,
          isFound,
          id,
        });
        setEditPetId(undefined);
        setLoading(false);
      });
    }
  }, [editPetIdValue]);

  if (!loginStateValue) {
    return <div></div>;
  }

  return (
    <div className={css.container}>
      <CustomTitle>Editar mascota</CustomTitle>
      {loading ? <Spinner /> : <EditPetForm petData={petData} />}
    </div>
  );
}
