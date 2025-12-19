import React from "react";
import { motion } from "framer-motion";
import { Eye, Users } from "lucide-react";

const QuickStats = () => {
  const stats = [
    {
      id: 1,
      icon: <Eye size={16} />,
      value: "24.5K",
      label: "Vues",
      color: "var(--primary-color)",
    },
    {
      id: 2,
      icon: <Users size={16} />,
      value: "1.2K",
      label: "Nouveaux",
      color: "var(--success-color)",
    },
    {
      id: 3,
      icon: <Eye size={16} />,
      value: "3.4K",
      label: "Retours",
      color: "var(--warning-color)",
    },
    {
      id: 4,
      icon: <Users size={16} />,
      value: "98%",
      label: "Satisfaction",
      color: "var(--info-color)",
    },
  ];

  return (
    <motion.div
      className="dashboard__quick-stats"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.8 }}
    >
      <h3 className="quick-stats__title">Statistiques Rapides</h3>
      <div className="quick-stats__grid">
        {stats.map((stat) => (
          <div key={stat.id} className="quick-stat">
            <div
              className="quick-stat__icon"
              style={{ background: stat.color }}
            >
              {stat.icon}
            </div>
            <div className="quick-stat__data">
              <span className="quick-stat__value">{stat.value}</span>
              <span className="quick-stat__label">{stat.label}</span>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default QuickStats;
