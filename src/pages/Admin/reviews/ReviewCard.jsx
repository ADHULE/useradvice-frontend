import React, { useState } from "react";
import { motion } from "framer-motion";
import ReviewCard from "./ReviewCard";
import ReviewModal from "./ReviewModal";
import {
  Filter,
  Search,
  ChevronDown,
  AlertCircle,
  RefreshCw,
} from "lucide-react";

const ReviewsDashboard = () => {
  const [selectedReview, setSelectedReview] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Exemple de données (vous pouvez les adapter à vos besoins)
  const reviews = [
    {
      id: 1,
      user: "Jean Dupont",
      initial: "J",
      date: "15 Mars 2024",
      rating: 4,
      message:
        "Excellent service, je recommande vivement ! Le support client est très réactif et les produits sont de qualité. J'ai été particulièrement impressionné par la rapidité de livraison.",
      fullReview: {
        userDto: {
          roleDto: {
            name: "USER",
          },
        },
        companyName: "TechCorp",
        category: "Service Client",
        verified: true,
        helpfulCount: 12,
      },
    },
    {
      id: 2,
      user: "Marie Martin",
      initial: "M",
      date: "14 Mars 2024",
      rating: 5,
      message:
        "Expérience exceptionnelle du début à la fin. Je reviendrai certainement pour mes futurs besoins. L'équipe est professionnelle et les conseils pertinents.",
      fullReview: {
        userDto: {
          roleDto: {
            name: "ADMIN",
          },
        },
        companyName: "InnovStore",
        category: "Expérience",
        verified: false,
        helpfulCount: 8,
      },
    },
    // ... ajoutez d'autres avis
  ];

  const handleViewReview = (review) => {
    setSelectedReview(review);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedReview(null);
  };

  const handleApprove = () => {
    if (selectedReview) {
      console.log("Approuver l'avis:", selectedReview.id);
      // Ici vous pouvez ajouter la logique pour approuver l'avis
      handleCloseModal();
    }
  };

  const handleReport = () => {
    if (selectedReview) {
      console.log("Signaler l'avis:", selectedReview.id);
      // Ici vous pouvez ajouter la logique pour signaler l'avis
      handleCloseModal();
    }
  };

  return (
    <div className="reviews-dashboard">
      {/* Header du dashboard */}
      <div className="reviews-header">
        <div className="reviews-header-left">
          <h1>Gestion des Avis</h1>
          <p className="reviews-subtitle">
            Gérez et modérez les avis des utilisateurs
          </p>
        </div>

        <div className="reviews-header-actions">
          <div className="reviews-search">
            <Search size={18} />
            <input
              type="text"
              placeholder="Rechercher un avis..."
              className="reviews-search-input"
            />
          </div>

          <div className="reviews-filters">
            <button className="reviews-filter-btn">
              <Filter size={16} />
              Filtrer
              <ChevronDown size={14} />
            </button>
            <button className="reviews-refresh-btn">
              <RefreshCw size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Statistiques */}
      <div className="reviews-stats-grid">
        <div className="reviews-stat-card">
          <div className="reviews-stat-content">
            <h3>Total Avis</h3>
            <p className="reviews-stat-number">156</p>
          </div>
          <div className="reviews-stat-icon primary">
            <AlertCircle size={24} />
          </div>
        </div>

        <div className="reviews-stat-card">
          <div className="reviews-stat-content">
            <h3>À Modérer</h3>
            <p className="reviews-stat-number">23</p>
          </div>
          <div className="reviews-stat-icon warning">
            <AlertCircle size={24} />
          </div>
        </div>

        <div className="reviews-stat-card">
          <div className="reviews-stat-content">
            <h3>Signalés</h3>
            <p className="reviews-stat-number">7</p>
          </div>
          <div className="reviews-stat-icon danger">
            <AlertCircle size={24} />
          </div>
        </div>
      </div>

      {/* Liste des avis */}
      <div className="reviews-grid">
        {reviews.map((review, index) => (
          <ReviewCard
            key={review.id}
            review={review}
            onClick={handleViewReview}
            index={index}
          />
        ))}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <ReviewModal review={selectedReview} onClose={handleCloseModal} />
      )}
    </div>
  );
};

export default ReviewsDashboard;
