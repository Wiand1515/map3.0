import axios from "axios";
import { MAPBOX_ACCESS_TOKEN } from "../constants/mapboxConstants";

const searchAPI = axios.create({
  baseURL: "https://api.mapbox.com/geocoding/v5/mapbox.places",
  params: {
    limit: 3,
    language: "es",
    autocomplete: false,
    country: "cl",
    access_token: MAPBOX_ACCESS_TOKEN,
  },
});

export default searchAPI;