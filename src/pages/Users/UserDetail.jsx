import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom"; // Import de useNavigate

// 🚀 IMPORTER LES ICÔNES REACT
import {
  FaArrowLeft, // Retour
  FaUserCircle, // Nom complet
  FaCheckCircle, // Statut actif
  FaTimesCircle, // Statut inactif
  FaShieldAlt, // Rôle ADMIN
  FaUser, // Rôle USER
  FaEnvelope, // Email
  FaIdBadge, // ID
  FaInfoCircle, // Informations générales
  FaUserTag, // Membre depuis
  FaEdit, // Icône Modifier
  FaTrashAlt, // Icône Supprimer
} from "react-icons/fa";

// Simulation API
const api = {
  // Simuler une requête POST/DELETE pour la suppression
  delete: (url) => {
    return new Promise((resolve) => {
      console.log(`Simulating DELETE on ${url}`);
      setTimeout(() => {
        resolve({ success: true });
      }, 300);
    });
  },
};

const UserDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate(); // Hook pour la redirection après suppression
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Simulation d'appel API — à remplacer avec backend
    setTimeout(() => {
      setUser({
        id,
        firstname: "Jean",
        lastname: "Dupont",
        email: "jean.dupont@example.com",
        actif: true, // Changez à 'false' pour tester le statut inactif
        roleDto: { name: "ADMIN" }, // Changez à 'USER' pour tester le rôle USER
        createdAt: "2024-01-15T10:00:00Z", // Ajout d'une date pour le détail
      });
    }, 500);
  }, [id]);

  const handleDelete = () => {
    if (
      window.confirm(
        `Êtes-vous sûr de vouloir supprimer l'utilisateur #${id} ?`
      )
    ) {
      // Remplacer par l'appel API réel
      api
        .delete(`/users/${id}`)
        .then(() => {
          alert(`Utilisateur #${id} supprimé.`);
          navigate("/users"); // Rediriger vers la liste après suppression
        })
        .catch((err) => console.error("Erreur de suppression:", err));
    }
  };

  if (!user) return <p className="loading">Chargement...</p>;

  const initials = `${user.firstname.charAt(0)}${user.lastname.charAt(
    0
  )}`.toUpperCase();

  const RoleIcon = user.roleDto?.name === "ADMIN" ? FaShieldAlt : FaUser;
  const roleClass = user.roleDto?.name === "ADMIN" ? "role-admin" : "role-user";

  const StatusIcon = user.actif ? FaCheckCircle : FaTimesCircle;
  const statusClass = user.actif ? "status-active" : "status-inactive";

  return (
    <div className="user-detail-container">
      {/* Bouton Retour en haut */}
      <Link to="/userList" className="btn-back-header btn-icon">
        <FaArrowLeft /> Retour à la liste
      </Link>

      <div className="detail-card">
        <div className="header">
          {/* Avatar avec initiales */}
          <div className="avatar">{initials}</div>

          <h2 className="user-name">
            {user.firstname} {user.lastname}
          </h2>

          {/* Statut avec Icône */}
          <span className={`status-badge ${statusClass}`}>
            <StatusIcon className="status-icon" />
            {user.actif ? "Actif" : "Inactif"}
          </span>

          {/* Rôle avec Icône */}
          <p className={`role-badge ${roleClass}`}>
            <RoleIcon className="role-icon" />
            {user.roleDto?.name}
          </p>
        </div>

        <hr />

        <h3 className="info-title section-title">
          <FaInfoCircle className="title-icon" /> Informations du compte
        </h3>

        <div className="info-section">
          {/* ... Liste des informations ... */}
          <div className="info-item detail-row">
            <span className="label">
              <FaUserCircle /> Nom complet
            </span>
            <span className="value">
              {user.firstname} {user.lastname}
            </span>
          </div>

          <div className="info-item detail-row">
            <span className="label">
              <FaEnvelope /> Email
            </span>
            <span className="value">{user.email}</span>
          </div>

          <div className="info-item detail-row">
            <span className="label">
              <FaIdBadge /> Identifiant
            </span>
            <span className="value">#{user.id}</span>
          </div>

          {user.createdAt && (
            <div className="info-item detail-row">
              <span className="label">
                <FaUserTag /> Membre depuis
              </span>
              <span className="value">
                {new Date(user.createdAt).toLocaleDateString()}
              </span>
            </div>
          )}
        </div>

        <hr />

        {/* NOUVELLE SECTION ACTIONS */}
        <div className="actions-section">
          <Link to={`/users/edit/${user.id}`} className="btn-edit btn-icon">
            <FaEdit /> Modifier
          </Link>
          <button onClick={handleDelete} className="btn-delete btn-icon">
            <FaTrashAlt /> Supprimer
          </button>
        </div>

        <hr />

        {/* Bouton Retour en bas */}
        <Link to="/users" className="btn-back btn-icon">
          <FaArrowLeft /> Retour à la liste
        </Link>
      </div>
    </div>
  );
};

export default UserDetail;
