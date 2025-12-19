import React from "react";
import { Clock } from "lucide-react";

const ReportsActivity = () => {
  const activities = [
    {
      id: 1,
      action: "Rapport financier exporté en PDF",
      user: "Pierre Lefèvre",
      time: "2 min",
      type: "export",
    },
    {
      id: 2,
      action: "Nouveau rapport analytics créé",
      user: "Sophie Martin",
      time: "15 min",
      type: "create",
    },
    {
      id: 3,
      action: "Rapport utilisateurs partagé avec l'équipe",
      user: "Marc Dubois",
      time: "1h",
      type: "share",
    },
    {
      id: 4,
      action: "Rapport performance mis à jour",
      user: "Julie Petit",
      time: "3h",
      type: "update",
    },
    {
      id: 5,
      action: "Rapport obsolète supprimé",
      user: "Admin System",
      time: "5h",
      type: "delete",
    },
    {
      id: 6,
      action: "Planification automatique exécutée",
      user: "Système",
      time: "1 jour",
      type: "system",
    },
  ];

  const getActivityColor = (type) => {
    switch (type) {
      case "create":
        return "#4361ee";
      case "export":
        return "#4cc9f0";
      case "share":
        return "#7209b7";
      case "update":
        return "#f72585";
      case "delete":
        return "#ef4444";
      case "system":
        return "#10b981";
      default:
        return "#6b7280";
    }
  };

  return (
    <div className="reports-activity">
      <h4 className="reports-activity__title">
        <Clock size={18} />
        Activité Récente
      </h4>
      <div className="reports-activity__list">
        {activities.map((activity) => (
          <div key={activity.id} className="reports-activity__item">
            <div
              className="reports-activity__dot"
              style={{ backgroundColor: getActivityColor(activity.type) }}
            />
            <div className="reports-activity__content">
              <div className="reports-activity__text">
                <span className="reports-activity__user">{activity.user}</span>{" "}
                {activity.action}
              </div>
              <div className="reports-activity__time">{activity.time}</div>
            </div>
          </div>
        ))}
      </div>
      <button className="reports-activity__view-all">
        Voir toute l'activité →
      </button>
    </div>
  );
};

export default ReportsActivity;
