import axios from "axios";

/**
 * useAxios
 * Instance Axios centralisée pour toute l'application.
 */
const useAxios = axios.create({
  baseURL: "http://localhost:9191/api",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000, // 10 secondes
});

// === Intercepteur : ajout automatique du token ===
useAxios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// === Intercepteur : gestion globale des erreurs ===
useAxios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.warn("Token expiré ou invalide");
      // window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default useAxios;
