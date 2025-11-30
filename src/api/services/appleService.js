import axiosConfig from "../axiosConfig";

const api = axiosConfig();

/**
 * loginWithApple
 * Authentification via Apple OAuth
 * @param {string} identityToken - token Apple
 * @param {string} authorizationCode - code d’autorisation Apple
 */
export const loginWithApple = async (identityToken, authorizationCode) => {
  try {
    const response = await api.post("/auth/apple", {
      identityToken,
      authorizationCode,
    });
    localStorage.setItem("token", response.data.token);
    return response.data;
  } catch (error) {
    console.error("Erreur login Apple :", error);
    throw error;
  }
};
