import React from "react";
import { CheckCircle, ShieldAlert, Star, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const ReviewModal = ({ review, onClose }) => {
  if (!review) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="modal-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="modal-content modern"
          initial={{ scale: 0.9, y: 20, opacity: 0 }}
          animate={{ scale: 1, y: 0, opacity: 1 }}
          exit={{ scale: 0.9, y: 20, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Bouton de fermeture */}
          <button className="close-modal" onClick={onClose}>
            <X size={22} />
          </button>

          <div className="modal-body">
            {/* Header utilisateur */}
            <div className="modal-header">
              <div className="avatar large">{review.initial}</div>
              <div className="header-text">
                <h2>{review.user}</h2>
                <span className="timestamp">{review.date}</span>
              </div>
            </div>

            {/* Étoiles */}
            <div className="stars-row">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={20}
                  fill={i < review.rating ? "#fbbf24" : "none"}
                  color={i < review.rating ? "#fbbf24" : "var(--border)"}
                />
              ))}
            </div>

            {/* Message */}
            <div className="message-container">
              <p className="full-message">{review.message}</p>
            </div>

            {/* Footer actions */}
            <div className="modal-footer">
              <button
                className="btn-modal approve"
                onClick={() => {
                  console.log("Approuvé");
                  onClose();
                }}
              >
                <CheckCircle size={18} /> Approuver
              </button>
              <button
                className="btn-modal report"
                onClick={() => {
                  console.log("Signalé");
                  onClose();
                }}
              >
                <ShieldAlert size={18} /> Signaler
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ReviewModal;
