import React, { useState, useEffect } from "react";
import { UserCheck, Star, Building2, UserPlus } from "lucide-react";
import Header from "../../components/common/Header";
import Footer from "../../components/common/Footer";
import { goToPath } from "../../components/navigation/goToPath";

// Bouton réutilisable
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
  const [theme, setTheme] = useState(() => {
    if (typeof localStorage !== "undefined") {
      return localStorage.getItem("theme") || "light";
    }
    return "light";
  });

  // Vérification du token au montage
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  // Gestion du thème
  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
      root.classList.remove("light");
    } else {
      root.classList.add("light");
      root.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => setTheme(theme === "light" ? "dark" : "light");

  const heroImage =
    "https://placehold.co/1000x400/3B82F6/FFFFFF/png?text=SYSTEME+ADHULE";

  // Fonction de navigation sécurisée
  const handleGoToReview = () => {
    if (isLoggedIn) {
      goToPath("/createReviewPage"); // ✅ utilisateur connecté → page avis
    } else {
      goToPath("/login"); // ✅ sinon → page login/inscription
    }
  };

  return (
    <>
      <div className="home-container">
        <Header
          isLoggedIn={isLoggedIn}
          setIsLoggedIn={setIsLoggedIn}
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
              label="Accéder à mon espace Avis"
              className="cta-button"
              icon={UserCheck}
              onClick={handleGoToReview}
            />
          </section>

          <section className="info-section">
            <div className="info-card">
              <Star className="info-icon" />
              <h3>Notre Engagement</h3>
              <p>
                Nous valorisons la transparence et l'honnêteté. Chaque avis est
                une chance de mieux vous servir.
              </p>
            </div>

            <div className="info-card">
              <Building2 className="info-icon" />
              <h3>À Propos de SYSTEME ADHULE</h3>
              <p>
                Leader dans notre domaine, SYSTEME ADHULE s'engage à fournir des
                solutions de haute qualité.
              </p>
            </div>

            <div className="info-card">
              <UserPlus className="info-icon" />
              <h3>Pourquoi créer un compte ?</h3>
              <p>
                Créer un compte vous permet de soumettre des avis vérifiés,
                suivre vos contributions et contacter le support.
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
