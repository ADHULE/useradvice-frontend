import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  FileText,
  Download,
  Printer,
  Share2,
  Filter,
  Calendar,
  Search,
  ChevronDown,
  Eye,
  Edit,
  Trash2,
  CheckCircle,
  AlertCircle,
  Clock,
  TrendingUp,
  TrendingDown,
  BarChart3,
  PieChart,
  LineChart,
  Users,
  DollarSign,
  Percent,
} from "lucide-react";
import Sidebar from "../../components/common/Sidebar";
import Footer from "../../components/common/Footer";
import Navbar from "../../components/common/Navbar";

// Composant de rapport
const ReportCard = ({
  title,
  date,
  status,
  type,
  author,
  downloads,
  delay = 0,
}) => (
  <motion.div
    className="reports-card"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay }}
    whileHover={{ scale: 1.02 }}
  >
    <div className="reports-card__header">
      <div className="reports-card__type-icon">
        {type === "financial" && <DollarSign size={20} />}
        {type === "analytics" && <BarChart3 size={20} />}
        {type === "user" && <Users size={20} />}
        {type === "performance" && <TrendingUp size={20} />}
      </div>
      <div className={`reports-card__status reports-card__status--${status}`}>
        {status === "completed" && <CheckCircle size={12} />}
        {status === "pending" && <Clock size={12} />}
        {status === "error" && <AlertCircle size={12} />}
        <span>{status}</span>
      </div>
    </div>

    <div className="reports-card__content">
      <h4 className="reports-card__title">{title}</h4>
      <div className="reports-card__meta">
        <div className="reports-card__meta-item">
          <Calendar size={14} />
          <span>{date}</span>
        </div>
        <div className="reports-card__meta-item">
          <Users size={14} />
          <span>{author}</span>
        </div>
      </div>
    </div>

    <div className="reports-card__footer">
      <div className="reports-card__downloads">
        <Download size={14} />
        <span>{downloads} téléchargements</span>
      </div>
      <div className="reports-card__actions">
        <button className="reports-card__action reports-card__action--view">
          <Eye size={16} />
        </button>
        <button className="reports-card__action reports-card__action--download">
          <Download size={16} />
        </button>
        <button className="reports-card__action reports-card__action--more">
          <ChevronDown size={16} />
        </button>
      </div>
    </div>
  </motion.div>
);

// Filtres de rapport
const ReportsFilter = () => {
  const [activeFilter, setActiveFilter] = useState("all");

  const filters = [
    { id: "all", label: "Tous les rapports" },
    { id: "financial", label: "Financier" },
    { id: "analytics", label: "Analytics" },
    { id: "user", label: "Utilisateurs" },
    { id: "performance", label: "Performance" },
  ];

  return (
    <div className="reports-filter">
      <div className="reports-filter__tabs">
        {filters.map((filter) => (
          <button
            key={filter.id}
            className={`reports-filter__tab ${
              activeFilter === filter.id ? "reports-filter__tab--active" : ""
            }`}
            onClick={() => setActiveFilter(filter.id)}
          >
            {filter.label}
          </button>
        ))}
      </div>
      <div className="reports-filter__controls">
        <div className="reports-filter__search">
          <Search size={18} />
          <input
            type="text"
            placeholder="Rechercher un rapport..."
            className="reports-filter__search-input"
          />
        </div>
        <button className="reports-filter__control-btn">
          <Filter size={18} />
          Filtres
        </button>
        <button className="reports-filter__control-btn reports-filter__control-btn--primary">
          <Calendar size={18} />
          Période
        </button>
      </div>
    </div>
  );
};

// Graphique de rapport
const ReportChart = ({ data, type }) => {
  const maxValue = Math.max(...data.map((d) => d.value));

  return (
    <div className="reports-chart">
      <div className="reports-chart__header">
        <h4 className="reports-chart__title">
          {type === "bar" && <BarChart3 size={18} />}
          {type === "line" && <LineChart size={18} />}
          {type === "pie" && <PieChart size={18} />}
          Vue d'ensemble
        </h4>
      </div>
      <div className="reports-chart__content">
        {type === "bar" && (
          <div className="reports-chart__bars">
            {data.map((item, index) => (
              <div key={index} className="reports-chart__bar-group">
                <div className="reports-chart__bar-label">{item.label}</div>
                <motion.div
                  className="reports-chart__bar"
                  initial={{ height: 0 }}
                  animate={{ height: `${(item.value / maxValue) * 100}%` }}
                  transition={{ delay: index * 0.1, duration: 1 }}
                  style={{ backgroundColor: item.color }}
                />
                <div className="reports-chart__bar-value">{item.value}</div>
              </div>
            ))}
          </div>
        )}

        {type === "line" && (
          <div className="reports-chart__line-container">
            <div className="reports-chart__line-grid">
              {[0, 25, 50, 75, 100].map((percent, i) => (
                <div key={i} className="reports-chart__grid-line">
                  <span>{percent}%</span>
                </div>
              ))}
            </div>
            <svg className="reports-chart__line" viewBox="0 0 100 100">
              <path
                d={`M0,${100 - data[0].value} ${data
                  .map(
                    (d, i) =>
                      `L${(i / (data.length - 1)) * 100},${100 - d.value}`
                  )
                  .join(" ")}`}
                fill="none"
                stroke="#4361ee"
                strokeWidth="3"
              />
            </svg>
          </div>
        )}
      </div>
    </div>
  );
};

const Reports = () => {
  const [reports, setReports] = useState([
    {
      id: 1,
      title: "Rapport Financier Q4 2024",
      date: "15 Déc 2024",
      status: "completed",
      type: "financial",
      author: "Marie Dubois",
      downloads: 245,
      color: "#4361ee",
    },
    {
      id: 2,
      title: "Analyse des Utilisateurs",
      date: "10 Déc 2024",
      status: "completed",
      type: "user",
      author: "Jean Martin",
      downloads: 189,
      color: "#4cc9f0",
    },
    {
      id: 3,
      title: "Performance Serveurs",
      date: "08 Déc 2024",
      status: "pending",
      type: "performance",
      author: "Tech Team",
      downloads: 76,
      color: "#7209b7",
    },
    {
      id: 4,
      title: "Analytics Trafic",
      date: "05 Déc 2024",
      status: "completed",
      type: "analytics",
      author: "Analytics Dept",
      downloads: 312,
      color: "#f72585",
    },
    {
      id: 5,
      title: "Audit de Sécurité",
      date: "01 Déc 2024",
      status: "error",
      type: "performance",
      author: "Security Team",
      downloads: 42,
      color: "#8338ec",
    },
    {
      id: 6,
      title: "Rapport Marketing",
      date: "28 Nov 2024",
      status: "completed",
      type: "analytics",
      author: "Marketing Dept",
      downloads: 167,
      color: "#4ade80",
    },
  ]);

  const chartData = [
    { label: "Jan", value: 45, color: "#4361ee" },
    { label: "Fév", value: 65, color: "#4cc9f0" },
    { label: "Mar", value: 55, color: "#7209b7" },
    { label: "Avr", value: 75, color: "#f72585" },
    { label: "Mai", value: 85, color: "#8338ec" },
    { label: "Jun", value: 95, color: "#4ade80" },
  ];

  const stats = [
    {
      title: "Rapports Générés",
      value: "1,245",
      change: "+12%",
      icon: <FileText size={24} />,
      trend: "up",
      color: "#4361ee",
    },
    {
      title: "Téléchargements",
      value: "8,542",
      change: "+24%",
      icon: <Download size={24} />,
      trend: "up",
      color: "#4cc9f0",
    },
    {
      title: "Complétion",
      value: "92%",
      change: "+3%",
      icon: <Percent size={24} />,
      trend: "up",
      color: "#7209b7",
    },
    {
      title: "En Attente",
      value: "18",
      change: "-2",
      icon: <Clock size={24} />,
      trend: "down",
      color: "#f72585",
    },
  ];

  return (
    <>
      <Navbar />
      <div className="reports-page">
        <Sidebar />

        <main className="reports-main">
          {/* Header */}
          <header className="reports-header">
            <div className="reports-header__title">
              <h1 className="reports-header__main-title">Rapports</h1>
              <p className="reports-header__subtitle">
                Gérez et consultez tous vos rapports en un seul endroit
              </p>
            </div>

            <div className="reports-header__actions">
              <button className="reports-header__action-btn reports-header__action-btn--primary">
                <FileText size={18} />
                Nouveau Rapport
              </button>
              <button className="reports-header__action-btn">
                <Share2 size={18} />
                Partager
              </button>
              <button className="reports-header__action-btn">
                <Printer size={18} />
                Imprimer
              </button>
            </div>
          </header>

          {/* Statistiques */}
          <section className="reports-stats">
            {stats.map((stat, index) => (
              <div key={index} className="reports-stat-card">
                <div
                  className="reports-stat-card__icon"
                  style={{ color: stat.color }}
                >
                  {stat.icon}
                </div>
                <div className="reports-stat-card__content">
                  <div className="reports-stat-card__title">{stat.title}</div>
                  <div className="reports-stat-card__value">{stat.value}</div>
                  <div
                    className={`reports-stat-card__change reports-stat-card__change--${stat.trend}`}
                  >
                    {stat.trend === "up" ? (
                      <TrendingUp size={14} />
                    ) : (
                      <TrendingDown size={14} />
                    )}
                    <span>{stat.change}</span>
                  </div>
                </div>
              </div>
            ))}
          </section>

          {/* Filtres */}
          <ReportsFilter />

          {/* Section principale */}
          <div className="reports-content">
            {/* Liste des rapports */}
            <div className="reports-list-section">
              <div className="reports-list-header">
                <h3 className="reports-list-title">
                  Rapports Récents ({reports.length})
                </h3>
                <div className="reports-list-actions">
                  <button className="reports-list-action">
                    <Edit size={16} />
                    Modifier
                  </button>
                  <button className="reports-list-action reports-list-action--delete">
                    <Trash2 size={16} />
                    Supprimer
                  </button>
                </div>
              </div>

              <div className="reports-grid">
                {reports.map((report, index) => (
                  <ReportCard
                    key={report.id}
                    title={report.title}
                    date={report.date}
                    status={report.status}
                    type={report.type}
                    author={report.author}
                    downloads={report.downloads}
                    delay={index * 0.1}
                  />
                ))}
              </div>
            </div>

            {/* Sidebar avec graphique */}
            <div className="reports-sidebar">
              <ReportChart data={chartData} type="bar" />

              <div className="reports-activity">
                <h4 className="reports-activity__title">
                  <Clock size={18} />
                  Activité Récente
                </h4>
                <div className="reports-activity__list">
                  {[
                    {
                      action: "Rapport exporté",
                      user: "Pierre",
                      time: "2 min",
                    },
                    {
                      action: "Nouveau rapport créé",
                      user: "Sophie",
                      time: "15 min",
                    },
                    { action: "Rapport partagé", user: "Marc", time: "1h" },
                    { action: "Rapport mis à jour", user: "Julie", time: "3h" },
                    { action: "Rapport supprimé", user: "Admin", time: "5h" },
                  ].map((activity, index) => (
                    <div key={index} className="reports-activity__item">
                      <div className="reports-activity__dot"></div>
                      <div className="reports-activity__content">
                        <div className="reports-activity__text">
                          <span className="reports-activity__user">
                            {activity.user}
                          </span>{" "}
                          {activity.action}
                        </div>
                        <div className="reports-activity__time">
                          {activity.time}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Section d'export */}
          <section className="reports-export-section">
            <div className="reports-export-card">
              <div className="reports-export-card__content">
                <h3 className="reports-export-card__title">
                  <Download size={24} />
                  Exporter les Rapports
                </h3>
                <p className="reports-export-card__description">
                  Exportez tous vos rapports en format PDF, Excel ou CSV
                </p>
                <div className="reports-export-card__formats">
                  <button className="reports-export-card__format">
                    <FileText size={20} />
                    PDF
                  </button>
                  <button className="reports-export-card__format">
                    <BarChart3 size={20} />
                    Excel
                  </button>
                  <button className="reports-export-card__format">
                    <FileText size={20} />
                    CSV
                  </button>
                </div>
              </div>
              <div className="reports-export-card__preview">
                <div className="reports-export-card__preview-icon">
                  <FileText size={48} />
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
      <Footer />
    </>
  );
};

export default Reports;
