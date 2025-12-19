import React from "react";
import { Edit, Trash2 } from "lucide-react";
import ReportCard from "./ReportCard";

const ReportsList = ({ reports = [], onEdit, onDelete, onSelect }) => {
  const defaultReports = [
    {
      id: 1,
      title: "Rapport Financier Q4 2024",
      date: "15 Déc 2024",
      status: "completed",
      type: "financial",
      author: "Marie Dubois",
      downloads: 245,
    },
    {
      id: 2,
      title: "Analyse des Utilisateurs",
      date: "10 Déc 2024",
      status: "completed",
      type: "user",
      author: "Jean Martin",
      downloads: 189,
    },
    {
      id: 3,
      title: "Performance Infrastructure",
      date: "08 Déc 2024",
      status: "pending",
      type: "performance",
      author: "Tech Team",
      downloads: 76,
    },
    {
      id: 4,
      title: "Analytics Trafic Mensuel",
      date: "05 Déc 2024",
      status: "completed",
      type: "analytics",
      author: "Analytics Dept",
      downloads: 312,
    },
    {
      id: 5,
      title: "Audit de Sécurité Annuel",
      date: "01 Déc 2024",
      status: "error",
      type: "performance",
      author: "Security Team",
      downloads: 42,
    },
    {
      id: 6,
      title: "Rapport Marketing Digital",
      date: "28 Nov 2024",
      status: "completed",
      type: "analytics",
      author: "Marketing Dept",
      downloads: 167,
    },
  ];

  const displayReports = reports.length > 0 ? reports : defaultReports;

  return (
    <div className="reports-list-section">
      <div className="reports-list-header">
        <h3 className="reports-list-title">
          Rapports Récents ({displayReports.length})
        </h3>
        <div className="reports-list-actions">
          <button
            className="reports-list-action"
            onClick={onEdit}
            title="Modifier la sélection"
          >
            <Edit size={16} />
            Modifier
          </button>
          <button
            className="reports-list-action reports-list-action--delete"
            onClick={onDelete}
            title="Supprimer la sélection"
          >
            <Trash2 size={16} />
            Supprimer
          </button>
        </div>
      </div>

      <div className="reports-grid">
        {displayReports.map((report, index) => (
          <ReportCard
            key={report.id}
            {...report}
            delay={index * 0.1}
            onClick={() => onSelect && onSelect(report)}
          />
        ))}
      </div>
    </div>
  );
};

export default ReportsList;
