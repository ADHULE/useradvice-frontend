import React from "react";
import { TrendingUp, TrendingDown } from "lucide-react";

const StatCard = ({ title, value, change, icon, trend, color }) => {
  return (
    <div className="reports-stat-card">
      <div className="reports-stat-card__icon" style={{ color }}>
        {icon}
      </div>
      <div className="reports-stat-card__content">
        <div className="reports-stat-card__title">{title}</div>
        <div className="reports-stat-card__value">{value}</div>
        <div
          className={`reports-stat-card__change reports-stat-card__change--${trend}`}
        >
          {trend === "up" ? (
            <TrendingUp size={14} />
          ) : (
            <TrendingDown size={14} />
          )}
          <span>{change}</span>
        </div>
      </div>
    </div>
  );
};

export default StatCard;
