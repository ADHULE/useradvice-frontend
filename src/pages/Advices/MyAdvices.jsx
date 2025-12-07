import React, { useEffect, useState } from "react";
import { getMyAdvices, deleteAdvice } from "../../api/adviceApi";
import {
  FaTrash,
  FaPlus,
  FaLightbulb,
  FaCommentDots,
  FaCalendarAlt,
  FaCheckCircle,
  FaClock,
  FaTimesCircle,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Footer from "../../components/common/Footer";

const MyAdvices = () => {
  const [advices, setAdvices] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const res = await getMyAdvices();
      setAdvices(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="advice-responsive-wrapper">
      <div className="advice-dashboard-container">
        {/* Header Adaptatif */}
        <header className="dashboard-hero">
          <div className="hero-text">
            <h1>Mes Avis</h1>
            <p>Gérez vos contributions et suivez leur statut.</p>
          </div>
          <button
            className="btn-fab-primary"
            onClick={() => navigate("/adviceCreate")}
          >
            <FaPlus /> <span className="hide-on-mobile">Nouvel Avis</span>
          </button>
        </header>

        <div className="dashboard-grid-layout">
          <main className="bento-grid">
            {loading ? (
              <div className="loader-card">Synchronisation...</div>
            ) : (
              advices.map((a) => (
                <AdviceCardItem
                  key={a.id}
                  data={a}
                  onDelete={() => handleDelete(a.id)}
                />
              ))
            )}
          </main>

          {/* Sidebar : Devient horizontale ou disparaît sur petit mobile */}
          <aside className="dashboard-stats-sidebar">
            <div className="stats-glass-card">
              <h3>Activité</h3>
              <div className="stat-pill">
                <span>Total</span>
                <strong>{advices.length}</strong>
              </div>
            </div>
          </aside>
        </div>
      </div>
      <Footer />
    </div>
  );
};

/* --- Composant Carte Designer --- */
const AdviceCardItem = ({ data, onDelete }) => {
  const getStatus = (s) => {
    const status = s?.toUpperCase();
    if (status === "PUBLISHED")
      return { icon: <FaCheckCircle />, color: "success", label: "Traité" };
    if (status === "REJECTED")
      return { icon: <FaTimesCircle />, color: "error", label: "Refusé" };
    return { icon: <FaClock />, color: "pending", label: "En attente" };
  };

  const config = getStatus(data.status);

  return (
    <article className={`bento-card status-border-${config.color}`}>
      <div className="card-top-nav">
        <div className={`status-icon-wrapper wrapper-${config.color}`}>
          {config.icon}
        </div>
        <span className="status-label">{config.label}</span>
        <button className="btn-delete-minimal" onClick={onDelete}>
          <FaTrash />
        </button>
      </div>

      <div className="card-body">
        <p className="message-text">{data.message}</p>
      </div>

      <footer className="card-footer-meta">
        <FaCalendarAlt />
        <span>{new Date(data.createdAt).toLocaleDateString("fr-FR")}</span>
      </footer>
    </article>
  );
};

export default MyAdvices;
