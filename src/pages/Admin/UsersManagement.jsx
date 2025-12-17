import React, { useEffect, useState, useCallback } from "react";
import {
  ShieldCheck,
  Mail,
  UserCheck,
  UserX,
  Filter,
  Download,
  RefreshCw,
  Printer,
  FileText,
  Users as UsersIcon,
  Database,
  Hash,
  Plus,
  Calendar,
  Phone,
  Shield,
  Activity,
  Edit,
  Trash2,
  MoreVertical,
  Star,
  Clock,
  Zap,
  AlertCircle,
  CheckCircle,
  AlertTriangle,
  RotateCw,
  ChevronUp,
  ChevronDown,
  ArrowUpDown,
  Eye,
  Settings,
  X,
  Lock,
  Unlock,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Components
import Navbar from "../../components/common/Navbar";
import Sidebar from "../../components/common/Sidebar";
import Footer from "../../components/common/Footer";

// API & Utils
import { getAllUsers } from "../../api/userApi";
import { generateUsersPDF } from "../../utils/userPdfService";

export default function UsersManagement() {
  // --- ÉTATS : DONNÉES & FILTRES ---
  const [users, setUsers] = useState([]);
  const [displayedUsers, setDisplayedUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [roleFilter, setRoleFilter] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const [sortDirection, setSortDirection] = useState("desc");
  const [error, setError] = useState(null);

  // --- ÉTATS : UI & INTERACTIONS ---
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const [exportProgress, setExportProgress] = useState(0);
  const [exportStatus, setExportStatus] = useState(null);
  const [showFilters, setShowFilters] = useState(true);
  const [showExportMenu, setShowExportMenu] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showUserDetails, setShowUserDetails] = useState(false);

  // --- LOGIQUE DE CHARGEMENT ---
  const loadUsers = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await getAllUsers();
      const usersList = Array.isArray(res?.data) ? res.data : [];
      setUsers(usersList);
      setDisplayedUsers(usersList);
    } catch (err) {
      console.error("Erreur lors du chargement des utilisateurs:", err);
      setError("Impossible de charger les utilisateurs. Veuillez réessayer.");
      setExportStatus("error");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadUsers();
  }, [loadUsers]);

  // --- UTILITAIRES ---
  const getInitials = useCallback((firstname, lastname) => {
    return `${firstname?.[0] || ""}${lastname?.[0] || ""}`.toUpperCase();
  }, []);

  const formatDate = useCallback((date) => {
    if (!date) return "—";
    return new Date(date).toLocaleDateString("fr-FR", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  }, []);

  const formatRoleName = useCallback((roleName) => {
    if (!roleName) return "INCONNU";
    const cleanName = roleName.replace("ROLE_", "");
    return cleanName.charAt(0).toUpperCase() + cleanName.slice(1).toLowerCase();
  }, []);

  // --- LOGIQUE DE FILTRAGE ---
  useEffect(() => {
    let result = [...users];

    // Filtre par recherche
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      result = result.filter(
        (user) =>
          `${user.firstname} ${user.lastname}`.toLowerCase().includes(term) ||
          user.email.toLowerCase().includes(term) ||
          user.phone?.toLowerCase().includes(term)
      );
    }

    // Filtre par statut
    if (statusFilter !== "all") {
      result = result.filter((user) =>
        statusFilter === "active" ? user.actif : !user.actif
      );
    }

    // Filtre par rôle
    if (roleFilter !== "all") {
      result = result.filter(
        (user) =>
          formatRoleName(user.roleDto?.name).toLowerCase() ===
          roleFilter.toLowerCase()
      );
    }

    // Tri
    result.sort((a, b) => {
      const direction = sortDirection === "asc" ? 1 : -1;
      switch (sortBy) {
        case "newest":
          return (new Date(b.createdAt) - new Date(a.createdAt)) * direction;
        case "oldest":
          return (new Date(a.createdAt) - new Date(b.createdAt)) * direction;
        case "name":
          return (
            `${a.firstname} ${a.lastname}`.localeCompare(
              `${b.firstname} ${b.lastname}`
            ) * direction
          );
        case "email":
          return a.email.localeCompare(b.email) * direction;
        default:
          return 0;
      }
    });

    setDisplayedUsers(result);
  }, [
    searchTerm,
    statusFilter,
    roleFilter,
    sortBy,
    sortDirection,
    users,
    formatRoleName,
  ]);

  // --- GESTIONNAIRES D'ACTIONS ---
  const handleDownloadPDF = async () => {
    if (displayedUsers.length === 0) return;

    setIsGeneratingPDF(true);
    setExportProgress(0);
    setShowExportMenu(false);

    try {
      const { pdfBlob } = await generateUsersPDF({
        displayedUsers,
        users,
        searchTerm,
        onProgress: setExportProgress,
      });

      if (pdfBlob) {
        const url = URL.createObjectURL(pdfBlob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `utilisateurs_${
          new Date().toISOString().split("T")[0]
        }.pdf`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);

        setExportStatus("success");
        setTimeout(() => setExportStatus(null), 3000);
      }
    } catch (e) {
      console.error("Erreur export PDF:", e);
      setExportStatus("error");
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  const handlePrint = async () => {
    if (displayedUsers.length === 0) return;

    setIsGeneratingPDF(true);
    setShowExportMenu(false);

    try {
      const { pdfUrl } = await generateUsersPDF({
        displayedUsers,
        users,
        searchTerm,
        onProgress: () => {},
      });

      if (pdfUrl) {
        const printWindow = window.open(pdfUrl);
        if (printWindow) {
          printWindow.onload = () => printWindow.print();
        }
      }
    } catch (e) {
      console.error("Erreur impression PDF:", e);
      setExportStatus("error");
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  const handleExportJSON = () => {
    if (displayedUsers.length === 0) return;

    const dataStr = JSON.stringify(displayedUsers, null, 2);
    const dataUri =
      "data:application/json;charset=utf-8," + encodeURIComponent(dataStr);
    const exportFileDefaultName = `utilisateurs_${
      new Date().toISOString().split("T")[0]
    }.json`;

    const linkElement = document.createElement("a");
    linkElement.setAttribute("href", dataUri);
    linkElement.setAttribute("download", exportFileDefaultName);
    linkElement.click();

    setExportStatus("success");
    setTimeout(() => setExportStatus(null), 3000);
  };

  const handleToggleSort = (field) => {
    if (sortBy === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortBy(field);
      setSortDirection("desc");
    }
  };

  const handleUserClick = (user) => {
    setSelectedUser(user);
    setShowUserDetails(true);
  };

  const handleCloseDetails = () => {
    setShowUserDetails(false);
    setSelectedUser(null);
  };

  // Récupérer les rôles uniques
  const uniqueRoles = Array.from(
    new Set(users.map((u) => formatRoleName(u.roleDto?.name)).filter(Boolean))
  ).sort();

  return (
    <>
      <Navbar onSearch={setSearchTerm} />

      <div className="admin-container">
        <div className="admin-layout-grid">
          <Sidebar />

          <main className="admin-content-wrapper">
            <div className="users-management-container">
              {/* HEADER DE PAGE */}
              <header className="page-header-section">
                <div className="header-content-row">
                  <div className="header-title-group">
                    <h1 className="page-main-title">
                      <UsersIcon size={32} className="title-icon" />
                      Gestion des Utilisateurs
                    </h1>
                    <p className="page-subtitle">
                      <Database size={16} className="subtitle-icon" />
                      Administration complète des comptes utilisateurs et des
                      permissions
                    </p>
                  </div>

                  <div className="header-stats-group">
                    <div className="stat-card total">
                      <div className="stat-icon-wrapper">
                        <Hash size={24} />
                      </div>
                      <div className="stat-content">
                        <div className="stat-number">{users.length}</div>
                        <div className="stat-label">Total</div>
                      </div>
                    </div>

                    <div className="stat-card active">
                      <div className="stat-icon-wrapper">
                        <UserCheck size={24} />
                      </div>
                      <div className="stat-content">
                        <div className="stat-number">
                          {users.filter((u) => u.actif).length}
                        </div>
                        <div className="stat-label">Actifs</div>
                      </div>
                    </div>

                    <div className="stat-card inactive">
                      <div className="stat-icon-wrapper">
                        <UserX size={24} />
                      </div>
                      <div className="stat-content">
                        <div className="stat-number">
                          {users.filter((u) => !u.actif).length}
                        </div>
                        <div className="stat-label">Inactifs</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* TOOLBAR */}
                <div className="page-toolbar-section">
                  <div className="toolbar-controls-group">
                    <div className="filter-controls-wrapper">
                      <div className="filter-group">
                        <label className="filter-label">
                          <Filter size={14} className="filter-label-icon" />
                          Filtres
                        </label>
                        <div className="filters-row">
                          <div className="filter-select-wrapper">
                            <Filter size={14} className="filter-select-icon" />
                            <select
                              className="filter-select"
                              value={statusFilter}
                              onChange={(e) => setStatusFilter(e.target.value)}
                            >
                              <option value="all">Tous les statuts</option>
                              <option value="active">Actifs</option>
                              <option value="inactive">Inactifs</option>
                            </select>
                          </div>

                          <div className="filter-select-wrapper">
                            <Shield size={14} className="filter-select-icon" />
                            <select
                              className="filter-select"
                              value={roleFilter}
                              onChange={(e) => setRoleFilter(e.target.value)}
                            >
                              <option value="all">Tous les rôles</option>
                              {uniqueRoles.map((role) => (
                                <option key={role} value={role.toLowerCase()}>
                                  {role}
                                </option>
                              ))}
                            </select>
                          </div>

                          <div className="filter-select-wrapper">
                            <ArrowUpDown
                              size={14}
                              className="filter-select-icon"
                            />
                            <select
                              className="filter-select"
                              value={sortBy}
                              onChange={(e) => setSortBy(e.target.value)}
                            >
                              <option value="newest">Plus récents</option>
                              <option value="oldest">Plus anciens</option>
                              <option value="name">Nom (A-Z)</option>
                              <option value="email">Email</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="action-buttons-group">
                      <div className="export-menu-container">
                        <button
                          className="action-btn secondary"
                          onClick={() => setShowExportMenu(!showExportMenu)}
                          disabled={
                            displayedUsers.length === 0 || isGeneratingPDF
                          }
                        >
                          <Download size={16} />
                          <span>Exporter</span>
                          <ChevronDown size={14} />
                        </button>

                        <AnimatePresence>
                          {showExportMenu && (
                            <motion.div
                              className="export-menu"
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -10 }}
                            >
                              <button
                                className="export-option"
                                onClick={handleDownloadPDF}
                              >
                                <FileText size={14} />
                                <span>Télécharger PDF</span>
                              </button>
                              <button
                                className="export-option"
                                onClick={handlePrint}
                              >
                                <Printer size={14} />
                                <span>Imprimer</span>
                              </button>
                              <button
                                className="export-option"
                                onClick={handleExportJSON}
                              >
                                <Database size={14} />
                                <span>Télécharger JSON</span>
                              </button>
                              <button className="export-option">
                                <Eye size={14} />
                                <span>Prévisualiser</span>
                              </button>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>

                      <button
                        className="action-btn primary"
                        onClick={loadUsers}
                        disabled={loading}
                      >
                        <RefreshCw
                          size={16}
                          className={loading ? "spinning" : ""}
                        />
                        Actualiser
                      </button>

                      <button className="action-btn success">
                        <Plus size={16} />
                        Nouvel utilisateur
                      </button>
                    </div>
                  </div>

                  {/* BARRE DE PROGRESSION */}
                  <AnimatePresence>
                    {isGeneratingPDF && (
                      <motion.div
                        className="export-progress-container"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                      >
                        <div className="export-progress-bar">
                          <div
                            className="export-progress-fill"
                            style={{ width: `${exportProgress}%` }}
                          />
                        </div>
                        <span className="export-progress-text">
                          <Zap size={14} />
                          Génération en cours... {exportProgress}%
                        </span>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* STATUT D'EXPORT */}
                  <AnimatePresence>
                    {exportStatus && (
                      <motion.div
                        className={`export-status ${exportStatus}`}
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                      >
                        {exportStatus === "success" ? (
                          <>
                            <CheckCircle size={16} />
                            <span>Export réussi</span>
                          </>
                        ) : (
                          <>
                            <AlertCircle size={16} />
                            <span>Erreur lors de l'export</span>
                          </>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </header>

              {/* TABLEAU DES DONNÉES */}
              <div className="users-table-section">
                {loading ? (
                  <div className="loading-state-container">
                    <div className="spinner-animation">
                      <RefreshCw size={32} className="spinning" />
                    </div>
                    <p className="loading-text">
                      <Clock size={16} />
                      Chargement des utilisateurs...
                    </p>
                  </div>
                ) : error ? (
                  <div className="error-state-container">
                    <div className="error-icon">
                      <AlertTriangle size={48} />
                    </div>
                    <p className="error-text">{error}</p>
                    <button className="retry-btn" onClick={loadUsers}>
                      <RotateCw size={16} />
                      Réessayer
                    </button>
                  </div>
                ) : displayedUsers.length === 0 ? (
                  <div className="empty-state-container">
                    <div className="empty-state-icon">
                      <UsersIcon size={64} />
                    </div>
                    <p className="empty-state-title">
                      Aucun utilisateur trouvé
                    </p>
                    <p className="empty-state-subtitle">
                      {searchTerm ||
                      statusFilter !== "all" ||
                      roleFilter !== "all"
                        ? "Modifiez vos critères de recherche"
                        : "Commencez par ajouter un nouvel utilisateur"}
                    </p>
                  </div>
                ) : (
                  <div className="table-responsive-wrapper">
                    <table className="users-data-table">
                      <thead className="table-header">
                        <tr>
                          <th scope="col" className="user-col">
                            <button
                              className="sort-header"
                              onClick={() => handleToggleSort("name")}
                            >
                              <UserCheck size={14} />
                              <span>Utilisateur</span>
                              {sortBy === "name" &&
                                (sortDirection === "asc" ? (
                                  <ChevronUp size={12} />
                                ) : (
                                  <ChevronDown size={12} />
                                ))}
                            </button>
                          </th>
                          <th scope="col" className="contact-col">
                            <button
                              className="sort-header"
                              onClick={() => handleToggleSort("email")}
                            >
                              <Mail size={14} />
                              <span>Contact</span>
                              {sortBy === "email" &&
                                (sortDirection === "asc" ? (
                                  <ChevronUp size={12} />
                                ) : (
                                  <ChevronDown size={12} />
                                ))}
                            </button>
                          </th>
                          <th scope="col" className="date-col">
                            <Calendar size={14} />
                            Date de naissance
                          </th>
                          <th scope="col" className="date-col">
                            <Calendar size={14} />
                            Inscription
                          </th>
                          <th scope="col" className="role-col">
                            <Shield size={14} />
                            Rôle
                          </th>
                          <th scope="col" className="status-col">
                            <Activity size={14} />
                            Statut
                          </th>
                          <th scope="col" className="actions-col">
                            <Settings size={14} />
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="table-body">
                        {displayedUsers.map((user, index) => (
                          <motion.tr
                            key={user.id}
                            className="table-row"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.03 }}
                            onClick={() => handleUserClick(user)}
                          >
                            <td className="user-cell">
                              <div className="user-identity-wrapper">
                                <div className="user-avatar-circle">
                                  {getInitials(user.firstname, user.lastname)}
                                </div>
                                <div className="user-info-stack">
                                  <div className="user-fullname">
                                    {user.firstname} {user.lastname}
                                    {user.roleDto?.name?.includes("ADMIN") && (
                                      <Star size={12} className="star-icon" />
                                    )}
                                  </div>
                                  <div className="user-metadata">
                                    {user.gender
                                      ? user.gender.charAt(0).toUpperCase() +
                                        user.gender.slice(1)
                                      : "Non spécifié"}
                                    {user.phone && (
                                      <>
                                        <Phone size={12} />
                                        {user.phone}
                                      </>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td className="contact-cell">
                              <div className="contact-info">
                                <Mail size={14} className="contact-icon" />
                                <a
                                  href={`mailto:${user.email}`}
                                  className="email-link"
                                >
                                  {user.email}
                                </a>
                              </div>
                            </td>
                            <td className="date-cell">
                              <time dateTime={user.dateOfBirth}>
                                {formatDate(user.dateOfBirth)}
                              </time>
                            </td>
                            <td className="date-cell">
                              <time dateTime={user.createdAt}>
                                {formatDate(user.createdAt)}
                              </time>
                            </td>
                            <td className="role-cell">
                              <span
                                className={`role-indicator ${formatRoleName(
                                  user.roleDto?.name
                                )
                                  .toLowerCase()
                                  .replace(/\s+/g, "-")}`}
                              >
                                <ShieldCheck size={14} />
                                <span>
                                  {formatRoleName(user.roleDto?.name)}
                                </span>
                              </span>
                            </td>
                            <td className="status-cell">
                              <span
                                className={`status-indicator ${
                                  user.actif ? "active" : "inactive"
                                }`}
                              >
                                {user.actif ? (
                                  <>
                                    <UserCheck size={14} />
                                    <span>Actif</span>
                                    <Lock size={10} />
                                  </>
                                ) : (
                                  <>
                                    <UserX size={14} />
                                    <span>Inactif</span>
                                    <Unlock size={10} />
                                  </>
                                )}
                              </span>
                            </td>
                            <td className="actions-cell">
                              <div className="action-buttons">
                                <button
                                  className="action-icon-btn edit"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    // Action éditer
                                  }}
                                  title="Modifier"
                                >
                                  <Edit size={14} />
                                </button>
                                <button
                                  className="action-icon-btn delete"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    // Action supprimer
                                  }}
                                  title="Supprimer"
                                >
                                  <Trash2 size={14} />
                                </button>
                                <button
                                  className="action-icon-btn"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    // Plus d'options
                                  }}
                                  title="Plus d'options"
                                >
                                  <MoreVertical size={14} />
                                </button>
                              </div>
                            </td>
                          </motion.tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}

                {/* PIED DE TABLEAU */}
                {displayedUsers.length > 0 && (
                  <div className="table-footer-section">
                    <div className="pagination-info">
                      <Database size={14} />
                      Affichage de <strong>{displayedUsers.length}</strong>{" "}
                      utilisateur(s)
                      {searchTerm && ` pour "${searchTerm}"`}
                    </div>
                    <div className="export-reminder">
                      <FileText size={14} />
                      <span>Exportez ces données en PDF ou JSON</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </main>
        </div>
      </div>

      <Footer />

      {/* MODAL DÉTAILS UTILISATEUR */}
      <AnimatePresence>
        {showUserDetails && selectedUser && (
          <motion.div
            className="modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleCloseDetails}
          >
            <motion.div
              className="user-details-modal"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="modal-header">
                <h3>
                  <UserCheck size={20} />
                  Détails de l'utilisateur
                </h3>
                <button
                  className="modal-close-btn"
                  onClick={handleCloseDetails}
                >
                  <X size={20} />
                </button>
              </div>

              <div className="modal-body">
                <div className="user-details-grid">
                  <div className="user-detail-item">
                    <div className="detail-label">
                      <UserCheck size={14} />
                      Nom complet
                    </div>
                    <div className="detail-value">
                      {selectedUser.firstname} {selectedUser.lastname}
                    </div>
                  </div>

                  <div className="user-detail-item">
                    <div className="detail-label">
                      <Mail size={14} />
                      Email
                    </div>
                    <div className="detail-value">
                      <a href={`mailto:${selectedUser.email}`}>
                        {selectedUser.email}
                      </a>
                    </div>
                  </div>

                  <div className="user-detail-item">
                    <div className="detail-label">
                      <Phone size={14} />
                      Téléphone
                    </div>
                    <div className="detail-value">
                      {selectedUser.phone || "Non spécifié"}
                    </div>
                  </div>

                  <div className="user-detail-item">
                    <div className="detail-label">
                      <Calendar size={14} />
                      Date de naissance
                    </div>
                    <div className="detail-value">
                      {formatDate(selectedUser.dateOfBirth)}
                    </div>
                  </div>

                  <div className="user-detail-item">
                    <div className="detail-label">
                      <Shield size={14} />
                      Rôle
                    </div>
                    <div className="detail-value">
                      <span
                        className={`role-badge ${formatRoleName(
                          selectedUser.roleDto?.name
                        ).toLowerCase()}`}
                      >
                        {formatRoleName(selectedUser.roleDto?.name)}
                      </span>
                    </div>
                  </div>

                  <div className="user-detail-item">
                    <div className="detail-label">
                      <Activity size={14} />
                      Statut
                    </div>
                    <div className="detail-value">
                      <span
                        className={`status-badge ${
                          selectedUser.actif ? "active" : "inactive"
                        }`}
                      >
                        {selectedUser.actif ? "Actif" : "Inactif"}
                      </span>
                    </div>
                  </div>

                  <div className="user-detail-item">
                    <div className="detail-label">
                      <Calendar size={14} />
                      Date d'inscription
                    </div>
                    <div className="detail-value">
                      {formatDate(selectedUser.createdAt)}
                    </div>
                  </div>
                </div>
              </div>

              <div className="modal-footer">
                <div className="modal-actions">
                  <button
                    className="modal-btn secondary"
                    onClick={handleCloseDetails}
                  >
                    <X size={16} />
                    Fermer
                  </button>
                  <button className="modal-btn primary">
                    <Edit size={16} />
                    Modifier
                  </button>
                  <button className="modal-btn danger">
                    <Trash2 size={16} />
                    Supprimer
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
