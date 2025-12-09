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
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const location = useLocation();

  // Détection du responsive (Mobile vs Desktop)
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      if (mobile) setIsCollapsed(false);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const menuItems = [
    { icon: <LayoutDashboard size={22} />, label: "Dashboard", path: "/stats" },
    {
      icon: <MessageSquare size={22} />,
      label: "Avis Clients",
      path: "/reviews",
    },
    { icon: <Users size={22} />, label: "Utilisateurs", path: "/users" },
    { icon: <Settings size={22} />, label: "Réglages", path: "/settings" },
  ];

  return (
    <motion.aside
      className={`admin-sidebar ${isCollapsed ? "collapsed" : ""} ${
        isMobile ? "mobile" : ""
      }`}
      initial={false}
      animate={{
        width: isMobile ? "100%" : isCollapsed ? 80 : 260,
        height: isMobile ? "auto" : "100vh",
      }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      {/* Bouton Toggle (Desktop uniquement) */}
      {!isMobile && (
        <button
          className="toggle-btn"
          onClick={() => setIsCollapsed(!isCollapsed)}
          aria-label="Réduire la barre"
        >
          {isCollapsed ? <Menu size={20} /> : <ChevronLeft size={20} />}
        </button>
      )}

      {/* Header / Logo */}
      <div className="sidebar-header">
        <div className="logo-icon">A</div>
        <AnimatePresence>
          {!isCollapsed && (
            <motion.span
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0 }}
              className="logo-text"
            >
              ADHULE
            </motion.span>
          )}
        </AnimatePresence>
      </div>

      {/* Navigation principale */}
      <nav className="sidebar-nav">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`nav-item ${isActive ? "active" : ""}`}
            >
              <span className="icon">{item.icon}</span>
              {!isCollapsed && (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="label"
                >
                  {item.label}
                </motion.span>
              )}
              {isActive && !isCollapsed && (
                <motion.div layoutId="activeNav" className="active-indicator" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Footer : Retour à l'accueil uniquement */}
      <div className="sidebar-footer">
        <Link to="/" className="nav-item home-link">
          <span className="icon">
            <HomeIcon size={22} />
          </span>
          {!isCollapsed && <span className="label">Retour Accueil</span>}
        </Link>
      </div>
    </motion.aside>
  );
};

export default Sidebar;
