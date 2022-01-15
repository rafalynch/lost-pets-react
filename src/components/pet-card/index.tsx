import React, { useState } from "react";
import css from "./index.css";
import editImg from "../../static/images/edit.png";
import { LinkButton } from "../../ui/link";
import { SubtitleBold } from "../../ui/texts";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { editPetId } from "../../hooks/editPet";
import { ReportarModal } from "../../components/reportar-modal";

type PetCardProps = {
  name: string;
  city: string;
  imageUrl: string;
  region: string;
  editable: boolean;
  petId: number;
  contact: string;
};

export function PetCard(props: PetCardProps) {
  const navigate = useNavigate();
  const setEditPetId = useSetRecoilState(editPetId);
  const [showModal, setShowModal] = useState(false);

  function handleEdit() {
    setEditPetId(props.petId);
    navigate("/editar-mascota");
  }

  function escape(e) {
    if (e.key == "Escape") {
      setShowModal(false);
    }
  }

  function handleReport() {
    setShowModal(true);
  }

  return (
    <div className={css["pet-card-container"]}>
      <img className={css["image-pet"]} src={props.imageUrl} alt={props.name} />
      <div className={css["datos-pet"]}>
        <div>
          <SubtitleBold>{props.name}</SubtitleBold>
          <p className={css["pet-location"]}>
            {props.city + ", " + props.region}
          </p>
        </div>
        {props.editable ? (
          <EditBtn onClick={handleEdit} />
        ) : (
          <ReportLink onClick={handleReport} />
        )}
      </div>
      {showModal && (
        <div
          className={css.mask}
          onClick={() => {
            setShowModal(false);
          }}
        ></div>
      )}
      {showModal && (
        <div onKeyDown={escape} className={css["modal-container"]}>
          <ReportarModal
            setShow={setShowModal}
            contact={props.contact}
            id={props.petId.toString()}
            name={props.name}
          />
        </div>
      )}
    </div>
  );
}

function EditBtn({ onClick }) {
  return (
    <img
      onClick={onClick}
      className={css["edit-btn"]}
      src={editImg}
      alt="edit-pet"
    />
  );
}

function ReportLink({ onClick }) {
  return (
    <div className={css["report-link"]}>
      <LinkButton onClick={onClick}>REPORTAR INFORMACION</LinkButton>
    </div>
  );
}
