// src/pages/SystemSettings/components/SaveButton.jsx
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Save, RefreshCw, CheckCircle } from "lucide-react";
import useLanguage from "../../../hooks/useLanguage";

const SaveButton = ({ onClick, isLoading }) => {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const { t } = useLanguage();

  const handleClick = () => {
    onClick();
    setShowConfirmation(true);
    setTimeout(() => setShowConfirmation(false), 3000);
  };

  return (
    <div className="settings-save-container">
      <button
        className={`settings-save-btn ${isLoading ? "loading" : ""}`}
        onClick={handleClick}
        disabled={isLoading}
      >
        <Save size={18} />
        <span>{isLoading ? t("settings.saving") : t("settings.save")}</span>
        {isLoading && <RefreshCw size={16} className="spinning" />}
      </button>

      <AnimatePresence>
        {showConfirmation && (
          <motion.div
            className="settings-confirmation"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            <CheckCircle size={16} />
            <span>{t("settings.saved")}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SaveButton;
