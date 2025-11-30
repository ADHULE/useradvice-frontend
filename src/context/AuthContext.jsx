import React, { createContext, useState } from "react";

//  Crée le contexte
export const AuthContext = createContext();

//  Crée le provider
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // info utilisateur
  const [isLoggedIn, setIsLoggedIn] = useState(false); // état de connexion

  // fonction pour se connecter
  const login = (userData) => {
    setUser(userData);
    setIsLoggedIn(true);
  };

  // fonction pour se déconnecter
  const logout = () => {
    setUser(null);
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ user, isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
