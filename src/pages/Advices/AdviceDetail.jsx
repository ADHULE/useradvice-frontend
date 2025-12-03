import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Footer from "../../components/common/Footer";
// IMPORTER LES ICÔNES REACT
import {
  FaArrowLeft, // Retour à la liste
  FaInfoCircle, // Informations générales
  FaUser, // Utilisateur
  FaIdCard, // ID
  FaCommentDots, // Message
  FaRegClock, // Statut et Date
  FaEnvelope, // Email
  FaSpinner, // Chargement
  FaCheckCircle, // Statut Traité (pour l'exemple)
  FaHourglassHalf, // Statut En attente (pour l'exemple)
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

// Fonction utilitaire pour choisir l'icône de statut
const StatusDisplay = ({ status }) => {
  const statusNormalized = status?.toLowerCase().replace(" ", "-");
  let IconComponent = FaHourglassHalf; // Icône par défaut
  let colorClass = "status-pending";

  if (statusNormalized === "traité") {
    IconComponent = FaCheckCircle;
    colorClass = "status-resolved";
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
        {/* Icône de chargement */}
        <FaSpinner className="loader-icon" size={30} />
        <p>Chargement du détail...</p>
      </div>
    );

  return (
    <>
      <div className="advice-detail-container">
        <div className="advice-detail-header">
          <h2>Détails de l'avis</h2>
          {/* Icône dans le bouton de retour en haut */}
          <Link to="/adviceList" className="btn-back-light btn-icon">
            <FaArrowLeft /> Retour à la liste
          </Link>
        </div>

        <div className="advice-card">
          {/* Section Informations générales avec icône */}
          <h3 className="section-title">
            <FaInfoCircle className="title-icon" /> Informations générales
          </h3>

          <div className="detail-row">
            <span className="label">
              <FaIdCard /> ID :
            </span>{" "}
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
                ? new Date(advice.createdAt).toLocaleString()
                : "—"}
            </span>
          </div>

          <hr />

          {/* Section Utilisateur avec icône */}
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
            {/* Icône dans le bouton de retour en bas */}
            <Link to="/adviceList" className="btn-back btn-icon">
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
