import axios from "axios";
import { API_BASE_URL } from "../constants/url";

const warehouseAPI = axios.create({
    baseURL : API_BASE_URL
})

export default warehouseAPI;