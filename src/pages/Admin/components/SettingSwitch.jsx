// src/pages/SystemSettings/components/SettingSwitch.jsx
import React from "react";

const SettingSwitch = ({
  label,
  description,
  value,
  onChange,
  icon: Icon,
  color = "primary",
}) => (
  <div className="settings-switch-container">
    <div className="settings-switch-info">
      <div className="settings-switch-header">
        {Icon && (
          <div className={`settings-switch-icon settings-icon-${color}`}>
            <Icon size={18} />
          </div>
        )}
        <div className="settings-switch-text">
          <p className="settings-switch-label">{label}</p>
          {description && (
            <p className="settings-switch-description">{description}</p>
          )}
        </div>
      </div>
    </div>

    <label className="settings-switch">
      <input
        type="checkbox"
        checked={value}
        onChange={onChange}
        className="settings-switch-input"
        aria-label={label}
      />
      <span className="settings-switch-slider">
        <span className="settings-switch-knob" />
      </span>
    </label>
  </div>
);

export default SettingSwitch;
