import React, { useState, useEffect } from "react";
import {
  Users,
  Activity,
  AlertTriangle,
  TrendingUp,
  Bell,
  Eye,
  Download,
  Filter,
  Calendar,
  BarChart3,
  PieChart,
  Target,
  Clock,
  ChevronRight,
  RefreshCw,
  MoreVertical,
} from "lucide-react";
import { motion } from "framer-motion";
import Sidebar from "../../components/common/Sidebar";
import Footer from "../../components/common/Footer";
import Navbar from "../../components/common/Navbar";

// Composant de carte de statistique
const StatCard = ({ icon, label, value, trend, color, delay = 0 }) => (
  <motion.div
    className="dashboard-stat-card"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay }}
    whileHover={{
      y: -8,
      transition: { type: "spring", stiffness: 300 },
    }}
    style={{ "--stat-color": color }}
  >
    <div className="stat-card__content">
      <div className="stat-card__icon-container">
        <div className="stat-card__icon">{icon}</div>
        <div className="stat-card__glow"></div>
      </div>

      <div className="stat-card__data">
        <h3 className="stat-card__value">{value}</h3>
        <span className="stat-card__label">{label}</span>
      </div>

      {trend && (
        <div className={`stat-card__trend trend--${trend.type}`}>
          {trend.icon}
          <span>{trend.value}</span>
        </div>
      )}
    </div>

    <div className="stat-card__progress">
      <motion.div
        className="stat-card__progress-bar"
        initial={{ width: 0 }}
        animate={{ width: `${trend?.progress || 75}%` }}
        transition={{ delay: delay + 0.2, duration: 1 }}
      />
    </div>

    <div className="stat-card__hover-effect"></div>
  </motion.div>
);

// Composant de graphique placeholder
const ChartPlaceholder = ({ title, type, data }) => (
  <motion.div
    className="dashboard-chart"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay: 0.4 }}
  >
    <div className="chart__header">
      <h3 className="chart__title">{title}</h3>
      <div className="chart__actions">
        <button className="chart__action-btn">
          <Filter size={16} />
        </button>
        <button className="chart__action-btn">
          <Download size={16} />
        </button>
        <button className="chart__action-btn">
          <MoreVertical size={16} />
        </button>
      </div>
    </div>

    <div className="chart__content">
      <div className="chart__visualization">
        {type === "bar" && (
          <div className="chart__bars">
            {[65, 80, 45, 90, 75, 85, 60].map((height, i) => (
              <motion.div
                key={i}
                className="chart__bar"
                initial={{ height: 0 }}
                animate={{ height: `${height}%` }}
                transition={{ delay: 0.5 + i * 0.1, type: "spring" }}
              />
            ))}
          </div>
        )}

        {type === "pie" && (
          <div className="chart__pie">
            <div className="pie__slice" style={{ "--percentage": 40 }}></div>
            <div className="pie__slice" style={{ "--percentage": 30 }}></div>
            <div className="pie__slice" style={{ "--percentage": 20 }}></div>
            <div className="pie__slice" style={{ "--percentage": 10 }}></div>
            <div className="pie__center"></div>
          </div>
        )}
      </div>

      <div className="chart__legend">
        {data.map((item, i) => (
          <div key={i} className="legend__item">
            <div
              className="legend__color"
              style={{ backgroundColor: item.color }}
            />
            <span className="legend__label">{item.label}</span>
            <span className="legend__value">{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  </motion.div>
);

// Composant de tableau récent
const RecentActivity = () => (
  <motion.div
    className="dashboard-activity"
    initial={{ opacity: 0, x: 20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay: 0.6 }}
  >
    <div className="activity__header">
      <h3 className="activity__title">Activité Récente</h3>
      <button className="activity__view-all">
        Tout voir <ChevronRight size={16} />
      </button>
    </div>

    <div className="activity__list">
      {[
        {
          user: "Julie Martin",
          action: "a posté un nouvel avis",
          time: "2 min",
          icon: "👤",
          color: "var(--primary-color)",
        },
        {
          user: "Signalement",
          action: "sur l'avis #402",
          time: "15 min",
          icon: "⚠️",
          color: "var(--warning-color)",
        },
        {
          user: "Nouveau compte",
          action: "utilisateur 'Alex' créé",
          time: "1h",
          icon: "✨",
          color: "var(--success-color)",
        },
        {
          user: "Mise à jour",
          action: "version 2.1.0 déployée",
          time: "3h",
          icon: "🔄",
          color: "var(--info-color)",
        },
        {
          user: "Backup",
          action: "sauvegarde automatique",
          time: "5h",
          icon: "💾",
          color: "var(--purple)",
        },
      ].map((activity, i) => (
        <motion.div
          key={i}
          className="activity__item"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.7 + i * 0.1 }}
          whileHover={{ x: 4 }}
        >
          <div
            className="activity__icon"
            style={{ backgroundColor: activity.color }}
          >
            {activity.icon}
          </div>
          <div className="activity__content">
            <p className="activity__text">
              <span className="activity__user">{activity.user}</span>{" "}
              {activity.action}
            </p>
            <span className="activity__time">
              <Clock size={12} /> {activity.time}
            </span>
          </div>
        </motion.div>
      ))}
    </div>
  </motion.div>
);

const AdminDashboard = () => {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 1000);
  };

  const stats = [
    {
      icon: <Users size={24} />,
      label: "Utilisateurs Actifs",
      value: "1,240",
      trend: {
        type: "up",
        value: "+12%",
        icon: <TrendingUp size={14} />,
        progress: 80,
      },
      color: "var(--primary-color)",
    },
    {
      icon: <Activity size={24} />,
      label: "Taux d'Engagement",
      value: "85%",
      trend: {
        type: "up",
        value: "+2%",
        icon: <TrendingUp size={14} />,
        progress: 85,
      },
      color: "var(--success-color)",
    },
    {
      icon: <AlertTriangle size={24} />,
      label: "Alertes",
      value: "3",
      trend: {
        type: "down",
        value: "Urgent",
        icon: <AlertTriangle size={14} />,
        progress: 30,
      },
      color: "var(--warning-color)",
    },
    {
      icon: <BarChart3 size={24} />,
      label: "Performance",
      value: "99.9%",
      trend: {
        type: "stable",
        value: "Stable",
        icon: <Activity size={14} />,
        progress: 99,
      },
      color: "var(--info-color)",
    },
    {
      icon: <Target size={24} />,
      label: "Objectifs",
      value: "78%",
      trend: {
        type: "up",
        value: "+5%",
        icon: <TrendingUp size={14} />,
        progress: 78,
      },
      color: "var(--purple)",
    },
    {
      icon: <PieChart size={24} />,
      label: "Satisfaction",
      value: "4.8/5",
      trend: {
        type: "up",
        value: "+0.2",
        icon: <TrendingUp size={14} />,
        progress: 96,
      },
      color: "var(--accent-color)",
    },
  ];

  const chartData = [
    { label: "Mobile", value: "40%", color: "var(--primary-color)" },
    { label: "Desktop", value: "35%", color: "var(--success-color)" },
    { label: "Tablette", value: "20%", color: "var(--warning-color)" },
    { label: "Autre", value: "5%", color: "var(--info-color)" },
  ];

  return (
    <>
      <Navbar />
      <div className="admin-dashboard">
        <Sidebar />

        <main className="dashboard__main">
          {/* Header avec bienvenue et actions */}
          <header className="dashboard__header">
            <motion.div
              className="dashboard__welcome"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h1 className="dashboard__title">
                Bonjour,{" "}
                <span className="dashboard__highlight">Administrateur</span>
              </h1>
              <p className="dashboard__subtitle">
                Voici un aperçu de votre plateforme aujourd'hui à{" "}
                {time.toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </motion.div>

            <div className="dashboard__actions">
              <button
                className="dashboard-btn dashboard-btn--refresh"
                onClick={handleRefresh}
              >
                <RefreshCw
                  size={18}
                  className={isRefreshing ? "refreshing" : ""}
                />
                Actualiser
              </button>

              <button className="dashboard-btn dashboard-btn--date">
                <Calendar size={18} />
                {time.toLocaleDateString("fr-FR", {
                  weekday: "long",
                  day: "numeric",
                  month: "long",
                })}
              </button>

              <button className="dashboard-btn dashboard-btn--notification">
                <Bell size={18} />
                <span className="notification-badge"></span>
              </button>
            </div>
          </header>

          {/* Grille de statistiques */}
          <section className="dashboard__stats">
            {stats.map((stat, index) => (
              <StatCard
                key={index}
                icon={stat.icon}
                label={stat.label}
                value={stat.value}
                trend={stat.trend}
                color={stat.color}
                delay={index * 0.1}
              />
            ))}
          </section>

          {/* Graphiques et données */}
          <div className="dashboard__charts">
            <div className="charts__main">
              <ChartPlaceholder
                title="Évolution des Inscriptions"
                type="bar"
                data={chartData}
              />
            </div>

            <div className="charts__sidebar">
              <RecentActivity />

              <motion.div
                className="dashboard__quick-stats"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
              >
                <h3 className="quick-stats__title">Statistiques Rapides</h3>
                <div className="quick-stats__grid">
                  <div className="quick-stat">
                    <div
                      className="quick-stat__icon"
                      style={{ background: "var(--primary-color)" }}
                    >
                      <Eye size={16} />
                    </div>
                    <div className="quick-stat__data">
                      <span className="quick-stat__value">24.5K</span>
                      <span className="quick-stat__label">Vues</span>
                    </div>
                  </div>

                  <div className="quick-stat">
                    <div
                      className="quick-stat__icon"
                      style={{ background: "var(--success-color)" }}
                    >
                      <Users size={16} />
                    </div>
                    <div className="quick-stat__data">
                      <span className="quick-stat__value">1.2K</span>
                      <span className="quick-stat__label">Nouveaux</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Alertes importantes */}
          <motion.div
            className="dashboard__alert"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
          >
            <div className="alert__header">
              <AlertTriangle size={20} />
              <h3 className="alert__title">Alerte Sécurité</h3>
            </div>
            <div className="alert__content">
              <p className="alert__message">
                3 tentatives de connexion échouées détectées sur le compte
                administrateur.
              </p>
              <div className="alert__actions">
                <button className="alert-btn alert-btn--primary">
                  Vérifier
                </button>
                <button className="alert-btn alert-btn--secondary">
                  Ignorer
                </button>
              </div>
            </div>
          </motion.div>
        </main>
      </div>
      <Footer />
    </>
  );
};

export default AdminDashboard;
