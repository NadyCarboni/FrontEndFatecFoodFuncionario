import axios from "axios";

const api = axios.create({
  baseURL: "http://54.175.22.87/",
});

export default api;
