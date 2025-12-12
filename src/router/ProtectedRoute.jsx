/**
 * ProtectedRoute.jsx
 * Route protection component that restricts access based on authentication and role.
 * Redirects unauthenticated users to login and blocks users without required role.
 */

import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

/**
 * ProtectedRoute component that guards routes based on authentication and role.
 *
 * @param {Object} props - Component props
 * @param {React.ReactElement} props.element - The component to render if user is authorized
 * @param {string} [props.requiredRole] - Optional role required to access the route
 * @returns {React.ReactElement} Either the protected component or a Navigate redirect
 *
 * @example
 * // Usage in router:
 * // <Route element={<ProtectedRoute element={AdminPage} requiredRole="ADMIN" />} />
 */
const ProtectedRoute = ({ element: Component, requiredRole }) => {
  // Get authentication state and user info from context
  const { isLoggedIn, user } = useContext(AuthContext);

  // Redirect unauthenticated users to login page
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  // Check if user has required role (if specified)
  if (requiredRole && user?.role !== requiredRole) {
    return <Navigate to="/" replace />;
  }

  // User is authenticated and authorized - render the protected component
  return <Component />;
};

export default ProtectedRoute;
