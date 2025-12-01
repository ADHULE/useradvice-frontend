// /api/authApi.js
import useAxios from "../hooks/useAxios";

const api = useAxios();

// Auth classique
export const register = (data) => api.post("/inscription", data);

export const activateAccount = (data) => api.post("/activation", data);

export const login = (email, password) =>
  api.post("/login", { email, password });

export const refreshToken = () => api.post("/refresh-token");

export const changePassword = (data) => api.post("/change-password", data);

export const forgotPassword = (email) =>
  api.post("/forgot-password", { email });

export const newPassword = (data) => api.post("/new-password", data);

export const logout = () => api.post("/logout");
