import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Users,
  Activity,
  AlertTriangle,
  BarChart3,
  Target,
  PieChart,
} from "lucide-react";

// Composants communs
import Sidebar from "../../../components/common/Sidebar";
import Footer from "../../../components/common/Footer";
import Navbar from "../../../components/common/Navbar";

// Composants dashboard
import DashboardHeader from "../dashboard/DashboardHeader";
import StatCard from "../dashboard/StatCard";
import ChartPlaceholder from "../dashboard/ChartPlaceholder";
import RecentActivity from "../dashboard/ RecentActivity";
import QuickStats from "../dashboard/ QuickStats";
import SecurityAlert from "../dashboard/ SecurityAlert";

const AdminDashboard = () => {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  const handleRefresh = () => {
    setIsRefreshing(true);
    // Simulation d'appel API
    setTimeout(() => setIsRefreshing(false), 1000);
  };

  // Données réalistes pour les statistiques
  const statsData = [
    {
      id: 1,
      icon: <Users size={24} />,
      label: "Utilisateurs Actifs",
      value: "1,842",
      trend: {
        type: "up",
        value: "+8.2%",
        progress: 82,
      },
      color: "var(--primary-color)",
    },
    {
      id: 2,
      icon: <Activity size={24} />,
      label: "Taux d'Engagement",
      value: "76.4%",
      trend: {
        type: "up",
        value: "+3.1%",
        progress: 76,
      },
      color: "var(--success-color)",
    },
    {
      id: 3,
      icon: <AlertTriangle size={24} />,
      label: "Alertes",
      value: "7",
      trend: {
        type: "down",
        value: "Urgent",
        progress: 45,
      },
      color: "var(--warning-color)",
    },
    {
      id: 4,
      icon: <BarChart3 size={24} />,
      label: "Performance",
      value: "99.7%",
      trend: {
        type: "stable",
        value: "Stable",
        progress: 99,
      },
      color: "var(--info-color)",
    },
    {
      id: 5,
      icon: <Target size={24} />,
      label: "Objectifs Mensuels",
      value: "82%",
      trend: {
        type: "up",
        value: "+12%",
        progress: 82,
      },
      color: "var(--purple)",
    },
    {
      id: 6,
      icon: <PieChart size={24} />,
      label: "Satisfaction",
      value: "4.6/5",
      trend: {
        type: "up",
        value: "+0.3",
        progress: 92,
      },
      color: "var(--accent-color)",
    },
  ];

  const chartData = [
    { label: "Mobile", value: "42%", color: "var(--primary-color)" },
    { label: "Desktop", value: "38%", color: "var(--success-color)" },
    { label: "Tablette", value: "15%", color: "var(--warning-color)" },
    { label: "Autre", value: "5%", color: "var(--info-color)" },
  ];

  return (
    <>
      <Navbar />
      <div className="admin-dashboard">
        <Sidebar />

        <main className="dashboard__main">
          {/* Header */}
          <DashboardHeader
            time={time}
            isRefreshing={isRefreshing}
            onRefresh={handleRefresh}
          />

          {/* Grille de statistiques */}
          <section className="dashboard__stats">
            {statsData.map((stat, index) => (
              <StatCard
                key={stat.id}
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
                title="Répartition des Plateformes"
                type="pie"
                data={chartData}
              />
            </div>

            <div className="charts__sidebar">
              <RecentActivity />
              <QuickStats />
            </div>
          </div>

          {/* Alertes */}
          <SecurityAlert />

          {/* Section performance supplémentaire */}
          <motion.div
            className="dashboard__performance"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
          >
            <div className="performance__header">
              <h3>Performances Hebdomadaires</h3>
              <span className="performance__trend positive">
                +14% vs semaine dernière
              </span>
            </div>
            <div className="performance__metrics">
              <div className="metric">
                <span className="metric__label">Nouveaux utilisateurs</span>
                <span className="metric__value">342</span>
              </div>
              <div className="metric">
                <span className="metric__label">Avis postés</span>
                <span className="metric__value">128</span>
              </div>
              <div className="metric">
                <span className="metric__label">Signalements traités</span>
                <span className="metric__value">45</span>
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
