import styled from "styled-components";
import mapboxGl, { Map, Marker } from "mapbox-gl";
import React, { useContext, useEffect, useRef } from "react";
import { MapContext, PlacesContext } from "../context";
import { Loading } from "./Loading";
import { BtnMyLocation } from "./BtnMyLocation";
import {
  MAPBOX_ACCESS_TOKEN,
  MAPBOX_STYLE_URL,
} from "../constants/mapboxConstants";
import BtnAddressConfirm from "./BtnAddressConfirm";

mapboxGl.accessToken = MAPBOX_ACCESS_TOKEN;

function MapDelivery() {
  const { setMap } = useContext(MapContext);
  const { isLoading, userLocation, geojson, reverseGeolocate } =
    useContext(PlacesContext);

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
        draggable: false,
        color: "#33cccc",
      });

      const addMarker = (event) => {
        let coordinates = event.lngLat;
        marker.setLngLat(coordinates).addTo(map.current);
      };

      map.current.on("click", (event) => {
        addMarker(event);
        console.log(event);

        reverseGeolocate(event.lngLat);
      });

      map.current.on("idle", function () {
        map.current.resize();
      });
    }
  }, [setMap, geojson, userLocation, isLoading, reverseGeolocate]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <MapContainer>
      <div
        ref={mapContainer}
        style={{
          minHeight: "500px",
          position: "relative",
          width: "100%",
          borderRadius: "1rem",
        }}
      />
      <BtnAddressConfirm />
      <BtnMyLocation />
    </MapContainer>
  );
}

export default MapDelivery;

const MapContainer = styled.div`
  max-height: 500px;
`;
