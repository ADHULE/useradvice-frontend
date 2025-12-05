// src/pages/CreateReviewPage.jsx

import React, { useEffect } from "react";
import { Link, Outlet } from "react-router-dom";
import { FaPlusCircle, FaListAlt, FaBullhorn, FaHome } from "react-icons/fa"; // Nouvelles icônes
import { motion } from "framer-motion"; // Animation de base
import $ from "jquery"; // ⬅️ Importation de jQuery

const CreateReviewPage = () => {
  //Utilisation de jQuery pour une animation simple (non standard en React)
  useEffect(() => {
    // Animation simple : fait rebondir les liens au chargement
    $(".nav-link")
      .hide()
      .each(function (index) {
        $(this)
          .delay(200 * index)
          .fadeIn(600)
          .css({
            position: "relative",
            top: 10,
          })
          .animate(
            {
              top: 0,
            },
            300
          );
      });

    // Nettoyage : retirer les effets DOM ajoutés par jQuery si le composant se démonte
    return () => {
      // (Aucun nettoyage spécifique nécessaire ici pour fade/animate, mais bonne pratique)
    };
  }, []); // S'exécute une seule fois après le rendu initial

  return (
    <div className="create-review-container">
      {/* Animation de l'en-tête */}
      <motion.header
        className="create-review-header"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1>
          <FaBullhorn className="header-icon" /> Espace Avis Client
        </h1>
        <p className="subtitle">
          Bienvenue dans votre espace de création d’avis. Choisissez une option
          ci-dessous.
        </p>
      </motion.header>

      <hr className="divider" />

      {/* Animation de la navigation */}
      <motion.nav
        className="create-review-nav"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        <Link to="/" className="nav-link home-link">
          <FaHome className="link-icon" /> Accueil
        </Link>
        <Link to="/adviceCreate" className="nav-link action-link">
          <FaPlusCircle className="link-icon" /> Nouvel Avis
        </Link>
        <Link to="list" className="nav-link list-link">
          <FaListAlt className="link-icon" /> Mes Avis
        </Link>
      </motion.nav>

      <main className="create-review-content">
        {/* Outlet pour afficher les sous-pages (new, list, edit) */}
        {/* Animation de l'Outlet à l'apparition */}
        <motion.div
          key={location.pathname} // Forcer l'animation lors du changement de route enfant
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.3 }}
        >
          <Outlet />
        </motion.div>
      </main>
    </div>
  );
};

export default CreateReviewPage;
