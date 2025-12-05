// src/api/useAxios.js
import axios from "axios";
import { goToPath } from "../components/navigation/goToPath";

// Création de l'instance Axios
const apiInstance = axios.create({
  baseURL: "http://localhost:9191/api",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
  withCredentials: true, // 🔑 Permet l'envoi des cookies HttpOnly
});

// Gestion de la concurrence pour le refresh
let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

// === Intercepteur de Requête : Ajout du Access Token ===
apiInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// === Intercepteur de Réponse : Gestion automatique du refresh ===
apiInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return apiInstance(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        // 🔑 Appel au refresh token (via cookie HttpOnly)
        const res = await apiInstance.post("/refresh-token");

        const newAccessToken = res.data.token;

        // Stockage du nouvel access token
        localStorage.setItem("accessToken", newAccessToken);

        // Vider la file d’attente
        isRefreshing = false;
        processQueue(null, newAccessToken);

        // Rejouer la requête originale
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return apiInstance(originalRequest);
      } catch (refreshError) {
        isRefreshing = false;
        processQueue(refreshError, null);

        console.error(
          "Échec du refresh token : Déconnexion forcée",
          refreshError
        );

        // Nettoyage
        localStorage.removeItem("accessToken");
        localStorage.removeItem("expiresAt");

        goToPath("/login");

        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default apiInstance;
