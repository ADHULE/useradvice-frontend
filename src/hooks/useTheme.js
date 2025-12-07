import { useState, useEffect } from "react";

const useTheme = () => {
  const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  // Charger le theme stocké
  useEffect(() => {
    const saved = localStorage.getItem("appTheme");
    if (saved) setTheme(saved);
  }, []);

  // Appliquer et sauvegarder le thème
  useEffect(() => {
    localStorage.setItem("appTheme", theme);

    // 🔥 applique le thème globalement sur toute l'app
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  return { theme, toggleTheme };
};

export default useTheme;
