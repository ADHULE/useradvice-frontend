import Alert from "../../components/ui/Alert";
import axiosConfig from "../axiosConfig"; // ← notre configuration centrale Axios

// Crée une instance Axios depuis la configuration
const api = axiosConfig();

// Inscription

export const signup = async (user) => {
  try {
    const response = await api.post("/signup", user);
    return response.data;
  } catch (error) {
    Alert("Erreur signup :", error);
    throw error;
  }
};

//  Connexion / Login
export const login = async (credentials) => {
  try {
    const response = await api.post("/login", credentials);
    // Stocker le token dans localStorage
    localStorage.setItem("token", response.data.token);
    return response.data;
  } catch (error) {
    Alert("Erreur login :", error);
    throw error;
  }
};

// Récupérer profil utilisateur
export const getUserProfile = async (userId) => {
  try {
    const response = await api.get(`/users/${userId}`);
    return response.data;
  } catch (error) {
    Alert("Erreur getUserProfile :", error);
    throw error;
  }
};

//  Mettre à jour profil utilisateur
export const updateUser = async (userId, updatedUser) => {
  try {
    const response = await api.put(`/update/${userId}`, updatedUser);
    return response.data;
  } catch (error) {
    Alert("Erreur updateUser :", error);
    throw error;
  }
};

//  Supprimer utilisateur
export const deleteUser = async (userId) => {
  try {
    const response = await api.delete(`/users/${userId}`);
    return response.data;
  } catch (error) {
    Alert("Erreur deleteUser :", error);
    throw error;
  }
};
