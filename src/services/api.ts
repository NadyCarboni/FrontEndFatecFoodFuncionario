import axios from "axios";

const { API_URL } = process.env;
const api = axios.create({
  baseURL: API_URL,
});

export default api;
