// userApi.js
// Fonctions d'appel API spécifiques aux utilisateurs et à l'authentification

import apiInstance from "./apiInstance";

// --------------------- AUTH ---------------------
export const login = (credentials) => apiInstance.post("/login", credentials);

export const refreshToken = () =>
  apiInstance.post("/refresh-token", {}, { withCredentials: true });

export const logout = () => apiInstance.post("/logout");

export const register = (data) => apiInstance.post("/inscription", data);

export const activate = (data) => apiInstance.post("/activation", data);

export const requestNewCode = (data) =>
  apiInstance.post("/generate-new-code", data);

// --------------------- PASSWORD ---------------------
export const changePassword = (data) =>
  apiInstance.post("/change-password", data);

export const newPassword = (data) => apiInstance.post("/new-password", data);

// --------------------- CURRENT USER ---------------------
export const getMe = () => apiInstance.get("/me");

export const updateMe = (data) => apiInstance.put("/me", data);

export const deleteMe = () => apiInstance.delete("/me");

// --------------------- REVIEWS ---------------------
export const createReview = (data) => apiInstance.post("/avis", data);

export const getMyReviews = () => apiInstance.get("/avis/me");

// --------------------- ADMIN ---------------------
export const getAllUsers = () => apiInstance.get("/users");
