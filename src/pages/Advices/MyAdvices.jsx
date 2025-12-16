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
  FaChevronRight,
  FaFilter,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { getMyAdvices, deleteAdvice } from "../../api/adviceApi";
import Footer from "../../components/common/Footer";
import { goToPath } from "../../components/navigation/goToPath";

/**
 * Page : Mes Avis & Suggestions - Version Modernisée
 */
const MyAdvices = () => {
  const [advices, setAdvices] = useState([]);
  const [filteredAdvices, setFilteredAdvices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("ALL");
  const [expandedCard, setExpandedCard] = useState(null);

  /* =========================
     Utils
  ========================== */
  const formatDate = (dateString) => {
    if (!dateString) return "Date inconnue";
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return "Aujourd'hui";
    if (diffDays === 1) return "Hier";
    if (diffDays < 7) return `Il y a ${diffDays} jours`;

    return date.toLocaleDateString("fr-FR", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const normalizeStatus = (status) =>
    typeof status === "string" ? status.toUpperCase().trim() : "";

  const getStatusInfo = (status) => {
    const s = normalizeStatus(status);

    const statusMap = {
      PUBLISHED: {
        icon: <FaCheckCircle className="status-icon" />,
        className: "status-processed",
        label: "Traité",
        description: "Votre suggestion a été prise en compte",
      },
      TRAITÉ: {
        icon: <FaCheckCircle className="status-icon" />,
        className: "status-processed",
        label: "Traité",
        description: "Votre suggestion a été prise en compte",
      },
      ACCEPTE: {
        icon: <FaCheckCircle className="status-icon" />,
        className: "status-processed",
        label: "Accepté",
        description: "Votre suggestion a été acceptée",
      },
      PENDING: {
        icon: <FaClock className="status-icon" />,
        className: "status-pending",
        label: "En attente",
        description: "En cours d'examen",
      },
      EN_ATTENTE: {
        icon: <FaClock className="status-icon" />,
        className: "status-pending",
        label: "En attente",
        description: "En cours d'examen",
      },
      REJECTED: {
        icon: <FaTimesCircle className="status-icon" />,
        className: "status-rejected",
        label: "Rejeté",
        description: "Non retenu pour le moment",
      },
      REJETÉ: {
        icon: <FaTimesCircle className="status-icon" />,
        className: "status-rejected",
        label: "Rejeté",
        description: "Non retenu pour le moment",
      },
      REFUSE: {
        icon: <FaTimesCircle className="status-icon" />,
        className: "status-rejected",
        label: "Refusé",
        description: "Non retenu pour le moment",
      },
    };

    return (
      statusMap[s] || {
        icon: <FaExclamationTriangle className="status-icon" />,
        className: "status-default",
        label: "Inconnu",
        description: "Statut indéterminé",
      }
    );
  };

  /* =========================
     Filtres
  ========================== */
  const filters = [
    { id: "ALL", label: "Tous", count: advices.length },
    {
      id: "PENDING",
      label: "En attente",
      count: advices.filter(
        (a) =>
          normalizeStatus(a.status) === "PENDING" ||
          normalizeStatus(a.status) === "EN_ATTENTE"
      ).length,
    },
    {
      id: "PROCESSED",
      label: "Traités",
      count: advices.filter((a) =>
        ["PUBLISHED", "TRAITÉ", "ACCEPTE"].includes(normalizeStatus(a.status))
      ).length,
    },
    {
      id: "REJECTED",
      label: "Rejetés",
      count: advices.filter((a) =>
        ["REJECTED", "REJETÉ", "REFUSE"].includes(normalizeStatus(a.status))
      ).length,
    },
  ];

  const applyFilter = (filterId) => {
    setSelectedFilter(filterId);
    if (filterId === "ALL") {
      setFilteredAdvices(advices);
      return;
    }

    const filtered = advices.filter((advice) => {
      const status = normalizeStatus(advice.status);
      switch (filterId) {
        case "PENDING":
          return status === "PENDING" || status === "EN_ATTENTE";
        case "PROCESSED":
          return ["PUBLISHED", "TRAITÉ", "ACCEPTE"].includes(status);
        case "REJECTED":
          return ["REJECTED", "REJETÉ", "REFUSE"].includes(status);
        default:
          return true;
      }
    });
    setFilteredAdvices(filtered);
  };

  /* =========================
     API Calls
  ========================== */
  const loadData = async () => {
    setLoading(true);
    try {
      const res = await getMyAdvices();
      const data = res?.data ?? [];
      setAdvices(data);
      setFilteredAdvices(data);

      if (data.length === 0) {
        toast.info("Aucun avis trouvé", {
          position: "top-right",
          autoClose: 3000,
        });
      } else {
        toast.success(`${data.length} avis chargés`, {
          position: "top-right",
          autoClose: 2000,
        });
      }
    } catch (error) {
      console.error("Erreur chargement avis :", error);
      toast.error("Impossible de charger vos avis", {
        position: "top-right",
        autoClose: 4000,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!id) {
      toast.error("ID invalide. Suppression impossible");
      return;
    }

    const confirmed = globalThis.confirm(
      "Voulez-vous vraiment supprimer cet avis ? Cette action est irréversible."
    );
    if (!confirmed) return;

    try {
      await deleteAdvice(id);
      setAdvices((prev) => prev.filter((a) => a.id !== id));
      setFilteredAdvices((prev) => prev.filter((a) => a.id !== id));

      toast.success("Avis supprimé avec succès", {
        position: "top-right",
        autoClose: 3000,
      });
    } catch (error) {
      console.error("Erreur suppression :", error);
      toast.error(
        error?.response?.status === 403
          ? "Vous n'avez pas l'autorisation de supprimer cet avis"
          : "Erreur lors de la suppression",
        {
          position: "top-right",
          autoClose: 4000,
        }
      );
    }
  };

  /* =========================
     Lifecycle
  ========================== */
  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    applyFilter(selectedFilter);
  }, [advices, selectedFilter]);

  /* =========================
     Render
  ========================== */
  return (
    <>
      <div className="my-advices-container">
        <ToastContainer />

        {/* Header */}
        <div className="advice-header">
          <div className="breadcrumb">
            <Link to="/" className="breadcrumb-home">
              <FaHome /> Accueil
            </Link>
            <FaChevronRight className="breadcrumb-separator" />
            <span className="breadcrumb-current">
              <FaLightbulb /> Mes Avis
            </span>
          </div>

          <div className="header-content">
            <div className="header-text">
              <h1>Mes Avis et Suggestions</h1>
              <p className="subtitle">Gérez et suivez vos contributions</p>
            </div>

            <div className="header-actions">
              <button
                className="btn btn-primary with-icon"
                onClick={() => goToPath("/adviceCreate")}
              >
                <FaPlusCircle /> Nouvel avis
              </button>

              <button
                className="btn btn-secondary with-icon"
                onClick={loadData}
                disabled={loading}
              >
                <FaSyncAlt className={loading ? "spinning" : ""} />
                {loading ? "Chargement..." : "Actualiser"}
              </button>
            </div>
          </div>
        </div>

        {/* Filtres */}
        <div className="filters-section">
          <div className="filters-header">
            <FaFilter />
            <span>Filtrer par statut</span>
          </div>
          <div className="filters-grid">
            {filters.map((filter) => (
              <button
                key={filter.id}
                className={`filter-chip ${
                  selectedFilter === filter.id ? "active" : ""
                }`}
                onClick={() => applyFilter(filter.id)}
              >
                <span className="filter-label">{filter.label}</span>
                <span className="filter-count">{filter.count}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="main-content">
          {loading && (
            <div className="loading-state">
              <div className="spinner"></div>
              <p>Chargement de vos avis...</p>
            </div>
          )}

          {!loading && filteredAdvices.length === 0 && (
            <div className="empty-state">
              <FaLightbulb className="empty-icon" />
              <h3>Aucun avis trouvé</h3>
              <p>
                {selectedFilter === "ALL"
                  ? "Vous n'avez pas encore soumis d'avis"
                  : "Aucun avis correspond à ce filtre"}
              </p>
              <button
                className="btn btn-primary"
                onClick={() => goToPath("/adviceCreate")}
              >
                <FaPlusCircle /> Créer votre premier avis
              </button>
            </div>
          )}

          {!loading && filteredAdvices.length > 0 && (
            <div className="advices-grid">
              {filteredAdvices.map((advice) => {
                const status = getStatusInfo(advice.status);
                const isDeletable = ["PENDING", "EN_ATTENTE"].includes(
                  normalizeStatus(advice.status)
                );
                const isExpanded = expandedCard === advice.id;

                return (
                  <details
                    key={advice.id}
                    className={`advice-card ${status.className} ${
                      isExpanded ? "expanded" : ""
                    }`}
                    open={isExpanded}
                    onToggle={(e) =>
                      setExpandedCard(e.target.open ? advice.id : null)
                    }
                  >
                    <summary
                      className="advice-summary"
                      aria-expanded={isExpanded}
                    >
                      <div className="card-header">
                        <div className="status-indicator">
                          {status.icon}
                          <div className="status-text">
                            <span className="status-label">{status.label}</span>
                            <span className="status-desc">
                              {status.description}
                            </span>
                          </div>
                        </div>

                        <div className="card-meta">
                          <span className="date">
                            <FaRegCalendarAlt /> {formatDate(advice.createdAt)}
                          </span>
                          <div
                            className={`deletable-badge ${
                              isDeletable ? "yes" : "no"
                            }`}
                          >
                            {isDeletable ? "Supprimable" : "Verrouillé"}
                          </div>
                        </div>
                      </div>
                    </summary>

                    <div className="card-content">
                      <FaEnvelopeOpenText className="message-icon" />
                      <div className="message-content">
                        <p
                          className={`message-text ${
                            isExpanded ? "" : "truncated"
                          }`}
                        >
                          {advice.message}
                        </p>
                        {advice.message.length > 150 && (
                          <span className="expand-indicator">
                            {isExpanded ? "Voir moins" : "Voir plus"}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="card-actions">
                      <button
                        className="btn btn-danger with-icon"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDelete(advice.id);
                        }}
                        disabled={!isDeletable}
                        title={
                          isDeletable
                            ? "Supprimer cet avis"
                            : "Avis non supprimable"
                        }
                      >
                        <FaTrash />
                        Supprimer
                      </button>
                    </div>
                  </details>
                );
              })}
            </div>
          )}
        </div>

        {/* Stats */}
        <div className="stats-section">
          <div className="stats-card">
            <div className="stat-item">
              <span className="stat-number">{advices.length}</span>
              <span className="stat-label">Total des avis</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">
                {
                  advices.filter((a) =>
                    ["PENDING", "EN_ATTENTE"].includes(
                      normalizeStatus(a.status)
                    )
                  ).length
                }
              </span>
              <span className="stat-label">En attente</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">
                {
                  advices.filter((a) =>
                    ["PUBLISHED", "TRAITÉ", "ACCEPTE"].includes(
                      normalizeStatus(a.status)
                    )
                  ).length
                }
              </span>
              <span className="stat-label">Traités</span>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default MyAdvices;
