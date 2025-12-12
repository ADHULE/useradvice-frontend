// src/context/AuthContext.jsx
import React, { createContext, useContext, useState, useMemo } from "react";
import TokenService from "../Services/TokenService";

// Création du contexte
const AuthContext = createContext(null);

// Fournisseur du contexte
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(!!TokenService.getAccessToken());

  // Fonction login : enregistre le token et l'utilisateur
  const login = (userData, token) => {
    TokenService.saveTokens(token);
    setUser(userData);
    setIsLoggedIn(true);
  };

  // Fonction logout : supprime le token et réinitialise l'état
  const logout = () => {
    TokenService.clearTokens();
    setUser(null);
    setIsLoggedIn(false);
  };

  // Valeur du contexte (mémoïsée pour éviter les re-renders inutiles)
  const value = useMemo(
    () => ({ user, isLoggedIn, login, logout }),
    [user, isLoggedIn]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Hook utilitaire pour accéder facilement au contexte
export const useAuth = () => useContext(AuthContext);
