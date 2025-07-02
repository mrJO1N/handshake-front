import axios from "axios";
import { getFromConfig } from "./config.service";

const BASE_API_URL = getFromConfig("BASE_API_URL") || "http://localhost/";

const api = axios.create({
  baseURL: BASE_API_URL,
  headers: {
    "Content-Type": "application/json;charset=utf-8",
    Accept: "application/json;charset=utf-8",
    // "Authorization": `Bearer ${localStorage.getItem("token")}`,
    // "Access-Control-Allow-Origin": BASE_API_URL,
  },
});

export default api;
