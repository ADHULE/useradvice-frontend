import React, { useEffect, useState, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Footer from "../../components/common/Footer";
import Navbar from "../../components/common/Navbar";
import Sidebar from "../../components/common/Sidebar";
import {
  ArrowLeft,
  Info,
  User,
  FileText,
  Clock,
  Mail,
  Calendar,
  Shield,
  AlertCircle,
  CheckCircle,
  Hourglass,
  MessageSquare,
  Star,
  ThumbsUp,
  ThumbsDown,
  Edit,
  Printer,
  Download,
  Share2,
  Copy,
  Eye,
  History,
  Award,
  TrendingUp,
  BarChart3,
  PieChart,
  Activity,
  Zap,
  Database,
  Server,
  Smartphone,
  Globe,
  MapPin,
  Phone,
  Hash,
  Tag,
  Lock,
  Unlock,
  RefreshCw,
  XCircle,
  MoreVertical,
  Settings,
  Filter,
  Search,
  ChevronRight,
  ChevronLeft,
  ExternalLink,
  Link as LinkIcon,
  Bookmark,
  Heart,
  Flag,
  AlertTriangle,
  HelpCircle,
  BookOpen,
  Code,
  Terminal,
  Cpu,
  HardDrive,
  Wifi,
  Bluetooth,
  Battery,
  Cloud,
  Sun,
  Moon,
} from "lucide-react";

// Simulation API améliorée
const api = {
  get: (url) => {
    console.log("API GET:", url);
    return new Promise((resolve) =>
      setTimeout(
        () =>
          resolve({
            data: {
              id: parseInt(url.split("/").pop()) || 1,
              message:
                "J'aimerais partager mon expérience avec votre plateforme qui a été extrêmement positive. L'interface utilisateur est intuitive et les fonctionnalités sont bien pensées. J'apprécie particulièrement la rapidité de traitement des demandes et le support réactif de l'équipe. Une suggestion d'amélioration serait d'ajouter une fonctionnalité d'export de données plus avancée avec des options de personnalisation supplémentaires.",
              status: "En attente",
              category: "Amélioration",
              priority: "Moyenne",
              rating: 4,
              helpfulCount: 12,
              views: 45,
              attachments: ["document.pdf", "screenshot.png"],
              tags: ["UI/UX", "Fonctionnalité", "Suggestion"],
              createdAt: new Date().toISOString(),
              updatedAt: new Date(Date.now() - 86400000).toISOString(),
              userDto: {
                id: 123,
                firstname: "Jean",
                lastname: "Martin",
                email: "jean.martin@example.com",
                phone: "+33 6 12 34 56 78",
                company: "TechCorp Solutions",
                role: "Administrateur",
                avatarColor: "#4361ee",
                lastActive: new Date(Date.now() - 3600000).toISOString(),
                totalAdvices: 8,
                verified: true,
                location: "Paris, France",
              },
              history: [
                { date: "2024-01-15", action: "Soumis", user: "Système" },
                { date: "2024-01-16", action: "Revu", user: "Support" },
                { date: "2024-01-17", action: "Assigné", user: "Admin" },
              ],
            },
          }),
        800
      )
    );
  },
};

// Composant Badge de Statut
const StatusBadge = ({ status }) => {
  const statusConfig = {
    "En attente": {
      icon: Hourglass,
      color: "warning",
      label: "En attente de traitement",
    },
    Traité: {
      icon: CheckCircle,
      color: "success",
      label: "Avis traité et résolu",
    },
    "En cours": {
      icon: Clock,
      color: "info",
      label: "En cours de traitement",
    },
    Rejeté: {
      icon: XCircle,
      color: "danger",
      label: "Avis rejeté",
    },
    Archivé: {
      icon: Database,
      color: "gray",
      label: "Avis archivé",
    },
  };

  const config = statusConfig[status] || statusConfig["En attente"];
  const Icon = config.icon;

  return (
    <div className={`advice-detail-status-badge advice-status-${config.color}`}>
      <Icon size={16} className="advice-status-icon" />
      <div className="advice-status-content">
        <span className="advice-status-label">{status}</span>
        <span className="advice-status-description">{config.label}</span>
      </div>
    </div>
  );
};

// Composant Information Card
const InfoCard = ({
  title,
  icon: Icon,
  children,
  color = "primary",
  delay = 0,
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.3 }}
    className={`advice-detail-info-card advice-card-${color}`}
  >
    <div className="advice-card-header">
      <div className="advice-card-icon-wrapper">
        <Icon size={20} className="advice-card-icon" />
      </div>
      <h3 className="advice-card-title">{title}</h3>
    </div>
    <div className="advice-card-content">{children}</div>
  </motion.div>
);

// Composant Metric
const Metric = ({ label, value, icon: Icon, color = "primary", trend }) => (
  <div className={`advice-detail-metric advice-metric-${color}`}>
    <div className="advice-metric-icon">
      <Icon size={16} />
    </div>
    <div className="advice-metric-content">
      <span className="advice-metric-value">{value}</span>
      <span className="advice-metric-label">{label}</span>
    </div>
    {trend && (
      <div
        className={`advice-metric-trend ${trend > 0 ? "positive" : "negative"}`}
      >
        {trend > 0 ? "↗" : "↘"} {Math.abs(trend)}%
      </div>
    )}
  </div>
);

const AdviceDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [advice, setAdvice] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("details");

  // Charger les données
  useEffect(() => {
    const fetchAdvice = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await api.get(`/advices/${id}`);
        setAdvice(response.data);
      } catch (err) {
        console.error("Erreur lors du chargement:", err);
        setError("Impossible de charger les détails de l'avis.");
      } finally {
        setLoading(false);
      }
    };

    fetchAdvice();
  }, [id]);

  // Formatter la date
  const formatDate = useCallback((dateString) => {
    if (!dateString) return "—";
    const date = new Date(dateString);
    return date.toLocaleDateString("fr-FR", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  }, []);

  // Calculer le temps écoulé
  const getTimeAgo = useCallback((dateString) => {
    if (!dateString) return "";
    const now = new Date();
    const past = new Date(dateString);
    const diffMs = now - past;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffDays > 0)
      return `Il y a ${diffDays} jour${diffDays > 1 ? "s" : ""}`;
    if (diffHours > 0)
      return `Il y a ${diffHours} heure${diffHours > 1 ? "s" : ""}`;
    if (diffMins > 0)
      return `Il y a ${diffMins} minute${diffMins > 1 ? "s" : ""}`;
    return "À l'instant";
  }, []);

  // Actions
  const handlePrint = () => {
    window.print();
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    alert("Lien copié dans le presse-papier !");
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `Avis #${advice.id}`,
        text: `Découvrez cet avis sur notre plateforme`,
        url: window.location.href,
      });
    }
  };

  // Si chargement
  if (loading) {
    return (
      <div className="advice-detail-loading">
        <div className="advice-loading-content">
          <RefreshCw size={48} className="advice-loading-spinner spinning" />
          <h3 className="advice-loading-title">Chargement des détails</h3>
          <p className="advice-loading-subtitle">Veuillez patienter...</p>
        </div>
      </div>
    );
  }

  // Si erreur
  if (error) {
    return (
      <div className="advice-detail-error">
        <div className="advice-error-content">
          <AlertCircle size={64} className="advice-error-icon" />
          <h3 className="advice-error-title">Erreur de chargement</h3>
          <p className="advice-error-message">{error}</p>
          <button className="advice-error-btn" onClick={() => navigate(-1)}>
            <ArrowLeft size={16} />
            Retour
          </button>
        </div>
      </div>
    );
  }

  // Si pas de données
  if (!advice) {
    return (
      <div className="advice-detail-empty">
        <div className="advice-empty-content">
          <FileText size={64} className="advice-empty-icon" />
          <h3 className="advice-empty-title">Avis non trouvé</h3>
          <p className="advice-empty-message">
            L'avis que vous recherchez n'existe pas ou a été supprimé.
          </p>
          <button
            className="advice-empty-btn"
            onClick={() => navigate("/advices")}
          >
            <ArrowLeft size={16} />
            Voir tous les avis
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="advice-detail-container">
        <Sidebar />

        <div className="advice-detail-layout">
          <Navbar />

          <div className="advice-detail-main">
            <main className="advice-detail-content">
              {/* Header */}
              <header className="advice-detail-header">
                <motion.div
                  className="advice-header-content"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="advice-header-left">
                    <button
                      className="advice-back-btn"
                      onClick={() => navigate(-1)}
                    >
                      <ArrowLeft size={20} />
                      Retour
                    </button>

                    <div className="advice-header-text">
                      <h1 className="advice-detail-title">
                        <MessageSquare
                          size={32}
                          className="advice-title-icon"
                        />
                        Détails de l'Avis
                      </h1>
                      <p className="advice-detail-subtitle">
                        <Info size={16} className="advice-subtitle-icon" />
                        Consultation complète de l'avis #{advice.id}
                      </p>
                    </div>
                  </div>

                  <div className="advice-header-right">
                    <div className="advice-header-actions">
                      <button
                        className="advice-action-btn secondary"
                        onClick={handleCopyLink}
                      >
                        <Copy size={16} />
                        Copier le lien
                      </button>
                      <button
                        className="advice-action-btn primary"
                        onClick={handleShare}
                      >
                        <Share2 size={16} />
                        Partager
                      </button>
                      <button
                        className="advice-action-btn success"
                        onClick={handlePrint}
                      >
                        <Printer size={16} />
                        Imprimer
                      </button>
                    </div>

                    <StatusBadge status={advice.status} />
                  </div>
                </motion.div>
              </header>

              {/* Metrics */}
              <motion.div
                className="advice-detail-metrics"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <Metric
                  label="Vues"
                  value={advice.views}
                  icon={Eye}
                  color="primary"
                  trend={15}
                />
                <Metric
                  label="Utiles"
                  value={advice.helpfulCount}
                  icon={ThumbsUp}
                  color="success"
                  trend={8}
                />
                <Metric
                  label="Note"
                  value={`${advice.rating}/5`}
                  icon={Star}
                  color="warning"
                />
                <Metric
                  label="Priorité"
                  value={advice.priority}
                  icon={AlertTriangle}
                  color="danger"
                />
              </motion.div>

              {/* Navigation Tabs */}
              <nav className="advice-detail-tabs">
                <div className="advice-tabs-container">
                  {["details", "user", "history", "analytics"].map((tab) => (
                    <button
                      key={tab}
                      className={`advice-tab-btn ${
                        activeTab === tab ? "active" : ""
                      }`}
                      onClick={() => setActiveTab(tab)}
                    >
                      {tab === "details" && (
                        <>
                          <FileText size={16} /> Détails
                        </>
                      )}
                      {tab === "user" && (
                        <>
                          <User size={16} /> Utilisateur
                        </>
                      )}
                      {tab === "history" && (
                        <>
                          <History size={16} /> Historique
                        </>
                      )}
                      {tab === "analytics" && (
                        <>
                          <BarChart3 size={16} /> Analytics
                        </>
                      )}
                    </button>
                  ))}
                </div>
              </nav>

              {/* Content */}
              <div className="advice-detail-sections">
                <AnimatePresence mode="wait">
                  {/* Détails */}
                  {activeTab === "details" && (
                    <motion.div
                      key="details"
                      className="advice-details-section"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                    >
                      <InfoCard
                        title="Contenu de l'Avis"
                        icon={MessageSquare}
                        color="primary"
                      >
                        <div className="advice-message-container">
                          <p className="advice-message-content">
                            {advice.message}
                          </p>

                          <div className="advice-message-meta">
                            <div className="advice-message-category">
                              <Tag size={14} />
                              <span>{advice.category}</span>
                            </div>
                            <div className="advice-message-length">
                              <FileText size={14} />
                              <span>{advice.message.length} caractères</span>
                            </div>
                          </div>
                        </div>
                      </InfoCard>

                      <InfoCard
                        title="Informations Générales"
                        icon={Info}
                        color="info"
                        delay={0.1}
                      >
                        <div className="advice-info-grid">
                          <div className="advice-info-item">
                            <span className="advice-info-label">
                              <Hash size={14} />
                              ID
                            </span>
                            <span className="advice-info-value">
                              {advice.id}
                            </span>
                          </div>

                          <div className="advice-info-item">
                            <span className="advice-info-label">
                              <Calendar size={14} />
                              Date de création
                            </span>
                            <span className="advice-info-value">
                              {formatDate(advice.createdAt)}
                            </span>
                          </div>

                          <div className="advice-info-item">
                            <span className="advice-info-label">
                              <Clock size={14} />
                              Dernière mise à jour
                            </span>
                            <span className="advice-info-value">
                              {formatDate(advice.updatedAt)}
                              <span className="advice-info-timeago">
                                ({getTimeAgo(advice.updatedAt)})
                              </span>
                            </span>
                          </div>

                          <div className="advice-info-item">
                            <span className="advice-info-label">
                              <Tag size={14} />
                              Catégorie
                            </span>
                            <span className="advice-info-value">
                              {advice.category}
                            </span>
                          </div>
                        </div>
                      </InfoCard>

                      {advice.tags && advice.tags.length > 0 && (
                        <InfoCard
                          title="Tags & Mots-clés"
                          icon={Tag}
                          color="success"
                          delay={0.2}
                        >
                          <div className="advice-tags-container">
                            {advice.tags.map((tag, index) => (
                              <span key={index} className="advice-tag">
                                {tag}
                              </span>
                            ))}
                          </div>
                        </InfoCard>
                      )}
                    </motion.div>
                  )}

                  {/* Utilisateur */}
                  {activeTab === "user" && (
                    <motion.div
                      key="user"
                      className="advice-user-section"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                    >
                      <InfoCard
                        title="Informations Utilisateur"
                        icon={User}
                        color="primary"
                      >
                        <div className="advice-user-profile">
                          <div className="advice-user-avatar">
                            <div
                              className="advice-avatar-circle"
                              style={{
                                backgroundColor: advice.userDto.avatarColor,
                              }}
                            >
                              {advice.userDto.firstname?.[0]}
                              {advice.userDto.lastname?.[0]}
                            </div>
                            {advice.userDto.verified && (
                              <div className="advice-user-verified">
                                <CheckCircle size={12} />
                              </div>
                            )}
                          </div>

                          <div className="advice-user-info">
                            <h3 className="advice-user-name">
                              {advice.userDto.firstname}{" "}
                              {advice.userDto.lastname}
                            </h3>
                            <div className="advice-user-role">
                              <Shield size={14} />
                              <span>{advice.userDto.role}</span>
                            </div>
                          </div>
                        </div>

                        <div className="advice-user-details">
                          <div className="advice-user-detail">
                            <span className="advice-detail-label">
                              <Mail size={14} />
                              Email
                            </span>
                            <a
                              href={`mailto:${advice.userDto.email}`}
                              className="advice-detail-value"
                            >
                              {advice.userDto.email}
                            </a>
                          </div>

                          {advice.userDto.phone && (
                            <div className="advice-user-detail">
                              <span className="advice-detail-label">
                                <Phone size={14} />
                                Téléphone
                              </span>
                              <a
                                href={`tel:${advice.userDto.phone}`}
                                className="advice-detail-value"
                              >
                                {advice.userDto.phone}
                              </a>
                            </div>
                          )}

                          {advice.userDto.company && (
                            <div className="advice-user-detail">
                              <span className="advice-detail-label">
                                <Database size={14} />
                                Entreprise
                              </span>
                              <span className="advice-detail-value">
                                {advice.userDto.company}
                              </span>
                            </div>
                          )}

                          {advice.userDto.location && (
                            <div className="advice-user-detail">
                              <span className="advice-detail-label">
                                <MapPin size={14} />
                                Localisation
                              </span>
                              <span className="advice-detail-value">
                                {advice.userDto.location}
                              </span>
                            </div>
                          )}

                          <div className="advice-user-detail">
                            <span className="advice-detail-label">
                              <Clock size={14} />
                              Dernière activité
                            </span>
                            <span className="advice-detail-value">
                              {getTimeAgo(advice.userDto.lastActive)}
                            </span>
                          </div>

                          <div className="advice-user-detail">
                            <span className="advice-detail-label">
                              <FileText size={14} />
                              Avis soumis
                            </span>
                            <span className="advice-detail-value">
                              {advice.userDto.totalAdvices || 0}
                            </span>
                          </div>
                        </div>
                      </InfoCard>
                    </motion.div>
                  )}

                  {/* Historique */}
                  {activeTab === "history" && (
                    <motion.div
                      key="history"
                      className="advice-history-section"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                    >
                      <InfoCard
                        title="Historique des Actions"
                        icon={History}
                        color="warning"
                      >
                        <div className="advice-timeline">
                          {(advice.history || []).map((event, index) => (
                            <div key={index} className="advice-timeline-item">
                              <div className="advice-timeline-dot" />
                              <div className="advice-timeline-content">
                                <div className="advice-timeline-header">
                                  <span className="advice-timeline-action">
                                    {event.action}
                                  </span>
                                  <span className="advice-timeline-date">
                                    {formatDate(event.date)}
                                  </span>
                                </div>
                                <div className="advice-timeline-user">
                                  <User size={12} />
                                  <span>{event.user}</span>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </InfoCard>
                    </motion.div>
                  )}

                  {/* Analytics */}
                  {activeTab === "analytics" && (
                    <motion.div
                      key="analytics"
                      className="advice-analytics-section"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                    >
                      <InfoCard
                        title="Analytics et Métriques"
                        icon={BarChart3}
                        color="info"
                      >
                        <div className="advice-analytics-grid">
                          <div className="advice-analytics-item">
                            <div className="advice-analytics-icon">
                              <Eye size={20} />
                            </div>
                            <div className="advice-analytics-content">
                              <span className="advice-analytics-value">
                                {advice.views}
                              </span>
                              <span className="advice-analytics-label">
                                Vues totales
                              </span>
                            </div>
                          </div>

                          <div className="advice-analytics-item">
                            <div className="advice-analytics-icon">
                              <ThumbsUp size={20} />
                            </div>
                            <div className="advice-analytics-content">
                              <span className="advice-analytics-value">
                                {advice.helpfulCount}
                              </span>
                              <span className="advice-analytics-label">
                                Utiles
                              </span>
                            </div>
                          </div>

                          <div className="advice-analytics-item">
                            <div className="advice-analytics-icon">
                              <Activity size={20} />
                            </div>
                            <div className="advice-analytics-content">
                              <span className="advice-analytics-value">
                                85%
                              </span>
                              <span className="advice-analytics-label">
                                Engagement
                              </span>
                            </div>
                          </div>

                          <div className="advice-analytics-item">
                            <div className="advice-analytics-icon">
                              <Share2 size={20} />
                            </div>
                            <div className="advice-analytics-content">
                              <span className="advice-analytics-value">7</span>
                              <span className="advice-analytics-label">
                                Partages
                              </span>
                            </div>
                          </div>
                        </div>
                      </InfoCard>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Actions Footer */}
              <footer className="advice-detail-footer">
                <div className="advice-footer-actions">
                  <button className="advice-footer-btn primary">
                    <Edit size={16} />
                    Modifier le statut
                  </button>

                  <button className="advice-footer-btn success">
                    <CheckCircle size={16} />
                    Marquer comme résolu
                  </button>

                  <button className="advice-footer-btn warning">
                    <Hourglass size={16} />
                    Mettre en attente
                  </button>

                  <button className="advice-footer-btn danger">
                    <XCircle size={16} />
                    Supprimer l'avis
                  </button>
                </div>
              </footer>
            </main>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default AdviceDetail;
