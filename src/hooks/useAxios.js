import axios from "axios";

/**
 * axiosConfig
 * Configuration centrale pour Axios, utilisée dans toute l'application.
 * - Définit l'URL de base
 * - Configure les headers par défaut
 * - Permet d'ajouter des interceptors si besoin
 */
const useAxios = () => {
  // Crée une instance Axios
  const instance = axios.create({
    baseURL: "https://localhost:9191/api", // à remplacer par  API (Back-end)
    headers: {
      "Content-Type": "application/json",
      // "Authorization": `Bearer ${token}` // si tu veux ajouter le token
    },
    timeout: 10000, // optionnel : timeout 10 secondes
  });

  // Exemple : interceptor pour ajouter le token automatiquement
  instance.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem("token"); // ou depuis Redux/Context
      if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  // Exemple : interceptor pour gérer les erreurs globales
  instance.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response && error.response.status === 401) {
        console.log("Non autorisé, redirection vers login");
        // ici tu peux appeler ton goToPath("/login") ou autre
      }
      return Promise.reject(error);
    }
  );

  return instance;
};

export default useAxios;
