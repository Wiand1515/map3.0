import axios from "axios";
import { API_BASE_URL } from "../constants/url";

const geojsonApi = axios.create({
  baseURL: API_BASE_URL,
  params: {
    originId: 13123,
    weight: 1
  }
});

export default geojsonApi;
