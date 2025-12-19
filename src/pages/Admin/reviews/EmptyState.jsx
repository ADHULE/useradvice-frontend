import React from "react";
import { MessageSquare } from "lucide-react";

const EmptyState = ({ searchTerm, ratingFilter }) => {
  const hasFilters = searchTerm || ratingFilter !== "all";

  return (
    <div className="reviews-empty-container">
      <div className="reviews-empty-icon">
        <MessageSquare size={64} />
      </div>
      <p className="reviews-empty-title">Aucun avis trouvé</p>
      <p className="reviews-empty-subtitle">
        {hasFilters
          ? "Modifiez vos critères de recherche"
          : "Aucun avis n'a été soumis pour le moment"}
      </p>
      {hasFilters && (
        <button className="reviews-clear-filters-btn">
          Effacer tous les filtres
        </button>
      )}
    </div>
  );
};

export default EmptyState;
