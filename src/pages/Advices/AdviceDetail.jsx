// src/pages/Advice/AdviceDetail.jsx

import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Footer from "../../components/common/Footer";
import {
  FaArrowLeft,
  FaInfoCircle,
  FaUser,
  FaIdCard,
  FaCommentDots,
  FaRegClock,
  FaEnvelope,
  FaSpinner,
  FaCheckCircle,
  FaHourglassHalf,
} from "react-icons/fa";

// Simulation API (inchangée)
const api = {
  get: (url) => {
    console.log("Simulating GET:", url);
    return new Promise((resolve) =>
      setTimeout(
        () =>
          resolve({
            data: {
              id: 1,
              message:
                "Exemple d'avis concernant une fonctionnalité. C'est un message très détaillé qui pourrait être long.",
              status: "En attente", // Changez ici pour tester 'Traité'
              createdAt: "2025-12-02T12:30:00Z",
              userDto: {
                firstname: "John",
                lastname: "Doe",
                email: "john.doe@example.com",
              },
            },
          }),
        500
      )
    );
  },
};

// ✅ Fonction utilitaire corrigée pour gérer les statuts
const StatusDisplay = ({ status }) => {
  if (!status) return null;

  const normalized = status.trim().toLowerCase();

  let IconComponent = FaHourglassHalf;
  let colorClass = "status-pending";

  if (normalized === "traité") {
    IconComponent = FaCheckCircle;
    colorClass = "status-resolved";
  } else if (normalized === "en attente") {
    IconComponent = FaHourglassHalf;
    colorClass = "status-pending";
  }

  return (
    <span className={`status-badge ${colorClass}`}>
      <IconComponent className="status-icon" /> {status}
    </span>
  );
};

const AdviceDetail = () => {
  const { id } = useParams();
  const [advice, setAdvice] = useState(null);

  useEffect(() => {
    api
      .get(`/advices/${id}`)
      .then((res) => setAdvice(res.data))
      .catch((err) => console.error(err));
  }, [id]);

  if (!advice)
    return (
      <div className="loading-detail">
        <FaSpinner className="loader-icon" size={30} />
        <p>Chargement du détail...</p>
      </div>
    );

  return (
    <>
      <div className="advice-detail-container">
        <div className="advice-detail-header">
          <h2>Détails de l'avis</h2>
          {/* ✅ Harmonisation de la route vers /myAdvices */}
          <Link to="/myAdvices" className="btn-back-light btn-icon">
            <FaArrowLeft /> Retour à la liste
          </Link>
        </div>

        <div className="advice-card">
          <h3 className="section-title">
            <FaInfoCircle className="title-icon" /> Informations générales
          </h3>

          <div className="detail-row">
            <span className="label">
              <FaIdCard /> ID :
            </span>
            <span>{advice.id}</span>
          </div>

          <div className="detail-row full-width">
            <span className="label">
              <FaCommentDots /> Message :
            </span>
            <p className="message-content">{advice.message}</p>
          </div>

          <div className="detail-row">
            <span className="label">
              <FaRegClock /> Statut :
            </span>
            <StatusDisplay status={advice.status} />
          </div>

          <div className="detail-row">
            <span className="label">
              <FaRegClock /> Date de création :
            </span>
            <span>
              {advice.createdAt
                ? new Date(advice.createdAt).toLocaleDateString("fr-FR", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })
                : "—"}
            </span>
          </div>

          <hr />

          <h3 className="section-title">
            <FaUser className="title-icon" /> Utilisateur
          </h3>

          <div className="detail-row">
            <span className="label">
              <FaUser /> Nom :
            </span>
            <span>
              {advice.userDto?.firstname} {advice.userDto?.lastname}
            </span>
          </div>

          <div className="detail-row">
            <span className="label">
              <FaEnvelope /> Email :
            </span>
            <span>{advice.userDto?.email}</span>
          </div>

          <div className="actions">
            {/* ✅ Harmonisation de la route */}
            <Link to="/myAdvices" className="btn-back btn-icon">
              <FaArrowLeft /> Retour
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AdviceDetail;
