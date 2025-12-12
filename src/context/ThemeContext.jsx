/**
 * ThemeContext.jsx
 * Context for managing theme state across the application (light/dark mode).
 * Provides theme and toggleTheme function to all descendant components.
 */

import React, { createContext, useContext } from "react";
import useTheme from "../hooks/useTheme";

// Create theme context
const ThemeContext = createContext();

/**
 * ThemeProvider component - wraps app with theme context.
 * @param {React.ReactNode} children - Child components
 * @returns {React.ReactElement} Provider component
 */
export const ThemeProvider = ({ children }) => {
  // Get theme state and toggle function from useTheme hook
  const themeData = useTheme();

  return (
    <ThemeContext.Provider value={themeData}>{children}</ThemeContext.Provider>
  );
};

/**
 * Custom hook to access theme context.
 * Must be used inside ThemeProvider.
 * @returns {object} Theme data { theme, toggleTheme }
 */
export const useThemeGlobal = () => useContext(ThemeContext);
