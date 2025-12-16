/**
 * Home.jsx - Version Modernisée
 * Page d'accueil avec design moderne et fonctionnalités avancées
 */

import React, { useState, useEffect } from "react";
import {
  UserCheck,
  Star,
  Building2,
  ShieldCheck,
  ArrowRight,
  TrendingUp,
  MessageSquare,
  Users,
  CheckCircle,
  ChevronRight,
  Award,
  BarChart3,
  Heart,
} from "lucide-react";
import Header from "../../components/common/Header";
import Footer from "../../components/common/Footer";
import { goToPath } from "../../components/navigation/goToPath";
import { logout as apiLogout } from "../../api/userApi";

/**
 * Bouton réutilisable moderne avec effets
 */
const ButtonGoTo = ({
  label,
  className,
  icon: Icon,
  onClick,
  variant = "primary",
}) => {
  const variants = {
    primary:
      "bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700",
    secondary: "bg-white text-blue-600 border border-blue-200 hover:bg-blue-50",
    ghost: "bg-transparent text-gray-600 hover:bg-gray-100",
  };

  return (
    <button
      className={`px-6 py-3 font-semibold rounded-xl transition-all duration-300 flex items-center justify-center space-x-3 shadow-lg hover:shadow-xl active:scale-[0.98] ${variants[variant]} ${className}`}
      onClick={onClick}
    >
      {Icon && <Icon size={20} />}
      <span>{label}</span>
      <ArrowRight size={18} />
    </button>
  );
};

/**
 * Carte de fonctionnalité
 */
const FeatureCard = ({ icon: Icon, title, description, color = "blue" }) => {
  const colors = {
    blue: "from-blue-500 to-cyan-500",
    purple: "from-purple-500 to-pink-500",
    green: "from-emerald-500 to-teal-500",
    orange: "from-orange-500 to-amber-500",
  };

  return (
    <div className="feature-card group">
      <div className={`icon-container ${colors[color]}`}>
        <Icon size={24} />
      </div>
      <h3 className="feature-title">{title}</h3>
      <p className="feature-description">{description}</p>
      <div className="feature-hover-line"></div>
    </div>
  );
};

/**
 * Statistique
 */
const StatItem = ({ value, label, icon: Icon }) => (
  <div className="stat-item">
    <div className="stat-icon">
      <Icon size={20} />
    </div>
    <div className="stat-content">
      <span className="stat-value">{value}</span>
      <span className="stat-label">{label}</span>
    </div>
  </div>
);

const Home = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "light";
  });
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    // Vérification de l'authentification
    const checkAuth = () => {
      setIsLoading(true);
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
      setIsLoading(false);
    };

    checkAuth();

    // Suivi du scroll pour les effets
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

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

  // Données pour les fonctionnalités
  const features = [
    {
      icon: Star,
      title: "Avis Vérifiés",
      description: "Chaque contribution est authentifiée et modérée",
      color: "blue",
    },
    {
      icon: TrendingUp,
      title: "Impact Mesurable",
      description: "Suivez l'impact de vos suggestions en temps réel",
      color: "purple",
    },
    {
      icon: MessageSquare,
      title: "Retour Personnalisé",
      description: "Recevez des retours détaillés sur vos propositions",
      color: "green",
    },
    {
      icon: Users,
      title: "Communauté Engagée",
      description: "Rejoignez une communauté active et constructive",
      color: "orange",
    },
  ];

  // Statistiques (données fictives ou API)
  const stats = [
    { value: "10K+", label: "Avis traités", icon: CheckCircle },
    { value: "95%", label: "Satisfaction", icon: Heart },
    { value: "500+", label: "Améliorations", icon: TrendingUp },
    { value: "24h", label: "Temps de réponse", icon: BarChart3 },
  ];

  return (
    <>
      <div className="home-page">
        {/* Header avec effet de scroll */}
        <Header
          isLoggedIn={isLoggedIn}
          onLogout={handleLogout}
          theme={theme}
          toggleTheme={toggleTheme}
          isScrolled={scrollY > 50}
        />

        {/* Hero Section */}
        <section className="hero-section">
          <div
            className="hero-background"
            style={{ transform: `translateY(${scrollY * 0.5}px)` }}
          >
            <div className="gradient-overlay"></div>
          </div>

          <div className="hero-content">
            <div className="hero-badge">
              <Award size={16} />
              <span>Plateforme certifiée</span>
            </div>

            <h1 className="hero-title">
              <span className="gradient-text">Partagez votre expertise</span>
              <br />
              et façonnez l'avenir avec nous
            </h1>

            <p className="hero-description">
              Une plateforme collaborative où chaque avis compte. Contribuez à
              améliorer nos services et bénéficiez d'un suivi transparent de vos
              propositions.
            </p>

            <div className="hero-actions">
              <ButtonGoTo
                label={
                  isLoading
                    ? "Chargement..."
                    : isAdmin
                    ? "Tableau de bord Admin"
                    : isLoggedIn
                    ? "Accéder à mes avis"
                    : "Commencer maintenant"
                }
                icon={isAdmin ? ShieldCheck : UserCheck}
                onClick={handleGoToReview}
              />

              {!isLoggedIn && (
                <ButtonGoTo
                  label="Découvrir la plateforme"
                  variant="secondary"
                  onClick={() => goToPath("/about")}
                />
              )}
            </div>

            {/* Statistiques */}
            <div className="stats-container">
              {stats.map((stat, index) => (
                <StatItem key={index} {...stat} />
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="features-section">
          <div className="section-header">
            <h2 className="section-title">
              Pourquoi participer à{" "}
              <span className="text-gradient">notre écosystème</span> ?
            </h2>
            <p className="section-subtitle">
              Découvrez comment votre contribution fait la différence
            </p>
          </div>

          <div className="features-grid">
            {features.map((feature, index) => (
              <FeatureCard key={index} {...feature} />
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="cta-section">
          <div className="cta-card">
            <div className="cta-content">
              <h2 className="cta-title">
                Prêt à faire entendre{" "}
                <span className="text-gradient">votre voix</span> ?
              </h2>
              <p className="cta-description">
                Rejoignez des milliers de contributeurs qui façonnent activement
                l'évolution de nos services. Votre opinion compte.
              </p>
              <div className="cta-actions">
                <ButtonGoTo
                  label={
                    isLoggedIn
                      ? "Créer un nouvel avis"
                      : "S'inscrire gratuitement"
                  }
                  onClick={() =>
                    isLoggedIn
                      ? goToPath("/adviceCreate")
                      : goToPath("/register")
                  }
                />
                <button
                  className="cta-link"
                  onClick={() => goToPath("/how-it-works")}
                >
                  Comment ça marche <ChevronRight size={16} />
                </button>
              </div>
            </div>
            <div className="cta-visual">
              <div className="visual-element"></div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section className="about-section">
          <div className="about-content">
            <div className="about-text">
              <h2>
                <Building2 className="inline mr-3" />À propos de{" "}
                <span className="font-bold">SYSTEME ADHULE</span>
              </h2>
              <p>
                Depuis 2015, nous nous engageons à fournir des solutions
                innovantes et de qualité. Notre plateforme d'avis est le reflet
                de notre engagement envers l'amélioration continue et la
                satisfaction client.
              </p>
              <div className="about-values">
                <div className="value-item">
                  <div className="value-icon">✓</div>
                  <span>Transparence totale</span>
                </div>
                <div className="value-item">
                  <div className="value-icon">✓</div>
                  <span>Confidentialité garantie</span>
                </div>
                <div className="value-item">
                  <div className="value-icon">✓</div>
                  <span>Impact mesurable</span>
                </div>
              </div>
            </div>
            <div className="about-image">
              <div className="image-placeholder">
                <Building2 size={48} />
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default Home;
