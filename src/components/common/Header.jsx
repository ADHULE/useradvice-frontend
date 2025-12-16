/**
 * Header.jsx
 * - Affiche Connexion / Inscription si non connecté
 * - Affiche Déconnexion si connecté
 * - Utilise UNE SEULE source de vérité : useAuth
 */

import React from "react";
import { LogIn, UserPlus, LogOut, Sun, Moon } from "lucide-react";

import { goToPath } from "../navigation/goToPath";
import { useThemeGlobal } from "../../context/ThemeContext";
import useAuth from "../../hooks/useAuth";

// Bouton réutilisable
const Button = ({ icon: Icon, label, onClick, className }) => (
  <button className={`btn ${className}`} onClick={onClick}>
    {Icon && <Icon size={18} />}
    <span>{label}</span>
  </button>
);

const Header = () => {
  const { theme, toggleTheme } = useThemeGlobal();
  const { isLoggedIn, logout, user } = useAuth();

  return (
    <header className={`header ${theme}`}>
      {/* LOGO */}
      <button
        className="header-logo cursor-pointer"
        onClick={() => goToPath("/")}
        aria-label="Aller à l'accueil"
      >
        SYSTEME ADHULE
      </button>

      {/* ACTIONS */}
      <div className="header-actions">
        {/* THEME */}
        <button
          onClick={toggleTheme}
          className={`theme-toggle ${theme}`}
          aria-label="Changer de thème"
        >
          {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
        </button>

        {/* AUTH */}
        <div className="auth-buttons">
          {isLoggedIn ? (
            <>
              <span className="user-name">
                {user?.firstname || user?.username}
              </span>

              {/* Déconnexion → redirection vers home */}
              <Button
                icon={LogOut}
                label="Déconnexion"
                className="btn-logout"
                onClick={() => {
                  logout();
                  goToPath("/");
                }}
              />
            </>
          ) : (
            <>
              <Button
                icon={LogIn}
                label="Connexion"
                className="btn-login"
                onClick={() => goToPath("/login")}
              />
              <Button
                icon={UserPlus}
                label="Inscription"
                className="btn-register"
                onClick={() => goToPath("/signup")}
              />
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
