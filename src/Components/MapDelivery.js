import mapboxGl, { Map, Marker } from "mapbox-gl";
import React, { useContext, useEffect, useRef } from "react";
import { MapContext, PlacesContext } from "../context";
import { Loading } from "./Loading";
import { BtnMyLocation } from "./BtnMyLocation";
import {
  MAPBOX_ACCESS_TOKEN,
  MAPBOX_STYLE_URL,
} from "../constants/mapboxConstants";

mapboxGl.accessToken = MAPBOX_ACCESS_TOKEN;

function MapDelivery() {
  const { setMap } = useContext(MapContext);
  const { isLoading, userLocation, geojson } = useContext(PlacesContext);

  const mapContainer = useRef(null);
  const map = useRef(null);

  useEffect(() => {
    if (!isLoading) {
      if (map.current) return;

      map.current = new Map({
        container: mapContainer.current,
        style: MAPBOX_STYLE_URL,
        center: userLocation,
        zoom: 15,
      });
      setMap(map.current);
      /* ---------------------------------- */
      /*    MAP ICONS AND ICON TRIGGERS     */
      /* ---------------------------------  */

      let marker = new Marker({
        draggable: true,
        color: "#33cccc",
      });

      marker.setLngLat(userLocation).addTo(map.current);
    }
  }, [setMap, geojson, userLocation, isLoading]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <div
        ref={mapContainer}
        style={{
          minHeight: "500px",
          position: "relative",
          height: "100%",
          width: "100%",
          borderRadius: "1rem",
        }}
      />
      <BtnMyLocation />
    </>
  );
}

export default MapDelivery;
