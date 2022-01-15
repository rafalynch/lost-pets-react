import React, { useEffect, useState } from "react";
import css from "./index.css";
import { PetCard } from "../pet-card";
import { fetchMisMascotas } from "../../lib/api";
import { useRecoilValue } from "recoil";
import { token } from "../../hooks/login";
import { Spinner } from "@chakra-ui/react";

type Mascota = {
  id;
  name;
  city;
  imageUrl;
  region;
  contact;
};

export function MisMascotasCards() {
  const [misMascotas, setMisMascotas] = useState<[Mascota]>();
  const [hasMascotas, setHasMascotas] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const tokenValue = useRecoilValue(token);

  useEffect(() => {
    fetchMisMascotas(tokenValue).then((mascotas) => {
      if (mascotas.length == 0) {
        setHasMascotas(false);
      } else {
        setMisMascotas(mascotas);
        setHasMascotas(true);
      }
      setLoading(false);
    });
  }, []);

  if (loading) {
    return <Spinner className={css.spinner} />;
  }

  if (!hasMascotas) {
    return <p>Aun no cargaste ninguna mascota</p>;
  }

  return (
    <div className={css.container}>
      {misMascotas.map((mascota) => {
        return (
          <PetCard
            key={mascota.id}
            name={mascota.name}
            city={mascota.city}
            imageUrl={mascota.imageUrl}
            region={mascota.region}
            editable={true}
            petId={mascota.id}
            contact={mascota.contact}
          ></PetCard>
        );
      })}
    </div>
  );
}
