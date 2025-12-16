import React, { useState } from "react";
import Footer from "../../components/common/Footer";
import {
  FaPaperPlane,
  FaCommentDots,
  FaRegClock,
  FaSave,
  FaLightbulb,
  FaListUl,
  FaQuoteRight,
  FaQuestionCircle,
  FaArrowLeft,
  FaArrowRight,
  FaCheckCircle,
  FaExclamationTriangle,
  FaLock,
  FaUserCheck,
} from "react-icons/fa";

import { createAdvice } from "../../api/adviceApi";
import { goToPath } from "../../components/navigation/goToPath";
import useLocalStorage from "../../hooks/useLocalStorage";

const AdviceCreate = () => {
  const [advice, setAdvice] = useState({
    message: "",
    status: "PENDING",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [charCount, setCharCount] = useState(0);

  // 🔑 utilisation du hook pour récupérer le token
  const [token] = useLocalStorage("accessToken", null);

  // Gestion du compteur de caractères
  const handleMessageChange = (e) => {
    const value = e.target.value;
    setCharCount(value.length);
    setAdvice({ ...advice, message: value });
  };

  // Soumission du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    // Validation côté client
    if (!advice.message.trim()) {
      setError("Veuillez saisir un message pour votre avis.");
      return;
    }

    if (advice.message.trim().length < 10) {
      setError("Le message doit contenir au moins 10 caractères.");
      return;
    }

    // Vérification de la session
    if (!token) {
      setError(
        <span>
          <FaLock /> Session expirée. Veuillez vous reconnecter.
        </span>
      );
      return;
    }

    const advicePayload = {
      message: advice.message.trim(),
      status: advice.status.trim() || "PENDING",
      createdAt: new Date().toISOString(),
    };

    try {
      setLoading(true);
      await createAdvice(advicePayload, token);

      // Succès
      setSuccess(true);
      setAdvice({ message: "", status: "PENDING" });
      setCharCount(0);

      // Redirection après délai
      setTimeout(() => {
        goToPath("/myAdvices");
      }, 2000);
    } catch (err) {
      console.error("Erreur lors de la soumission de l'avis:", err);
      const apiError = err.response?.data?.message || err.message;

      if (err.response?.status === 401 || err.response?.status === 403) {
        setError(
          <span>
            <FaLock /> Session expirée ou droits insuffisants. Veuillez vous
            reconnecter.
          </span>
        );
      } else if (err.response?.status === 400) {
        setError(
          <span>
            <FaExclamationTriangle /> Données invalides : {apiError}
          </span>
        );
      } else {
        setError(
          <span>
            <FaExclamationTriangle /> Erreur lors de l'enregistrement. Veuillez
            réessayer.
          </span>
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="create-advice-container">
        {/* Header */}
        <div className="create-header">
          <div className="breadcrumb">
            <button
              className="breadcrumb-item"
              onClick={() => goToPath("/createReviewPage")}
            >
              <FaArrowLeft /> Page précédente
            </button>
            <span className="breadcrumb-separator">/</span>
            <span className="breadcrumb-current">
              <FaPaperPlane /> Nouvel avis
            </span>
          </div>

          <div className="header-content">
            <div className="header-text">
              <h1>Créer un nouvel avis</h1>
              <p className="subtitle">
                Partagez vos suggestions pour améliorer notre service
              </p>
            </div>

            <div className="header-actions">
              <button
                className="btn btn-secondary with-icon"
                onClick={() => goToPath("/myAdvices")}
              >
                <FaArrowRight /> Mes avis
              </button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="create-content">
          {success && (
            <div className="success-state">
              <div className="success-icon">
                <FaCheckCircle />
              </div>
              <div className="success-content">
                <h3>Votre avis a été envoyé avec succès !</h3>
                <p>Redirection vers vos avis dans 2 secondes...</p>
              </div>
            </div>
          )}

          {!success && (
            <>
              {/* Form Section */}
              <div className="form-section">
                <div className="form-card">
                  <div className="form-header">
                    <h2>
                      <FaCommentDots /> Formulaire d'avis
                    </h2>
                    <div className="form-subtitle">
                      <FaUserCheck /> Connecté en tant qu'utilisateur
                    </div>
                  </div>

                  {error && (
                    <div className="alert alert-error">
                      <FaExclamationTriangle />
                      <div className="alert-content">{error}</div>
                    </div>
                  )}

                  <form className="advice-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                      <label htmlFor="message" className="form-label">
                        <span className="label-text">Votre message *</span>
                        <span className="char-counter">
                          {charCount}/500 caractères
                        </span>
                      </label>
                      <div className="input-wrapper">
                        <textarea
                          id="message"
                          placeholder="Décrivez clairement votre suggestion, remarque ou feedback..."
                          value={advice.message}
                          onChange={handleMessageChange}
                          rows="6"
                          maxLength="500"
                          className={`form-textarea ${
                            charCount === 500 ? "limit-reached" : ""
                          }`}
                          disabled={loading}
                        />
                        <div className="textarea-footer">
                          <span className="hint">
                            Minimum 10 caractères, maximum 500
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="form-group">
                      <label htmlFor="status" className="form-label">
                        <FaRegClock /> Statut initial
                      </label>
                      <div className="status-info">
                        <input
                          id="status"
                          type="text"
                          placeholder="Statut par défaut : EN ATTENTE"
                          value={advice.status}
                          onChange={(e) =>
                            setAdvice({ ...advice, status: e.target.value })
                          }
                          className="form-input"
                          disabled={loading}
                        />
                        <div className="status-hint">
                          Laissez "PENDING" pour un statut par défaut
                        </div>
                      </div>
                    </div>

                    <div className="form-actions">
                      <button
                        className="btn btn-primary with-icon"
                        type="submit"
                        disabled={loading || charCount < 10}
                      >
                        {loading ? (
                          <>
                            <div className="spinner-small"></div>
                            Envoi en cours...
                          </>
                        ) : (
                          <>
                            <FaPaperPlane /> Envoyer l'avis
                          </>
                        )}
                      </button>

                      <button
                        type="button"
                        className="btn btn-text"
                        onClick={() => {
                          setAdvice({ message: "", status: "PENDING" });
                          setCharCount(0);
                          setError(null);
                        }}
                        disabled={loading}
                      >
                        Effacer le formulaire
                      </button>
                    </div>
                  </form>
                </div>
              </div>

              {/* Guide Section */}
              <div className="guide-section">
                <div className="guide-card">
                  <div className="guide-header">
                    <FaLightbulb />
                    <h3>Guide de rédaction</h3>
                  </div>

                  <div className="guide-content">
                    <div className="tips-grid">
                      <div className="tip-card">
                        <div className="tip-icon">
                          <FaListUl />
                        </div>
                        <h4>Conseils</h4>
                        <ul>
                          <li>Soyez clair et concis</li>
                          <li>Donnez des exemples concrets</li>
                          <li>Proposez des solutions si possible</li>
                          <li>Restez constructif</li>
                        </ul>
                      </div>

                      <div className="tip-card">
                        <div className="tip-icon">
                          <FaExclamationTriangle />
                        </div>
                        <h4>À éviter</h4>
                        <ul>
                          <li>Informations personnelles</li>
                          <li>Langage inapproprié</li>
                          <li>Critiques non constructives</li>
                          <li>Demandes hors sujet</li>
                        </ul>
                      </div>
                    </div>

                    <div className="example-section">
                      <h4>
                        <FaQuoteRight /> Exemple de bon avis
                      </h4>
                      <div className="example-card">
                        <div className="example-header">
                          <span className="example-title">
                            Suggestion d'amélioration
                          </span>
                          <span className="example-status">EN ATTENTE</span>
                        </div>
                        <p className="example-text">
                          "Sur la page de profil mobile, le champ 'Numéro de
                          téléphone' est coupé sur les écrans de petite taille.
                          Je suggère d'ajouter un défilement horizontal ou de
                          réduire la taille de police pour les appareils
                          mobiles."
                        </p>
                      </div>
                    </div>

                    <div className="process-info">
                      <h4>Processus de traitement</h4>
                      <div className="process-steps">
                        <div className="step">
                          <div className="step-number">1</div>
                          <div className="step-content">
                            <strong>Soumission</strong>
                            <p>Votre avis est enregistré</p>
                          </div>
                        </div>
                        <div className="step">
                          <div className="step-number">2</div>
                          <div className="step-content">
                            <strong>Examen</strong>
                            <p>Notre équipe analyse votre suggestion</p>
                          </div>
                        </div>
                        <div className="step">
                          <div className="step-number">3</div>
                          <div className="step-content">
                            <strong>Traitement</strong>
                            <p>Statut mis à jour (Accepté/Rejeté)</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      <Footer />
    </>
  );
};

export default AdviceCreate;
