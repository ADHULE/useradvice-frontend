import React, { useState, useEffect, useCallback } from "react";
import { AnimatePresence } from "framer-motion";

// API
import { getAllAdvices } from "../../../api/adviceApi";

// Composants communs
import Sidebar from "../../../components/common/Sidebar";
import Navbar from "../../../components/common/Navbar";
import Footer from "../../../components/common/Footer";

// Composants reviews depuis l'index
import {
  ReviewsHeader,
  ReviewsStats,
  ReviewsToolbar,
  ReviewsContent,
  ReviewModal,
  LoadingState,
  ErrorState,
  EmptyState,
} from "../../Admin/reviews";

// Utilitaires
const useReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const formatTimeAgo = useCallback((isoDate) => {
    if (!isoDate) return "Date inconnue";
    const now = new Date();
    const past = new Date(isoDate);
    const diffInMinutes = Math.floor((now - past) / (1000 * 60));

    if (diffInMinutes < 60) {
      return `Il y a ${diffInMinutes} min`;
    }
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) {
      return `Il y a ${diffInHours}h`;
    }
    const diffInDays = Math.floor(diffInHours / 24);
    return `Il y a ${diffInDays}j`;
  }, []);

  const getInitials = useCallback((firstname, lastname) => {
    return `${firstname?.[0] || ""}${lastname?.[0] || ""}`.toUpperCase();
  }, []);

  const calculateStats = useCallback((reviewsList) => {
    const total = reviewsList.length;
    const averageRating =
      total > 0 ? reviewsList.reduce((sum, r) => sum + r.rating, 0) / total : 0;
    const positive = reviewsList.filter((r) => r.rating >= 4).length;
    const neutral = reviewsList.filter((r) => r.rating === 3).length;
    const negative = reviewsList.filter((r) => r.rating < 3).length;

    return { total, averageRating, positive, neutral, negative };
  }, []);

  const loadReviews = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await getAllAdvices();
      const adaptedReviews = response.data.map((review) => ({
        id: review.id,
        user: `${review.userDto?.firstname || ""} ${
          review.userDto?.lastname || ""
        }`.trim(),
        initial: getInitials(
          review.userDto?.firstname,
          review.userDto?.lastname
        ),
        message: review.message || "Aucun message",
        rating: review.rating || 3,
        date: formatTimeAgo(review.createdAt),
        fullReview: review,
      }));

      setReviews(adaptedReviews);
    } catch (err) {
      console.error("Erreur lors du chargement des avis:", err);
      setError("Impossible de charger les avis. Veuillez réessayer.");
      setReviews([]);
    } finally {
      setLoading(false);
    }
  }, [getInitials, formatTimeAgo]);

  return {
    reviews,
    loading,
    error,
    loadReviews,
    calculateStats,
  };
};

const useReviewsFilter = (reviews) => {
  const [filteredReviews, setFilteredReviews] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [ratingFilter, setRatingFilter] = useState("all");
  const [sortBy, setSortBy] = useState("newest");

  useEffect(() => {
    let result = [...reviews];

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(
        (r) =>
          r.user.toLowerCase().includes(term) ||
          r.message.toLowerCase().includes(term) ||
          r.fullReview?.companyName?.toLowerCase().includes(term)
      );
    }

    if (ratingFilter !== "all") {
      result = result.filter((r) => {
        switch (ratingFilter) {
          case "positive":
            return r.rating >= 4;
          case "neutral":
            return r.rating === 3;
          case "negative":
            return r.rating < 3;
          default:
            return true;
        }
      });
    }

    result.sort((a, b) => {
      switch (sortBy) {
        case "newest":
          return (
            new Date(b.fullReview?.createdAt) -
            new Date(a.fullReview?.createdAt)
          );
        case "oldest":
          return (
            new Date(a.fullReview?.createdAt) -
            new Date(b.fullReview?.createdAt)
          );
        case "rating-high":
          return b.rating - a.rating;
        case "rating-low":
          return a.rating - b.rating;
        default:
          return 0;
      }
    });

    setFilteredReviews(result);
  }, [searchTerm, ratingFilter, sortBy, reviews]);

  return {
    filteredReviews,
    searchTerm,
    setSearchTerm,
    ratingFilter,
    setRatingFilter,
    sortBy,
    setSortBy,
  };
};

const ReviewsDashboard = () => {
  const [selectedReview, setSelectedReview] = useState(null);

  const { reviews, loading, error, loadReviews, calculateStats } = useReviews();

  const {
    filteredReviews,
    searchTerm,
    setSearchTerm,
    ratingFilter,
    setRatingFilter,
    sortBy,
    setSortBy,
  } = useReviewsFilter(reviews);

  const stats = calculateStats(filteredReviews);

  useEffect(() => {
    loadReviews();
  }, [loadReviews]);

  const handleRefresh = () => {
    loadReviews();
  };

  const handleExportData = () => {
    if (filteredReviews.length === 0) return;

    const dataStr = JSON.stringify(filteredReviews, null, 2);
    const dataUri =
      "data:application/json;charset=utf-8," + encodeURIComponent(dataStr);
    const link = document.createElement("a");
    link.href = dataUri;
    link.download = `avis_${new Date().toISOString().split("T")[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleSearchChange = (value) => {
    setSearchTerm(value);
  };

  const handleReviewClick = (review) => {
    setSelectedReview(review);
  };

  const handleRetry = () => {
    loadReviews();
  };

  const renderContent = () => {
    if (loading) {
      return <LoadingState />;
    }

    if (error) {
      return <ErrorState error={error} onRetry={handleRetry} />;
    }

    if (filteredReviews.length === 0) {
      return <EmptyState searchTerm={searchTerm} ratingFilter={ratingFilter} />;
    }

    return (
      <ReviewsContent
        reviews={filteredReviews}
        onReviewClick={handleReviewClick}
      />
    );
  };

  return (
    <>
      <div className="reviews-dashboard-container">
        <Sidebar />

        <div className="reviews-layout-wrapper">
          <Navbar onSearch={setSearchTerm} />

          <div className="reviews-main-wrapper">
            <main className="reviews-dashboard-main">
              <ReviewsHeader
                onRefresh={handleRefresh}
                onExport={handleExportData}
                loading={loading}
                hasReviews={filteredReviews.length > 0}
                searchTerm={searchTerm}
              />

              <ReviewsStats stats={stats} />

              <ReviewsToolbar
                searchTerm={searchTerm}
                onSearchChange={handleSearchChange}
                ratingFilter={ratingFilter}
                onRatingFilterChange={setRatingFilter}
                sortBy={sortBy}
                onSortChange={setSortBy}
              />

              {renderContent()}
            </main>
          </div>
        </div>
      </div>

      <Footer />

      <AnimatePresence>
        {selectedReview && (
          <ReviewModal
            review={selectedReview}
            onClose={() => setSelectedReview(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default ReviewsDashboard;
