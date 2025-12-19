import React from "react";
import {
  MessageSquare,
  Star,
  ThumbsUp,
  TrendingUp,
  ThumbsDown,
} from "lucide-react";

const ReviewStatsCard = ({ type, value, label }) => {
  const getConfig = () => {
    const configs = {
      total: {
        icon: <MessageSquare size={24} />,
        color: "var(--primary-color)",
        bgColor: "rgba(67, 97, 238, 0.1)",
      },
      average: {
        icon: <Star size={24} />,
        color: "var(--warning-color)",
        bgColor: "rgba(245, 158, 11, 0.1)",
      },
      positive: {
        icon: <ThumbsUp size={24} />,
        color: "var(--success-color)",
        bgColor: "rgba(16, 185, 129, 0.1)",
      },
      neutral: {
        icon: <TrendingUp size={24} />,
        color: "var(--info-color)",
        bgColor: "rgba(59, 130, 246, 0.1)",
      },
      negative: {
        icon: <ThumbsDown size={24} />,
        color: "var(--danger-color)",
        bgColor: "rgba(239, 68, 68, 0.1)",
      },
    };
    return configs[type] || configs.total;
  };

  const config = getConfig();

  return (
    <div className={`reviews-stat-card ${type}`}>
      <div
        className="reviews-stat-icon-wrapper"
        style={{
          backgroundColor: config.bgColor,
          color: config.color,
        }}
      >
        {config.icon}
      </div>
      <div className="reviews-stat-content">
        <div className="reviews-stat-value">{value}</div>
        <div className="reviews-stat-label">{label}</div>
      </div>
    </div>
  );
};

export default ReviewStatsCard;
