// apiInstance.js
// Création d'une instance Axios centralisée pour toutes les requêtes API

import axios from "axios";

const apiInstance = axios.create({
  baseURL: "http://localhost:9191/api", // URL de ton backend Spring Boot
  headers: { "Content-Type": "application/json" },
  timeout: 15000, // délai max
  withCredentials: true, // inclut les cookies (utile si refresh via HttpOnly cookie)
});

export default apiInstance;
