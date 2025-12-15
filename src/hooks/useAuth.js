// hooks/useAuth.js

import { useEffect, useMemo } from "react";
import useLocalStorage from "./useLocalStorage";
import apiInstance from "../api/apiInstance";
import setupAxiosInterceptors from "../api/setupAxiosInterceptors";

/**
 * Hook global d'authentification
 * - Centralise login / logout
 * - Protège les pages privées uniquement
 */
const useAuth = () => {
  // -------------------------------
  // ÉTAT PERSISTÉ
  // -------------------------------
  const [token, setToken] = useLocalStorage("accessToken", null);
  const [expiresAt, setExpiresAt] = useLocalStorage("expiresAt", null);
  const [user, setUser] = useLocalStorage("user", null);

  // -------------------------------
  // ÉTAT DE CONNEXION
  // -------------------------------
  const isLoggedIn = useMemo(() => {
    if (!token || !expiresAt) return false;
    return new Date(expiresAt).getTime() > Date.now();
  }, [token, expiresAt]);

  // -------------------------------
  // LOGIN
  // -------------------------------
  const login = ({ token, expiresAt, user }) => {
    setToken(token);
    setExpiresAt(expiresAt);
    setUser(user);
  };

  // -------------------------------
  // LOGOUT (contrôlé)
  // -------------------------------
  const logout = async (redirect = true) => {
    try {
      if (token) {
        await apiInstance.post(
          "/logout",
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      }
    } catch (err) {
      console.warn("⚠️ Logout backend :", err);
    } finally {
      setToken(null);
      setExpiresAt(null);
      setUser(null);

      if (redirect && window.location.pathname !== "/login") {
        window.location.href = "/login";
      }
    }
  };

  // -------------------------------
  // INTERCEPTORS (INITIALISATION)
  // -------------------------------
  useEffect(() => {
    setupAxiosInterceptors(apiInstance, {
      /**
       * Appelé uniquement si :
       * - route protégée
       * - utilisateur connecté
       */
      onUnauthorized: () => {
        const publicRoutes = ["/login", "/register", "/activateAccount"];

        if (publicRoutes.includes(window.location.pathname)) {
          return;
        }

        if (token) {
          console.warn("🔒 Session expirée");
          logout(true);
        }
      },
    });
  }, [token]);

  return {
    token,
    user,
    isLoggedIn,
    login,
    logout,
  };
};

export default useAuth;
