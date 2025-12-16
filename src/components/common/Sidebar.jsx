import React, { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import {
  LayoutDashboard,
  MessageSquare,
  Users,
  Settings,
  ChevronLeft,
  Menu,
  Home as HomeIcon,
  Bell,
  Search,
  User,
  LogOut,
  TrendingUp,
  BarChart3,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [notifications, setNotifications] = useState(3);
  const location = useLocation();

  // Détection responsive avec optimisations
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 1024;
      setIsMobile(mobile);
      if (mobile) {
        setIsCollapsed(true);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    // Effet de parallaxe au scroll
    const handleScroll = () => {
      const sidebar = document.querySelector(".admin-sidebar");
      if (sidebar && !isMobile) {
        const scrolled = window.pageYOffset;
        sidebar.style.transform = `translateY(${scrolled * 0.1}px)`;
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isMobile]);

  // Menu items avec icônes modernes
  const menuItems = [
    {
      icon: <LayoutDashboard size={22} />,
      label: "Dashboard",
      path: "/stats",
      badge: null,
      color: "var(--gradient-primary)",
    },
    {
      icon: <MessageSquare size={22} />,
      label: "Avis Clients",
      path: "/reviews",
      badge: 12,
      color: "var(--gradient-success)",
    },
    {
      icon: <Users size={22} />,
      label: "Utilisateurs",
      path: "/users",
      badge: 5,
      color: "var(--gradient-info)",
    },
    {
      icon: <TrendingUp size={22} />,
      label: "Analytics",
      path: "/analytics",
      badge: null,
      color: "var(--gradient-warning)",
    },
    {
      icon: <BarChart3 size={22} />,
      label: "Rapports",
      path: "/reports",
      badge: null,
      color: "var(--gradient-purple)",
    },
    {
      icon: <Settings size={22} />,
      label: "Réglages",
      path: "/settings",
      badge: null,
      color: "var(--gradient-gray)",
    },
  ];

  // Filtrage des items de menu
  const filteredItems = menuItems.filter((item) =>
    item.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <motion.aside
      className={`admin-sidebar ${isCollapsed ? "collapsed" : ""} ${
        isMobile ? "mobile" : ""
      }`}
      initial={{ x: -300 }}
      animate={{
        x: 0,
        width: isMobile ? "100%" : isCollapsed ? 80 : 280,
      }}
      transition={{
        type: "spring",
        stiffness: 100,
        damping: 20,
      }}
      onMouseEnter={() => !isMobile && setIsHovered(true)}
      onMouseLeave={() => !isMobile && setIsHovered(false)}
      style={{
        background: "var(--sidebar-gradient)",
        boxShadow: "var(--shadow-xl)",
      }}
    >
      {/* Overlay de fond avec effet de verre */}
      <div className="sidebar-glass-effect"></div>

      {/* Header avec logo et actions */}
      <div className="sidebar-header">
        <motion.div
          className="logo-wrapper"
          whileHover={{ rotate: 360 }}
          transition={{ duration: 0.5 }}
        >
          <div className="logo-icon">
            <span>A</span>
            <div className="logo-pulse"></div>
          </div>
        </motion.div>

        <AnimatePresence mode="wait">
          {(!isCollapsed || isHovered) && !isMobile && (
            <motion.div
              className="header-content"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
            >
              <h1 className="logo-text">
                <span className="logo-gradient">ADHULE</span>
                <span className="logo-badge">PRO</span>
              </h1>
              <p className="logo-subtitle">Admin Dashboard</p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Bouton de notification */}
        <div className="notification-wrapper">
          <button
            className="notification-btn"
            onClick={() => setNotifications(0)}
            aria-label={`${notifications} notifications`}
          >
            <Bell size={18} />
            {notifications > 0 && (
              <motion.span
                className="notification-badge"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
              >
                {notifications}
              </motion.span>
            )}
          </button>
        </div>
      </div>

      {/* Barre de recherche (seulement visible quand étendu) */}
      <AnimatePresence>
        {(!isCollapsed || isHovered) && !isMobile && (
          <motion.div
            className="sidebar-search"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
          >
            <div className="search-container">
              <Search size={16} className="search-icon" />
              <input
                type="text"
                placeholder="Rechercher..."
                className="search-input"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <button
                  className="search-clear"
                  onClick={() => setSearchQuery("")}
                  aria-label="Effacer la recherche"
                >
                  ×
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navigation principale */}
      <nav className="sidebar-nav">
        <div className="nav-section">
          <h3 className="section-title">NAVIGATION</h3>
          <div className="nav-items-wrapper">
            {filteredItems.map((item, index) => {
              const isActive = location.pathname === item.path;
              return (
                <motion.div
                  key={item.path}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Link
                    to={item.path}
                    className={`nav-item ${isActive ? "active" : ""}`}
                    style={{
                      "--item-color": item.color,
                    }}
                  >
                    <div className="nav-item-inner">
                      <span className="nav-icon-wrapper">
                        {item.icon}
                        {Boolean(item.badge) && (
                          <span className="item-badge">{item.badge}</span>
                        )}
                      </span>

                      <AnimatePresence>
                        {(!isCollapsed || isHovered) && !isMobile && (
                          <motion.span
                            className="nav-label"
                            initial={{ opacity: 0, width: 0 }}
                            animate={{ opacity: 1, width: "auto" }}
                            exit={{ opacity: 0, width: 0 }}
                          >
                            {item.label}
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Indicateur d'activité */}
                    {isActive && (
                      <motion.div
                        className="active-indicator"
                        layoutId="activeNav"
                        initial={false}
                        transition={{
                          type: "spring",
                          stiffness: 300,
                          damping: 30,
                        }}
                      />
                    )}

                    {/* Effet de halo au survol */}
                    <div className="nav-halo"></div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Footer avec utilisateur et actions */}
      <div className="sidebar-footer">
        <div className="user-profile">
          <div className="avatar-wrapper">
            <div className="user-avatar">
              <User size={18} />
            </div>
            <div className="user-status"></div>
          </div>

          <AnimatePresence>
            {(!isCollapsed || isHovered) && !isMobile && (
              <motion.div
                className="user-info"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
              >
                <span className="user-name">Admin User</span>
                <span className="user-role">Administrateur</span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="footer-actions">
          {/* Bouton Retour Accueil */}
          <Link to="/" className="home-link">
            <HomeIcon size={20} />
            {(!isCollapsed || isHovered) && !isMobile && (
              <span>Retour Accueil</span>
            )}
          </Link>

          {/* Bouton Déconnexion */}
          <button className="logout-btn">
            <LogOut size={20} />
            {(!isCollapsed || isHovered) && !isMobile && (
              <span>Déconnexion</span>
            )}
          </button>
        </div>

        {/* Bouton de toggle sidebar */}
        {!isMobile && (
          <motion.button
            className="sidebar-toggle"
            onClick={() => setIsCollapsed(!isCollapsed)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            aria-label={
              isCollapsed ? "Ouvrir la sidebar" : "Réduire la sidebar"
            }
          >
            {isCollapsed ? <Menu size={20} /> : <ChevronLeft size={20} />}
          </motion.button>
        )}
      </div>

      {/* Effet de particules (optionnel) */}
      <div className="sidebar-particles"></div>
    </motion.aside>
  );
};

export default Sidebar;
