import React from "react";
import { Users, Activity, AlertTriangle, TrendingUp, Bell } from "lucide-react";
import { motion } from "framer-motion";
import Sidebar from "../../components/common/Sidebar";

import Footer from "../../components/common/Footer";

const StatCard = ({ icon, label, value, trend, color }) => (
  <motion.div
    className="stat-card"
    whileHover={{ scale: 1.03 }}
    transition={{ duration: 0.2 }}
  >
    <div className={`icon-box ${color}`}>{icon}</div>
    <div className="stat-content">
      <span className="stat-label">{label}</span>
      <h3 className="stat-value">{value}</h3>
      <span className="stat-trend">{trend}</span>
    </div>
  </motion.div>
);

const AdminDashboard = () => {
  return (
    <>
      <div className="admin-dashboard-container">
        <Sidebar />
        <div className="admin-layout">
          <main className="dashboard-container">
            {/* Header */}
            <header className="dashboard-header">
              <div className="header-text">
                <h1 className="dashboard-title">Tableau de bord</h1>
                <p className="dashboard-subtitle">Bienvenue, Administrateur.</p>
              </div>
              <div className="header-actions">
                <button className="notif-btn">
                  <Bell size={20} />
                </button>
              </div>
            </header>

            {/* KPI Cards */}
            <div className="stat-grid">
              <StatCard
                icon={<Users />}
                label="Utilisateurs"
                value="1,240"
                trend="+12%"
                color="blue"
              />
              <StatCard
                icon={<TrendingUp />}
                label="Activité"
                value="85%"
                trend="+2%"
                color="green"
              />
              <StatCard
                icon={<AlertTriangle />}
                label="Alertes"
                value="3"
                trend="Urgent"
                color="red"
              />
              <StatCard
                icon={<Activity />}
                label="Serveur"
                value="99.9%"
                trend="Stable"
                color="purple"
              />
            </div>

            {/* Main Grid */}
            <div className="dashboard-main-grid">
              <section className="dashboard-card chart-section">
                <div className="card-header">
                  <h3>Évolution des inscriptions</h3>
                </div>
                <div className="chart-placeholder">
                  <p>Espace Graphique</p>
                </div>
              </section>

              <section className="dashboard-card recent-activity">
                <div className="card-header">
                  <h3>Activités récentes</h3>
                </div>
                <ul className="activity-list">
                  <li>
                    <span>Utilisateur #12 a posté un avis</span>{" "}
                    <small>Il y a 2m</small>
                  </li>
                  <li>
                    <span>Signalement sur l'avis #402</span>{" "}
                    <small>Il y a 15m</small>
                  </li>
                  <li>
                    <span>Nouveau compte créé : "Julie"</span>{" "}
                    <small>Il y a 1h</small>
                  </li>
                </ul>
              </section>
            </div>

            {/* Alert Box */}
            <div className="alert-box">
              <AlertTriangle size={20} />
              <span>
                <strong>Alerte Sécurité :</strong> 3 tentatives de connexion
                échouées détectées.
              </span>
            </div>
          </main>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AdminDashboard;
