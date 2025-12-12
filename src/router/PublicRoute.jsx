/**
 * PublicRoute.jsx
 * Route component for public pages that should not be accessible to authenticated users.
 * Automatically redirects authenticated users to home page.
 */

import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

/**
 * PublicRoute component that renders public pages or redirects authenticated users.
 * Waits for auth initialization before rendering to prevent redirect flashing.
 *
 * @returns {React.ReactElement} Loading state, redirect, or public page outlet
 *
 * @example
 * // Usage in router:
 * // <Route element={<PublicRoute />}>
 * //   <Route path="/login" element={<Login />} />
 * //   <Route path="/signup" element={<Signup />} />
 * // </Route>
 */
const PublicRoute = () => {
  // Get user authentication state and loading status
  const { user, isLoading } = useAuth();

  // Show loading indicator while authentication is being verified
  if (isLoading) {
    return <div>Initialisation de l'utilisateur...</div>;
  }

  // If user is already authenticated, redirect to home page
  if (user) {
    return <Navigate to="/" replace />;
  }

  // User is not authenticated - render the public page
  return <Outlet />;
};

export default PublicRoute;
