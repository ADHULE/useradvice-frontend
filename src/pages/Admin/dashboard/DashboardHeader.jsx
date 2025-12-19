import React from "react";
import { motion } from "framer-motion";
import { RefreshCw, Calendar, Bell } from "lucide-react";

const DashboardHeader = ({ time, isRefreshing, onRefresh }) => {
  return (
    <header className="dashboard__header">
      <motion.div
        className="dashboard__welcome"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="dashboard__title">
          Bonjour, <span className="dashboard__highlight">Administrateur</span>
        </h1>
        <p className="dashboard__subtitle">
          Voici un aperçu de votre plateforme aujourd'hui à{" "}
          {time.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </p>
      </motion.div>

      <div className="dashboard__actions">
        <button
          className="dashboard-btn dashboard-btn--refresh"
          onClick={onRefresh}
        >
          <RefreshCw size={18} className={isRefreshing ? "refreshing" : ""} />
          Actualiser
        </button>

        <button className="dashboard-btn dashboard-btn--date">
          <Calendar size={18} />
          {time.toLocaleDateString("fr-FR", {
            weekday: "long",
            day: "numeric",
            month: "long",
          })}
        </button>

        <button className="dashboard-btn dashboard-btn--notification">
          <Bell size={18} />
          <span className="notification-badge">3</span>
        </button>
      </div>
    </header>
  );
};

export default DashboardHeader;
