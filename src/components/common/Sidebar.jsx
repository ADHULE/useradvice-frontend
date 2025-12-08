import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom"; // Import nécessaire pour détecter l'URL
import {
  LayoutDashboard,
  MessageSquare,
  Users,
  Settings,
  LogOut,
  ChevronLeft,
  Menu,
} from "lucide-react";
import { motion } from "framer-motion";
import { goToPath } from "../navigation/goToPath";

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const location = useLocation(); // Hook pour obtenir le chemin actuel (ex: "/stats")

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const menuItems = [
    {
      icon: <LayoutDashboard size={22} />,
      label: "Dashboard",
      path: "/stats", // Ajout du chemin pour comparaison
      action: () => goToPath("/stats"),
    },
    {
      icon: <MessageSquare size={22} />,
      label: "Avis Clients",
      path: "/reviews",
      action: () => goToPath("/reviews"),
    },
    {
      icon: <Users size={22} />,
      label: "Utilisateurs",
      path: "/users",
      action: () => goToPath("/users"),
    },
    {
      icon: <Settings size={22} />,
      label: "Réglages",
      path: "/settings",
      action: () => goToPath("/settings"),
    },
  ];

  return (
    <motion.aside
      className={`admin-sidebar ${isCollapsed ? "collapsed" : ""} ${
        isMobile ? "mobile" : ""
      }`}
      animate={{ width: isMobile ? "100%" : isCollapsed ? 80 : 260 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      {!isMobile && (
        <button
          className="toggle-btn"
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          {isCollapsed ? <Menu size={20} /> : <ChevronLeft size={20} />}
        </button>
      )}

      <div className="sidebar-header">
        <div className="logo-icon">A</div>
        {!isCollapsed && !isMobile && (
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="logo-text"
          >
            ADHULE
          </motion.span>
        )}
      </div>

      <nav className="sidebar-nav">
        {menuItems.map((item, index) => {
          // Vérifie si le chemin actuel correspond à l'item
          const isActive = location.pathname === item.path;

          return (
            <button
              key={index}
              className={`nav-item ${isActive ? "active" : ""}`} // Classe active dynamique
              onClick={item.action}
            >
              <span className="icon">{item.icon}</span>
              {!isCollapsed && !isMobile && (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="label"
                >
                  {item.label}
                </motion.span>
              )}
              {/* Indicateur visuel (optionnel) */}
              {isActive && !isCollapsed && (
                <motion.div layoutId="activeNav" className="active-indicator" />
              )}
            </button>
          );
        })}
      </nav>

      {!isMobile && (
        <div className="sidebar-footer">
          <button className="logout-btn">
            <LogOut size={22} />
            {!isCollapsed && <span>Déconnexion</span>}
          </button>
        </div>
      )}
    </motion.aside>
  );
};

export default Sidebar;
