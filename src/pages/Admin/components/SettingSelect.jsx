// src/pages/SystemSettings/components/SettingSelect.jsx
import React from "react";

const SettingSelect = ({
  label,
  description,
  value,
  onChange,
  icon: Icon,
  options = [],
  color = "primary",
}) => (
  <div className="settings-select-container">
    <div className="settings-select-header">
      {Icon && (
        <div className={`settings-select-icon settings-icon-${color}`}>
          <Icon size={18} />
        </div>
      )}
      <div className="settings-select-info">
        <label className="settings-select-label">{label}</label>
        {description && (
          <p className="settings-select-description">{description}</p>
        )}
      </div>
    </div>

    <div className="settings-select-wrapper">
      <select
        value={value}
        onChange={onChange}
        className="settings-select-field"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <div className="settings-select-arrow">▼</div>
    </div>
  </div>
);

export default SettingSelect;
