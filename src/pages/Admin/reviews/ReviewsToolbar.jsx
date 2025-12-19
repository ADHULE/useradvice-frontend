import React from "react";
import { Search, Filter, Settings } from "lucide-react";

const ReviewsToolbar = ({
  searchTerm,
  onSearchChange,
  ratingFilter,
  onRatingFilterChange,
  sortBy,
  onSortChange,
}) => {
  return (
    <div className="reviews-toolbar-section">
      <div className="reviews-toolbar-content">
        <div className="reviews-search-filter">
          <div className="reviews-search-wrapper">
            <Search size={18} className="reviews-search-icon" />
            <input
              type="text"
              placeholder="Rechercher un avis..."
              className="reviews-search-input"
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
            />
          </div>

          <div className="reviews-filter-group">
            <div className="reviews-filter-wrapper">
              <Filter size={16} className="reviews-filter-icon" />
              <select
                className="reviews-filter-select"
                value={ratingFilter}
                onChange={(e) => onRatingFilterChange(e.target.value)}
              >
                <option value="all">Tous les avis</option>
                <option value="positive">Positifs (4-5★)</option>
                <option value="neutral">Neutres (3★)</option>
                <option value="negative">Négatifs (1-2★)</option>
              </select>
            </div>

            <div className="reviews-filter-wrapper">
              <Settings size={16} className="reviews-filter-icon" />
              <select
                className="reviews-filter-select"
                value={sortBy}
                onChange={(e) => onSortChange(e.target.value)}
              >
                <option value="newest">Plus récents</option>
                <option value="oldest">Plus anciens</option>
                <option value="rating-high">Note haute</option>
                <option value="rating-low">Note basse</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewsToolbar;
