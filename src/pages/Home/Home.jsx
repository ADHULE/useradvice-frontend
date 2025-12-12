/**
 * Home.jsx
 * Page d'accueil de l'application.
 * Affiche un contenu différent selon le statut d'authentification (invité, utilisateur, admin).
 * Gère le changement de thème et la vérification du rôle admin.
 */

import React, { useState, useEffect } from "react";
import {
  UserCheck,
  Star,
  Building2,
  UserPlus,
  ShieldCheck,
} from "lucide-react"; // Icônes Lucide
import Header from "../../components/common/Header";
import Footer from "../../components/common/Footer";
import { goToPath } from "../../components/navigation/goToPath";
import { logout as apiLogout } from "../../api/userApi";

/**
 * Bouton réutilisable pour la navigation.
 * Affiche une icône + label avec effets de hover.
 */
const ButtonGoTo = ({ label, className, icon: Icon, onClick }) => (
  <button
    className={`px-4 py-2 font-semibold text-sm rounded-lg shadow-md transition-all duration-300 flex items-center justify-center space-x-2 ${className}`}
    onClick={onClick}
  >
    {Icon && <Icon size={18} />}
    <span>{label}</span>
  </button>
);

const Home = () => {
  // État d'authentification
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  // État du thème (light/dark), initialisé depuis localStorage
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "light";
  });

  /**
   * Synchroniser l'état d'authentification avec localStorage au montage.
   * Vérifie la présence du token et le rôle de l'utilisateur.
   */
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    const userStr = localStorage.getItem("user");

    setIsLoggedIn(!!token);

    if (userStr) {
      try {
        const user = JSON.parse(userStr);
        const adminCheck = user?.roles?.some((r) => r.name === "ROLE_ADMIN");
        setIsAdmin(!!adminCheck);
      } catch (e) {
        console.warn("Erreur parsing user depuis localStorage :", e);
        setIsAdmin(false);
      }
    }
  }, []);

  /**
   * Appliquer le thème au document root et le sauvegarder dans localStorage.
   */
  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => setTheme(theme === "light" ? "dark" : "light");

  /**
   * Redirection selon le rôle et le statut de connexion.
   */
  const handleGoToReview = () => {
    if (isLoggedIn) {
      if (isAdmin) {
        goToPath("/adminDashboard");
      } else {
        goToPath("/createReviewPage");
      }
    } else {
      goToPath("/login");
    }
  };

  /**
   * Déconnexion : appel API + nettoyage localStorage.
   */
  const handleLogout = async () => {
    try {
      await apiLogout();
    } catch (e) {
      console.warn("Erreur API logout :", e);
    }
    localStorage.removeItem("accessToken");
    localStorage.removeItem("expiresAt");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    setIsAdmin(false);
    goToPath("/");
  };

  const heroImage =
    "https://placehold.co/1000x400/3B82F6/FFFFFF/png?text=SYSTEME+ADHULE";

  return (
    <>
      <div className="home-container">
        <Header
          isLoggedIn={isLoggedIn}
          onLogout={handleLogout}
          theme={theme}
          toggleTheme={toggleTheme}
        />
        <main className="main-content-presentation">
          {/* Section Hero */}
          <section
            className="hero-section"
            style={{
              backgroundImage: `url(${heroImage})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              minHeight: "300px",
            }}
          >
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4 dark:text-white">
              Bienvenue sur la plateforme d'avis
            </h1>
            <p className="hero-tagline">
              Partagez votre expérience et aidez-nous à bâtir l'excellence.
            </p>

            <ButtonGoTo
              label={
                isAdmin
                  ? "Accéder au Tableau de Bord Admin"
                  : isLoggedIn
                  ? "Accéder à mes Avis"
                  : "Se connecter pour donner un avis"
              }
              className="cta-button"
              icon={isAdmin ? ShieldCheck : UserCheck}
              onClick={handleGoToReview}
            />
          </section>

          {/* Section Info */}
          <section className="info-section">
            <div className="info-card">
              <Star className="info-icon" />
              <h3>Notre Engagement</h3>
              <p>Transparence et honnêteté pour chaque avis vérifié.</p>
            </div>
            <div className="info-card">
              <Building2 className="info-icon" />
              <h3>À Propos</h3>
              <p>SYSTEME ADHULE fournit des solutions de haute qualité.</p>
            </div>
            <div className="info-card">
              <UserPlus className="info-icon" />
              <h3>Espace Membre</h3>
              <p>
                Suivez vos contributions et contactez le support facilement.
              </p>
            </div>
          </section>
        </main>
      </div>
      <Footer />
    </>
  );
};

export default Home;
