import React, { createContext, useState, useEffect } from "react";

// Crée le contexte
export const ThemeContext = createContext();

//  Crée le provider
export const ThemeProvider = ({ children }) => {
  // état du thème, peut être 'light' ou 'dark'
  const [theme, setTheme] = useState("light");

  // basculer le thème
  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  // Optionnel : sauvegarder le thème dans localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem("appTheme");
    if (savedTheme) setTheme(savedTheme);
  }, []);

  useEffect(() => {
    localStorage.setItem("appTheme", theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
