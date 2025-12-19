import React from "react";
import { AlertCircle, RefreshCw } from "lucide-react";

const ErrorState = ({ error, onRetry }) => {
  return (
    <div className="reviews-error-container">
      <div className="reviews-error-icon">
        <AlertCircle size={48} />
      </div>
      <p className="reviews-error-text">{error}</p>
      <button className="reviews-retry-btn" onClick={onRetry}>
        <RefreshCw size={16} />
        Réessayer
      </button>
    </div>
  );
};

export default ErrorState;
