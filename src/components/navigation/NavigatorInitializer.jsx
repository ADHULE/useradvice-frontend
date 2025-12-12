/**
 * NavigatorInitializer.jsx
 * Invisible component that initializes global navigation function.
 * Enables goToPath() utility to work from anywhere in the app.
 */

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { initializeNavigator } from "./goToPath";

const NavigatorInitializer = () => {
  // Get navigate function from React Router
  const navigate = useNavigate();

  /**
   * Initialize global navigation function when component mounts.
   * Runs once on component mount due to [navigate] dependency.
   */
  useEffect(() => {
    initializeNavigator(navigate);
  }, [navigate]);

  // This component is invisible - returns null
  return null;
};

export default NavigatorInitializer;
