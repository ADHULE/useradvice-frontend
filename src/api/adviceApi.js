// adviceApi.js
// Fonctions pour interagir avec l'API des avis

import apiInstance from "./apiInstance";

// Liste tous les avis (admin uniquement)
export const getAllAdvices = () => apiInstance.get("/advices/admin");

// Liste mes propres avis (utilisateur connecté)
export const getMyAdvices = () => apiInstance.get("/advices/me");

// Récupère un avis par ID
export const getAdviceById = (id) => apiInstance.get(`/advices/${id}`);

// Crée un nouvel avis (utilisateur connecté)
export const createAdvice = (data) => apiInstance.post("/advices", data);

// Met à jour un avis (propriétaire)
export const updateAdvice = (id, data) =>
  apiInstance.put(`/advices/${id}`, data);

// Supprime un avis (propriétaire ou admin)
export const deleteAdvice = (id) => apiInstance.delete(`/advices/${id}`);
