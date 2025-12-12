// Hook personnalisé pour synchroniser un état React avec localStorage
import { useState, useEffect } from "react";

const useLocalStorage = (key, initialValue) => {
  // Fonction pour lire la valeur initiale
  const readValue = () => {
    if (typeof window === "undefined") return initialValue;

    try {
      const item = window.localStorage.getItem(key);
      console.log("Lire localStorage:", key, item);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.warn(`Erreur lecture localStorage pour la clé "${key}":`, error);
      return initialValue;
    }
  };

  const [value, setValue] = useState(readValue);

  // Sauvegarde automatique dans localStorage à chaque changement
  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.warn(`Erreur écriture localStorage pour la clé "${key}":`, error);
    }
  }, [key, value]);

  return [value, setValue];
};

export default useLocalStorage;
