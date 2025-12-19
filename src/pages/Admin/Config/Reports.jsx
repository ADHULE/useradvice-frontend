import React, { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "../../../components/common/Navbar";
import Sidebar from "../../../components/common/Sidebar";
import Footer from "../../../components/common/Footer";

// Composants reports
import {
  ReportsHeader,
  ReportsStats,
  ReportsFilter,
  ReportsList,
  ReportChart,
  ReportsActivity,
  ExportSection,
} from "../reports";

const Reports = () => {
  const [reports, setReports] = useState([]);
  const [selectedReports, setSelectedReports] = useState([]);

  // Données réalistes pour le graphique
  const chartData = [
    { label: "Jan", value: 45, color: "#4361ee" },
    { label: "Fév", value: 65, color: "#4cc9f0" },
    { label: "Mar", value: 55, color: "#7209b7" },
    { label: "Avr", value: 75, color: "#f72585" },
    { label: "Mai", value: 85, color: "#8338ec" },
    { label: "Jun", value: 95, color: "#4ade80" },
    { label: "Jul", value: 85, color: "#f59e0b" },
    { label: "Aoû", value: 90, color: "#ef4444" },
    { label: "Sep", value: 88, color: "#10b981" },
    { label: "Oct", value: 92, color: "#8b5cf6" },
    { label: "Nov", value: 96, color: "#ec4899" },
    { label: "Déc", value: 98, color: "#14b8a6" },
  ];

  const handleCreateReport = () => {
    console.log("Création d'un nouveau rapport...");
    // Logique pour créer un nouveau rapport
  };

  const handleShare = () => {
    console.log("Partage des rapports...");
    // Logique pour partager
  };

  const handlePrint = () => {
    console.log("Impression des rapports...");
    // Logique pour imprimer
  };

  const handleFilterChange = (filter) => {
    console.log("Filtre changé:", filter);
    // Filtrer les rapports en fonction du filtre
  };

  const handleSearch = (query) => {
    console.log("Recherche:", query);
    // Rechercher les rapports
  };

  const handleEditReports = () => {
    console.log("Édition des rapports sélectionnés...");
    // Logique pour éditer
  };

  const handleDeleteReports = () => {
    if (
      window.confirm(
        "Êtes-vous sûr de vouloir supprimer les rapports sélectionnés ?"
      )
    ) {
      console.log("Suppression des rapports...");
      // Logique pour supprimer
    }
  };

  const handleExport = (format) => {
    console.log(`Export en ${format} démarré...`);
    // Logique d'export
    alert(`Export des rapports en format ${format.toUpperCase()} lancé !`);
  };

  const handleReportSelect = (report) => {
    console.log("Rapport sélectionné:", report);
    setSelectedReports([...selectedReports, report.id]);
  };

  return (
    <>
      <Navbar />
      <div className="reports-page">
        <Sidebar />

        <main className="reports-main">
          {/* Header */}
          <ReportsHeader
            onCreateReport={handleCreateReport}
            onShare={handleShare}
            onPrint={handlePrint}
          />

          {/* Statistiques */}
          <ReportsStats />

          {/* Filtres */}
          <ReportsFilter
            onFilterChange={handleFilterChange}
            onSearch={handleSearch}
          />

          {/* Section principale */}
          <div className="reports-content">
            {/* Liste des rapports */}
            <ReportsList
              reports={reports}
              onEdit={handleEditReports}
              onDelete={handleDeleteReports}
              onSelect={handleReportSelect}
            />

            {/* Sidebar avec graphique et activité */}
            <div className="reports-sidebar">
              <ReportChart
                data={chartData}
                type="bar"
                title="Rapports par Mois"
              />

              <motion.div
                className="reports-summary"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <h4 className="reports-summary__title">Résumé du Mois</h4>
                <div className="reports-summary__grid">
                  <div className="reports-summary__item">
                    <div className="reports-summary__item-label">
                      Nouveaux rapports
                    </div>
                    <div className="reports-summary__item-value">42</div>
                  </div>
                  <div className="reports-summary__item">
                    <div className="reports-summary__item-label">
                      Taux de complétion
                    </div>
                    <div className="reports-summary__item-value">94.3%</div>
                  </div>
                  <div className="reports-summary__item">
                    <div className="reports-summary__item-label">
                      Moyenne téléchargements
                    </div>
                    <div className="reports-summary__item-value">156</div>
                  </div>
                  <div className="reports-summary__item">
                    <div className="reports-summary__item-label">
                      Temps moyen génération
                    </div>
                    <div className="reports-summary__item-value">3m 24s</div>
                  </div>
                </div>
              </motion.div>

              <ReportsActivity />
            </div>
          </div>

          {/* Section d'export */}
          <ExportSection onExport={handleExport} />

          {/* Section planification */}
          <motion.section
            className="reports-scheduling"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <h3 className="reports-scheduling__title">
              Planification Automatique
            </h3>
            <p className="reports-scheduling__description">
              Configurez des rapports automatiques envoyés par email selon votre
              planning.
            </p>
            <div className="reports-scheduling__grid">
              <div className="reports-scheduling__item">
                <div className="reports-scheduling__item-icon">📅</div>
                <div className="reports-scheduling__item-content">
                  <h4>Rapports Quotidiens</h4>
                  <p>Envoyés chaque jour à 8h</p>
                </div>
                <button className="reports-scheduling__item-action">
                  Configurer
                </button>
              </div>
              <div className="reports-scheduling__item">
                <div className="reports-scheduling__item-icon">📊</div>
                <div className="reports-scheduling__item-content">
                  <h4>Rapports Hebdomadaires</h4>
                  <p>Lundi matin, résumé semaine</p>
                </div>
                <button className="reports-scheduling__item-action">
                  Configurer
                </button>
              </div>
              <div className="reports-scheduling__item">
                <div className="reports-scheduling__item-icon">📈</div>
                <div className="reports-scheduling__item-content">
                  <h4>Rapports Mensuels</h4>
                  <p>1er du mois, analyse complète</p>
                </div>
                <button className="reports-scheduling__item-action">
                  Configurer
                </button>
              </div>
            </div>
          </motion.section>
        </main>
      </div>
      <Footer />
    </>
  );
};

export default Reports;
