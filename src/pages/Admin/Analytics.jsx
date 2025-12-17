import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  TrendingUp,
  Users,
  Eye,
  Clock,
  Download,
  Filter,
  Calendar,
  BarChart3,
  LineChart,
  PieChart,
  Globe,
  Smartphone,
  Tablet,
  Monitor,
  ChevronDown,
  MoreVertical,
  RefreshCw,
  Share2,
} from "lucide-react";
import Sidebar from "../../components/common/Sidebar";
import Footer from "../../components/common/Footer";
import Navbar from "../../components/common/Navbar";

// Composant de métrique analytique
const AnalyticsMetric = ({ title, value, change, icon, color, delay = 0 }) => (
  <motion.div
    className="analytics-metric-card"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay }}
    whileHover={{ scale: 1.02 }}
  >
    <div className="analytics-metric__header">
      <div
        className="analytics-metric__icon-wrapper"
        style={{ backgroundColor: `${color}15` }}
      >
        <div className="analytics-metric__icon" style={{ color }}>
          {icon}
        </div>
      </div>
      <button className="analytics-metric__menu">
        <MoreVertical size={16} />
      </button>
    </div>

    <div className="analytics-metric__content">
      <h4 className="analytics-metric__title">{title}</h4>
      <div className="analytics-metric__value">{value}</div>
      <div className="analytics-metric__change">
        <TrendingUp size={14} />
        <span style={{ color }}>{change}</span>
      </div>
    </div>

    <div className="analytics-metric__progress">
      <motion.div
        className="analytics-metric__progress-bar"
        initial={{ width: 0 }}
        animate={{ width: "75%" }}
        transition={{ delay: delay + 0.2, duration: 1 }}
        style={{ backgroundColor: color }}
      />
    </div>
  </motion.div>
);

// Composant de graphique de ligne
const LineChartComponent = ({ data, color }) => (
  <div className="analytics-line-chart">
    <div className="analytics-line-chart__canvas">
      {data.map((point, i) => (
        <motion.div
          key={i}
          className="analytics-line-chart__point"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: i * 0.05 }}
          style={{
            left: `${(i / (data.length - 1)) * 100}%`,
            bottom: `${point}%`,
            backgroundColor: color,
          }}
        />
      ))}
      <svg className="analytics-line-chart__line" viewBox="0 0 100 100">
        <path
          d={`M0,${100 - data[0]} ${data
            .map(
              (point, i) => `L${(i / (data.length - 1)) * 100},${100 - point}`
            )
            .join(" ")}`}
          fill="none"
          stroke={color}
          strokeWidth="2"
        />
      </svg>
    </div>
  </div>
);

// Composant de source de trafic
const TrafficSource = ({ name, percentage, value, color }) => (
  <div className="analytics-traffic-source">
    <div className="analytics-traffic-source__info">
      <div
        className="analytics-traffic-source__dot"
        style={{ backgroundColor: color }}
      />
      <div className="analytics-traffic-source__details">
        <span className="analytics-traffic-source__name">{name}</span>
        <span className="analytics-traffic-source__percentage">
          {percentage}%
        </span>
      </div>
    </div>
    <div className="analytics-traffic-source__value">{value}</div>
    <div className="analytics-traffic-source__bar">
      <motion.div
        className="analytics-traffic-source__progress"
        initial={{ width: 0 }}
        animate={{ width: `${percentage}%` }}
        transition={{ duration: 1 }}
        style={{ backgroundColor: color }}
      />
    </div>
  </div>
);

// Composant de périodicité
const TimeRangeSelector = () => {
  const [selectedRange, setSelectedRange] = useState("week");

  const ranges = [
    { id: "day", label: "24H" },
    { id: "week", label: "7J" },
    { id: "month", label: "30J" },
    { id: "quarter", label: "3M" },
    { id: "year", label: "1A" },
  ];

  return (
    <div className="analytics-time-range">
      <div className="analytics-time-range__selector">
        {ranges.map((range) => (
          <button
            key={range.id}
            className={`analytics-time-range__button ${
              selectedRange === range.id
                ? "analytics-time-range__button--active"
                : ""
            }`}
            onClick={() => setSelectedRange(range.id)}
          >
            {range.label}
          </button>
        ))}
      </div>
    </div>
  );
};

const Analytics = () => {
  const metrics = [
    {
      title: "Visiteurs Uniques",
      value: "24.5K",
      change: "+12.5%",
      icon: <Users size={20} />,
      color: "#4361ee",
    },
    {
      title: "Pages Vues",
      value: "145.2K",
      change: "+8.3%",
      icon: <Eye size={20} />,
      color: "#4cc9f0",
    },
    {
      title: "Temps Moyen",
      value: "4m 32s",
      change: "+2.1%",
      icon: <Clock size={20} />,
      color: "#7209b7",
    },
    {
      title: "Taux de Rebond",
      value: "32.1%",
      change: "-1.4%",
      icon: <TrendingUp size={20} />,
      color: "#f72585",
    },
  ];

  const trafficSources = [
    {
      name: "Recherche Organique",
      percentage: 45,
      value: "12.4K",
      color: "#4361ee",
    },
    {
      name: "Réseaux Sociaux",
      percentage: 28,
      value: "7.8K",
      color: "#4cc9f0",
    },
    { name: "Direct", percentage: 15, value: "4.2K", color: "#7209b7" },
    { name: "Référencement", percentage: 8, value: "2.1K", color: "#f72585" },
    { name: "Email", percentage: 4, value: "1.1K", color: "#8338ec" },
  ];

  const devices = [
    {
      name: "Mobile",
      percentage: 62,
      icon: <Smartphone size={16} />,
      color: "#4361ee",
    },
    {
      name: "Desktop",
      percentage: 32,
      icon: <Monitor size={16} />,
      color: "#4cc9f0",
    },
    {
      name: "Tablette",
      percentage: 6,
      icon: <Tablet size={16} />,
      color: "#7209b7",
    },
  ];

  const lineData = [30, 45, 60, 40, 75, 55, 80, 65, 90, 70, 85, 95];

  return (
    <>
      <Navbar />
      <div className="analytics-page">
        <Sidebar />

        <main className="analytics-main">
          {/* Header */}
          <header className="analytics-header">
            <div className="analytics-header__title">
              <h1 className="analytics-header__main-title">Analytics</h1>
              <p className="analytics-header__subtitle">
                Analysez les performances de votre plateforme en temps réel
              </p>
            </div>

            <div className="analytics-header__actions">
              <TimeRangeSelector />
              <button className="analytics-header__action-btn">
                <Calendar size={18} />
                Période
                <ChevronDown size={16} />
              </button>
              <button className="analytics-header__action-btn">
                <Download size={18} />
                Exporter
              </button>
              <button className="analytics-header__action-btn analytics-header__action-btn--refresh">
                <RefreshCw size={18} />
              </button>
            </div>
          </header>

          {/* Métriques principales */}
          <section className="analytics-metrics-grid">
            {metrics.map((metric, index) => (
              <AnalyticsMetric
                key={index}
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
                    Évolution du Trafic
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
                </div>
              </div>
            </div>

            {/* Sidebar avec détails */}
            <div className="analytics-sidebar">
              {/* Sources de trafic */}
              <div className="analytics-traffic-card">
                <div className="analytics-traffic-card__header">
                  <h4 className="analytics-traffic-card__title">
                    <Globe size={18} />
                    Sources de Trafic
                  </h4>
                  <MoreVertical size={16} />
                </div>
                <div className="analytics-traffic-card__content">
                  {trafficSources.map((source, index) => (
                    <TrafficSource key={index} {...source} />
                  ))}
                </div>
              </div>

              {/* Appareils */}
              <div className="analytics-devices-card">
                <div className="analytics-devices-card__header">
                  <h4 className="analytics-devices-card__title">
                    <Smartphone size={18} />
                    Appareils
                  </h4>
                </div>
                <div className="analytics-devices-card__content">
                  {devices.map((device, index) => (
                    <div key={index} className="analytics-device-item">
                      <div className="analytics-device-item__info">
                        <div className="analytics-device-item__icon">
                          {device.icon}
                        </div>
                        <span className="analytics-device-item__name">
                          {device.name}
                        </span>
                      </div>
                      <div className="analytics-device-item__percentage">
                        {device.percentage}%
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Tableau détaillé */}
          <section className="analytics-detailed-table">
            <div className="analytics-table-header">
              <h3 className="analytics-table-title">Détails par Page</h3>
              <button className="analytics-table-export">
                <Download size={16} />
                CSV
              </button>
            </div>
            <div className="analytics-table-content">
              <div className="analytics-table-row analytics-table-header-row">
                <div className="analytics-table-cell analytics-table-cell--page">
                  Page
                </div>
                <div className="analytics-table-cell analytics-table-cell--visitors">
                  Visiteurs
                </div>
                <div className="analytics-table-cell analytics-table-cell--views">
                  Vues
                </div>
                <div className="analytics-table-cell analytics-table-cell--time">
                  Temps
                </div>
                <div className="analytics-table-cell analytics-table-cell--bounce">
                  Rebond
                </div>
              </div>
              {[
                {
                  page: "/dashboard",
                  visitors: "8,452",
                  views: "12,845",
                  time: "5m 23s",
                  bounce: "24%",
                },
                {
                  page: "/profile",
                  visitors: "6,124",
                  views: "9,452",
                  time: "3m 45s",
                  bounce: "32%",
                },
                {
                  page: "/settings",
                  visitors: "4,856",
                  views: "7,124",
                  time: "2m 12s",
                  bounce: "45%",
                },
                {
                  page: "/analytics",
                  visitors: "3,745",
                  views: "5,689",
                  time: "6m 34s",
                  bounce: "18%",
                },
                {
                  page: "/reports",
                  visitors: "2,985",
                  views: "4,256",
                  time: "4m 56s",
                  bounce: "28%",
                },
              ].map((row, index) => (
                <div key={index} className="analytics-table-row">
                  <div className="analytics-table-cell analytics-table-cell--page">
                    {row.page}
                  </div>
                  <div className="analytics-table-cell analytics-table-cell--visitors">
                    {row.visitors}
                  </div>
                  <div className="analytics-table-cell analytics-table-cell--views">
                    {row.views}
                  </div>
                  <div className="analytics-table-cell analytics-table-cell--time">
                    {row.time}
                  </div>
                  <div className="analytics-table-cell analytics-table-cell--bounce">
                    {row.bounce}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </main>
      </div>
      <Footer />
    </>
  );
};

export default Analytics;
