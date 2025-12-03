// Import de l'instance Axios centralisée
import useAxios from "./useAxios";

// On utilise directement l'instance
const api = useAxios;

// --------------------- AUTHENTIFICATION ---------------------

// Inscription
export const register = (data) => api.post("/inscription", data);

// Activation du compte
export const activate = (activationData) =>
  api.post("/activation", activationData);

// Login
export const login = (credentials) => api.post("/login", credentials);

// Logout
export const logout = (token) =>
  api.post("/logout", null, {
    headers: { Authorization: `Bearer ${token}` },
  });

// Refresh token
export const refreshToken = (data) => api.post("/refresh-token", data);

// Demande de changement de mot de passe
export const changePassword = (data) => api.post("/change-password", data);

// Définir un nouveau mot de passe
export const newPassword = (data) => api.post("/new-password", data);

// --------------------- UTILISATEUR CONNECTÉ ---------------------

// Récupérer mes infos
export const getMe = () => api.get("/users/me");

// Mettre à jour mes infos
export const updateMe = (data) => api.put("/users/me", data);

// Supprimer mon compte
export const deleteMe = () => api.delete("/users/me");

// --------------------- PARTIE ADMIN ---------------------

// Récupérer la liste des utilisateurs (ADMIN uniquement)
export const getAllUsers = () => api.get("/users");
