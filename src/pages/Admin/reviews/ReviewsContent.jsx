import React from "react";
import { MessageSquare, BarChart3 } from "lucide-react";
import ReviewCard from "./ReviewCard";

const ReviewsContent = ({ reviews, onReviewClick }) => {
  return (
    <div className="reviews-content-section">
      <div className="reviews-cards-grid">
        {reviews.map((review, index) => (
          <ReviewCard
            key={review.id}
            review={review}
            onClick={onReviewClick}
            index={index}
          />
        ))}
      </div>

      <div className="reviews-footer-section">
        <div className="reviews-pagination-info">
          <MessageSquare size={14} />
          Affichage de <strong>{reviews.length}</strong> avis
        </div>
        <div className="reviews-export-reminder">
          <BarChart3 size={14} />
          <span>Analysez les tendances de satisfaction</span>
        </div>
      </div>
    </div>
  );
};

export default ReviewsContent;
