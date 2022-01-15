import React, { useEffect, useState } from "react";
import { PetCard } from "../pet-card/index";
import { useMascotasCercanas } from "../../hooks/mascotasCercanas";
import css from "./index.css";
import { Spinner } from "@chakra-ui/react";

export function MascotasCercanas() {
  const [loading, setLoading] = useState<boolean>(true);
  const pets = useMascotasCercanas(setLoading);

  if (loading) {
    return <Spinner className={css.spinner} />;
  }

  const petsFound = pets.map(function (pet, i) {
    if (pet.isFound) {
      return;
    } else {
      return (
        <div key={i} className={css["mascotas-cercanas-container"]}>
          <PetCard
            name={pet.name}
            city={pet.city}
            region={pet.region}
            imageUrl={pet.imageUrl}
            editable={false}
            petId={pet.id}
            contact={pet.contact}
          />
        </div>
      );
    }
  });

  return <div>{petsFound}</div>;
}
