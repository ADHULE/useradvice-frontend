import React, { useState, useEffect } from "react";
import { Eye, Star } from "lucide-react";
import Sidebar from "../../components/common/Sidebar";
import ReviewModal from "./ReviewModal";
import Navbar from "../../components/common/Navbar";
import Footer from "../../components/common/Footer";

// Importez la fonction API et votre instance d'API (assurez-vous que apiInstance est importé quelque part)
// Assurez-vous d'avoir accès à l'instance 'apiInstance'
// import { apiInstance } from '...';
// Liste tous les avis (admin uniquement)
// export const getAllAdvices = () => { return apiInstance.get("/advices/admin"); };
// Comme je n'ai pas le chemin vers l'apiInstance, je vais simuler l'import de la fonction:
import { getAllAdvices } from "../../api/adviceApi"; // Remplacez 'adviceApi' par le nom de votre fichier API

export default function Reviews() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedReview, setSelectedReview] = useState(null);

  /**
   * Extrait les initiales.
   */
  const getInitials = (firstname, lastname) =>
    `${firstname?.[0] || ""}${lastname?.[0] || ""}`.toUpperCase();

  /**
   * Formatte la date pour afficher "Il y a X temps" (approximation simple).
   */
  const formatTimeAgo = (isoDate) => {
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
    return `Il y a ${diffInDays} j`;
  };

  useEffect(() => {
    const loadReviews = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await getAllAdvices();

        // Adaptation des données API au format d'affichage du composant
        const adaptedReviews = response.data.map((review) => ({
          id: review.id,
          // Utilisation des champs de userDto
          user: `${review.userDto?.firstname} ${review.userDto?.lastname}`,
          initial: getInitials(
            review.userDto?.firstname,
            review.userDto?.lastname
          ),
          // Utilisation du message de l'avis
          message: review.message,
          // Note: Comme l'API ne retourne pas de rating, on utilise 4 par défaut.
          // Vous pouvez ajuster cette logique si le champ 'status' est lié à la note.
          rating: 4,
          date: formatTimeAgo(review.createdAt),
          // Garder les données brutes pour la modale si nécessaire
          fullReview: review,
        }));

        setReviews(adaptedReviews || []);
      } catch (err) {
        console.error("Erreur lors du chargement des avis:", err);
        setError("Impossible de charger les avis.");
        setReviews([]);
      } finally {
        setLoading(false);
      }
    };
    loadReviews();
  }, []); // Exécuté une seule fois au montage du composant

  return (
    <>
      <div className="container">
        <Sidebar />
        <div className="admin-layout-wrapper">
          <Navbar />
          <div className="admin-flex-container">
            <main className="admin-page reviews-page">
              <header className="page-header">
                <h1>Consultation des Avis ({reviews.length})</h1>
              </header>

              {loading && (
                <p className="loading-message">Chargement des avis...</p>
              )}

              {error && <p className="feedback-message error">{error}</p>}

              {!loading && reviews.length === 0 && !error && (
                <p className="no-data-message">
                  Aucun avis trouvé pour le moment.
                </p>
              )}

              {!loading && reviews.length > 0 && (
                <div className="review-list">
                  {reviews.map((r) => (
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
                        {/* Créer 5 étoiles pour l'affichage */}
                        {Array.from({ length: 5 }).map((_, index) => (
                          <Star
                            key={index}
                            size={16}
                            // La couleur dépend du rating attribué
                            fill={index < r.rating ? "#fbbf24" : "none"}
                            color={index < r.rating ? "#fbbf24" : "#ccc"}
                          />
                        ))}
                      </div>

                      {/* Aperçu du message */}
                      <p className="review-message-preview">
                        {r.message.substring(0, 100)}...
                      </p>

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
              )}

              {/* Modal */}
              <ReviewModal
                // Passer l'objet d'avis adapté à la modale
                review={selectedReview}
                onClose={() => setSelectedReview(null)}
              />
            </main>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
