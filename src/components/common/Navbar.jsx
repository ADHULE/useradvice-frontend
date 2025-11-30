import React from "react";
import {
  FaUserPlus,
  FaSignInAlt,
  FaStar,
  FaBuilding,
  FaHome,
  FaPowerOff,
} from "react-icons/fa";

// NOTE: Ce composant suppose que les classes de Bootstrap sont disponibles (ex: navbar, navbar-expand-lg, btn, etc.)

const AppNavbar = ({ isLoggedIn, onAuthAction }) => {
  return (
    // Utilisation des classes Bootstrap: navbar, navbar-expand-lg, bg-light, shadow-sm
    <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm">
      {/* Nom de l'entreprise/Logo à gauche */}
      <a className="navbar-brand text-primary" href="/">
        <FaBuilding className="me-2" />
        SYSTEME ADHULE
      </a>

      {/* Bouton pour le menu mobile de Bootstrap */}
      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      {/* Liens principaux et boutons d'action */}
      <div className="collapse navbar-collapse" id="navbarNav">
        {/* Liens à gauche (pour les pages publiques ou privées) */}
        <ul className="navbar-nav me-auto">
          <li className="nav-item">
            <a className="nav-link" href="/">
              <FaHome className="me-1" /> Accueil
            </a>
          </li>
          {isLoggedIn && (
            // Liens visibles uniquement si l'utilisateur est connecté
            <li className="nav-item">
              <a className="nav-link text-success" href="/dashboard">
                <FaStar className="me-1" /> Mon Espace Avis
              </a>
            </li>
          )}
        </ul>

        {/* Boutons Connexion/Inscription ou Envoi d'Avis/Déconnexion à droite */}
        <div className="d-flex">
          {isLoggedIn ? (
            // --- ÉTAT CONNECTÉ ---
            <>
              <button
                className="btn btn-success me-2"
                onClick={() => onAuthAction("SendReview")}
              >
                <FaStar className="me-1" /> Envoyer un Avis
              </button>
              <button
                className="btn btn-danger"
                onClick={() => onAuthAction("Logout")}
              >
                <FaPowerOff className="me-1" /> Déconnexion
              </button>
            </>
          ) : (
            // --- ÉTAT DÉCONNECTÉ (Page Home) ---
            <>
              <button
                className="btn btn-outline-primary me-2"
                onClick={() => onAuthAction("Login")}
              >
                <FaSignInAlt className="me-1" /> Connexion
              </button>
              <button
                className="btn btn-primary"
                onClick={() => onAuthAction("Register")}
              >
                <FaUserPlus className="me-1" /> Inscription
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default AppNavbar;
