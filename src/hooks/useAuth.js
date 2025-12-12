// useAuth.js
// Hook personnalisé pour gérer l'authentification et le cycle de vie du token

import { useEffect } from "react";
import useLocalStorage from "./useLocalStorage";
import apiInstance from "../api/apiInstance";
import setupAxiosInterceptors from "../api/setupAxiosInterceptors";
import { goToPath } from "../components/navigation/goToPath";

const useAuth = () => {
  const [accessToken, setAccessToken] = useLocalStorage("accessToken", null);
  const [expiresAt, setExpiresAt] = useLocalStorage("expiresAt", null);
  const [user, setUser] = useLocalStorage("user", null);

  const saveToken = (token, exp) => {
    setAccessToken(token);
    if (exp) setExpiresAt(exp);
  };

  const clearToken = () => {
    setAccessToken(null);
    setExpiresAt(null);
    setUser(null);
  };

  //  Déconnexion avec appel API et envoi du header Authorization
  const logout = async () => {
    try {
      const token = accessToken || localStorage.getItem("accessToken");
      if (token) {
        await apiInstance.post(
          "/logout",
          {}, // certains backends attendent un body, adapter si nécessaire
          {
            headers: { Authorization: `Bearer ${token}` },
            withCredentials: true,
          }
        );
      }
    } catch (err) {
      console.warn("Erreur API logout :", err);
    } finally {
      clearToken();
      goToPath("/login");
    }
  };

  // ✅ Initialisation des intercepteurs
  useEffect(() => {
    setupAxiosInterceptors(apiInstance, {
      getToken: () => accessToken || localStorage.getItem("accessToken"),
      saveToken,
      clearToken,
    });
  }, [accessToken]);

  return {
    accessToken,
    expiresAt,
    saveToken,
    clearToken,
    user,
    setUser,
    apiInstance,
    logout,
  };
};

export default useAuth;
