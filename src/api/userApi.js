// src/api/userApi.js

import api from "./useAxios"; // directement utiliser l'instance

// --------------------- AUTHENTIFICATION ---------------------

export const login = (credentials) => api.post("/login", credentials);

// Si refresh token est en cookie HttpOnly
export const refreshToken = () =>
  api.post("/refresh-token", {}, { withCredentials: true });

// Déconnexion (le token est géré par l’intercepteur)
export const logout = () => api.post("/logout");

export const register = (data) => api.post("/inscription", data);
export const activate = (activationData) =>
  api.post("/activation", activationData);

export const requestNewCode = (data) => api.post("/generate-new-code", data);

// --------------------- MOT DE PASSE ---------------------

export const changePassword = (data) => api.post("/change-password", data);
export const newPassword = (data) => api.post("/new-password", data);

// --------------------- UTILISATEUR CONNECTÉ ---------------------

export const getMe = () => api.get("/users/me");
export const updateMe = (data) => api.put("/users/me", data);
export const deleteMe = () => api.delete("/users/me");

// --------------------- AVIS ---------------------

export const createReview = (data) => api.post("/avis", data);
export const getMyReviews = () => api.get("/avis/me");

// --------------------- ADMIN ---------------------

export const getAllUsers = () => api.get("/users");
