// src/pages/Advice/AdviceList.jsx

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Footer from "../../components/common/Footer";

import {
  FaPlus,
  FaEye,
  FaSpinner,
  FaRegClock,
  FaCheckCircle,
  FaExclamationTriangle,
} from "react-icons/fa";

// Simulation API
const api = {
  get: (url) => {
    console.log("Simulating GET:", url);
    return new Promise((resolve) =>
      setTimeout(
        () =>
          resolve({
            data: [
              {
                id: 1,
                message: "Problème d'affichage sur mobile",
                status: "En attente",
                userDto: { firstname: "Anna", lastname: "Mova" },
                createdAt: "2025-12-02T12:30:00Z",
              },
              {
                id: 2,
                message: "Erreur sur le formulaire",
                status: "Traité",
                userDto: { firstname: "John", lastname: "Doe" },
                createdAt: "2025-12-01T09:15:00Z",
              },
              {
                id: 3,
                message: "Suggestion de fonctionnalité",
                status: "En cours",
                userDto: { firstname: "Lisa", lastname: "Smith" },
                createdAt: "2025-12-01T10:00:00Z",
              },
            ],
          }),
        700
      )
    );
  },
};

// ✅ Fonction utilitaire corrigée pour gérer les statuts
const StatusIcon = ({ status }) => {
  if (!status) return null;

  const normalized = status.trim().toLowerCase();

  switch (normalized) {
    case "traité":
      return <FaCheckCircle className="icon-traite" title="Traité" />;
    case "en attente":
      return <FaRegClock className="icon-en-attente" title="En attente" />;
    case "en cours":
      return <FaSpinner className="icon-en-cours" title="En cours" />;
    default:
      return <FaExclamationTriangle className="icon-default" title={status} />;
  }
};

const AdviceList = () => {
  const [advices, setAdvices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/advices")
      .then((res) => {
        setAdvices(res.data);
        setLoading(false);
      })
      .catch((err) => console.error("Erreur :", err));
  }, []);

  if (loading)
    return (
      <div className="loading-list">
        <FaSpinner className="loader-icon" size={30} />
        <p>Chargement de la liste...</p>
      </div>
    );

  return (
    <>
      <div className="advice-list-container">
        <div className="header-list">
          <h2>Liste des avis</h2>

          {/* ✅ Bouton création */}
          <Link to="/adviceCreate" className="btn-create btn-icon">
            <FaPlus className="icon-plus" /> Ajouter un avis
          </Link>
        </div>

        <table className="advice-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Message</th>
              <th>Status</th>
              <th>Utilisateur</th>
              <th>Date de création</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {advices.map((a) => (
              <tr key={a.id}>
                <td>{a.id}</td>
                <td>
                  {a.message.length > 50
                    ? a.message.substring(0, 50) + "..."
                    : a.message}
                </td>

                <td>
                  <span
                    className={`status-badge status-${a.status
                      ?.toLowerCase()
                      .replace(" ", "-")}`}
                  >
                    <StatusIcon status={a.status} /> {a.status}
                  </span>
                </td>

                <td>
                  {a.userDto?.firstname} {a.userDto?.lastname}
                </td>
                <td>
                  {a.createdAt
                    ? new Date(a.createdAt).toLocaleDateString("fr-FR", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })
                    : "—"}
                </td>

                <td>
                  {/* Lien vers détails */}
                  <Link
                    to={`/adviceDetail/${a.id}`}
                    className="btn-detail btn-icon-only"
                    title="Voir les détails"
                  >
                    <FaEye size={18} />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {advices.length === 0 && <p className="no-data">Aucun avis trouvé.</p>}
      </div>
      <Footer />
    </>
  );
};

export default AdviceList;
