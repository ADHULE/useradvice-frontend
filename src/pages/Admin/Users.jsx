import React, { useEffect, useState } from "react";
import { ShieldCheck, Mail, UserCheck, UserX, Search } from "lucide-react";
import { motion } from "framer-motion";
import Navbar from "../../components/common/Navbar";
import Sidebar from "../../components/common/Sidebar";
import Footer from "../../components/common/Footer";
import { getAllUsers } from "../../api/userApi";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");

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

  const formatRoleName = (roleName) => {
    if (!roleName) return "INCONNU";
    const cleanName = roleName.replace("ROLE_", "");
    return cleanName.charAt(0).toUpperCase() + cleanName.slice(1).toLowerCase();
  };

  useEffect(() => {
    const loadUsers = async () => {
      try {
        setLoading(true);
        const res = await getAllUsers();
        const usersList = Array.isArray(res.data) ? res.data : [];
        setUsers(usersList);
        setFilteredUsers(usersList);
      } catch (error) {
        console.error("Erreur lors du chargement des utilisateurs:", error);
      } finally {
        setLoading(false);
      }
    };
    loadUsers();
  }, []);

  useEffect(() => {
    let result = users.filter((user) => {
      const matchesSearch =
        `${user.firstname} ${user.lastname}`
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesRole =
        roleFilter === "all" ||
        formatRoleName(user.roleDto?.name).toLowerCase() ===
          roleFilter.toLowerCase();

      return matchesSearch && matchesRole;
    });

    setFilteredUsers(result);
  }, [searchTerm, roleFilter, users]);

  const roles = Array.from(
    new Set(users.map((u) => formatRoleName(u.roleDto?.name)))
  );

  return (
    <>
      <div className="container">
        <Navbar />

        <div className="admin-layout-wrapper">
          <div className="admin-flex-container">
            <Sidebar />

            <main className="admin-page users-page">
              <header className="page-header">
                <div className="flex justify-between items-start">
                  <div>
                    <h1>Utilisateurs</h1>
                    <p className="subtitle">
                      Gérez les comptes et permissions des utilisateurs
                    </p>
                  </div>
                  <span className="badge badge-primary">
                    {users.length} utilisateurs
                  </span>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 mt-4">
                  <div className="relative flex-1">
                    <Search
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                      size={18}
                    />
                    <input
                      type="text"
                      placeholder="Rechercher un utilisateur..."
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>

                  <select
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    value={roleFilter}
                    onChange={(e) => setRoleFilter(e.target.value)}
                  >
                    <option value="all">Tous les rôles</option>
                    {roles.map((role) => (
                      <option key={role} value={role.toLowerCase()}>
                        {role}
                      </option>
                    ))}
                  </select>
                </div>
              </header>

              <div className="table-container">
                {loading ? (
                  <div className="loading-message">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary-600"></div>
                    Chargement des utilisateurs...
                  </div>
                ) : filteredUsers.length === 0 ? (
                  <div className="no-data-message">
                    {searchTerm || roleFilter !== "all"
                      ? "Aucun utilisateur ne correspond aux critères de recherche."
                      : "Aucun utilisateur trouvé."}
                  </div>
                ) : (
                  <table className="user-table">
                    <thead>
                      <tr>
                        <th>Utilisateur</th>
                        <th>Email</th>
                        <th>Date de naissance</th>
                        <th>Inscription</th>
                        <th>Rôle</th>
                        <th>Statut</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredUsers.map((user, index) => (
                        <motion.tr
                          key={user.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.05 }}
                        >
                          <td>
                            <div className="flex items-center gap-3">
                              <div className="avatar">
                                {getInitials(user.firstname, user.lastname)}
                              </div>
                              <div>
                                <div className="font-medium text-gray-900">
                                  {user.firstname} {user.lastname}
                                </div>
                                <div className="text-sm text-gray-500 capitalize">
                                  {user.gender || "Non spécifié"}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td>
                            <div className="flex items-center gap-2">
                              <Mail size={14} className="text-gray-400" />
                              <span className="text-gray-700">
                                {user.email}
                              </span>
                            </div>
                          </td>
                          <td className="text-gray-600">
                            {formatDate(user.dateOfBirth)}
                          </td>
                          <td className="text-gray-600">
                            {formatDate(user.createdAt)}
                          </td>
                          <td>
                            <span
                              className={`role-tag ${formatRoleName(
                                user.roleDto?.name
                              ).toLowerCase()}`}
                            >
                              <ShieldCheck size={14} />
                              {formatRoleName(user.roleDto?.name)}
                            </span>
                          </td>
                          <td>
                            <span
                              className={`status-tag ${
                                user.actif ? "actif" : "inactif"
                              }`}
                            >
                              {user.actif ? (
                                <UserCheck size={14} />
                              ) : (
                                <UserX size={14} />
                              )}
                              {user.actif ? "Actif" : "Inactif"}
                            </span>
                          </td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </main>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
