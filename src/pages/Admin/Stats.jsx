import React from "react";
import {
  BarChart3,
  Users,
  MessageSquare,
  Settings,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";
import { motion } from "framer-motion";
import Footer from "../../components/common/Footer";
import Sidebar from "../../components/common/Sidebar";

const StatCard = ({ icon: Icon, value, label, trend, isPositive, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay }}
    className="stat-card"
  >
    <div className="card-content">
      <div className="icon-container">
        <Icon size={24} />
      </div>
      <div className="stat-data">
        <h3>{value}</h3>
        <p>{label}</p>
      </div>
    </div>
    {trend && (
      <div className={`trend-tag ${isPositive ? "positive" : "negative"}`}>
        {isPositive ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
        <span>{trend}</span>
      </div>
    )}
  </motion.div>
);

export default function Stats() {
  return (
    <>
      <div className="container">
        <Sidebar />
        <div className="admin-layout-wrapper">
          <div className="admin-main-container">
            <main className="admin-page stats-page">
              <header className="page-header">
                <h1>Dashboard</h1>
                <p className="subtitle">
                  Analyse en temps réel de votre plateforme
                </p>
              </header>

              <div className="stats-grid">
                <StatCard
                  icon={Users}
                  value="1 254"
                  label="Utilisateurs"
                  trend="+12%"
                  isPositive={true}
                  delay={0.1}
                />
                <StatCard
                  icon={MessageSquare}
                  value="342"
                  label="Avis envoyés"
                  trend="+5.4%"
                  isPositive={true}
                  delay={0.2}
                />
                <StatCard
                  icon={BarChart3}
                  value="78%"
                  label="Satisfaction"
                  trend="-2%"
                  isPositive={false}
                  delay={0.3}
                />
                <StatCard
                  icon={Settings}
                  value="12"
                  label="Paramètres"
                  trend="Stable"
                  isPositive={true}
                  delay={0.4}
                />
              </div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="main-chart-placeholder"
              >
                <h3>Activité hebdomadaire</h3>
                <div className="placeholder-content">
                  <p>Visualisation des données d'engagement</p>
                </div>
              </motion.div>
            </main>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
