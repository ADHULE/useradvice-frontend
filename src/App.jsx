/**
 * App.jsx
 * Root component of the application.
 * Wraps the entire app with ThemeProvider context for theme management.
 * Routes are handled by AppRouter component.
 */

import React from "react";
import AppRouter from "./router/AppRouter";
import { ThemeProvider } from "./context/ThemeContext";

/**
 * Main App component that provides global theme context and routing.
 * @returns {React.ReactElement} App with theme provider and router
 */
function App() {
  return (
    <ThemeProvider>
      <AppRouter />
    </ThemeProvider>
  );
}

export default App;
