// src/api/useAxios.js

import axios from "axios";
// ⚠️ Assurez-vous d'avoir une implémentation de goToPath qui utilise useNavigate de React Router.
import { goToPath } from "../components/navigation/goToPath";

/**
 * apiInstance : Instance Axios centralisée
 * Gère l'ajout de l'Access Token et le renouvellement automatique (Refresh).
 */
const apiInstance = axios.create({
  baseURL: "http://localhost:9191/api", // ⬅️ Votre Base URL API
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
  // Nécessaire si le backend envoie le Refresh Token via un cookie HttpOnly.
  withCredentials: true,
});

// === Intercepteur de Requête : Ajout du Token d'Accès ===
apiInstance.interceptors.request.use(
  (config) => {
    // Récupère l'Access Token stocké après la connexion
    const token = localStorage.getItem("accessToken");
    if (token) {
      // Ajout de l'en-tête Authorization Bearer
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// === Intercepteur de Réponse : Gestion 401 (Token Expiré) et Refresh ===
apiInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const refreshTokenValue = localStorage.getItem("refreshToken");

    // 1. Détection de l'erreur 401 et vérification que ce n'est pas une boucle de retry
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      if (refreshTokenValue) {
        try {
          // 2. Tente de rafraîchir le token en envoyant le refresh token au backend
          const res = await axios.post(
            "http://localhost:9191/api/refresh-token", // Endpoint de refresh
            { refresh: refreshTokenValue } // Le refresh token est envoyé dans le corps
          );

          const newAccessToken = res.data.token;

          // 3. Stockage du nouvel Access Token
          localStorage.setItem("accessToken", newAccessToken);

          // 4. Mise à jour de l'en-tête et rejeu de la requête originale
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          return apiInstance(originalRequest);
        } catch (refreshError) {
          // 5. Échec du rafraîchissement (Refresh Token expiré ou invalide)
          console.error(
            "Échec du refresh token : Déconnexion forcée",
            refreshError
          );

          // Nettoyage de tous les tokens et redirection
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
          localStorage.removeItem("expiresAt");
          goToPath("/login"); // Redirection vers la connexion

          return Promise.reject(refreshError);
        }
      }
    }
    // Si ce n'est pas un 401 ou si le refresh token n'est pas disponible, rejeter l'erreur
    return Promise.reject(error);
  }
);

export default apiInstance;
