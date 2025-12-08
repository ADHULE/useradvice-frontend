import React, { useState } from "react";
import { Eye, Star } from "lucide-react";
import Sidebar from "../../components/common/Sidebar";
import ReviewModal from "./ReviewModal";
import Navbar from "../../components/common/Navbar";

export default function Reviews() {
  const [selectedReview, setSelectedReview] = useState(null);

  const reviewsData = [
    {
      id: 1,
      user: "Jean",
      initial: "J",
      rating: 5,
      message:
        "Super plateforme ! J'ai adoré l'expérience utilisateur et la rapidité du service client.",
      date: "Il y a 2h",
    },
    {
      id: 2,
      user: "Marie",
      initial: "M",
      rating: 4,
      message: "Interface moderne et fluide. Quelques bugs mineurs sur mobile.",
      date: "Il y a 5h",
    },
  ];

  return (
    <div className="admin-layout-wrapper">
      <Navbar />
      <div className="admin-flex-container">
        <Sidebar />
        <main className="admin-page reviews-page">
          <header className="page-header">
            <h1>Consultation des Avis</h1>
          </header>

          <div className="review-list">
            {reviewsData.map((r) => (
              <div className="review-card" key={r.id}>
                <div className="review-header">
                  <div className="avatar">{r.initial}</div>
                  <div className="review-info">
                    <h3>{r.user}</h3>
                    <span className="date">{r.date}</span>
                  </div>
                </div>

                {/* Aperçu du rating */}
                <div className="stars-row">
                  {[new Array(5)].map((post, index) => (
                    <Star
                      key={post.index}
                      size={16}
                      fill={index < r.rating ? "#fbbf24" : "none"}
                      color={index < r.rating ? "#fbbf24" : "var(--border)"}
                    />
                  ))}
                </div>

                {/* Bouton lecture */}
                <button
                  className="btn-action read"
                  onClick={() => setSelectedReview(r)}
                  aria-label={`Lire l'avis de ${r.user}`}
                >
                  <Eye size={20} />
                </button>
              </div>
            ))}
          </div>

          {/* Modal */}
          <ReviewModal
            review={selectedReview}
            onClose={() => setSelectedReview(null)}
          />
        </main>
      </div>
    </div>
  );
}
