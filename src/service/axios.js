import axios from "axios";

const api = axios.create({
  baseURL: "https://dev.api.i-mehmon.uz/api",
});

export default api;
