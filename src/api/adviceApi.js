// api/adviceApi.js
// Fonctions pour interagir avec l'API des avis

import apiInstance from "./apiInstance";

// ===============================
// ADMIN
// ===============================

// Liste tous les avis (admin uniquement)
export const getAllAdvices = () => {
  return apiInstance.get("/advices/admin");
};

// ===============================
// UTILISATEUR CONNECTÉ
// ===============================

// Liste mes propres avis
export const getMyAdvices = () => {
  return apiInstance.get("/advices/me");
};

// Récupère un avis par ID
export const getAdviceById = (id) => {
  return apiInstance.get(`/advices/${id}`);
};

// Crée un nouvel avis
export const createAdvice = (data) => {
  return apiInstance.post("/advices", data);
};

// Met à jour un avis
export const updateAdvice = (id, data) => {
  return apiInstance.put(`/advices/${id}`, data);
};

// Supprime un avis
export const deleteAdvice = (id) => {
  return apiInstance.delete(`/advices/${id}`);
};
