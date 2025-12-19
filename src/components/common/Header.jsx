/**
 * Header.jsx - Version moderne avec support multi-langues
 * - Design épuré avec transitions fluides
 * - Responsive et accessible
 * - Utilise UNE SEULE source de vérité : useAuth
 * - Support multi-langues avec useLanguage
 */

import React, { useState, useEffect } from "react";
import {
  LogIn,
  UserPlus,
  LogOut,
  Sun,
  Moon,
  Menu,
  X,
  Home,
  Globe,
  ChevronDown,
  Check,
} from "lucide-react";

import { goToPath } from "../navigation/goToPath";
import { useThemeGlobal } from "../../context/ThemeContext";
import useAuth from "../../hooks/useAuth";
import useLanguage from "../../hooks/useLanguage";

// Bouton réutilisable amélioré
const Button = ({
  icon: Icon,
  label,
  onClick,
  className,
  variant = "primary",
}) => (
  <button
    className={`btn btn-${variant} ${className}`}
    onClick={onClick}
    aria-label={label}
  >
    {Icon && <Icon size={20} />}
    <span className="btn-label">{label}</span>
  </button>
);

// Badge utilisateur
const UserBadge = ({ user }) => (
  <div className="user-badge">
    <div className="user-avatar">
      {user?.firstname?.charAt(0) || user?.username?.charAt(0) || "U"}
    </div>
    <div className="user-info">
      <span className="user-name">{user?.firstname || user?.username}</span>
      {user?.email && <span className="user-email">{user.email}</span>}
    </div>
  </div>
);

// Composant pour le sélecteur de langue
const LanguageSelector = () => {
  const { language, setLanguage, availableLanguages, currentLanguageInfo, t } =
    useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  const handleLanguageChange = (langCode) => {
    setLanguage(langCode);
    setIsOpen(false);
  };

  return (
    <div className="language-selector-wrapper">
      <button
        className="language-selector"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Changer la langue"
        aria-expanded={isOpen}
      >
        <Globe size={18} className="language-icon" />
        <span className="language-code">
          {currentLanguageInfo?.code.toUpperCase()}
        </span>
        <span className="language-name">{currentLanguageInfo?.nativeName}</span>
        <ChevronDown size={16} className={`chevron ${isOpen ? "open" : ""}`} />
      </button>

      {isOpen && (
        <>
          <div
            className="language-dropdown-overlay"
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />
          <div className="language-dropdown">
            <div className="language-dropdown-header">
              <Globe size={16} />
              <span>{t("language.select", "Langue")}</span>
            </div>
            <div className="language-list">
              {availableLanguages.map((lang) => (
                <button
                  key={lang.code}
                  className={`language-option ${
                    language === lang.code ? "selected" : ""
                  }`}
                  onClick={() => handleLanguageChange(lang.code)}
                  aria-label={`Changer en ${lang.nativeName}`}
                >
                  <span className="language-flag">{lang.flag}</span>
                  <div className="language-option-info">
                    <span className="language-option-name">
                      {lang.nativeName}
                    </span>
                    <span className="language-option-country">
                      {lang.country}
                    </span>
                  </div>
                  {language === lang.code && (
                    <Check size={16} className="check-icon" />
                  )}
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

const Header = () => {
  const { theme, toggleTheme } = useThemeGlobal();
  const { isLoggedIn, logout, user } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Gestion du scroll pour l'effet de header flottant
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Fermer le menu mobile en changeant de page
  const handleNavigation = (path) => {
    goToPath(path);
    setIsMenuOpen(false);
  };

  const handleLogout = () => {
    logout();
    goToPath("/");
    setIsMenuOpen(false);
  };

  return (
    <header className={`header ${theme} ${scrolled ? "scrolled" : ""}`}>
      <div className="header-container">
        {/* LOGO et menu mobile */}
        <div className="header-left">
          <button
            className="mobile-menu-toggle"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Ouvrir le menu"
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          <button
            className="header-logo"
            onClick={() => handleNavigation("/")}
            aria-label="Aller à l'accueil"
          >
            <Home size={20} className="logo-icon" />
            <span className="logo-text">SYSTEME ADHULE</span>
            <span className="logo-subtitle">Gestion Premium</span>
          </button>
        </div>

        {/* Navigation desktop */}
        <nav className={`header-nav ${isMenuOpen ? "mobile-open" : ""}`}>
          <div className="nav-content">
            {/* LANGUAGE SELECTOR */}
            <div className="language-section">
              <LanguageSelector />
            </div>

            {/* THEME TOGGLE */}
            <div className="theme-section">
              <button
                onClick={toggleTheme}
                className={`theme-toggle ${theme}`}
                aria-label={`Passer au thème ${
                  theme === "light" ? "sombre" : "clair"
                }`}
              >
                {theme === "light" ? (
                  <>
                    <Moon size={20} />
                    <span>Mode sombre</span>
                  </>
                ) : (
                  <>
                    <Sun size={20} />
                    <span>Mode clair</span>
                  </>
                )}
              </button>
            </div>

            {/* AUTH SECTION */}
            <div className="auth-section">
              {isLoggedIn ? (
                <>
                  <UserBadge user={user} />

                  <div className="auth-buttons">
                    <Button
                      icon={LogOut}
                      label="Déconnexion"
                      variant="outline"
                      className="btn-logout"
                      onClick={handleLogout}
                    />
                  </div>
                </>
              ) : (
                <div className="auth-buttons">
                  <Button
                    icon={LogIn}
                    label="Connexion"
                    variant="outline"
                    className="btn-login"
                    onClick={() => handleNavigation("/login")}
                  />
                  <Button
                    icon={UserPlus}
                    label="Inscription"
                    className="btn-register"
                    onClick={() => handleNavigation("/signup")}
                  />
                </div>
              )}
            </div>
          </div>
        </nav>
      </div>

      {/* Overlay pour menu mobile */}
      {isMenuOpen && (
        <div
          className="mobile-overlay"
          onClick={() => setIsMenuOpen(false)}
          aria-hidden="true"
        />
      )}
    </header>
  );
};

export default Header;
