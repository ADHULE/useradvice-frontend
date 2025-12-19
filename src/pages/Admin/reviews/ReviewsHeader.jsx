import React from "react";
import { motion } from "framer-motion";
import { MessageSquare, Users, Download, RefreshCw } from "lucide-react";

const ReviewsHeader = ({
  onRefresh,
  onExport,
  loading,
  hasReviews,
  searchTerm,
}) => {
  const handleExportData = () => {
    if (onExport) onExport();
  };

  return (
    <header className="reviews-page-header">
      <div className="reviews-header-content">
        <div className="reviews-header-text">
          <motion.h1
            className="reviews-page-title"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <MessageSquare size={32} className="reviews-title-icon" />
            Gestion des Avis Clients
          </motion.h1>
          <motion.p
            className="reviews-page-subtitle"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Users size={16} className="reviews-subtitle-icon" />
            Analyse et modération des retours utilisateurs
          </motion.p>
        </div>

        <motion.div
          className="reviews-header-actions"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <button
            className="reviews-action-btn secondary"
            onClick={handleExportData}
            disabled={!hasReviews}
            title="Exporter les données"
          >
            <Download size={16} />
            Exporter
          </button>
          <button
            className="reviews-action-btn primary"
            onClick={onRefresh}
            disabled={loading}
            title="Actualiser les avis"
          >
            <RefreshCw size={16} className={loading ? "spinning" : ""} />
            Actualiser
          </button>
        </motion.div>
      </div>
    </header>
  );
};

export default ReviewsHeader;
