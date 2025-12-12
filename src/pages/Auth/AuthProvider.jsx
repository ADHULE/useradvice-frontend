// src/pages/Auth/AuthProvider.jsx
import React, { createContext, useContext, useState, useEffect } from "react";
import { goToPath } from "../../components/navigation/goToPath";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  // Vérifier l'authentification au chargement
  useEffect(() => {
    const checkAuth = () => {
      try {
        const token = localStorage.getItem("accessToken");
        const userData = localStorage.getItem("user");

        if (token && userData) {
          setUser(JSON.parse(userData));
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error(
          "Erreur lors de la vérification de l'authentification:",
          error
        );
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = (token, userData, expiresAt) => {
    localStorage.setItem("accessToken", token);
    localStorage.setItem("user", JSON.stringify(userData));
    if (expiresAt) {
      localStorage.setItem("expiresAt", expiresAt);
    }

    setUser(userData);
    setIsAuthenticated(true);
  };

  const logout = () => {
    // Supprimer les données d'authentification
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");
    localStorage.removeItem("expiresAt");
    sessionStorage.clear();

    // Réinitialiser l'état
    setUser(null);
    setIsAuthenticated(false);

    // Rediriger vers la page d'accueil
    goToPath("/");
  };

  // Memoize context value to avoid changing object reference on every render
  const value = React.useMemo(
    () => ({ user, isAuthenticated, loading, login, logout }),
    [user, isAuthenticated, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
