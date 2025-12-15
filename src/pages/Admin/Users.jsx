import React, { useEffect, useState } from "react";
import { ShieldCheck, Mail, UserCheck, UserX } from "lucide-react";
import { motion } from "framer-motion";
// Assurez-vous que ces chemins sont corrects
import Navbar from "../../components/common/Navbar";
import Sidebar from "../../components/common/Sidebar";
import Footer from "../../components/common/Footer";
import { getAllUsers } from "../../api/userApi";
import { FaMars, FaVenus, FaGenderless } from "react-icons/fa";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // --- UTILS ---
  const getInitials = (firstname, lastname) =>
    `${firstname?.[0] || ""}${lastname?.[0] || ""}`.toUpperCase();

  const formatDate = (date) =>
    date
      ? new Date(date).toLocaleDateString("fr-FR", {
          year: "numeric",
          month: "short",
          day: "numeric",
        })
      : "—";

  const getStatusText = (isActif) => (isActif ? "Actif" : "Inactif");

  const formatRoleName = (roleName) =>
    roleName ? roleName.replace("ROLE_", "") : "INCONNU";

  // --- API ---
  useEffect(() => {
    const loadUsers = async () => {
      try {
        setLoading(true);
        const res = await getAllUsers();
        setUsers(Array.isArray(res.data) ? res.data : []);
      } catch (error) {
        console.error("Erreur lors du chargement des utilisateurs:", error);
        setErrorMessage("Impossible de charger les utilisateurs.");
      } finally {
        setLoading(false);
      }
    };
    loadUsers();
  }, []);

  // --- ICONES GENRE ---
  function GenderIcon({ gender }) {
    switch (gender) {
      case "Homme":
        return <FaMars title="Homme" />;
      case "Femme":
        return <FaVenus title="Femme" />;
      default:
        return <FaGenderless title="Autre/Non spécifié" />;
    }
  }

  return (
    <div className="admin-layout-wrapper">
      <Navbar />
      <div className="admin-flex-container">
        <Sidebar />

        <main className="admin-page users-page">
          <header className="page-header">
            <h1>Répertoire des utilisateurs</h1>
            <p>Consultation des comptes et privilèges</p>
          </header>

          <div className="table-container">
            {loading && <p className="loading-message">Chargement...</p>}
            {errorMessage && <p className="feedback-message">{errorMessage}</p>}

            {!loading && !errorMessage && (
              <table className="user-table">
                <colgroup>
                  <col className="col-initials" />
                  <col className="col-contact" />
                  <col className="col-gender" />
                  <col className="col-email" />
                  <col className="col-birthdate" />
                  <col className="col-created" />
                  <col className="col-role" />
                  <col className="col-status" />
                </colgroup>

                <thead>
                  <tr>
                    <th>Init.</th>
                    <th>Contact</th>
                    <th>Genre</th>
                    <th>Email</th>
                    <th>Naissance</th>
                    <th>Création</th>
                    <th>Rôle</th>
                    <th>Statut</th>
                  </tr>
                </thead>

                <tbody>
                  {users.map((u, i) => {
                    const statusText = getStatusText(u.actif);
                    const roleName = formatRoleName(u.roleDto?.name);

                    return (
                      <motion.tr
                        key={u.id}
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.04 }}
                      >
                        {/* INITIALES */}
                        <td className="cell-initials">
                          <div className="avatar">
                            {getInitials(u.firstname, u.lastname)}
                          </div>
                        </td>

                        {/* CONTACT */}
                        <td>
                          <span className="name">
                            {u.firstname} {u.lastname}
                          </span>
                        </td>

                        {/* GENRE */}
                        <td>
                          <div className="cell-flex">
                            <GenderIcon gender={u.gender} />
                            <span style={{ marginLeft: "6px" }}>
                              {u.gender}
                            </span>
                          </div>
                        </td>

                        {/* EMAIL */}
                        <td>
                          <div className="cell-flex">
                            <Mail size={14} />
                            <span>{u.email}</span>
                          </div>
                        </td>

                        {/* NAISSANCE */}
                        <td>{formatDate(u.dateOfBirth)}</td>

                        {/* CRÉATION */}
                        <td>{formatDate(u.createdAt)}</td>

                        {/* RÔLE */}
                        <td>
                          <span
                            className={`role-tag ${roleName.toLowerCase()}`}
                          >
                            <ShieldCheck size={14} />
                            {roleName}
                          </span>
                        </td>

                        {/* STATUT */}
                        <td>
                          <span
                            className={`status-tag ${statusText.toLowerCase()}`}
                          >
                            {u.actif ? (
                              <UserCheck size={14} />
                            ) : (
                              <UserX size={14} />
                            )}
                            {statusText}
                          </span>
                        </td>
                      </motion.tr>
                    );
                  })}
                  {users.length === 0 && !loading && !errorMessage && (
                    <tr>
                      <td
                        colSpan="8"
                        style={{ textAlign: "center", padding: "20px" }}
                      >
                        Aucun utilisateur trouvé.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            )}
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
}
