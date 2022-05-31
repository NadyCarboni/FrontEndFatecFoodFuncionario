import axios from "axios";

const { API_URL } = process.env;
const api = axios.create({
  baseURL: "http://localhost:5000/",
});

export default api;
