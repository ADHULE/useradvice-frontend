// setupInterceptors.js
// Ajout des intercepteurs Axios pour injecter le token et gérer les erreurs 401/refresh

import { goToPath } from "../components/navigation/goToPath";

export default function setupAxiosInterceptors(
  apiInstance,
  { getToken, saveToken, clearToken }
) {
  // Intercepteur de requête : ajoute le Bearer token si présent
  apiInstance.interceptors.request.use(
    (config) => {
      const token = getToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  // Intercepteur de réponse : gère les erreurs 401 et tente un refresh
  apiInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;

      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;

        try {
          const res = await apiInstance.post(
            "/refresh-token",
            {},
            { withCredentials: true }
          );

          // Sauvegarde du nouveau token
          saveToken(res.data.token, res.data.expiresAt);

          // Réessaye la requête originale avec le nouveau token
          originalRequest.headers.Authorization = `Bearer ${res.data.token}`;
          return apiInstance(originalRequest);
        } catch (refreshError) {
          clearToken();
          goToPath("/login"); // redirection vers login
          return Promise.reject(refreshError);
        }
      }

      return Promise.reject(error);
    }
  );
}
