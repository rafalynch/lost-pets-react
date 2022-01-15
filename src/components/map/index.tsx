import ReactMapboxGl from "react-mapbox-gl";
import React, { useEffect, useState } from "react";
import { Layer, Feature } from "react-mapbox-gl";
import { TextField } from "../../ui/text-field";
import css from "./index.css";
import { Marker } from "react-mapbox-gl";
import markerUrl from "../../static/images/marker.png";
import { CustomLongText } from "../../ui/texts";

const MAPBOX_TOKEN =
  "pk.eyJ1IjoicmFmYWx5bmNoIiwiYSI6ImNrd2k0cnk4aDE0eTgybm5vNTl5bTd5M2kifQ.4UXWIHJo4uN2YpRTqoTCYw";

const Mapbox = ReactMapboxGl({
  accessToken: MAPBOX_TOKEN,
});

interface Props {
  cb;
  defaultCoords?: [number, number];
}

export function Map(props: Props) {
  const initialCoords: any = props.defaultCoords || [-0, 0];
  const [coords, setCoords] = useState(initialCoords);
  const [query, setQuery] = useState("");
  const [showMarker, setShowMarker] = useState(props.defaultCoords || false);

  useEffect(() => {
    if (!props.defaultCoords) {
      navigator.geolocation.getCurrentPosition((position) => {
        setCoords([position.coords.longitude, position.coords.latitude]);
      });
    }
  }, []);

  function handleChange(e) {
    setQuery(e.target.value);
  }

  function keydownInputHandler(e) {
    if (e.key == "Enter") {
      search(query);
    }
  }

  function search(query) {
    fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${query}.json?access_token=${MAPBOX_TOKEN}&country=AR&limit=1`
    ).then((res) =>
      res.json().then((data) => {
        const locationData = {
          lng: data.features[0].geometry.coordinates[0],
          lat: data.features[0].geometry.coordinates[1],
          city: data.features[0].text,
          region: data.features[0].context[0].text,
        };

        handleSearchResults(locationData);
      })
    );
  }

  function handleSearchResults(locationData) {
    setCoords([locationData.lng, locationData.lat]);
    setShowMarker(true);
    props.cb(locationData);
  }

  return (
    <div className={css.container}>
      <Mapbox
        style="mapbox://styles/mapbox/streets-v11"
        containerStyle={{
          height: "300px",
          width: "335px",
        }}
        center={coords}
        zoom={[15]}
      >
        <Layer type="symbol" id="marker" layout={{ "icon-image": "marker-15" }}>
          <Feature coordinates={coords} />
        </Layer>
        {showMarker && (
          <Marker coordinates={coords} anchor="bottom">
            <img src={markerUrl} className={css["marker-img"]} />
          </Marker>
        )}
      </Mapbox>
      <TextField
        autoComplete="off"
        onKeyDown={keydownInputHandler}
        onChange={handleChange}
        label="UBICACION"
        name="ubicacion"
        type="text"
      />
      <span className={css.instructions}>
        <CustomLongText>
          Buscá un punto de referencia para reportar a tu mascota. Puede ser una
          dirección, un barrio o una ciudad.
        </CustomLongText>
      </span>
    </div>
  );
}
