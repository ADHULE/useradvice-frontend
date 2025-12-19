// src/pages/SystemSettings/components/SettingSection.jsx
import React from "react";
import { motion } from "framer-motion";

const SettingSection = ({
  title,
  icon: Icon,
  children,
  description,
  color = "primary",
  delay = 0,
}) => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay, duration: 0.3 }}
    className={`settings-section-container settings-section-${color}`}
  >
    <div className="settings-section-header">
      <div className="settings-section-icon-wrapper">
        <Icon size={24} className="settings-section-icon" />
      </div>
      <div className="settings-section-title-wrapper">
        <h3 className="settings-section-title">{title}</h3>
        {description && (
          <p className="settings-section-description">{description}</p>
        )}
      </div>
    </div>

    <div className="settings-section-content">{children}</div>
  </motion.div>
);

export default SettingSection;
