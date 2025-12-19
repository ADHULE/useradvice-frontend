import React from "react";
import { Download, FileText, BarChart3 } from "lucide-react";

const ExportSection = ({ onExport }) => {
  const handleExport = (format) => {
    if (onExport) onExport(format);
    console.log(`Export en format ${format} en cours...`);
  };

  return (
    <section className="reports-export-section">
      <div className="reports-export-card">
        <div className="reports-export-card__content">
          <h3 className="reports-export-card__title">
            <Download size={24} />
            Exporter les Rapports
          </h3>
          <p className="reports-export-card__description">
            Exportez tous vos rapports en format PDF, Excel ou CSV pour partager
            avec votre équipe ou archiver.
          </p>
          <div className="reports-export-card__formats">
            <button
              className="reports-export-card__format"
              onClick={() => handleExport("pdf")}
              title="Exporter en PDF"
            >
              <FileText size={20} />
              PDF
              <span className="reports-export-card__format-info">
                Haute qualité
              </span>
            </button>
            <button
              className="reports-export-card__format"
              onClick={() => handleExport("excel")}
              title="Exporter en Excel"
            >
              <BarChart3 size={20} />
              Excel
              <span className="reports-export-card__format-info">
                Données brutes
              </span>
            </button>
            <button
              className="reports-export-card__format"
              onClick={() => handleExport("csv")}
              title="Exporter en CSV"
            >
              <FileText size={20} />
              CSV
              <span className="reports-export-card__format-info">
                Compatibilité
              </span>
            </button>
          </div>
          <div className="reports-export-card__options">
            <label className="reports-export-card__option">
              <input type="checkbox" defaultChecked />
              Inclure les graphiques
            </label>
            <label className="reports-export-card__option">
              <input type="checkbox" defaultChecked />
              Inclure les métadonnées
            </label>
            <label className="reports-export-card__option">
              <input type="checkbox" />
              Chiffrer le fichier
            </label>
          </div>
        </div>
        <div className="reports-export-card__preview">
          <div className="reports-export-card__preview-icon">
            <FileText size={48} />
          </div>
          <div className="reports-export-card__preview-info">
            <div className="reports-export-card__preview-size">~ 45 MB</div>
            <div className="reports-export-card__preview-files">
              12 fichiers inclus
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExportSection;
