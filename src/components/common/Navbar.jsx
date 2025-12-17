import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Search, X } from "lucide-react";

const Navbar = ({ onSearch = null, searchPlaceholder = "Rechercher..." }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Déterminer si nous sommes sur la page des utilisateurs
  const isUsersPage = location.pathname.includes("/users");

  // Gérer la soumission de la recherche
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      if (isUsersPage && onSearch) {
        // Si on est sur la page users et qu'on a un callback, on l'utilise
        onSearch(searchTerm);
      } else {
        // Sinon, navigation vers la recherche globale
        navigate(`/search?q=${encodeURIComponent(searchTerm)}`);
      }
    }
  };

  // Effacer la recherche
  const handleClearSearch = () => {
    setSearchTerm("");
    if (isUsersPage && onSearch) {
      onSearch(""); // Notifier la page users qu'on a effacé
    }
  };

  // Gérer le changement de recherche avec debounce
  useEffect(() => {
    if (!isUsersPage) return;

    const timer = setTimeout(() => {
      if (onSearch) {
        onSearch(searchTerm);
      }
    }, 300); // Debounce de 300ms

    return () => clearTimeout(timer);
  }, [searchTerm, isUsersPage, onSearch]);

  // Personnaliser le placeholder selon la page
  const getPlaceholder = () => {
    if (isUsersPage) return "Rechercher un utilisateur...";
    return searchPlaceholder;
  };

  return (
    <nav className="navbar custom-navbar">
      <div className="container-fluid">
        <div className="navbar-brand-section">
          <a href="/" className="navbar-brand">
            MonSite
          </a>
          <span className="navbar-version">v2.0</span>
        </div>

        <form
          className={`search-form ${isSearchFocused ? "focused" : ""}`}
          onSubmit={handleSearchSubmit}
          role="search"
        >
          <div className="search-input-wrapper">
            <Search className="search-icon" size={18} aria-label="Rechercher" />
            <input
              className="search-input"
              type="search"
              placeholder={getPlaceholder()}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setIsSearchFocused(false)}
              aria-label="Rechercher"
            />
            {searchTerm && (
              <button
                type="button"
                className="clear-search-btn"
                onClick={handleClearSearch}
                aria-label="Effacer la recherche"
              >
                <X size={16} />
              </button>
            )}
          </div>

          <button
            className="search-submit-btn"
            type="submit"
            disabled={!searchTerm.trim()}
          >
            Rechercher
          </button>
        </form>

        <div className="navbar-actions">
          <button
            className="navbar-notification-btn"
            aria-label="Notifications"
          >
            <span className="notification-badge">3</span>
            🔔
          </button>
          <div className="navbar-user-menu">
            <div className="user-avatar">AD</div>
            <span className="user-name">Admin</span>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
