import React from "react";
import { motion } from "framer-motion";
import { Clock, ChevronRight } from "lucide-react";

const RecentActivity = () => {
  const activities = [
    {
      id: 1,
      user: "Julie Martin",
      action: "a posté un nouvel avis",
      time: "2 min",
      icon: "👤",
      color: "var(--primary-color)",
    },
    {
      id: 2,
      user: "Signalement",
      action: "sur l'avis #402",
      time: "15 min",
      icon: "⚠️",
      color: "var(--warning-color)",
    },
    {
      id: 3,
      user: "Nouveau compte",
      action: "utilisateur 'Alex' créé",
      time: "1h",
      icon: "✨",
      color: "var(--success-color)",
    },
    {
      id: 4,
      user: "Mise à jour",
      action: "version 2.1.0 déployée",
      time: "3h",
      icon: "🔄",
      color: "var(--info-color)",
    },
    {
      id: 5,
      user: "Backup",
      action: "sauvegarde automatique",
      time: "5h",
      icon: "💾",
      color: "var(--purple)",
    },
  ];

  return (
    <motion.div
      className="dashboard-activity"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.6 }}
    >
      <div className="activity__header">
        <h3 className="activity__title">Activité Récente</h3>
        <button className="activity__view-all">
          Tout voir <ChevronRight size={16} />
        </button>
      </div>

      <div className="activity__list">
        {activities.map((activity, i) => (
          <motion.div
            key={activity.id}
            className="activity__item"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7 + i * 0.1 }}
            whileHover={{ x: 4 }}
          >
            <div
              className="activity__icon"
              style={{ backgroundColor: activity.color }}
            >
              {activity.icon}
            </div>
            <div className="activity__content">
              <p className="activity__text">
                <span className="activity__user">{activity.user}</span>{" "}
                {activity.action}
              </p>
              <span className="activity__time">
                <Clock size={12} /> {activity.time}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default RecentActivity;
