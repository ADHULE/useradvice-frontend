import React from "react";
import { motion } from "framer-motion";
import { AlertTriangle } from "lucide-react";

const SecurityAlert = () => {
  return (
    <motion.div
      className="dashboard__alert"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.9 }}
    >
      <div className="alert__header">
        <AlertTriangle size={20} />
        <h3 className="alert__title">Alerte Sécurité</h3>
      </div>
      <div className="alert__content">
        <p className="alert__message">
          3 tentatives de connexion échouées détectées sur le compte
          administrateur. Dernière tentative il y a 15 minutes depuis l'IP
          192.168.1.100.
        </p>
        <div className="alert__actions">
          <button className="alert-btn alert-btn--primary">
            Vérifier les logs
          </button>
          <button className="alert-btn alert-btn--secondary">
            Marquer comme vérifié
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default SecurityAlert;
