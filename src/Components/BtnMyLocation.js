import React, { useContext } from "react";
import { MapContext, PlacesContext } from "../context";
import { FaLocationArrow } from "react-icons/fa";

export const BtnMyLocation = () => {
  const { mapCnC } = useContext(MapContext);
  const { userLocation, sortGeojson, geojson, isDelivery } =
    useContext(PlacesContext);

  const onCLick = () => {
    if (!mapCnC) throw new Error("Map not Ready");
    if (!userLocation) throw new Error("Can't access geolocation");

    mapCnC.flyTo({
      zoom: 15,
      center: userLocation,
    });

    if (isDelivery) return;

    sortGeojson(geojson, userLocation);
  };

  return (
    <button
      className="btn btn-primary"
      onClick={onCLick}
      style={{
        position: "relative",
        top: "-540px",
        left: "15px",
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
