import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Footer from "../../components/common/Footer";
// IMPORTER LES ICÔNES REACT
import {
  FaUsers, // Pour le titre général
  FaUserCircle, // Pour les détails utilisateur
  FaCheckCircle, // Statut actif
  FaTimesCircle, // Statut inactif
  FaShieldAlt, // Rôle ADMIN
  FaUser, // Rôle USER (ou standard)
  FaEye, // Bouton Voir détails
} from "react-icons/fa";

const UserList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Exemple fictif — à remplacer par API
    setUsers([
      {
        id: 1,
        firstname: "Jean",
        lastname: "Dupont",
        email: "jean.dupont@example.com",
        actif: true,
        roleDto: { name: "ADMIN" },
      },
      {
        id: 2,
        firstname: "Marie",
        lastname: "Durand",
        email: "marie.durand@example.com",
        actif: false,
        roleDto: { name: "USER" },
      },
      {
        id: 3,
        firstname: "Alain",
        lastname: "Lambert",
        email: "alain.lambert@example.com",
        actif: true,
        roleDto: { name: "MODERATOR" }, // Exemple de rôle supplémentaire
      },
    ]);
  }, []);

  // Composant pour afficher le statut (Actif/Inactif)
  const ActiveStatus = ({ actif }) => (
    <span className={`status-badge status-${actif ? "active" : "inactive"}`}>
      {actif ? (
        <FaCheckCircle className="status-icon icon-active" />
      ) : (
        <FaTimesCircle className="status-icon icon-inactive" />
      )}
      {actif ? "Actif" : "Inactif"}
    </span>
  );

  // Composant pour afficher le rôle
  const RoleDisplay = ({ roleName }) => {
    let Icon = FaUser;
    let className = "role-user";

    if (roleName === "ADMIN") {
      Icon = FaShieldAlt;
      className = "role-admin";
    } else if (roleName === "MODERATOR") {
      Icon = FaUserCircle;
      className = "role-moderator";
    }

    return (
      <span className={`role-badge ${className}`}>
        <Icon className="role-icon" /> {roleName}
      </span>
    );
  };

  return (
    <>
      <div className="user-list-container">
        {/* Titre avec Icône */}
        <h2 className="title page-title-icon">
          <FaUsers className="header-icon" /> Liste des utilisateurs
        </h2>

        <div className="table-wrapper">
          <table className="user-table">
            <thead>
              <tr>
                <th>Nom complet</th>
                <th>Email</th>
                <th>Statut</th>
                <th>Rôle</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {users.map((u) => (
                <tr key={u.id}>
                  <td>
                    {u.firstname} {u.lastname}
                  </td>
                  <td>{u.email}</td>
                  {/* Utilisation du composant Status */}
                  <td>
                    <ActiveStatus actif={u.actif} />
                  </td>
                  {/* Utilisation du composant Role */}
                  <td>
                    <RoleDisplay roleName={u.roleDto?.name} />
                  </td>

                  {/* Bouton de détail avec Icône */}
                  <td>
                    <Link
                      to={`/users/${u.id}`}
                      className="btn-detail btn-icon-only"
                      title="Voir les détails de l'utilisateur"
                    >
                      <FaEye size={18} />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {users.length === 0 && (
            <p className="no-data">Aucun utilisateur trouvé.</p>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default UserList;
