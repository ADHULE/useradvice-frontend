import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Star,
  Calendar,
  User,
  Building,
  ThumbsUp,
  CheckCircle,
  AlertCircle,
  MessageSquare,
} from "lucide-react";

const ReviewModal = ({ review, onClose }) => {
  if (!review) return null;

  const getSentimentColor = (rating) => {
    if (rating >= 4) return "text-green-600";
    if (rating >= 3) return "text-yellow-600";
    return "text-red-600";
  };

  return (
    <AnimatePresence>
      <motion.div
        className="reviews-modal-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="reviews-modal-content"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="reviews-modal-header">
            <div className="reviews-modal-title">
              <MessageSquare size={24} />
              <h3>Détails de l'avis</h3>
            </div>
            <button className="reviews-modal-close" onClick={onClose}>
              <X size={20} />
            </button>
          </div>

          <div className="reviews-modal-body">
            <div className="reviews-modal-user-info">
              <div className="reviews-modal-avatar">
                <div className="reviews-modal-avatar-circle">
                  {review.initial}
                </div>
              </div>
              <div className="reviews-modal-user-details">
                <h4 className="reviews-modal-user-name">{review.user}</h4>
                <div className="reviews-modal-user-meta">
                  <div className="reviews-modal-meta-item">
                    <Calendar size={14} />
                    <span>Posté le {review.date}</span>
                  </div>
                  {review.fullReview?.userDto?.email && (
                    <div className="reviews-modal-meta-item">
                      <User size={14} />
                      <span>{review.fullReview.userDto.email}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {review.fullReview?.companyName && (
              <div className="reviews-modal-company">
                <Building size={16} />
                <span>{review.fullReview.companyName}</span>
              </div>
            )}

            <div className="reviews-modal-rating-section">
              <div className="reviews-modal-rating-display">
                <div className="reviews-modal-stars">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Star
                      key={index}
                      size={20}
                      fill={index < review.rating ? "#fbbf24" : "none"}
                      color={index < review.rating ? "#fbbf24" : "#e5e7eb"}
                    />
                  ))}
                </div>
                <div
                  className={`reviews-modal-rating-value ${getSentimentColor(
                    review.rating
                  )}`}
                >
                  {review.rating.toFixed(1)}/5
                </div>
              </div>
            </div>

            <div className="reviews-modal-message">
              <h4 className="reviews-modal-message-title">
                <MessageSquare size={18} />
                Message
              </h4>
              <p className="reviews-modal-message-text">{review.message}</p>
            </div>

            {review.fullReview?.category && (
              <div className="reviews-modal-category">
                <span className="reviews-modal-category-label">
                  Catégorie :
                </span>
                <span className="reviews-modal-category-value">
                  {review.fullReview.category}
                </span>
              </div>
            )}

            <div className="reviews-modal-stats">
              {review.fullReview?.helpfulCount !== undefined && (
                <div className="reviews-modal-stat">
                  <ThumbsUp size={16} />
                  <span>
                    {review.fullReview.helpfulCount} personnes ont trouvé cela
                    utile
                  </span>
                </div>
              )}

              {review.fullReview?.verified && (
                <div className="reviews-modal-verified">
                  <CheckCircle size={16} />
                  <span>Avis vérifié</span>
                </div>
              )}
            </div>
          </div>

          <div className="reviews-modal-footer">
            <button
              className="reviews-modal-btn secondary"
              onClick={() => {
                console.log("Signaler l'avis", review.id);
              }}
            >
              <AlertCircle size={16} />
              Signaler
            </button>
            <button
              className="reviews-modal-btn primary"
              onClick={() => {
                console.log("Marquer comme utile", review.id);
              }}
            >
              <ThumbsUp size={16} />
              Marquer comme utile
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ReviewModal;
