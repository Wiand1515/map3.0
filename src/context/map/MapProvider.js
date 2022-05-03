import { Map, Marker } from "mapbox-gl";
import { useCallback, useContext, useEffect, useReducer } from "react";
import { PlacesContext } from "../places/PlacesContext";
import { MapContext } from "./MapContext";
import { mapReducer } from "./mapReducer";

const INITIAL_STATE = {
  mapCnC: null,
  activeItem: false,
  markers: [],
};

export const MapProvider = ({ children }) => {
  const [state, dispatch] = useReducer(mapReducer, INITIAL_STATE);
  const { geojson, sortGeojson, userLocation } = useContext(PlacesContext);

  useEffect(() => {
    if (!geojson) return;
    if (!state.mapCnC) return;
    sortGeojson(geojson, userLocation);
  }, [geojson, sortGeojson, userLocation, state.mapCnC]);

  const createPlaceMarker = (place, map) => {
    state.markers.forEach((marker) => marker.remove());

    const newMarkers = [];

    const newMarker = new Marker().setLngLat(place.center).addTo(map);

    newMarkers.push(newMarker);

    dispatch({ type: "setMarkers", payload: newMarkers });
  };

  



  const setMap = useCallback(
    (map = Map) => {
      map.dragRotate.disable();

      dispatch({
        type: "setMap",
        payload: map,
      });
    },
    [dispatch]
  );



  return (
    <MapContext.Provider
      value={{
        ...state,

        //Methods
        createPlaceMarker,
        setMap,
      }}
    >
      {children}
    </MapContext.Provider>
  );
};
