import axiosConfig from "../axiosConfig";

const api = axiosConfig();

/**
 * loginWithGoogle
 * Authentification via Google OAuth
 * @param {string} tokenId - token reçu depuis le SDK Google
 */
export const loginWithGoogle = async (tokenId) => {
  try {
    const response = await api.post("/auth/google", { tokenId });
    localStorage.setItem("token", response.data.token);
    return response.data;
  } catch (error) {
    console.error("Erreur login Google :", error);
    throw error;
  }
};
