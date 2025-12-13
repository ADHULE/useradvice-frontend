// api/apiInstance.js
import axios from "axios";
import setupAxiosInterceptors from "./setupAxiosInterceptors";

const apiInstance = axios.create({
  baseURL: "http://localhost:9191/api",
  withCredentials: true, // cookies JWT HttpOnly
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Initialisation des interceptors
setupAxiosInterceptors(apiInstance, {
  onUnauthorized: () => {
    // Session expirée ou accès refusé
    console.warn("Session expirée ou non autorisée");
    window.location.replace("/login");
  },
});

export default apiInstance;
