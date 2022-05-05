import { useCallback, useContext, useEffect, useReducer } from "react";
import { geojsonApi, reverseGeolocateAPI, searchAPI } from "../../api";
import { GEOJSON_URL } from "../../constants/url";
import { getUserLocation } from "../../helpers";
import { PlacesContext } from "./PlacesContext";
import { placesReducer } from "./placesReducer";
import * as turf from "@turf/turf";
import { UserContext } from "../user/UserContext";

const INITIAL_STATE = {
  isLoading: true,
  userLocation: undefined,
  isLoadingPlaces: false,
  places: [],
  geojson: null,
  isAvailable: false,
  warehouseData: null,
  reverseGeocodingAddress: "",
  isDelivery: true,
};

export const PlacesProvider = ({ children }) => {
  const [state, dispatch] = useReducer(placesReducer, INITIAL_STATE);

  const { setUserAddress } = useContext(UserContext);

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
    if (query.length <= 1) {
      dispatch({ type: "setPlaces", payload: [] });
    }

    dispatch({ type: "setLoadingPlaces" });

    if (query.length > 1) {
      const resp = await searchAPI.get(`/${query}.json`);

      dispatch({ type: "setPlaces", payload: resp.data.features });

      return resp.data;
    }
  };

  const sortGeojson = useCallback(
    (geojson, userCoordinate) => {
      const options = { units: "kilometers" };

      for (const point of geojson.features) {
        point.properties.distance = turf.distance(
          userCoordinate,
          point.geometry,
          options
        );
      }

      geojson.features.sort((pointA, pointB) => {
        if (pointA.properties.distance > pointB.properties.distance) return 1;
        if (pointA.properties.distance < pointB.properties.distance) return -1;
        return 0;
      });

      dispatch({ type: "setGeojson", payload: geojson });
    },
    [dispatch]
  );

  const cleanPlaces = () => {
    dispatch({ type: "setPlaces", payload: [] });
  };

  const reverseGeolocate = (coord) => {
    reverseGeolocateAPI.get(`/${coord.lng},${coord.lat}.json`).then((res) => {
      setUserAddress(res.data.features[0]);

      dispatch({
        type: "setReverseGeocoderAddress",
        payload: res.data.features[0].place_name_es,
      });
    });
  };

  const cleanReverseGeolocateAddress = () => {
    dispatch({
      type: "cleanReverseGeocoderAddress",
      payload: {
        isDelivery: false,
        reverseGeocodingAddress: "",
      },
    });
  };

  return (
    <PlacesContext.Provider
      value={{
        ...state,
        // Methods
        searchPlacesByTerm,
        cleanPlaces,
        sortGeojson,
        reverseGeolocate,
        cleanReverseGeolocateAddress,
      }}
    >
      {children}
    </PlacesContext.Provider>
  );
};
