// src/pages/SystemSettings/components/SettingInput.jsx
import React from "react";

const SettingInput = ({
  label,
  description,
  type = "text",
  value,
  onChange,
  icon: Icon,
  placeholder,
  color = "primary",
}) => (
  <div className="settings-input-container">
    <div className="settings-input-header">
      {Icon && (
        <div className={`settings-input-icon settings-icon-${color}`}>
          <Icon size={18} />
        </div>
      )}
      <div className="settings-input-info">
        <label className="settings-input-label">{label}</label>
        {description && (
          <p className="settings-input-description">{description}</p>
        )}
      </div>
    </div>

    <div className="settings-input-wrapper">
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="settings-input-field"
      />
    </div>
  </div>
);

export default SettingInput;
