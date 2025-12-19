import React from "react";
import { Calendar, Download, RefreshCw, ChevronDown } from "lucide-react";
import TimeRangeSelector from "./TimeRangeSelector";

const AnalyticsHeader = ({ onRefresh, onExport, onTimeRangeChange }) => {
  return (
    <header className="analytics-header">
      <div className="analytics-header__title">
        <h1 className="analytics-header__main-title">Analytics</h1>
        <p className="analytics-header__subtitle">
          Analysez les performances de votre plateforme en temps réel
        </p>
      </div>

      <div className="analytics-header__actions">
        <TimeRangeSelector onChange={onTimeRangeChange} />
        <button className="analytics-header__action-btn">
          <Calendar size={18} />
          Période
          <ChevronDown size={16} />
        </button>
        <button className="analytics-header__action-btn" onClick={onExport}>
          <Download size={18} />
          Exporter
        </button>
        <button
          className="analytics-header__action-btn analytics-header__action-btn--refresh"
          onClick={onRefresh}
        >
          <RefreshCw size={18} />
        </button>
      </div>
    </header>
  );
};

export default AnalyticsHeader;
