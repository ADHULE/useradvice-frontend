import React, { useState } from "react";
import { Search, Filter, Calendar } from "lucide-react";

const ReportsFilter = ({ onFilterChange, onSearch }) => {
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filters = [
    { id: "all", label: "Tous les rapports" },
    { id: "financial", label: "Financier" },
    { id: "analytics", label: "Analytics" },
    { id: "user", label: "Utilisateurs" },
    { id: "performance", label: "Performance" },
  ];

  const handleFilterClick = (filterId) => {
    setActiveFilter(filterId);
    if (onFilterChange) onFilterChange(filterId);
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    if (onSearch) onSearch(value);
  };

  return (
    <div className="reports-filter">
      <div className="reports-filter__tabs">
        {filters.map((filter) => (
          <button
            key={filter.id}
            className={`reports-filter__tab ${
              activeFilter === filter.id ? "reports-filter__tab--active" : ""
            }`}
            onClick={() => handleFilterClick(filter.id)}
          >
            {filter.label}
          </button>
        ))}
      </div>
      <div className="reports-filter__controls">
        <div className="reports-filter__search">
          <Search size={18} />
          <input
            type="text"
            placeholder="Rechercher un rapport..."
            className="reports-filter__search-input"
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </div>
        <button
          className="reports-filter__control-btn"
          onClick={() => console.log("Ouvrir filtres avancés")}
        >
          <Filter size={18} />
          Filtres
        </button>
        <button
          className="reports-filter__control-btn reports-filter__control-btn--primary"
          onClick={() => console.log("Sélectionner période")}
        >
          <Calendar size={18} />
          Période
        </button>
      </div>
    </div>
  );
};

export default ReportsFilter;
