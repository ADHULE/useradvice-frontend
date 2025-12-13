import { useEffect, useMemo } from "react";
import useLocalStorage from "./useLocalStorage";
import apiInstance from "../api/apiInstance";
import setupAxiosInterceptors from "../api/setupAxiosInterceptors";

const useAuth = () => {
  const [token, setToken] = useLocalStorage("accessToken", null);
  const [expiresAt, setExpiresAt] = useLocalStorage("expiresAt", null);
  const [user, setUser] = useLocalStorage("user", null);

  const isLoggedIn = useMemo(() => {
    if (!token || !expiresAt) return false;
    return new Date(expiresAt).getTime() > Date.now();
  }, [token, expiresAt]);

  // LOGIN
  const login = ({ token, expiresAt, user }) => {
    setToken(token);
    setExpiresAt(expiresAt);
    setUser(user);
  };

  //  LOGOUT — ENVOI EXPLICITE DU TOKEN AU BACKEND
  const logout = async () => {
    try {
      if (token) {
        await apiInstance.post(
          "/logout",
          {}, // body vide
          {
            headers: {
              Authorization: `Bearer ${token}`, //  TOKEN ENVOYÉ
            },
          }
        );
      }
    } catch (err) {
      console.warn("Erreur logout backend :", err);
    } finally {
      //  Nettoyage local OBLIGATOIRE
      setToken(null);
      setExpiresAt(null);
      setUser(null);

      window.location.href = "/login";
    }
  };

  //  Interceptors
  useEffect(() => {
    setupAxiosInterceptors(apiInstance, {
      getToken: () => token,
      saveToken: (t, e) => {
        setToken(t);
        setExpiresAt(e);
      },
      clearToken: logout,
    });
  }, []);

  return {
    token,
    user,
    isLoggedIn,
    login,
    logout,
  };
};

export default useAuth;
