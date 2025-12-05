// /api/adviceApi.js
import apiInstance from "./useAxios";

// Tu n'as pas besoin d'appeler apiInstance(), c'est déjà l'instance Axios
const api = apiInstance; // juste assigner

// ────────────────────────────────────────────────
// LIST ALL (admin)
// ────────────────────────────────────────────────
export const getAllAdvices = () => api.get("/advices/admin");

// ────────────────────────────────────────────────
// LIST MY OWN (user)
// ────────────────────────────────────────────────
export const getMyAdvices = () => api.get("/advices/me");

// ────────────────────────────────────────────────
// GET BY ID
// ────────────────────────────────────────────────
export const getAdviceById = (id) => api.get(`/advices/${id}`);

// ────────────────────────────────────────────────
// CREATE (user)
// ────────────────────────────────────────────────
export const createAdvice = (data) => api.post("/advices", data);

// ────────────────────────────────────────────────
// UPDATE (user propriétaire)
// ────────────────────────────────────────────────
export const updateAdvice = (id, data) => api.put(`/advices/${id}`, data);

// ────────────────────────────────────────────────
// DELETE (user propriétaire ou admin)
// ────────────────────────────────────────────────
export const deleteAdvice = (id) => api.delete(`/advices/${id}`);
