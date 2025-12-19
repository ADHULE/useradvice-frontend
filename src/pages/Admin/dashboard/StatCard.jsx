import React from "react";
import { motion } from "framer-motion";
import { TrendingUp, AlertTriangle, Activity } from "lucide-react";

const StatCard = ({ icon, label, value, trend, color, delay = 0 }) => {
  const getTrendIcon = () => {
    switch (trend?.type) {
      case "up":
        return <TrendingUp size={14} />;
      case "down":
        return <AlertTriangle size={14} />;
      case "stable":
        return <Activity size={14} />;
      default:
        return null;
    }
  };

  return (
    <motion.div
      className="dashboard-stat-card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      whileHover={{
        y: -8,
        transition: { type: "spring", stiffness: 300 },
      }}
      style={{ "--stat-color": color }}
    >
      <div className="stat-card__content">
        <div className="stat-card__icon-container">
          <div className="stat-card__icon">{icon}</div>
          <div className="stat-card__glow"></div>
        </div>

        <div className="stat-card__data">
          <h3 className="stat-card__value">{value}</h3>
          <span className="stat-card__label">{label}</span>
        </div>

        {trend && (
          <div className={`stat-card__trend trend--${trend.type}`}>
            {getTrendIcon()}
            <span>{trend.value}</span>
          </div>
        )}
      </div>

      <div className="stat-card__progress">
        <motion.div
          className="stat-card__progress-bar"
          initial={{ width: 0 }}
          animate={{ width: `${trend?.progress || 75}%` }}
          transition={{ delay: delay + 0.2, duration: 1 }}
        />
      </div>

      <div className="stat-card__hover-effect"></div>
    </motion.div>
  );
};

export default StatCard;
