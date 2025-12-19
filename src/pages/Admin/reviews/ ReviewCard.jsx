import React from "react";
import { motion } from "framer-motion";
import {
  Star,
  Calendar,
  ThumbsUp,
  ThumbsDown,
  TrendingUp,
  Shield,
  CheckCircle,
  Eye,
  ChevronRight,
  MoreVertical,
} from "lucide-react";

const ReviewCard = ({ review, onClick, index }) => {
  const getSentimentColor = (rating) => {
    if (rating >= 4) return "success";
    if (rating >= 3) return "warning";
    return "danger";
  };

  const getSentimentIcon = (rating) => {
    if (rating >= 4) return <ThumbsUp size={14} />;
    if (rating >= 3) return <TrendingUp size={14} />;
    return <ThumbsDown size={14} />;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className={`reviews-dashboard-card reviews-card-${getSentimentColor(
        review.rating
      )}`}
      onClick={() => onClick(review)}
    >
      <div className="reviews-card-header">
        <div className="reviews-user-avatar">
          <div className="reviews-avatar-circle">{review.initial}</div>
          {review.fullReview?.userDto?.roleDto?.name?.includes("ADMIN") && (
            <div className="reviews-user-badge">
              <Shield size={10} />
            </div>
          )}
        </div>

        <div className="reviews-user-info">
          <h3 className="reviews-user-name">{review.user}</h3>
          <div className="reviews-user-meta">
            <span className="reviews-meta-item">
              <Calendar size={12} />
              {review.date}
            </span>
            {review.fullReview?.companyName && (
              <span className="reviews-meta-item">
                <span>•</span>
                {review.fullReview.companyName}
              </span>
            )}
          </div>
        </div>

        <button
          className="reviews-card-action"
          onClick={(e) => {
            e.stopPropagation();
            console.log("Actions supplémentaires", review.id);
          }}
        >
          <MoreVertical size={18} />
        </button>
      </div>

      <div className="reviews-card-rating">
        <div className="reviews-stars-row">
          {Array.from({ length: 5 }).map((_, index) => (
            <Star
              key={index}
              size={16}
              fill={index < review.rating ? "#fbbf24" : "none"}
              color={index < review.rating ? "#fbbf24" : "#e5e7eb"}
              className="reviews-star-icon"
            />
          ))}
        </div>

        <div
          className={`reviews-sentiment-tag ${getSentimentColor(
            review.rating
          )}`}
        >
          {getSentimentIcon(review.rating)}
          <span>{review.rating.toFixed(1)}/5</span>
        </div>
      </div>

      <div className="reviews-card-content">
        <p className="reviews-message-preview">
          "{review.message.substring(0, 120)}..."
        </p>
        <div className="reviews-content-footer">
          <span className="reviews-read-more">
            Lire plus <ChevronRight size={12} />
          </span>
          {review.fullReview?.category && (
            <span className="reviews-category-tag">
              {review.fullReview.category}
            </span>
          )}
        </div>
      </div>

      <div className="reviews-card-footer">
        <div className="reviews-action-buttons">
          <button
            className="reviews-action-btn primary"
            onClick={(e) => {
              e.stopPropagation();
              onClick(review);
            }}
          >
            <Eye size={16} />
            Consulter
          </button>

          {review.fullReview?.verified && (
            <div className="reviews-verified-badge">
              <CheckCircle size={14} />
              <span>Vérifié</span>
            </div>
          )}
        </div>

        <div className="reviews-stats">
          {review.fullReview?.helpfulCount !== undefined && (
            <div className="reviews-stat-item">
              <ThumbsUp size={12} />
              <span>{review.fullReview.helpfulCount}</span>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ReviewCard;
