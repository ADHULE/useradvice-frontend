import React from "react";
import {
  BarChart3,
  Users,
  MessageSquare,
  Settings,
  ArrowUpRight,
  ArrowDownRight,
  TrendingUp,
  TrendingDown,
  Activity,
  Clock,
  DollarSign,
  Package,
  ShoppingCart,
  Eye,
  Heart,
  Share2,
  Download,
  Calendar,
  Target,
  Award,
  Zap,
  Cpu,
  Database,
  Server,
  Shield,
  Globe,
} from "lucide-react";
import { motion } from "framer-motion";
import Footer from "../../components/common/Footer";
import Sidebar from "../../components/common/Sidebar";

// Composant Carte de Statistique
const StatCard = ({
  icon: Icon,
  value,
  label,
  trend,
  isPositive,
  delay,
  description,
  color = "primary",
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.5 }}
    whileHover={{ y: -5, transition: { duration: 0.2 } }}
    className={`stats-dashboard-card stats-card-${color}`}
  >
    <div className="stats-card-header">
      <div className="stats-card-icon-wrapper">
        <Icon size={28} className="stats-card-icon" />
      </div>
      <div className="stats-card-trend">
        <span
          className={`stats-trend-indicator ${
            isPositive ? "positive" : "negative"
          }`}
        >
          {isPositive ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
          <span className="stats-trend-value">{trend}</span>
        </span>
      </div>
    </div>

    <div className="stats-card-content">
      <div className="stats-card-main">
        <h3 className="stats-card-value">{value}</h3>
        <p className="stats-card-label">{label}</p>
      </div>

      {description && (
        <div className="stats-card-description">
          <p>{description}</p>
        </div>
      )}
    </div>

    <div className="stats-card-footer">
      <div className="stats-card-progress">
        <div
          className="stats-progress-bar"
          style={{
            width: isPositive ? "75%" : "45%",
            background: isPositive ? "var(--success)" : "var(--danger)",
          }}
        />
      </div>
      <span className="stats-card-time">
        <Clock size={12} />
        Dernière mise à jour
      </span>
    </div>
  </motion.div>
);

// Composant Graphique
const ChartCard = ({ title, icon: Icon, children, delay }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ delay, duration: 0.5 }}
    className="stats-chart-container"
  >
    <div className="stats-chart-header">
      <div className="stats-chart-title-wrapper">
        <Icon size={20} className="stats-chart-icon" />
        <h3 className="stats-chart-title">{title}</h3>
      </div>
      <button className="stats-chart-action-btn">
        <Download size={16} />
        Exporter
      </button>
    </div>

    <div className="stats-chart-content">{children}</div>

    <div className="stats-chart-footer">
      <div className="stats-chart-legend">
        <div className="stats-legend-item">
          <span className="stats-legend-dot primary-dot"></span>
          <span>Série A</span>
        </div>
        <div className="stats-legend-item">
          <span className="stats-legend-dot success-dot"></span>
          <span>Série B</span>
        </div>
        <div className="stats-legend-item">
          <span className="stats-legend-dot warning-dot"></span>
          <span>Série C</span>
        </div>
      </div>
    </div>
  </motion.div>
);

export default function StatsDashboard() {
  return (
    <>
      <div className="stats-dashboard-container">
        <Sidebar />

        <div className="stats-layout-wrapper">
          <div className="stats-main-wrapper">
            <main className="stats-dashboard-main">
              {/* En-tête du Dashboard */}
              <header className="stats-page-header">
                <div className="stats-header-content">
                  <div className="stats-header-text">
                    <motion.h1
                      className="stats-page-title"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5 }}
                    >
                      <Activity size={32} className="stats-title-icon" />
                      Tableau de Bord Analytics
                    </motion.h1>
                    <motion.p
                      className="stats-page-subtitle"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 0.1 }}
                    >
                      <Database size={16} className="stats-subtitle-icon" />
                      Analyse en temps réel et métriques avancées de votre
                      plateforme
                    </motion.p>
                  </div>

                  <motion.div
                    className="stats-header-actions"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                  >
                    <button className="stats-action-btn primary">
                      <Calendar size={16} />
                      <span>Cette semaine</span>
                      <ArrowDownRight size={14} />
                    </button>
                    <button className="stats-action-btn secondary">
                      <Zap size={16} />
                      <span>Rafraîchir</span>
                    </button>
                  </motion.div>
                </div>

                <motion.div
                  className="stats-header-metrics"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  <div className="stats-metric-item">
                    <span className="stats-metric-label">Performance</span>
                    <span className="stats-metric-value success">94%</span>
                  </div>
                  <div className="stats-metric-item">
                    <span className="stats-metric-label">Disponibilité</span>
                    <span className="stats-metric-value primary">99.9%</span>
                  </div>
                  <div className="stats-metric-item">
                    <span className="stats-metric-label">Uptime</span>
                    <span className="stats-metric-value warning">30j</span>
                  </div>
                </motion.div>
              </header>

              {/* Grille de Statistiques */}
              <section className="stats-cards-grid">
                <StatCard
                  icon={Users}
                  value="1,254"
                  label="Utilisateurs Actifs"
                  trend="+12.3%"
                  isPositive={true}
                  delay={0.1}
                  description="Croissance mensuelle"
                  color="primary"
                />

                <StatCard
                  icon={MessageSquare}
                  value="8,432"
                  label="Interactions"
                  trend="+24.7%"
                  isPositive={true}
                  delay={0.15}
                  description="Messages & commentaires"
                  color="success"
                />

                <StatCard
                  icon={BarChart3}
                  value="94.2%"
                  label="Taux de Satisfaction"
                  trend="+3.8%"
                  isPositive={true}
                  delay={0.2}
                  description="Retour utilisateurs"
                  color="warning"
                />

                <StatCard
                  icon={DollarSign}
                  value="$12,580"
                  label="Revenu Mensuel"
                  trend="+18.5%"
                  isPositive={true}
                  delay={0.25}
                  description="Chiffre d'affaires"
                  color="danger"
                />

                <StatCard
                  icon={ShoppingCart}
                  value="2,847"
                  label="Transactions"
                  trend="+15.2%"
                  isPositive={true}
                  delay={0.3}
                  description="Commandes traitées"
                  color="info"
                />

                <StatCard
                  icon={Eye}
                  value="45.2K"
                  label="Visites"
                  trend="+32.1%"
                  isPositive={true}
                  delay={0.35}
                  description="Trafic total"
                  color="purple"
                />

                <StatCard
                  icon={Heart}
                  value="3,842"
                  label="Favoris"
                  trend="+8.9%"
                  isPositive={true}
                  delay={0.4}
                  description="Produits aimés"
                  color="pink"
                />

                <StatCard
                  icon={Share2}
                  value="1,239"
                  label="Partages"
                  trend="+21.4%"
                  isPositive={true}
                  delay={0.45}
                  description="Contenu viral"
                  color="cyan"
                />
              </section>

              {/* Section Graphiques */}
              <section className="stats-charts-section">
                <ChartCard
                  title="Activité Hebdomadaire"
                  icon={Activity}
                  delay={0.5}
                >
                  <div className="stats-chart-visual">
                    <div className="stats-chart-bars">
                      {["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"].map(
                        (day, i) => (
                          <div key={day} className="stats-chart-bar-group">
                            <div
                              className="stats-chart-bar primary-bar"
                              style={{ height: `${30 + Math.random() * 70}%` }}
                            />
                            <div
                              className="stats-chart-bar success-bar"
                              style={{ height: `${20 + Math.random() * 60}%` }}
                            />
                            <span className="stats-chart-bar-label">{day}</span>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                </ChartCard>

                <ChartCard
                  title="Performance Serveur"
                  icon={Server}
                  delay={0.6}
                >
                  <div className="stats-performance-grid">
                    <div className="stats-performance-item">
                      <div className="stats-performance-header">
                        <Cpu size={16} />
                        <span>CPU Usage</span>
                      </div>
                      <div className="stats-performance-progress">
                        <div
                          className="stats-performance-bar"
                          style={{ width: "65%" }}
                        >
                          <span>65%</span>
                        </div>
                      </div>
                    </div>

                    <div className="stats-performance-item">
                      <div className="stats-performance-header">
                        <Database size={16} />
                        <span>Mémoire</span>
                      </div>
                      <div className="stats-performance-progress">
                        <div
                          className="stats-performance-bar"
                          style={{ width: "42%" }}
                        >
                          <span>42%</span>
                        </div>
                      </div>
                    </div>

                    <div className="stats-performance-item">
                      <div className="stats-performance-header">
                        <Shield size={16} />
                        <span>Sécurité</span>
                      </div>
                      <div className="stats-performance-progress">
                        <div
                          className="stats-performance-bar"
                          style={{ width: "98%" }}
                        >
                          <span>98%</span>
                        </div>
                      </div>
                    </div>

                    <div className="stats-performance-item">
                      <div className="stats-performance-header">
                        <Globe size={16} />
                        <span>Latence</span>
                      </div>
                      <div className="stats-performance-progress">
                        <div
                          className="stats-performance-bar"
                          style={{ width: "22%" }}
                        >
                          <span>22ms</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </ChartCard>
              </section>

              {/* Section Objectifs */}
              <motion.section
                className="stats-goals-section"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.7 }}
              >
                <div className="stats-goals-header">
                  <h3 className="stats-goals-title">
                    <Target size={20} />
                    Objectifs du Mois
                  </h3>
                  <span className="stats-goals-progress">78% atteints</span>
                </div>

                <div className="stats-goals-grid">
                  {[
                    {
                      label: "Acquisition Utilisateurs",
                      progress: 85,
                      target: 1000,
                    },
                    { label: "Taux de Conversion", progress: 62, target: 80 },
                    { label: "Satisfaction Client", progress: 94, target: 95 },
                    {
                      label: "Chiffre d'Affaires",
                      progress: 78,
                      target: "$15K",
                    },
                    { label: "Référencement SEO", progress: 91, target: 95 },
                    { label: "Engagement Social", progress: 73, target: 85 },
                  ].map((goal, index) => (
                    <div key={index} className="stats-goal-item">
                      <div className="stats-goal-info">
                        <span className="stats-goal-label">{goal.label}</span>
                        <span className="stats-goal-target">{goal.target}</span>
                      </div>
                      <div className="stats-goal-progress">
                        <div
                          className="stats-goal-progress-bar"
                          style={{ width: `${goal.progress}%` }}
                        />
                        <span className="stats-goal-percentage">
                          {goal.progress}%
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.section>

              {/* Badges et Récompenses */}
              <motion.div
                className="stats-badges-section"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.8 }}
              >
                <div className="stats-badges-header">
                  <h4>
                    <Award size={20} />
                    Récompenses & Badges
                  </h4>
                </div>
                <div className="stats-badges-grid">
                  {[
                    "Gold Member",
                    "Top Performer",
                    "Fast Responder",
                    "Quality Master",
                    "Growth Leader",
                  ].map((badge, i) => (
                    <div key={i} className="stats-badge-item">
                      <div className="stats-badge-icon">
                        <Award size={24} />
                      </div>
                      <span className="stats-badge-label">{badge}</span>
                    </div>
                  ))}
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
