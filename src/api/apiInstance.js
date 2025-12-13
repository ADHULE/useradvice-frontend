import axios from "axios";

const apiInstance = axios.create({
  baseURL: "http://localhost:9191/api",
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
  timeout: 15000,
});

export default apiInstance;
