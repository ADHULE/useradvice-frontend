import axiosConfig from "../axiosConfig";

const api = axiosConfig();

/**
 * loginWithFacebook
 * Authentification via Facebook OAuth
 * @param {string} accessToken - token Facebook
 * @param {string} userID - ID utilisateur Facebook
 */
export const loginWithFacebook = async (accessToken, userID) => {
  try {
    const response = await api.post("/auth/facebook", { accessToken, userID });
    localStorage.setItem("token", response.data.token);
    return response.data;
  } catch (error) {
    console.error("Erreur login Facebook :", error);
    throw error;
  }
};
