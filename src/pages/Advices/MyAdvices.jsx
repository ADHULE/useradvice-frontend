import React, { useEffect, useState } from "react";
import {
  FaTrash,
  FaLightbulb,
  FaRegCalendarAlt,
  FaCheckCircle,
  FaClock,
  FaTimesCircle,
  FaExclamationTriangle,
  FaPlusCircle,
  FaSyncAlt,
  FaEnvelopeOpenText,
  FaHome,
} from "react-icons/fa";
import { Link } from "react-router-dom";

import { getMyAdvices, deleteAdvice } from "../../api/adviceApi";
import Footer from "../../components/common/Footer";
import { goToPath } from "../../components/navigation/goToPath";

/**
 * Page : Mes Avis & Suggestions
 */
const MyAdvices = () => {
  const [advices, setAdvices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState({ type: "", message: "" });

  /* =========================
     Utils
  ========================== */

  const formatDate = (dateString) => {
    if (!dateString) return "Date inconnue";
    return new Date(dateString).toLocaleDateString("fr-FR", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const normalizeStatus = (status) =>
    typeof status === "string" ? status.toUpperCase().trim() : "";

  const getStatusDisplay = (status) => {
    const s = normalizeStatus(status);

    if (["PUBLISHED", "TRAITÉ", "ACCEPTE"].includes(s)) {
      return {
        icon: <FaCheckCircle />,
        className: "status-processed",
        label: "Traité",
      };
    }

    if (["PENDING", "EN ATTENTE", "EN_ATTENTE"].includes(s)) {
      return {
        icon: <FaClock />,
        className: "status-pending",
        label: "En attente",
      };
    }

    if (["REJECTED", "REJETÉ", "REFUSE"].includes(s)) {
      return {
        icon: <FaTimesCircle />,
        className: "status-rejected",
        label: "Rejeté",
      };
    }

    return {
      icon: <FaExclamationTriangle />,
      className: "status-default",
      label: "Inconnu",
    };
  };

  /* =========================
     API Calls
  ========================== */

  const loadData = async () => {
    setLoading(true);
    setFeedback({ type: "", message: "" });

    try {
      const res = await getMyAdvices();
      setAdvices(res?.data ?? []);

      if (!res?.data || res.data.length === 0) {
        setFeedback({ type: "info", message: "Aucun avis trouvé." });
      }
    } catch (error) {
      console.error("Erreur chargement avis :", error);
      setAdvices([]);
      setFeedback({
        type: "error",
        message: "Impossible de charger vos avis.",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!id) {
      setFeedback({
        type: "error",
        message: "ID invalide. Suppression impossible.",
      });
      return;
    }

    const confirmed = window.confirm(
      "Voulez-vous vraiment supprimer cet avis ? Cette action est irréversible."
    );
    if (!confirmed) return;

    try {
      await deleteAdvice(id);

      setAdvices((prev) => prev.filter((a) => a.id !== id));

      setFeedback({
        type: "success",
        message: "Avis supprimé avec succès.",
      });
    } catch (error) {
      console.error("Erreur suppression :", error);

      setFeedback({
        type: "error",
        message:
          error?.response?.status === 403
            ? "Vous n'avez pas l'autorisation de supprimer cet avis."
            : "Erreur lors de la suppression de l'avis.",
      });
    }
  };

  /* =========================
     Lifecycle
  ========================== */

  useEffect(() => {
    loadData();
  }, []);

  /* =========================
     Render
  ========================== */

  return (
    <>
      <div className="container">
        <div className="advice-page-container">
          {/* Header */}
          <header className="advice-page-header">
            <h1 className="page-title-icon">
              <Link to="/" className="nav-link home-link">
                <FaHome /> Accueil
              </Link>
              <FaLightbulb className="header-icon" /> Mes Avis et Suggestions
            </h1>

            <div className="advice-header-actions">
              <button
                className="btn-primary"
                onClick={() => goToPath("/adviceCreate")}
              >
                <FaPlusCircle /> Créer un Avis
              </button>

              <button
                className="btn-secondary"
                onClick={loadData}
                disabled={loading}
              >
                <FaSyncAlt className={loading ? "icon-spin" : ""} /> Actualiser
              </button>
            </div>
          </header>

          {/* Content */}
          <div className="advice-page-layout">
            <section className="advice-main-content">
              {loading && (
                <p className="loading-message">Chargement des avis...</p>
              )}

              {!loading && feedback.message && (
                <p className={`feedback-message ${feedback.type}`}>
                  {feedback.message}
                </p>
              )}

              {!loading && advices.length > 0 && (
                <ul className="advice-list">
                  {advices.map((a) => {
                    const status = getStatusDisplay(a.status);
                    const isDeletable = [
                      "PENDING",
                      "EN ATTENTE",
                      "EN_ATTENTE",
                    ].includes(normalizeStatus(a.status));

                    return (
                      <li key={a.id} className="advice-card">
                        <div className="card-header">
                          <span
                            className={`advice-status-badge ${status.className}`}
                          >
                            {status.icon} {status.label}
                          </span>

                          <span className="advice-metadata">
                            <FaRegCalendarAlt /> {formatDate(a.createdAt)}
                          </span>
                        </div>

                        <div className="card-body">
                          <FaEnvelopeOpenText className="message-icon" />
                          <p>{a.message}</p>
                        </div>

                        <div className="card-footer">
                          {!isDeletable && (
                            <span className="not-deletable-info">
                              Avis non supprimable
                            </span>
                          )}

                          <button
                            className="btn-delete"
                            onClick={() => handleDelete(a.id)}
                            disabled={!isDeletable}
                            style={{
                              cursor: isDeletable ? "pointer" : "not-allowed",
                            }}
                          >
                            <FaTrash /> Supprimer
                          </button>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              )}
            </section>

            {/* Sidebar */}
            <aside className="advice-sidebar">
              <h3>
                <FaLightbulb /> Guide des statuts
              </h3>
              <ul>
                <li className="status-processed">
                  <FaCheckCircle /> Traité
                </li>
                <li className="status-pending">
                  <FaClock /> En attente
                </li>
                <li className="status-rejected">
                  <FaTimesCircle /> Rejeté
                </li>
              </ul>
              <p className="deletion-note">
                * Seuls les avis en attente peuvent être supprimés.
              </p>
            </aside>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default MyAdvices;
