import React from "react";
import { FileText, Share2, Printer } from "lucide-react";

const ReportsHeader = ({ onCreateReport, onShare, onPrint }) => {
  return (
    <header className="reports-header">
      <div className="reports-header__title">
        <h1 className="reports-header__main-title">Rapports</h1>
        <p className="reports-header__subtitle">
          Gérez et consultez tous vos rapports en un seul endroit. Suivez les
          performances et générez des insights.
        </p>
      </div>

      <div className="reports-header__actions">
        <button
          className="reports-header__action-btn reports-header__action-btn--primary"
          onClick={onCreateReport}
        >
          <FileText size={18} />
          Nouveau Rapport
        </button>
        <button
          className="reports-header__action-btn"
          onClick={onShare}
          title="Partager les rapports"
        >
          <Share2 size={18} />
          Partager
        </button>
        <button
          className="reports-header__action-btn"
          onClick={onPrint}
          title="Imprimer la sélection"
        >
          <Printer size={18} />
          Imprimer
        </button>
      </div>
    </header>
  );
};

export default ReportsHeader;
