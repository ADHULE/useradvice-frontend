/**
 * App.jsx
 * Root component of the application.
 * Wraps the entire app with ThemeProvider and LanguageProvider for theme and language management.
 * Routes are handled by AppRouter component.
 */

import React from "react";
import AppRouter from "./router/AppRouter";
import { ThemeProvider } from "./context/ThemeContext";
import { LanguageProvider } from "./context/LanguageContext";

/**
 * Main App component that provides global theme and language contexts with routing.
 * @returns {React.ReactElement} App with theme provider, language provider and router
 */
function App() {
  return (
    <LanguageProvider>
      <ThemeProvider>
        <AppRouter />
      </ThemeProvider>
    </LanguageProvider>
  );
}

export default App;
