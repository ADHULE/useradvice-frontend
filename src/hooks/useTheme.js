/**
 * useTheme.js
 * Custom hook to manage application theme (light/dark mode).
 * Features:
 * - Persists theme choice to localStorage
 * - Applies theme to document root element
 * - Provides toggle function to switch themes
 */

import { useState, useEffect } from "react";

/**
 * Custom hook for managing light/dark theme.
 * Syncs theme with localStorage and document element.
 * @returns {object} { theme, toggleTheme } - Current theme and toggle function
 */
const useTheme = () => {
  const [theme, setTheme] = useState("light");

  // Toggle between light and dark theme
  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  // Load theme from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("appTheme");
    if (saved) setTheme(saved);
  }, []);

  // Apply and persist theme whenever it changes
  useEffect(() => {
    // Save to localStorage for persistence across sessions
    localStorage.setItem("appTheme", theme);

    // Apply theme globally to root element using dataset (modern approach)
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  return { theme, toggleTheme };
};

export default useTheme;
