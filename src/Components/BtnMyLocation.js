import React, { useContext } from "react";
import { MapContext, PlacesContext } from "../context";
import { createPopUp, getBbox } from "../helpers";
import { FaLocationArrow } from "react-icons/fa";

export const BtnMyLocation = ({toggle}) => {
  const { mapCnC } = useContext(MapContext);
  const { userLocation, sortGeojson, geojson } = useContext(PlacesContext);

  const onCLick = () => {
    if (!mapCnC) throw new Error("Map not Ready");
    if (!userLocation) throw new Error("Can't access geolocation");

    mapCnC.flyTo({
      zoom: 15,
      center: userLocation,
    });

    
    const geolocateResult = {
      coordinates: userLocation,
    };
    
    sortGeojson(geojson, userLocation);
    
    createPopUp(geojson.features[0].geometry.coordinates, mapCnC, {
      title: geojson.features[0].properties.title,
      distance: geojson.features[0].properties.distance,
      price: geojson.features[0].properties.price
    });
    
    const bbox = getBbox(geojson, 0, geolocateResult);
    mapCnC.fitBounds(bbox, { padding: 100 });
    
    toggle(geojson.features[0].properties.id)
  };

  return (
    <button
      className="btn btn-primary"
      onClick={onCLick}
      style={{
        position: "relative",
        top: "-530px",
        left: "20px",
        borderRadius: "50%",
        width: "3rem",
        height: "3rem",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <FaLocationArrow size={18} />
    </button>
  );
};
