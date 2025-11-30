import React from "react";

/**
 * ButtonGoTo
 * Un bouton réutilisable qui :
 * - affiche un label
 * - exécute une action selon que l'utilisateur est connecté ou non
 * - redirige vers un chemin (path) SI l'utilisateur est connecté
 *
 * Props :
 *  - label : texte affiché sur le bouton
 *  - className : classes CSS pour le style
 *  - type : type du bouton ("button" ou "submit")
 *  - path : chemin vers lequel on veut aller
 *  - isLoggedIn : booléen indiquant si l'utilisateur est connecté
 *  - onAuthClick : fonction déclenchée pour ouvrir la page/boîte de dialogue de connexion
 */
const ButtonGoTo = ({
  label,
  className = "",
  type = "button",
  path,
  isLoggedIn,
  onAuthClick,
}) => {
  // Fonction exécutée au clic
  const handleClick = () => {
    // Si l'utilisateur est connecté :
    if (isLoggedIn) {
      alert(`Redirection vers : ${path}`);
      // Ici, tu utiliseras navigate(path) si tu utilises React Router
    }
    // Sinon, ouverture de la fenêtre de connexion
    else {
      onAuthClick("Connexion");
    }
  };

  return (
    <button type={type} className={className} onClick={handleClick}>
      {/* Si pas connecté, on ajoute une indication */}
      {isLoggedIn ? label : `${label} (Connexion requise)`}
    </button>
  );
};

export default ButtonGoTo;
