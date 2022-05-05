import React, { useContext } from "react";
import { MapContext, PlacesContext } from "../context";

export const SearchResults = ({setter}) => {
  const { places, cleanPlaces, geojson, sortGeojson } =
    useContext(PlacesContext);
  const { mapCnC, createPlaceMarker } = useContext(MapContext);

  const onClick = (place) => {
    mapCnC.flyTo({
      zoom: 16,
      center: place.center,
    });

    createPlaceMarker(place, mapCnC);

    const popUps = document.getElementsByClassName("mapboxgl-popup");
    /** Check if there is already a popup on the map and if so, remove it */
    if (popUps[0]) popUps[0].remove();

    sortGeojson(geojson, place.center);

    setter(place.place_name_es)

    cleanPlaces();
  };

  return (
    <ul
      className="list-group "
      style={{ position: "absolute", width: "100%", zIndex: 9999 }}
    >
      {places.map((place) => (
        <li
          key={place.id}
          className="list-group-item list-group-item-action"
          style={{ cursor: "pointer", position: "relative" }}
          onClick={() => onClick(place)}
        >
          <h6>{place.text_es} {place.address}</h6>
          <p className="text-muted" style={{ fontSize: "0.8rem" }}>
            {place.place_name}
          </p>
        </li>
      ))}
    </ul>
  );
};
