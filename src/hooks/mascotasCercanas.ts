import { useEffect, useState } from "react";
import { fetchMascotasCercanas, fetchPetById } from "../lib/api";

export function useMascotasCercanas(setLoading) {
  const [petsClose, setPetsClose] = useState([]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(function (position) {
      const userLocation = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      };

      fetchMascotasCercanas(userLocation).then((pets) => {
        setLoading(false);
        pets.hits.forEach((hit) => {
          fetchPetById(hit.objectID).then((pet) => {
            setPetsClose((currVal) => [...currVal, pet]);
          });
        });
      });
    });
  }, []);

  return petsClose;
}
