import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Footer from "../../components/common/Footer";

// ICONES
import {
  FaUsers,
  FaUserCircle,
  FaCheckCircle,
  FaTimesCircle,
  FaShieldAlt,
  FaUser,
  FaEye,
} from "react-icons/fa";

import { getAllUsers } from "../../api/userApi";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await getAllUsers();

        console.log("Réponse API:", response.data);

        // Vérifie différentes structures possibles
        const data = Array.isArray(response.data)
          ? response.data
          : response.data.users || [];

        setUsers(data);
      } catch (err) {
        console.error("Erreur API:", err);

        if (err.response?.status === 403) {
          setError("Accès refusé : réservé aux administrateurs.");
        } else {
          setError("Impossible de récupérer la liste des utilisateurs.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // Affichage du statut
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

  // Affichage du rôle
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
        <h2 className="title page-title-icon">
          <FaUsers className="header-icon" /> Liste des utilisateurs
        </h2>

        {loading && <p>Chargement des utilisateurs...</p>}
        {error && <p className="error-message">{error}</p>}

        {!loading && !error && (
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
                    <td>
                      <ActiveStatus actif={u.actif} />
                    </td>
                    <td>
                      <RoleDisplay roleName={u.roleDto?.name} />
                    </td>
                    <td>
                      <Link
                        to={`/users/${u.id}`}
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

            {users.length === 0 && (
              <p className="no-data">Aucun utilisateur trouvé.</p>
            )}
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default UserList;
