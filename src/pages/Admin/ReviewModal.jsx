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
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={(e) => e.stopPropagation()}
        >
          <button
            className="close-modal"
            onClick={onClose}
            aria-label="Fermer la modale"
          >
            <X size={20} />
          </button>

          <div className="modal-body">
            <div className="modal-header">
              <div className="avatar large">{review.initial}</div>
              <div className="header-text">
                <h2>{review.user}</h2>
                <span className="timestamp">{review.date}</span>
              </div>
            </div>

            <div className="stars-row">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={20}
                  fill={i < review.rating ? "#fbbf24" : "none"}
                  stroke={i < review.rating ? "#f59e0b" : "#d1d5db"}
                  strokeWidth={1.5}
                />
              ))}
            </div>

            <div className="message-container">
              <p className="full-message">{review.message}</p>
            </div>
          </div>

          <div className="modal-footer">
            <button
              className="btn btn-success"
              onClick={() => {
                console.log("Approuvé");
                onClose();
              }}
            >
              <CheckCircle size={18} />
              Approuver
            </button>
            <button
              className="btn btn-danger"
              onClick={() => {
                console.log("Signalé");
                onClose();
              }}
            >
              <ShieldAlert size={18} />
              Signaler
            </button>
            <button className="btn btn-ghost" onClick={onClose}>
              Annuler
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ReviewModal;
