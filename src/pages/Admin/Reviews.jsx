import React, { useState, useEffect, useCallback } from "react";
import {
  Eye,
  Star,
  MessageSquare,
  Users,
  Filter,
  RefreshCw,
  ChevronRight,
  Calendar,
  ThumbsUp,
  ThumbsDown,
  TrendingUp,
  Award,
  Shield,
  CheckCircle,
  XCircle,
  Clock,
  Search,
  BarChart3,
  Download,
  MoreVertical,
  Settings,
  AlertCircle,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Sidebar from "../../components/common/Sidebar";
import ReviewModal from "./ReviewModal";
import Navbar from "../../components/common/Navbar";
import Footer from "../../components/common/Footer";
import { getAllAdvices } from "../../api/adviceApi";

// Composant Carte Avis
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
          <div className="reviews-user-badge">
            {review.fullReview?.userDto?.roleDto?.name?.includes("ADMIN") && (
              <Shield size={10} />
            )}
          </div>
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

        <button className="reviews-card-action">
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

export default function ReviewsDashboard() {
  const [reviews, setReviews] = useState([]);
  const [filteredReviews, setFilteredReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedReview, setSelectedReview] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [ratingFilter, setRatingFilter] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const [stats, setStats] = useState({
    total: 0,
    averageRating: 0,
    positive: 0,
    neutral: 0,
    negative: 0,
  });

  // Formatter la date
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

  // Obtenir les initiales
  const getInitials = useCallback((firstname, lastname) => {
    return `${firstname?.[0] || ""}${lastname?.[0] || ""}`.toUpperCase();
  }, []);

  // Calculer les statistiques
  const calculateStats = useCallback((reviewsList) => {
    const total = reviewsList.length;
    const averageRating =
      total > 0 ? reviewsList.reduce((sum, r) => sum + r.rating, 0) / total : 0;
    const positive = reviewsList.filter((r) => r.rating >= 4).length;
    const neutral = reviewsList.filter((r) => r.rating === 3).length;
    const negative = reviewsList.filter((r) => r.rating < 3).length;

    return { total, averageRating, positive, neutral, negative };
  }, []);

  // Charger les avis
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
      setFilteredReviews(adaptedReviews);
      setStats(calculateStats(adaptedReviews));
    } catch (err) {
      console.error("Erreur lors du chargement des avis:", err);
      setError("Impossible de charger les avis. Veuillez réessayer.");
      setReviews([]);
      setFilteredReviews([]);
    } finally {
      setLoading(false);
    }
  }, [getInitials, formatTimeAgo, calculateStats]);

  // Filtrer et trier les avis
  useEffect(() => {
    let result = [...reviews];

    // Filtre par recherche
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(
        (r) =>
          r.user.toLowerCase().includes(term) ||
          r.message.toLowerCase().includes(term) ||
          r.fullReview?.companyName?.toLowerCase().includes(term)
      );
    }

    // Filtre par note
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

    // Tri
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
    setStats(calculateStats(result));
  }, [searchTerm, ratingFilter, sortBy, reviews, calculateStats]);

  useEffect(() => {
    loadReviews();
  }, [loadReviews]);

  const handleRefresh = () => {
    loadReviews();
  };

  const handleExportData = () => {
    const dataStr = JSON.stringify(filteredReviews, null, 2);
    const dataUri =
      "data:application/json;charset=utf-8," + encodeURIComponent(dataStr);
    const link = document.createElement("a");
    link.href = dataUri;
    link.download = `avis_${new Date().toISOString().split("T")[0]}.json`;
    link.click();
  };

  return (
    <>
      <div className="reviews-dashboard-container">
        <Sidebar />

        <div className="reviews-layout-wrapper">
          <Navbar onSearch={setSearchTerm} />

          <div className="reviews-main-wrapper">
            <main className="reviews-dashboard-main">
              {/* En-tête */}
              <header className="reviews-page-header">
                <div className="reviews-header-content">
                  <div className="reviews-header-text">
                    <motion.h1
                      className="reviews-page-title"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5 }}
                    >
                      <MessageSquare size={32} className="reviews-title-icon" />
                      Gestion des Avis Clients
                    </motion.h1>
                    <motion.p
                      className="reviews-page-subtitle"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 0.1 }}
                    >
                      <Users size={16} className="reviews-subtitle-icon" />
                      Analyse et modération des retours utilisateurs
                    </motion.p>
                  </div>

                  <motion.div
                    className="reviews-header-actions"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                  >
                    <button
                      className="reviews-action-btn secondary"
                      onClick={handleExportData}
                      disabled={filteredReviews.length === 0}
                    >
                      <Download size={16} />
                      Exporter
                    </button>
                    <button
                      className="reviews-action-btn primary"
                      onClick={handleRefresh}
                      disabled={loading}
                    >
                      <RefreshCw
                        size={16}
                        className={loading ? "spinning" : ""}
                      />
                      Actualiser
                    </button>
                  </motion.div>
                </div>

                {/* Statistiques */}
                <motion.div
                  className="reviews-stats-grid"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  <div className="reviews-stat-card total">
                    <div className="reviews-stat-icon-wrapper">
                      <MessageSquare size={24} />
                    </div>
                    <div className="reviews-stat-content">
                      <div className="reviews-stat-value">{stats.total}</div>
                      <div className="reviews-stat-label">Total Avis</div>
                    </div>
                  </div>

                  <div className="reviews-stat-card average">
                    <div className="reviews-stat-icon-wrapper">
                      <Star size={24} />
                    </div>
                    <div className="reviews-stat-content">
                      <div className="reviews-stat-value">
                        {stats.averageRating.toFixed(1)}
                      </div>
                      <div className="reviews-stat-label">Note Moyenne</div>
                    </div>
                  </div>

                  <div className="reviews-stat-card positive">
                    <div className="reviews-stat-icon-wrapper">
                      <ThumbsUp size={24} />
                    </div>
                    <div className="reviews-stat-content">
                      <div className="reviews-stat-value">{stats.positive}</div>
                      <div className="reviews-stat-label">Positifs</div>
                    </div>
                  </div>

                  <div className="reviews-stat-card neutral">
                    <div className="reviews-stat-icon-wrapper">
                      <TrendingUp size={24} />
                    </div>
                    <div className="reviews-stat-content">
                      <div className="reviews-stat-value">{stats.neutral}</div>
                      <div className="reviews-stat-label">Neutres</div>
                    </div>
                  </div>

                  <div className="reviews-stat-card negative">
                    <div className="reviews-stat-icon-wrapper">
                      <ThumbsDown size={24} />
                    </div>
                    <div className="reviews-stat-content">
                      <div className="reviews-stat-value">{stats.negative}</div>
                      <div className="reviews-stat-label">Négatifs</div>
                    </div>
                  </div>
                </motion.div>
              </header>

              {/* Barre d'outils */}
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
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>

                    <div className="reviews-filter-group">
                      <div className="reviews-filter-wrapper">
                        <Filter size={16} className="reviews-filter-icon" />
                        <select
                          className="reviews-filter-select"
                          value={ratingFilter}
                          onChange={(e) => setRatingFilter(e.target.value)}
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
                          onChange={(e) => setSortBy(e.target.value)}
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

              {/* Contenu principal */}
              <div className="reviews-content-section">
                {loading ? (
                  <div className="reviews-loading-container">
                    <div className="reviews-spinner">
                      <RefreshCw size={32} className="spinning" />
                    </div>
                    <p className="reviews-loading-text">
                      <Clock size={16} />
                      Chargement des avis...
                    </p>
                  </div>
                ) : error ? (
                  <div className="reviews-error-container">
                    <div className="reviews-error-icon">
                      <AlertCircle size={48} />
                    </div>
                    <p className="reviews-error-text">{error}</p>
                    <button className="reviews-retry-btn" onClick={loadReviews}>
                      <RefreshCw size={16} />
                      Réessayer
                    </button>
                  </div>
                ) : filteredReviews.length === 0 ? (
                  <div className="reviews-empty-container">
                    <div className="reviews-empty-icon">
                      <MessageSquare size={64} />
                    </div>
                    <p className="reviews-empty-title">Aucun avis trouvé</p>
                    <p className="reviews-empty-subtitle">
                      {searchTerm || ratingFilter !== "all"
                        ? "Modifiez vos critères de recherche"
                        : "Aucun avis n'a été soumis pour le moment"}
                    </p>
                  </div>
                ) : (
                  <>
                    <div className="reviews-cards-grid">
                      {filteredReviews.map((review, index) => (
                        <ReviewCard
                          key={review.id}
                          review={review}
                          onClick={setSelectedReview}
                          index={index}
                        />
                      ))}
                    </div>

                    <div className="reviews-footer-section">
                      <div className="reviews-pagination-info">
                        <MessageSquare size={14} />
                        Affichage de <strong>
                          {filteredReviews.length}
                        </strong>{" "}
                        avis
                        {searchTerm && ` pour "${searchTerm}"`}
                      </div>
                      <div className="reviews-export-reminder">
                        <BarChart3 size={14} />
                        <span>Analysez les tendances de satisfaction</span>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </main>
          </div>
        </div>
      </div>

      <Footer />

      {/* Modal */}
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
}
