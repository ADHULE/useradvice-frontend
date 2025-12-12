import React from "react";
import { motion } from "framer-motion";

/**
 * Loader
 * Un composant de chargement réutilisable avec animations
 *
 * Props :
 *  - size : taille du loader ("sm", "md", "lg")
 *  - color : couleur du loader (nom de classe CSS ou couleur directe)
 *  - text : texte à afficher sous le loader (optionnel)
 *  - fullScreen : booléen pour afficher en plein écran (overlay)
 *  - className : classes CSS additionnelles
 */
const Loader = ({
  size = "md",
  color = "primary",
  text = "Chargement...",
  fullScreen = false,
  className = "",
}) => {
  // Classes CSS pour la taille
  const sizeClasses = {
    sm: "loader-sm",
    md: "loader-md",
    lg: "loader-lg",
  };

  // Classes CSS pour la couleur
  const colorClasses = {
    primary: "loader-primary",
    secondary: "loader-secondary",
    white: "loader-white",
    dark: "loader-dark",
  };

  const loaderContent = (
    <div className={`loader-container ${sizeClasses[size]} ${className}`}>
      <motion.div
        className={`loader-spinner ${
          colorClasses[color] || colorClasses.primary
        }`}
        animate={{
          rotate: 360,
        }}
        transition={{
          duration: 1,
          repeat: Infinity,
          ease: "linear",
        }}
      />
      {text && <p className="loader-text">{text}</p>}
    </div>
  );

  if (fullScreen) {
    return <div className="loader-fullscreen">{loaderContent}</div>;
  }

  return loaderContent;
};

export default Loader;

/**
 * PageLoader
 * Un loader optimisé pour les pages entières
 */
export const PageLoader = ({ text = "Chargement de la page..." }) => (
  <Loader size="lg" text={text} fullScreen={true} className="page-loader" />
);

/**
 * ButtonLoader
 * Un loader compact pour les boutons
 */
export const ButtonLoader = ({ size = "sm", color = "white" }) => (
  <Loader size={size} color={color} className="button-loader" />
);
