import React, { useState, useEffect } from "react";
import {
  UserCheck,
  Star,
  Building2,
  UserPlus,
  ShieldCheck,
} from "lucide-react"; // ShieldCheck pour l'admin
import Header from "../../components/common/Header";
import Footer from "../../components/common/Footer";
import { goToPath } from "../../components/navigation/goToPath";
import { logout as apiLogout } from "../../api/userApi";

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
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false); // 🔑 Etat pour le statut admin
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "light";
  });

  // --- Synchronisation avec Login.jsx ---
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    const userStr = localStorage.getItem("user");

    setIsLoggedIn(!!token);

    if (userStr) {
      const user = JSON.parse(userStr);
      // Même logique que dans Login.jsx : vérification du tableau de rôles
      const adminCheck = user?.roles?.some((r) => r.name === "ROLE_ADMIN");
      setIsAdmin(!!adminCheck);
    }
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => setTheme(theme === "light" ? "dark" : "light");

  // 🔑 Redirection selon les mêmes conditions que Login
  const handleGoToReview = () => {
    if (isLoggedIn) {
      if (isAdmin) {
        goToPath("/adminDashBoard"); // Redirection Admin
      } else {
        goToPath("/createReviewPage"); // Redirection Utilisateur
      }
    } else {
      goToPath("/login");
    }
  };

  const handleLogout = async () => {
    try {
      await apiLogout();
    } catch (e) {
      console.warn("Erreur API logout :", e);
    }
    localStorage.removeItem("accessToken");
    localStorage.removeItem("expiresAt");
    localStorage.removeItem("user"); // 🔑 Nettoyage de l'objet user complet
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
                  ? "Accéder au Tableau de Bord Admin" // Texte spécifique Admin
                  : isLoggedIn
                  ? "Accéder à mes Avis"
                  : "Se connecter pour donner un avis"
              }
              className="cta-button"
              icon={isAdmin ? ShieldCheck : UserCheck} // Icône change si admin
              onClick={handleGoToReview}
            />
          </section>

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
