import React from "react";
import { RefreshCw, Clock } from "lucide-react";

const LoadingState = () => {
  return (
    <div className="reviews-loading-container">
      <div className="reviews-spinner">
        <RefreshCw size={32} className="spinning" />
      </div>
      <p className="reviews-loading-text">
        <Clock size={16} />
        Chargement des avis...
      </p>
    </div>
  );
};

export default LoadingState;
