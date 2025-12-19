import React from "react";
import { motion } from "framer-motion";
import {
  DollarSign,
  BarChart3,
  Users,
  TrendingUp,
  CheckCircle,
  Clock,
  AlertCircle,
  Calendar,
  Download,
  Eye,
  ChevronDown,
} from "lucide-react";

const ReportCard = ({
  title,
  date,
  status,
  type,
  author,
  downloads,
  delay = 0,
}) => {
  const getTypeIcon = () => {
    switch (type) {
      case "financial":
        return <DollarSign size={20} />;
      case "analytics":
        return <BarChart3 size={20} />;
      case "user":
        return <Users size={20} />;
      case "performance":
        return <TrendingUp size={20} />;
      default:
        return <BarChart3 size={20} />;
    }
  };

  const getStatusIcon = () => {
    switch (status) {
      case "completed":
        return <CheckCircle size={12} />;
      case "pending":
        return <Clock size={12} />;
      case "error":
        return <AlertCircle size={12} />;
      default:
        return <Clock size={12} />;
    }
  };

  return (
    <motion.div
      className="reports-card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      whileHover={{ scale: 1.02 }}
    >
      <div className="reports-card__header">
        <div className="reports-card__type-icon">{getTypeIcon()}</div>
        <div className={`reports-card__status reports-card__status--${status}`}>
          {getStatusIcon()}
          <span>{status}</span>
        </div>
      </div>

      <div className="reports-card__content">
        <h4 className="reports-card__title">{title}</h4>
        <div className="reports-card__meta">
          <div className="reports-card__meta-item">
            <Calendar size={14} />
            <span>{date}</span>
          </div>
          <div className="reports-card__meta-item">
            <Users size={14} />
            <span>{author}</span>
          </div>
        </div>
      </div>

      <div className="reports-card__footer">
        <div className="reports-card__downloads">
          <Download size={14} />
          <span>{downloads} téléchargements</span>
        </div>
        <div className="reports-card__actions">
          <button
            className="reports-card__action reports-card__action--view"
            title="Voir le rapport"
          >
            <Eye size={16} />
          </button>
          <button
            className="reports-card__action reports-card__action--download"
            title="Télécharger"
          >
            <Download size={16} />
          </button>
          <button
            className="reports-card__action reports-card__action--more"
            title="Plus d'options"
          >
            <ChevronDown size={16} />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ReportCard;
