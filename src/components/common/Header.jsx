// src/components/Header.jsx
import React from "react";
import { LogIn, UserPlus, Sun, Moon, MessageSquareText } from "lucide-react";
import { useNavigate } from "react-router-dom"; // <-- import

const ButtonGoTo = ({ label, className, icon: Icon, onClick }) => (
  <button className={`btn ${className}`} onClick={onClick}>
    {Icon && <Icon size={18} />}
    <span>{label}</span>
  </button>
);

const Header = ({ isLoggedIn, setIsLoggedIn, theme, toggleTheme }) => {
  const navigate = useNavigate();

  const handleAuthClick = (action) => {
    if (action === "Connexion") navigate("/login");
    else if (action === "Inscription") navigate("/signup");
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    console.log("Déconnexion effectuée.");
    navigate("/login");
  };

  return (
    <header className={`header ${theme === "dark" ? "dark" : ""}`}>
      {/* Logo */}
      <div
        className={`header-logo ${theme === "dark" ? "dark" : ""}`}
        onClick={() => navigate("/")}
      >
        SYSTEME ADHULE
      </div>

      {/* Actions */}
      <div className="header-actions">
        {/* Toggle Thème */}
        <button
          onClick={toggleTheme}
          className={`theme-toggle ${theme === "dark" ? "dark" : ""}`}
          aria-label="Toggle theme"
        >
          {theme === "light" ? (
            <Moon size={20} className="text-gray-900" />
          ) : (
            <Sun size={20} className="text-yellow-400" />
          )}
        </button>

        {/* Boutons Auth */}
        <div className="auth-buttons">
          {isLoggedIn ? (
            <>
              <ButtonGoTo
                label="Avis"
                className="btn-submit"
                icon={MessageSquareText}
                onClick={() => navigate("/avis")}
              />
              <ButtonGoTo
                label="Déconnexion"
                className="btn-logout"
                icon={LogIn}
                onClick={handleLogout}
              />
            </>
          ) : (
            <>
              <ButtonGoTo
                label="Connexion"
                className={`btn-login ${theme === "dark" ? "dark" : ""}`}
                icon={LogIn}
                onClick={() => handleAuthClick("Connexion")}
              />
              <ButtonGoTo
                label="Inscription"
                className={`btn-register ${theme === "dark" ? "dark" : ""}`}
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
