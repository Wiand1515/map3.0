import { useEffect, useReducer } from "react";
import { geojsonApi, searchAPI } from "../../api";
import { GEOJSON_URL } from "../../constants/url";
import { getUserLocation } from "../../helpers";
import { PlacesContext } from "./PlacesContext";
import { placesReducer } from "./placesReducer";
import * as turf from "@turf/turf";


const INITIAL_STATE = {
  isLoading: true,
  userLocation: undefined,
  isLoadingPlaces: false,
  places: [],
  geojson: null,
};

export const PlacesProvider = ({ children }) => {
  const [state, dispatch] = useReducer(placesReducer, INITIAL_STATE);

  useEffect(() => {
    getUserLocation().then((lngLat) =>
      dispatch({ type: "setUserLocation", payload: lngLat })
    );
  }, []);

  useEffect(() => {
    geojsonApi
      .get(GEOJSON_URL(38))
      .then((res) => {
        dispatch({ type: "setGeojson", payload: res.data });
      })
      .catch((err) => console.log(err));
  }, []);

  const searchPlacesByTerm = async (query) => {
    if (query.length === 0) {
      dispatch({ type: "setPlaces", payload: [] });
      return [];
    }

    dispatch({ type: "setLoadingPlaces" });

    const resp = await searchAPI.get(`/${query}.json`);

    console.log(resp.data.features);

    dispatch({ type: "setPlaces", payload: resp.data.features });

    return resp.data;
  };

  const sortGeojson = (geojson, userCoordinate) => {
    const options = {units: "kilometers"};

    for (const point of geojson.features) {
      point.properties.distance = turf.distance(userCoordinate, point.geometry, options);
    } 

    geojson.features.sort((pointA, pointB) => {
      if (pointA.properties.distance > pointB.properties.distance) return 1;
      if (pointA.properties.distance < pointB.properties.distance) return -1;
      return 0;
    });

    dispatch({type: "setGeojson", payload: geojson})
  }
  

  const cleanPlaces = () => {
    dispatch({ type: "setPlaces", payload: [] });
  };

  

  return (
    <PlacesContext.Provider
      value={{
        ...state,
        // Methods
        searchPlacesByTerm,
        cleanPlaces,
        sortGeojson
      }}
    >
      {children}
    </PlacesContext.Provider>
  );
};
