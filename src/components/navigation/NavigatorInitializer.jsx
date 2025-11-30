import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { initializeNavigator } from "./goToPath";

const NavigatorInitializer = () => {
  const navigate = useNavigate();

  useEffect(() => {
    initializeNavigator(navigate);
  }, [navigate]);

  return null; // composant invisible
};

export default NavigatorInitializer;
