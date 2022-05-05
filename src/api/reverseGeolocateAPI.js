import axios from "axios";
import { MAPBOX_ACCESS_TOKEN } from "../constants/mapboxConstants";

const reverseGeolocateAPI = axios.create({
  baseURL: "https://api.mapbox.com/geocoding/v5/mapbox.places",
  params: {
    limit: 1,
    access_token: MAPBOX_ACCESS_TOKEN,
    language: "es"
  }
});

export default reverseGeolocateAPI;
