import React from "react";
import { motion } from "framer-motion";
import { TrendingUp, MoreVertical } from "lucide-react";

const AnalyticsMetric = ({ title, value, change, icon, color, delay = 0 }) => {
  return (
    <motion.div
      className="analytics-metric-card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      whileHover={{ scale: 1.02 }}
    >
      <div className="analytics-metric__header">
        <div
          className="analytics-metric__icon-wrapper"
          style={{ backgroundColor: `${color}15` }}
        >
          <div className="analytics-metric__icon" style={{ color }}>
            {icon}
          </div>
        </div>
        <button className="analytics-metric__menu">
          <MoreVertical size={16} />
        </button>
      </div>

      <div className="analytics-metric__content">
        <h4 className="analytics-metric__title">{title}</h4>
        <div className="analytics-metric__value">{value}</div>
        <div className="analytics-metric__change">
          <TrendingUp size={14} />
          <span style={{ color }}>{change}</span>
        </div>
      </div>

      <div className="analytics-metric__progress">
        <motion.div
          className="analytics-metric__progress-bar"
          initial={{ width: 0 }}
          animate={{ width: "75%" }}
          transition={{ delay: delay + 0.2, duration: 1 }}
          style={{ backgroundColor: color }}
        />
      </div>
    </motion.div>
  );
};

export default AnalyticsMetric;
