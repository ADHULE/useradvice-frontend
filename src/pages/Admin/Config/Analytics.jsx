import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Users,
  Eye,
  Clock,
  TrendingUp,
  LineChart,
  Filter,
  Share2,
} from "lucide-react";

// Composants communs
import Sidebar from "../../../components/common/Sidebar";
import Footer from "../../../components/common/Footer";
import Navbar from "../../../components/common/Navbar";

// Composants analytics
import AnalyticsHeader from "../analytics/AnalyticsHeader";
import AnalyticsMetric from "../analytics/AnalyticsMetric";
import LineChartComponent from "../analytics/LineChartComponent";
import TrafficCard from "../analytics/TrafficCard";
import DevicesCard from "../analytics/DevicesCard";
import AnalyticsTable from "../analytics/AnalyticsTable";

const Analytics = () => {
  const [setIsRefreshing] = useState(false);

  // Données réalistes pour les métriques
  const metrics = [
    {
      id: 1,
      title: "Visiteurs Uniques",
      value: "28.7K",
      change: "+15.2%",
      icon: <Users size={20} />,
      color: "#4361ee",
    },
    {
      id: 2,
      title: "Pages Vues",
      value: "187.4K",
      change: "+12.8%",
      icon: <Eye size={20} />,
      color: "#4cc9f0",
    },
    {
      id: 3,
      title: "Temps Moyen",
      value: "5m 18s",
      change: "+4.7%",
      icon: <Clock size={20} />,
      color: "#7209b7",
    },
    {
      id: 4,
      title: "Taux de Rebond",
      value: "28.5%",
      change: "-3.2%",
      icon: <TrendingUp size={20} />,
      color: "#f72585",
    },
  ];

  // Données pour le graphique de ligne (représentant 12 mois)
  const lineData = [45, 52, 60, 55, 70, 65, 75, 80, 85, 82, 88, 92];

  const handleRefresh = () => {
    setIsRefreshing(true);
    // Simulation d'actualisation des données
    setTimeout(() => setIsRefreshing(false), 1500);
  };

  const handleExport = () => {
    // Logique d'export
    console.log("Export des données...");
  };

  const handleTimeRangeChange = (range) => {
    console.log("Changement de période:", range);
    // Ici, vous pouvez mettre à jour les données en fonction de la période
  };

  return (
    <>
      <Navbar />
      <div className="analytics-page">
        <Sidebar />

        <main className="analytics-main">
          {/* Header */}
          <AnalyticsHeader
            onRefresh={handleRefresh}
            onExport={handleExport}
            onTimeRangeChange={handleTimeRangeChange}
          />

          {/* Métriques principales */}
          <section className="analytics-metrics-grid">
            {metrics.map((metric, index) => (
              <AnalyticsMetric
                key={metric.id}
                title={metric.title}
                value={metric.value}
                change={metric.change}
                icon={metric.icon}
                color={metric.color}
                delay={index * 0.1}
              />
            ))}
          </section>

          {/* Section graphiques */}
          <div className="analytics-charts-section">
            {/* Graphique principal */}
            <div className="analytics-main-chart">
              <div className="analytics-chart-container">
                <div className="analytics-chart__header">
                  <h3 className="analytics-chart__title">
                    <LineChart size={20} />
                    Évolution du Trafic (12 derniers mois)
                  </h3>
                  <div className="analytics-chart__actions">
                    <button className="analytics-chart__action">
                      <Filter size={16} />
                    </button>
                    <button className="analytics-chart__action">
                      <Share2 size={16} />
                    </button>
                  </div>
                </div>
                <div className="analytics-chart__content">
                  <LineChartComponent data={lineData} color="#4361ee" />
                  <div className="analytics-chart__legend">
                    <div className="analytics-chart__legend-item">
                      <div
                        className="analytics-chart__legend-dot"
                        style={{ backgroundColor: "#4361ee" }}
                      />
                      <span>Visiteurs uniques (en milliers)</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar avec détails */}
            <div className="analytics-sidebar">
              <TrafficCard />
              <DevicesCard />
            </div>
          </div>

          {/* Tableau détaillé */}
          <AnalyticsTable />

          {/* Statistiques additionnelles */}
          <motion.div
            className="analytics-summary"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <div className="analytics-summary__grid">
              <div className="analytics-summary__item">
                <h4 className="analytics-summary__title">
                  Nouveaux Utilisateurs
                </h4>
                <div className="analytics-summary__value">2,847</div>
                <div className="analytics-summary__trend positive">+18%</div>
              </div>
              <div className="analytics-summary__item">
                <h4 className="analytics-summary__title">
                  Retention (30 jours)
                </h4>
                <div className="analytics-summary__value">72.4%</div>
                <div className="analytics-summary__trend positive">+5.3%</div>
              </div>
              <div className="analytics-summary__item">
                <h4 className="analytics-summary__title">Conversion</h4>
                <div className="analytics-summary__value">4.8%</div>
                <div className="analytics-summary__trend positive">+1.2%</div>
              </div>
            </div>
          </motion.div>
        </main>
      </div>
      <Footer />
    </>
  );
};

export default Analytics;
