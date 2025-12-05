// src/pages/Advice/MyAdvices.jsx

import React, { useEffect, useState } from "react";
import { getMyAdvices, deleteAdvice } from "../../api/adviceApi";
import {
  FaTrash,
  FaCommentDots,
  FaLightbulb,
  FaRegCalendarAlt,
  FaCheckCircle,
  FaClock,
  FaTimesCircle,
  FaExclamationTriangle,
  FaArrowLeft, // NOUVEL ICÔNE pour le bouton de retour
} from "react-icons/fa";
import Footer from "../../components/common/Footer";
// NOUVEL IMPORT : Hook de navigation de React Router
import { useNavigate } from "react-router-dom";
import { goToPath } from "../../components/navigation/goToPath";

const MyAdvices = () => {
  const [advices, setAdvices] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // Initialisation du hook de navigation

  // ------------------------------------------------
  // Fonction utilitaire pour le formatage des données
  // ------------------------------------------------

  const formatDate = (dateString) => {
    if (!dateString) return "Date inconnue";
    try {
      const options = {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      };
      return new Date(dateString).toLocaleDateString("fr-FR", options);
    } catch (e) {
      return "Date invalide";
    }
  };

  const getStatusDisplay = (status) => {
    switch (status?.toUpperCase()) {
      case "PUBLISHED":
      case "TRAITÉ":
      case "ACCEPTE":
        return {
          icon: <FaCheckCircle />,
          className: "status-published",
          label: "Traité",
        };
      case "PENDING":
      case "EN ATTENTE":
        return {
          icon: <FaClock />,
          className: "status-pending",
          label: "En attente",
        };
      case "REJECTED":
      case "REJETÉ":
      case "REFUSE":
        return {
          icon: <FaTimesCircle />,
          className: "status-rejected",
          label: "Rejeté",
        };
      default:
        return {
          icon: <FaExclamationTriangle />,
          className: "status-default",
          label: "Statut Inconnu",
        };
    }
  };

  // ────────────────────────────────────────────────
  // Charger les avis
  // ────────────────────────────────────────────────
  const loadData = async () => {
    try {
      setLoading(true);
      const res = await getMyAdvices();
      setAdvices(res.data);
    } catch (err) {
      console.error("Erreur chargement avis:", err);
      alert(
        "Impossible de charger vos avis. Si l'erreur persiste, veuillez vous reconnecter."
      );
    } finally {
      setLoading(false);
    }
  };

  // ────────────────────────────────────────────────
  // Supprimer un avis
  // ────────────────────────────────────────────────
  const handleDelete = async (id) => {
    if (!window.confirm("Voulez-vous vraiment supprimer cet avis ?")) return;

    try {
      await deleteAdvice(id);
      alert("Avis supprimé avec succès !");
      loadData();
    } catch (err) {
      console.error("Erreur suppression avis:", err);
      alert("Impossible de supprimer cet avis. Vérifiez vos droits.");
    }
  };

  useEffect(() => {
    loadData();
    document.querySelector(".advice-list")?.classList.add("is-loaded");
  }, []);

  return (
    <>
      <div className="advice-page-layout">
        <div className="advice-main-content">
          {/* NOUVEAU BOUTON DE RETOUR */}
          <button
            className="btn-back-to-create"
            onClick={goToPath("/adviceCreate")}
            title="Retourner à la création d'un avis"
          >
            <FaArrowLeft /> Nouvel Avis
          </button>
          {/* FIN DU NOUVEAU BOUTON */}

          <h2 className="page-title-icon">
            <FaLightbulb className="header-icon" /> Mes Avis
          </h2>

          {loading && <p>Chargement des avis...</p>}
          {!loading && advices.length === 0 && <p>Aucun avis trouvé.</p>}

          <ul className="advice-list">
            {advices.map((a) => {
              const statusDisplay = getStatusDisplay(a.status);

              return (
                <li key={a.id} className="advice-item">
                  <div className="advice-details-group">
                    <div className="advice-message">
                      <FaCommentDots className="message-icon" /> {a.message}{" "}
                    </div>

                    <div className="advice-metadata">
                      <span
                        className={`advice-status ${statusDisplay.className}`}
                      >
                        {statusDisplay.icon} {statusDisplay.label}
                      </span>
                      <FaRegCalendarAlt className="metadata-icon" />
                      Publié le {formatDate(a.createdAt)}
                    </div>
                  </div>

                  <button
                    className="btn-delete"
                    onClick={() => handleDelete(a.id)}
                    title="Supprimer cet avis"
                  >
                    <FaTrash /> Supprimer
                  </button>
                </li>
              );
            })}
          </ul>
        </div>

        <aside className="advice-sidebar">
          <h3>
            <FaLightbulb /> Guide
          </h3>
          <p>
            Vous pouvez consulter le statut de vos avis et les supprimer tant
            qu'ils ne sont pas traités définitivement.
          </p>
          <h4>
            <FaClock /> Statuts
          </h4>
          <ul>
            <li>**Traité** (Vert) : Avis pris en compte.</li>
            <li>**En attente** (Jaune) : En cours de modération.</li>
            <li>**Rejeté** (Rouge) : Non conforme aux règles.</li>
          </ul>
        </aside>
      </div>
      <Footer />
    </>
  );
};

export default MyAdvices;
