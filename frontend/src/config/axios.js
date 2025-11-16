import axios from "axios";
const api = axios.create({
  baseURL: "https://task-manager-ciphrix-yq5n.vercel.app/api/" || "http://localhost:5000/api/",
  withCredentials: true,
});

export default api;
