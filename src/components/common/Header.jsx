// src/components/Header.jsx
import React from "react";
import { LogIn, UserPlus, Sun, Moon } from "lucide-react";

import { useThemeGlobal } from "../../context/ThemeContext";
import { goToPath } from "../navigation/goToPath";
import useAuth from "../../hooks/useAuth";

// Bouton réutilisable
const ButtonGoTo = ({ label, className, icon: Icon, onClick }) => (
  <button className={`btn ${className}`} onClick={onClick}>
    {Icon && <Icon size={18} />}
    <span>{label}</span>
  </button>
);

const Header = ({ isLoggedIn, onLogout }) => {
  const { theme, toggleTheme } = useThemeGlobal();
  const { logout } = useAuth(); // récupération de la fonction logout depuis le contexte

  // Gestion des clics sur Connexion / Inscription
  const handleAuthClick = (action) => {
    if (action === "Connexion") goToPath("/login");
    else if (action === "Inscription") goToPath("/signup");
  };

  return (
    <header className={`header ${theme}`}>
      <div className={`header-logo ${theme}`}>SYSTEME ADHULE</div>

      <div className="header-actions">
        {/* Toggle Thème */}
        <button
          onClick={toggleTheme}
          className={`theme-toggle ${theme}`}
          aria-label="Changer de thème"
        >
          {theme === "light" ? (
            <Moon size={20} className="text-gray-900" />
          ) : (
            <Sun size={20} className="text-yellow-400" />
          )}
        </button>

        <div className="auth-buttons">
          {isLoggedIn ? (
            <ButtonGoTo
              label="Déconnexion"
              className="btn-logout"
              icon={LogIn}
              onClick={onLogout || logout} //  utilise la prop si fournie, sinon le logout du contexte
            />
          ) : (
            <>
              <ButtonGoTo
                label="Connexion"
                className={`btn-login ${theme}`}
                icon={LogIn}
                onClick={() => handleAuthClick("Connexion")}
              />
              <ButtonGoTo
                label="Inscription"
                className={`btn-register ${theme}`}
                icon={UserPlus}
                onClick={() => handleAuthClick("Inscription")}
              />
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
