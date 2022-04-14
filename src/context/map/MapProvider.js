import { Map } from "mapbox-gl";
import { useCallback, useContext, useEffect, useReducer } from "react";
import { PlacesContext } from "../places/PlacesContext";
import { MapContext } from "./MapContext";
import { mapReducer } from "./mapReducer";

const INITIAL_STATE = {
  mapCnC: null,
  activeItem: false,
};

export const MapProvider = ({ children }) => {
  const [state, dispatch] = useReducer(mapReducer, INITIAL_STATE);
  const { geojson, sortGeojson, userLocation } = useContext(PlacesContext);

  useEffect(() => {
    if (!geojson) return;
    sortGeojson(geojson, userLocation);
  }, [geojson, sortGeojson, userLocation]);

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

  const setActiveItem = () => {
    dispatch({ type: "setUnactiveItems" });
  };

  return (
    <MapContext.Provider
      value={{
        ...state,

        //Methods
        setMap,
        setActiveItem,
      }}
    >
      {children}
    </MapContext.Provider>
  );
};
